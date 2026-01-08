# Flipkart Clone - E-commerce Platform

A full-stack e-commerce platform built with modern web technologies, replicating Flipkart's user interface and core functionality.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Assumptions](#assumptions)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

---

## 🎯 Overview

This project is a full-stack e-commerce application that mimics Flipkart's design and functionality. It includes:
- Product browsing and filtering
- Shopping cart management
- Order placement with COD payment
- Category-based navigation
- User-friendly checkout process
- Responsive design for all devices

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 18+ with React Router for navigation
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **Icons**: Lucide React (optimized icon library)
- **HTTP Client**: Axios (API communication)
- **State Management**: React Context API (CartContext)
- **Build Tool**: Vite (fast build tool and dev server)
- **Code Quality**: ESLint

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: Basic (extensible for JWT implementation)

---

## 📁 Project Structure

```
FlipkartClone/
├── backend/
│   ├── src/
│   │   ├── server.js                  # Express server entry point
│   │   ├── config/
│   │   │   └── database.js            # PostgreSQL connection setup
│   │   ├── controllers/
│   │   │   ├── productController.js   # Product business logic
│   │   │   ├── categoryController.js  # Category business logic
│   │   │   ├── cartController.js      # Cart operations
│   │   │   └── orderController.js     # Order management
│   │   ├── routes/
│   │   │   ├── products.js            # Product API routes
│   │   │   ├── categories.js          # Category API routes
│   │   │   ├── cart.js                # Cart API routes
│   │   │   └── orders.js              # Order API routes
│   │   └── middleware/
│   │       └── errorHandler.js        # Global error handling
│   ├── package.json
│   ├── schema.sql                     # Database initialization script
│   └── seed.js                        # Database seeding with sample data
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                   # React entry point
│   │   ├── App.jsx                    # Main app component & routing
│   │   ├── index.css                  # Global styles
│   │   ├── assets/                    # Images and media files
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx         # Navigation header with search
│   │   │   │   ├── CategoryNav.jsx    # Category navigation bar (9 categories)
│   │   │   │   ├── Carousel.jsx       # Auto-rotating banner (4 slides, 4 sec interval)
│   │   │   │   ├── Footer.jsx         # Multi-section footer
│   │   │   │   └── BrandDirectory.jsx # Brand info & services section
│   │   │   └── product/
│   │   │       └── ProductCard.jsx    # Individual product card (Flipkart-exact design)
│   │   ├── context/
│   │   │   └── CartContext.jsx        # Cart state management & persistence
│   │   ├── pages/
│   │   │   ├── HomePage.jsx           # Landing page (hero → categories → carousel → products)
│   │   │   ├── ProductListPage.jsx    # Products listing with filters
│   │   │   ├── ProductDetailPage.jsx  # Detailed product view
│   │   │   ├── CartPage.jsx           # Shopping cart display
│   │   │   ├── CheckoutPage.jsx       # Delivery address & order summary
│   │   │   └── OrderSuccessPage.jsx   # Order confirmation
│   │   ├── services/
│   │       └── api.js                 # Axios API configuration & endpoints
│   │   
│   │       
│   ├── public/                        # Static assets & carousel images
│   ├── package.json
│   ├── vite.config.js                 # Vite build configuration
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── postcss.config.js              # PostCSS configuration
│   └── eslint.config.js               # ESLint configuration

```

---

## 🚀 Setup Instructions

### **Prerequisites**
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn package manager

### **Backend Setup**

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create PostgreSQL database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE flipkart_clone;
   ```

4. **Configure environment variables** (if needed)
   - Update `src/config/database.js` with your PostgreSQL credentials

5. **Initialize database schema**
   ```bash
   psql -U postgres -d flipkart_clone -f schema.sql
   ```

6. **Seed sample data**
   ```bash
   node seed.js
   ```

### **Frontend Setup**

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add carousel images** (Optional)
   - Place 4 banner images in `public/` folder:
     - `image1.png`
     - `image2.png`
     - `image3.png`
     - `image4.png`
   - Recommended size: 1200x400px

---

## ▶️ Running the Application

### **Start Backend Server**
```bash
cd backend
npm start
```
- Server runs on: `http://localhost:5000`
- API endpoints available at: `http://localhost:5000/api`

### **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```
- Application runs on: `http://localhost:5173` (or displayed in terminal)

### **Build Frontend for Production**
```bash
cd frontend
npm run build
```

---

## ✨ Features

### **Product Management**
- ✅ Browse products by category
- ✅ Search functionality
- ✅ Product filtering
- ✅ Detailed product information
- ✅ Product ratings and reviews (basic)
- ✅ Wishlist UI (backend integration pending)

