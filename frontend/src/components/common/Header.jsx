
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, MoreVertical } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start shrink-0">
            <span className="text-blue-600 font-bold text-xl italic">Flipkart</span>
            <div className="flex items-baseline space-x-0.5 italic">
              <span className="text-xs text-gray-600 font-bold">Explore</span>
              <span className="text-yellow-500 text-xs font-medium">Plus</span>
              <span className="text-gray-400 text-xs">⚡</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-3 rounded text-sm bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center space-x-8">
            {/* Login */}
            <button className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition">
              <User className="w-6 h-6" />
              <span className="text-sm font-medium">Login</span>
            </button>
            
            {/* Cart */}
            <Link to="/cart" className="flex items-center space-x-1 text-gray-800 hover:text-blue-600 transition relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm font-medium">Cart</span>
              {getCartCount() > 0 && (
                <span className="ml-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Become a Seller */}
            <Link to="#" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition whitespace-nowrap">
              <span className="text-sm font-medium">Become a Seller</span>
            </Link>

            {/* Menu */}
            <button className="text-gray-800 hover:text-blue-600 transition p-1">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;