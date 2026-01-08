const pool = require("./src/config/database");

const seedData = async () => {
  try {
    console.log("Starting database seed...");

    // 1️⃣ Clear existing data + reset IDs
    await pool.query(`
      TRUNCATE TABLE
        order_items,
        orders,
        cart_items,
        wishlist_items,
        product_specifications,
        product_images,
        products,
        categories,
        addresses,
        users
      RESTART IDENTITY CASCADE
    `);

    // 2️⃣ Insert dummy user (REQUIRED for orders/cart)
    await pool.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, phone)
      VALUES (
        'dummy@flipkart.com',
        'dummy_hash',
        'Dummy',
        'User',
        '9999999999'
      )
    `);

    // 3️⃣ Insert categories
    await pool.query(`
      INSERT INTO categories (name, slug, image_url) VALUES
      ('Electronics', 'electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
      ('Fashion', 'fashion', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'),
      ('Home & Kitchen', 'home-kitchen', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400'),
      ('Books', 'books', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'),
      ('Sports', 'sports', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'),
      ('Gaming', 'gaming', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400'),
      ('Wearables', 'wearables', 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400'),
      ('Appliances', 'appliances', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400'),
      ('Bags & Luggage', 'bags-luggage', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'),
      ('Footwear', 'footwear', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400')
    `);

    // 4️⃣ Insert products
    await pool.query(`
      INSERT INTO products
      (name, description, brand, category_id, price, original_price, discount_percentage, stock_quantity, rating, reviews_count)
      VALUES
      ('iPhone 15 Pro Max', 'Latest Apple flagship with A17 Pro chip, titanium design, and advanced camera system', 'Apple', 1, 134900, 159900, 16, 50, 4.5, 1234),
      ('Samsung Galaxy S24 Ultra', 'Powerful Android phone with S Pen, 200MP camera, and AI features', 'Samsung', 1, 124999, 139999, 11, 45, 4.4, 892),
      ('Sony WH-1000XM5', 'Industry-leading noise cancelling wireless headphones', 'Sony', 1, 29990, 34990, 14, 100, 4.6, 2341),
      ('MacBook Air M3', 'Thin and light laptop with Apple M3 chip', 'Apple', 1, 114900, 134900, 15, 30, 4.7, 567),
      ('Mens Cotton T-Shirt', 'Comfortable cotton t-shirt perfect for everyday wear', 'Brand X', 2, 499, 999, 50, 200, 4.2, 543),
      ('Womens Denim Jeans', 'Stylish high-waist denim jeans', 'Fashion Co', 2, 1299, 2499, 48, 150, 4.3, 321),
      ('Non-Stick Cookware Set', '5-piece premium non-stick cookware set', 'Kitchen Pro', 3, 2999, 4999, 40, 80, 4.5, 234),
      ('Harry Potter Complete Set', 'All 7 books in the Harry Potter series', 'Scholastic', 4, 3499, 4999, 30, 60, 4.8, 1567),
      ('Cricket Bat Professional', 'Professional grade cricket bat', 'SG', 5, 4999, 7999, 38, 25, 4.4, 178),
      ('PlayStation 5 Console', 'Next-gen gaming console with 4K graphics and ultra-fast SSD', 'Sony', 6, 49990, 54990, 9, 35, 4.7, 2145),
      ('Xbox Series X', 'Powerful gaming console with 12 teraflops GPU', 'Microsoft', 6, 49990, 52990, 6, 40, 4.6, 1876),
      ('Nintendo Switch OLED', 'Portable gaming console with vibrant OLED screen', 'Nintendo', 6, 34990, 37990, 8, 55, 4.5, 1432),
      ('Apple Watch Series 9', 'Advanced fitness and health tracking smartwatch', 'Apple', 7, 41900, 45900, 9, 65, 4.6, 987),
      ('Fitbit Charge 6', 'Fitness tracker with heart rate and sleep monitoring', 'Fitbit', 7, 12990, 15990, 19, 120, 4.4, 654),
      ('Samsung Galaxy Watch 6', 'Premium smartwatch with comprehensive health features', 'Samsung', 7, 27990, 31990, 13, 75, 4.5, 543),
      ('Nespresso Coffee Machine', 'Premium espresso maker with capsule system', 'Nespresso', 8, 18990, 22990, 17, 45, 4.6, 432),
      ('Philips Air Fryer XXL', 'Large capacity air fryer for healthy cooking', 'Philips', 8, 14990, 18990, 21, 60, 4.7, 876),
      ('Dyson V15 Vacuum Cleaner', 'Cordless vacuum with laser detection technology', 'Dyson', 8, 54990, 64990, 15, 20, 4.8, 765),
      ('Travel Laptop Backpack', 'Anti-theft backpack with USB charging port', 'Targus', 9, 2499, 3999, 38, 150, 4.3, 432),
      ('Leather Office Bag', 'Professional leather briefcase for executives', 'Hidesign', 9, 5999, 8999, 33, 80, 4.5, 234),
      ('Nike Air Zoom Pegasus', 'Premium running shoes with responsive cushioning', 'Nike', 10, 9995, 12995, 23, 100, 4.6, 1234),
      ('Adidas Ultraboost 22', 'Energy-returning running shoes for all distances', 'Adidas', 10, 14995, 17995, 17, 85, 4.7, 987),
      ('Puma RS-X Sneakers', 'Retro-inspired lifestyle sneakers', 'Puma', 10, 7995, 9995, 20, 120, 4.4, 654)
    `);

    // 5️⃣ Insert product images
    await pool.query(`
      INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES
      -- iPhone 15 Pro Max (1)
      (1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1500', true, 1),
      (1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1500&q=80', false, 2),
      (1, 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=1500', false, 3),

      -- Samsung Galaxy S24 Ultra (2)
      (2, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1500', true, 1),
      (2, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1500', false, 2),
      (2, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1500', false, 3),

      -- Sony WH-1000XM5 (3)
      (3, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1500', true, 1),
      (3, 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=1500', false, 2),
      (3, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1500', false, 3),

      -- MacBook Air M3 (4)
      (4, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1500', true, 1),
      (4, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1500', false, 2),
      (4, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1500', false, 3),

      -- Mens Cotton T-Shirt (5)
      (5, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1500', true, 1),
      (5, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1500', false, 2),
      (5, 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1500', false, 3),

      -- Womens Denim Jeans (6)
      (6, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1500', true, 1),
      (6, 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=1500', false, 2),
      (6, 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=1500', false, 3),

      -- Non-Stick Cookware Set (7)
      (7, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1500', true, 1),
      (7, 'https://images.unsplash.com/photo-1584990347449-39b4c762c2d5?w=1500', false, 2),
      (7, 'https://images.unsplash.com/photo-1565689066444-2e2e8f5f8a9d?w=1500', false, 3),

      -- Harry Potter Complete Set (8)
      (8, 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=1500', true, 1),
      (8, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1500', false, 2),
      (8, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1500', false, 3),

      -- Cricket Bat Professional (9)
      (9, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1500', true, 1),
      (9, 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1500', false, 2),
      (9, 'https://images.unsplash.com/photo-1593766787879-e8c78e09cec8?w=1500', false, 3),

      -- PlayStation 5 Console (10)
      (10, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1500', true, 1),
      (10, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=1500', false, 2),
      (10, 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=1500', false, 3),

      -- Xbox Series X (11)
      (11, 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=1500', true, 1),
      (11, 'https://images.unsplash.com/photo-1621259183008-a9f5a5f7e5e9?w=1500', false, 2),
      (11, 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1500', false, 3),

      -- Nintendo Switch OLED (12)
      (12, 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=1500', true, 1),
      (12, 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=1500', false, 2),
      (12, 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1500', false, 3),

      -- Apple Watch Series 9 (13)
      (13, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1500', true, 1),
      (13, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1500', false, 2),
      (13, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1500', false, 3),

      -- Fitbit Charge 6 (14)
      (14, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1500', true, 1),
      (14, 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=1500', false, 2),
      (14, 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=1500', false, 3),

      -- Samsung Galaxy Watch 6 (15)
      (15, 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=1500', true, 1),
      (15, 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=1500', false, 2),
      (15, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1500', false, 3),

      -- Nespresso Coffee Machine (16)
      (16, 'https://images.unsplash.com/photo-1556909190-3d11aade22bb?w=1500', true, 1),
      (16, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1500', false, 2),
      (16, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1500', false, 3),

      -- Philips Air Fryer XXL (17)
      (17, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=1500', true, 1),
      (17, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1500', false, 2),
      (17, 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1500', false, 3),

      -- Dyson V15 Vacuum Cleaner (18)
      (18, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1500', true, 1),
      (18, 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1500', false, 2),
      (18, 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1500', false, 3),

      -- Travel Laptop Backpack (19)
      (19, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1500', true, 1),
      (19, 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1500', false, 2),
      (19, 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=1500', false, 3),

      -- Leather Office Bag (20)
      (20, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1500', true, 1),
      (20, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1500', false, 2),
      (20, 'https://images.unsplash.com/photo-1624629656892-1c44f533e0e3?w=1500', false, 3),

      -- Nike Air Zoom Pegasus (21)
      (21, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1500', true, 1),
      (21, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1500', false, 2),
      (21, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1500', false, 3),

      -- Adidas Ultraboost 22 (22)
      (22, 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=1500', true, 1),
      (22, 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1500', false, 2),
      (22, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1500', false, 3),

      -- Puma RS-X Sneakers (23)
      (23, 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1500', true, 1),
      (23, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1500', false, 2),
      (23, 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=1500', false, 3)
    `);

    // 6️⃣ Insert product specifications (multi-line descriptions)
    await pool.query(`
      INSERT INTO product_specifications (product_id, spec_key, spec_value) VALUES

      (1, 'Processor', 'Powered by A17 Pro chip for extreme performance'),
      (1, 'Design', 'Premium titanium design with durable glass back'),
      (1, 'Camera', 'Advanced triple camera system with Pro photography'),
      (1, 'Display', '6.7-inch Super Retina XDR display'),
      (1, 'Security', 'Face ID with enhanced privacy features'),

      (2, 'Camera', '200MP professional-grade camera system'),
      (2, 'S Pen', 'Built-in S Pen for productivity and creativity'),
      (2, 'AI Features', 'Galaxy AI for smarter photos and text'),
      (2, 'Display', '6.8-inch Dynamic AMOLED 2X display'),
      (2, 'Build', 'Armor aluminum frame with Gorilla Glass'),

      (3, 'Noise Cancellation', 'Industry-leading noise cancellation with Auto NC Optimizer'),
      (3, 'Battery Life', 'Up to 30 hours battery life with quick charging'),
      (3, 'Connectivity', 'Bluetooth 5.2 with multipoint connection'),
      (3, 'Audio Quality', 'Integrated Processor V1 delivers premium sound'),
      (3, 'Comfort', 'Ultra-lightweight design with soft-fit leather'),

      (4, 'Processor', 'Apple M3 chip with next-gen performance'),
      (4, 'Battery Life', 'Up to 18 hours of battery life'),
      (4, 'Display', '13.6-inch Liquid Retina display'),
      (4, 'Keyboard', 'Magic Keyboard with Touch ID'),
      (4, 'Build', 'Silent fanless design'),

      (5, 'Material', '100% breathable cotton fabric'),
      (5, 'Fit', 'Regular fit suitable for daily wear'),
      (5, 'Comfort', 'Soft-touch fabric for all-day comfort'),
      (5, 'Care', 'Machine washable and durable'),
      (5, 'Usage', 'Perfect for casual and outdoor wear'),

      (6, 'Fit', 'High-waist slim-fit design'),
      (6, 'Material', 'Premium stretch denim fabric'),
      (6, 'Style', 'Modern look suitable for all occasions'),
      (6, 'Comfort', 'Flexible waistband for comfort'),
      (6, 'Durability', 'Fade-resistant stitching'),

      (7, 'Coating', 'Premium non-stick coating'),
      (7, 'Compatibility', 'Suitable for gas and induction'),
      (7, 'Handles', 'Heat-resistant ergonomic handles'),
      (7, 'Cleaning', 'Easy to clean and dishwasher safe'),
      (7, 'Set', 'Includes 5 essential cookware items'),

      (8, 'Collection', 'Complete set of all 7 Harry Potter books'),
      (8, 'Author', 'Written by J.K. Rowling'),
      (8, 'Binding', 'Paperback box set'),
      (8, 'Language', 'English edition'),
      (8, 'Audience', 'Suitable for all age groups'),

      (9, 'Grade', 'Professional-grade English willow'),
      (9, 'Sweet Spot', 'Mid-blade sweet spot for power shots'),
      (9, 'Grip', 'Premium anti-slip handle grip'),
      (9, 'Usage', 'Ideal for leather ball cricket'),
      (9, 'Balance', 'Well-balanced for controlled shots'),

      (10, 'Graphics', '4K gaming at up to 120fps'),
      (10, 'Storage', 'Ultra-fast 825GB SSD'),
      (10, 'Audio', 'Tempest 3D AudioTech for immersive sound'),
      (10, 'Controller', 'DualSense wireless controller with haptic feedback'),
      (10, 'Ray Tracing', 'Hardware-accelerated ray tracing'),

      (11, 'Power', '12 teraflops GPU performance'),
      (11, 'Storage', '1TB custom NVMe SSD'),
      (11, 'Resolution', 'True 4K gaming experience'),
      (11, 'FPS', 'Up to 120 frames per second'),
      (11, 'Compatibility', 'Backward compatible with Xbox games'),

      (12, 'Display', '7-inch OLED screen with vivid colors'),
      (12, 'Portability', 'Handheld and docked gaming modes'),
      (12, 'Storage', '64GB internal storage expandable'),
      (12, 'Battery', 'Up to 9 hours of gaming'),
      (12, 'Controllers', 'Detachable Joy-Con controllers'),

      (13, 'Display', 'Always-On Retina display'),
      (13, 'Health', 'Blood oxygen and ECG monitoring'),
      (13, 'Fitness', 'Advanced workout metrics tracking'),
      (13, 'Chip', 'Powerful S9 SiP chip'),
      (13, 'Battery', 'All-day 18-hour battery life'),

      (14, 'Heart Rate', 'Continuous heart rate monitoring'),
      (14, 'Sleep', 'Advanced sleep tracking features'),
      (14, 'GPS', 'Built-in GPS for outdoor activities'),
      (14, 'Battery', '7+ days battery life'),
      (14, 'Water Resistance', '5ATM water resistant'),

      (15, 'Display', '1.5-inch Super AMOLED display'),
      (15, 'Health', 'Body composition and sleep analysis'),
      (15, 'Fitness', 'Auto workout detection'),
      (15, 'Battery', 'Up to 40 hours battery life'),
      (15, 'Connectivity', 'LTE and Bluetooth options'),

      (16, 'System', 'Nespresso capsule brewing system'),
      (16, 'Pressure', '19-bar pressure for perfect espresso'),
      (16, 'Capacity', 'Large 1.8L water tank'),
      (16, 'Heating', 'Fast 25-second heat-up time'),
      (16, 'Cleaning', 'Auto-cleaning and descaling alerts'),

      (17, 'Capacity', 'XXL family-size 7.3L capacity'),
      (17, 'Technology', 'Rapid Air Technology for crispy results'),
      (17, 'Temperature', 'Adjustable temperature up to 200°C'),
      (17, 'Timer', 'Digital timer up to 60 minutes'),
      (17, 'Dishwasher', 'Dishwasher-safe removable parts'),

      (18, 'Suction', '230AW powerful suction'),
      (18, 'Detection', 'Laser dust detection technology'),
      (18, 'Battery', '60 minutes runtime on single charge'),
      (18, 'Filtration', 'Advanced HEPA filtration system'),
      (18, 'Display', 'LCD screen shows real-time performance'),

      (19, 'Capacity', 'Fits up to 17-inch laptop'),
      (19, 'USB Port', 'Built-in USB charging port'),
      (19, 'Security', 'Anti-theft hidden zippers'),
      (19, 'Material', 'Water-resistant polyester fabric'),
      (19, 'Comfort', 'Padded shoulder straps and back panel'),

      (20, 'Material', 'Premium full-grain leather'),
      (20, 'Compartments', 'Multiple organized compartments'),
      (20, 'Laptop', 'Padded laptop sleeve up to 15 inches'),
      (20, 'Hardware', 'High-quality metal hardware'),
      (20, 'Style', 'Professional executive design'),

      (21, 'Cushioning', 'Nike Air Zoom units for responsive feel'),
      (21, 'Upper', 'Engineered mesh for breathability'),
      (21, 'Fit', 'Secure midfoot band for stability'),
      (21, 'Outsole', 'Durable rubber with waffle pattern'),
      (21, 'Usage', 'Ideal for daily training and racing'),

      (22, 'Technology', 'Boost midsole for energy return'),
      (22, 'Upper', 'Primeknit+ textile for adaptive fit'),
      (22, 'Support', 'Linear Energy Push system'),
      (22, 'Traction', 'Continental rubber outsole'),
      (22, 'Sustainability', 'Made with recycled materials'),

      (23, 'Design', 'Retro-inspired chunky silhouette'),
      (23, 'Cushioning', 'RS technology for comfort'),
      (23, 'Upper', 'Mix of mesh and leather materials'),
      (23, 'Sole', 'Thick rubber outsole for durability'),
      (23, 'Style', 'Bold lifestyle sneaker design')
    `);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();