### **Shopping Experience**
- ✅ Add/remove items from cart
- ✅ Real-time cart count update
- ✅ Cart persistence (using React Context)
- ✅ Product quantity selection

### **Checkout Process**
- ✅ Multi-step checkout form
- ✅ Delivery address collection
- ✅ Order summary with pricing breakdown
- ✅ Free shipping for orders > ₹500
- ✅ GST calculation (18%)
- ✅ Cash on Delivery (COD) payment method
- ✅ Order number generation

### **UI/UX Design**
- ✅ Flipkart-exact header design
- ✅ Category navigation with icons
- ✅ Auto-rotating carousel banner
- ✅ Responsive grid layouts
- ✅ Hover effects and animations
- ✅ Loading states
- ✅ Comprehensive footer
- ✅ Mobile-friendly design

---

## 📝 Assumptions

1. **Database Initialization**
   - PostgreSQL is installed and running locally on default port 5432
   - User credentials: `postgres` (or update in `src/config/database.js`)
   - Database name: `flipkart_clone`

2. **API Communication**
   - Backend API runs on `http://localhost:5000`
   - CORS is enabled for localhost
   - API response format follows standard JSON structure

3. **Authentication**
   - Basic user ID (hardcoded as 1) used for order placement
   - Authentication layer can be added later with JWT tokens

4. **Payment Method**
   - Only Cash on Delivery (COD) is implemented
   - Other payment methods can be integrated with payment gateways

5. **Image Hosting**
   - Product images sourced from Amazon direct URLs
   - Fallback mechanism can be added for broken links
   - Carousel requires 4 images in `public/` folder

6. **Browser Support**
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - ES6+ JavaScript support required

7. **Data Assumptions**
   - Products have predefined categories
   - Pricing includes original and discounted amounts
   - Tax calculation: 18% GST on subtotal
   - Shipping: Free for orders > ₹500, ₹40 otherwise

---

## 🔌 API Endpoints

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products?category=:category` - Filter by category
- `GET /api/products?search=:query` - Search products

### **Categories**
- `GET /api/categories` - Get all categories

### **Orders**
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderId` - Get order details

### **Cart** (Frontend-managed via Context API)
- Cart state managed locally in React
- Backend integration available via `/api/cart` endpoints

---

## 🗄️ Database Schema

### **Products Table**
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discounted_price DECIMAL(10, 2),
  discount_percentage INT,
  category_id INT,
  rating DECIMAL(3, 2),
  reviews_count INT,
  in_stock BOOLEAN DEFAULT true
);
```

### **Product Images Table**
```sql
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false
);
```

### **Categories Table**
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE
);
```

### **Orders Table**
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(20) UNIQUE,
  user_id INT,
  total_amount DECIMAL(10, 2),
  shipping_cost DECIMAL(10, 2),
  tax_amount DECIMAL(10, 2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🐛 Troubleshooting

### **Database Connection Error**
- Verify PostgreSQL is running
- Check credentials in `backend/src/config/database.js`
- Ensure `flipkart_clone` database exists

### **Port Already in Use**
- Backend: Change port in `backend/src/server.js`
- Frontend: Vite will prompt to use another port

### **CORS Errors**
- Ensure backend CORS is configured correctly
- Frontend and backend should be on compatible domains

### **Images Not Loading**
- Check product image URLs in database
- Verify Amazon image links are still accessible
- Add carousel images to `frontend/public/`

---

## 📦 Dependencies Overview

### **Frontend Key Dependencies**
- `react`: UI library
- `react-router-dom`: Client-side routing
- `tailwindcss`: Styling framework
- `lucide-react`: Icon library
- `axios`: HTTP client

### **Backend Key Dependencies**
- `express`: Web framework
- `pg`: PostgreSQL client
- `cors`: Cross-origin resource sharing

---

## 🔮 Future Enhancements

- [ ] User authentication with JWT
- [ ] Product reviews and ratings
- [ ] Wishlist functionality (backend)
- [ ] Payment gateway integration (Razorpay, Stripe)
- [ ] Admin dashboard for product management
- [ ] Email notifications for orders
- [ ] Advanced filtering and sorting
- [ ] Product recommendations
- [ ] User profile management
- [ ] Order tracking

---

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

---

## 👤 Author

Flipkart Clone Project - Built with React, Node.js, and PostgreSQL

---

## ❓ Support

For issues and questions:
1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Ensure database is properly initialized
4. Check console logs for detailed error messages

---

**Last Updated**: January 2026
