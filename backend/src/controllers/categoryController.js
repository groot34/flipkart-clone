const pool = require('../config/database');

exports.getAllCategories = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.*,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.name
    `);
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM categories WHERE slug = $1',
      [slug]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};