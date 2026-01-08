const pool = require('../config/database');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sort = 'id', order = 'ASC' } = req.query;
    
    let query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        pi.image_url as primary_image,
        COALESCE(
          json_agg(
            json_build_object('id', pi2.id, 'image_url', pi2.image_url, 'display_order', pi2.display_order)
            ORDER BY pi2.display_order
          ) FILTER (WHERE pi2.id IS NOT NULL), 
          '[]'
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      LEFT JOIN product_images pi2 ON p.id = pi2.product_id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 1;

    if (search) {
      query += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (category) {
      query += ` AND c.slug = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (minPrice) {
      query += ` AND p.price >= $${paramCount}`;
      params.push(minPrice);
      paramCount++;
    }

    if (maxPrice) {
      query += ` AND p.price <= $${paramCount}`;
      params.push(maxPrice);
      paramCount++;
    }

    query += ` GROUP BY p.id, c.name, c.slug, pi.image_url`;
    query += ` ORDER BY p.${sort} ${order}`;

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productQuery = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        COALESCE(
          json_agg(
            json_build_object('id', pi.id, 'image_url', pi.image_url, 'is_primary', pi.is_primary, 'display_order', pi.display_order)
            ORDER BY pi.display_order
          ) FILTER (WHERE pi.id IS NOT NULL), 
          '[]'
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.id = $1
      GROUP BY p.id, c.name, c.slug
    `;

    const specsQuery = `
      SELECT spec_key, spec_value
      FROM product_specifications
      WHERE product_id = $1
      ORDER BY id
    `;

    const [productResult, specsResult] = await Promise.all([
      pool.query(productQuery, [id]),
      pool.query(specsQuery, [id])
    ]);

    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = {
      ...productResult.rows[0],
      specifications: specsResult.rows
    };

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};