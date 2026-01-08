import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Header from '../components/common/Header';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items to get started</p>
          <Link
            to="/products"
            className="inline-block bg-[#2874f0] text-white px-8 py-3 rounded hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart ({cartItems.length} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded shadow p-4">
                <div className="flex gap-4">
                  <img
                    src={item.primary_image || item.images?.[0]?.image_url || 'https://via.placeholder.com/120'}
                    alt={item.name}
                    className="w-28 h-28 object-contain"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                    {item.brand && (
                      <p className="text-sm text-gray-600 mb-2">Brand: {item.brand}</p>
                    )}
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xl font-semibold">₹{item.price.toLocaleString()}</span>
                      {item.original_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.original_price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded shadow p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 uppercase">Price Details</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price ({cartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#fb641b] hover:bg-[#e05511] text-white font-semibold py-3 rounded transition"
              >
                PLACE ORDER
              </button>

              {shipping > 0 && (
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Add ₹{(500 - subtotal).toFixed(2)} more for FREE delivery
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;