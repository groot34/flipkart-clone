const pool = require('../config/database');

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD${timestamp}${random}`;
};

exports.createOrder = async (req, res, next) => {
  try {
    const {
      userId = 1,
      items,
      shippingAddress,
      paymentMethod = 'COD'
    } = req.body;

    await pool.query('BEGIN');

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const productRes = await pool.query(
        'SELECT id, name, price, stock_quantity FROM products WHERE id = $1 FOR UPDATE',
        [item.productId]
      );

      if (productRes.rows.length === 0) {
        throw new Error(`Product ${item.productId} not found`);
      }

      const product = productRes.rows[0];

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: itemTotal,
        imageUrl: item.imageUrl || null
      });

      await pool.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, product.id]
      );
    }

    const tax = subtotal * 0.18;
    const shippingCost = subtotal > 500 ? 0 : 40;
    const totalAmount = subtotal + tax + shippingCost;

    const addressRes = await pool.query(`
      INSERT INTO addresses (
        user_id, full_name, phone, address_line1, address_line2,
        city, state, pincode
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id
    `, [
      userId,
      shippingAddress.fullName,
      shippingAddress.phone,
      shippingAddress.addressLine1,
      shippingAddress.addressLine2 || null,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.pincode
    ]);

    const addressId = addressRes.rows[0].id;
    const orderNumber = generateOrderNumber();

    const orderRes = await pool.query(`
      INSERT INTO orders (
        user_id, order_number, address_id, subtotal, tax,
        shipping_cost, total_amount, payment_method, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `, [
      userId,
      orderNumber,
      addressId,
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      paymentMethod,
      'confirmed'
    ]);

    const order = orderRes.rows[0];

    for (const item of orderItems) {
      await pool.query(`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_image,
          quantity, price, subtotal
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      `, [
        order.id,
        item.productId,
        item.productName,
        item.imageUrl,
        item.quantity,
        item.price,
        item.subtotal
      ]);
    }

    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

    await pool.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order.id,
        orderNumber: order.order_number,
        totalAmount: order.total_amount
      }
    });

  } catch (error) {
    await pool.query('ROLLBACK');
    next(error);
  }
};
