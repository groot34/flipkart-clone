const pool = require('../config/database');

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.params.userId || 1; // Default user for assignment
    
    const result = await pool.query(`
      SELECT 
        ci.id,
        ci.quantity,
        p.id as product_id,
        p.name,
        p.price,
        p.stock_quantity,
        pi.image_url
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE ci.user_id = $1
      ORDER BY ci.created_at DESC
    `, [userId]);
    
    const cartItems = result.rows;
    const subtotal = cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    
    res.json({ 
      success: true, 
      data: {
        items: cartItems,
        subtotal,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { userId = 1, productId, quantity = 1 } = req.body;
    
    // Check if product exists and has stock
    const productCheck = await pool.query(
      'SELECT stock_quantity FROM products WHERE id = $1',
      [productId]
    );
    
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    if (productCheck.rows[0].stock_quantity < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock' 
      });
    }
    
    // Check if item already in cart
    const existingItem = await pool.query(
      'SELECT id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
    
    let result;
    if (existingItem.rows.length > 0) {
      // Update quantity
      const newQuantity = existingItem.rows[0].quantity + quantity;
      result = await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
        [newQuantity, existingItem.rows[0].id]
      );
    } else {
      // Insert new item
      result = await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [userId, productId, quantity]
      );
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Item added to cart',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be at least 1' 
      });
    }
    
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart item not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Cart updated',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM cart_items WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart item not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Item removed from cart' 
    });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const userId = req.params.userId || 1;
    
    await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1',
      [userId]
    );
    
    res.json({ 
      success: true, 
      message: 'Cart cleared' 
    });
  } catch (error) {
    next(error);
  }
};