import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import Header from '../components/common/Header';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const currentImage = images[selectedImage]?.image_url || product.primary_image;

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left: Images with Carousel */}
            <div>
              <div className="sticky top-20">
                {/* Main Image with Carousel Navigation */}
                <div className="relative bg-gray-50 rounded mb-4 flex items-center justify-center h-96 group">
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-opacity duration-300"
                  />
                  
                  {/* Carousel Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* Carousel Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              selectedImage === idx ? 'bg-blue-600 w-6' : 'bg-gray-400'
                            }`}
                            aria-label={`View image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`shrink-0 w-20 h-20 border-2 rounded transition-all ${
                          selectedImage === idx ? 'border-blue-600 scale-105' : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={img.image_url}
                          alt={`${product.name} ${idx + 1}`}
                          className="w-full h-full object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#ff9f00] hover:bg-[#e68f00] text-white font-semibold py-3 px-6 rounded flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    ADD TO CART
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#fb641b] hover:bg-[#e05511] text-white font-semibold py-3 px-6 rounded flex items-center justify-center gap-2 transition"
                  >
                    <Zap className="w-5 h-5" />
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              <h1 className="text-2xl font-medium text-gray-800 mb-2">
                {product.name}
              </h1>
              
              {product.brand && (
                <p className="text-sm text-gray-600 mb-3">Brand: {product.brand}</p>
              )}

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center mb-4">
                  <span className="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center">
                    {product.rating} <Star className="w-4 h-4 ml-1 fill-white" />
                  </span>
                  <span className="text-sm text-gray-600 ml-3">
                    {product.reviews_count?.toLocaleString()} Ratings & Reviews
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-medium text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.original_price && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.original_price.toLocaleString()}
                      </span>
                      <span className="text-lg text-green-600 font-medium">
                        {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-green-600">Free delivery</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock_quantity > 0 ? (
                  <p className="text-green-600 font-medium">In Stock</p>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-gray-300 rounded py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Specifications</h2>
                  <div className="border border-gray-200 rounded">
                    {product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className={`flex py-3 px-4 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        <span className="w-1/3 text-gray-600 font-medium">
                          {spec.spec_key}
                        </span>
                        <span className="w-2/3 text-gray-800">{spec.spec_value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;