import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import Header from '../components/common/Header';
import CategoryNav from '../components/common/CategoryNav';
import Carousel from '../components/common/Carousel';
import BrandDirectory from '../components/common/BrandDirectory';
import Footer from '../components/common/Footer';
import { ChevronRight, Package } from 'lucide-react';

// Fallback placeholder SVG component
const ImageFallback = ({ text = 'No Image' }) => (
  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
    <div className="text-center">
      <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  </div>
);

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        categoryAPI.getAll(),
        productAPI.getAll({ limit: 8 })
      ]);
      
      setCategories(categoriesRes.data.data || []);
      setFeaturedProducts(productsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Category Navigation */}
      <CategoryNav />
      
      {/* Carousel Banner - Full Width */}
      <Carousel />
      
      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Shop by Category</h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition group"
              >
                {category.image_url && (
                  <div className="mb-4 overflow-hidden rounded">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                  {category.name}
                </h3>
                {category.product_count > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {category.product_count} items
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link
            to="/products"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                All products are carefully selected and quality checked
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with regular discounts and offers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Directory & Info Section */}
      <BrandDirectory />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        {/* <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Flipkart Clone. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            Built for SDE Internship Assignment
          </p>
        </div> */}
      <Footer/>
      </footer>
    </div>
  );
};

export default HomePage;