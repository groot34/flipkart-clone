import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import { orderAPI } from '../services/api';
import Header from '../components/common/Header';

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      fetchOrderDetails();
    }
  }, [orderNumber]);

  const fetchOrderDetails = async () => {
    try {
      // In a real app, you'd have an endpoint to fetch by order number
      // For now, we'll just show the order number
      setOrder({ order_number: orderNumber });
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Package className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600 font-medium">Order Number</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-2">
              {orderNumber}
            </p>
            <p className="text-sm text-gray-600">
              Save this number for tracking your order
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start text-left bg-blue-50 p-4 rounded">
              <div className="shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-900">Order Confirmed</p>
                <p className="text-sm text-blue-700">We've received your order</p>
              </div>
            </div>

            <div className="flex items-start text-left bg-gray-50 p-4 rounded">
              <div className="shrink-0 mt-1">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Processing</p>
                <p className="text-sm text-gray-600">Your order is being prepared</p>
              </div>
            </div>

            <div className="flex items-start text-left bg-gray-50 p-4 rounded">
              <div className="shrink-0 mt-1">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Delivery</p>
                <p className="text-sm text-gray-600">Expected in 3-5 business days</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/products"
              className="block w-full bg-[#2874f0] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="block w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded border border-gray-300 transition"
            >
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            You will receive a confirmation email shortly
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;