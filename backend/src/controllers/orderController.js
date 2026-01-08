const pool = require('../config/database');

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD${timestamp}${random}`;
};

exports.createOrder = async (req, res, next) => {
  const client = await pool.connect();
  
  try {
    const { 
      userId = 1, 
      items, 
      shippingAddress, 
      paymentMethod = 'COD' 
    } = req.body;
    
    await client.query('BEGIN');
    
    // Calculate totals
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await client.query(
        'SELECT id, name, price, stock_quantity FROM products WHERE id = $1',
        [item.productId]
      );
      
      if (product.rows.length === 0) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      const productData = product.rows[0];
      
      if (productData.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${productData.name}`);
      }
      
      const itemTotal = productData.price * item.quantity;
      subtotal += itemTotal;
      
      orderItems.push({
        productId: productData.id,
        productName: productData.name,
        price: productData.price,
        quantity: item.quantity,
        subtotal: itemTotal,
        imageUrl: item.imageUrl || null
      });
      
      // Update stock
      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, productData.id]
      );
    }
    
    const tax = subtotal * 0.18; // 18% GST
    const shippingCost = subtotal > 500 ? 0 : 40;
    const totalAmount = subtotal + tax + shippingCost;
    
    // Create address
    const addressResult = await client.query(`
      INSERT INTO addresses (
        user_id, full_name, phone, address_line1, address_line2, 
        city, state, pincode
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
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
    
    const addressId = addressResult.rows[0].id;
    
    // Create order
    const orderNumber = generateOrderNumber();
    const orderResult = await client.query(`
      INSERT INTO orders (
        user_id, order_number, address_id, subtotal, tax, 
        shipping_cost, total_amount, payment_method, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *
    `, [
      userId, orderNumber, addressId, subtotal, tax,
      shippingCost, totalAmount, paymentMethod, 'confirmed'
    ]);
    
    const order = orderResult.rows[0];
    
    // Create order items
    for (const item of orderItems) {
      await client.query(`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_image,
          quantity, price, subtotal
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
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
    
    // Clear cart
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
    
    await client.query('COMMIT');
    
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
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const orderResult = await pool.query(`
      SELECT 
        o.*,
        a.full_name, a.phone, a.address_line1, a.address_line2,
        a.city, a.state, a.pincode
      FROM orders o
      LEFT JOIN addresses a ON o.address_id = a.id
      WHERE o.id = $1
    `, [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    const itemsResult = await pool.query(`
      SELECT * FROM order_items WHERE order_id = $1
    `, [id]);
    
    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };
    
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId || 1;
    
    const result = await pool.query(`
      SELECT 
        o.id,
        o.order_number,
        o.total_amount,
        o.status,
        o.created_at,
        COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [userId]);
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
};