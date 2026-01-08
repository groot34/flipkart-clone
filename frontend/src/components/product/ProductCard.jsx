import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productImage =
    product.primary_image || product.images?.[0]?.image_url;

  const discountPercent = product.original_price
    ? Math.round(
        ((product.original_price - product.price) /
          product.original_price) *
          100
      )
    : 0;

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative">

        {/* Discount badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-20">
            {discountPercent}% off
          </div>
        )}

        {/* Wishlist Heart - Top Right */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            className={`w-6 h-6 transition-all ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "fill-gray-300 text-gray-300 hover:fill-red-500 hover:text-red-500"
            }`}
          />
        </button>

        {/* Image Container */}
        <div className="h-56 flex items-center justify-center bg-gray-50 overflow-hidden">
          {!imgError && productImage ? (
            <img
              src={productImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="text-gray-400 text-sm">Image unavailable</div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-3">
          {/* Name */}
          <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 mb-2 group-hover:text-blue-600 transition">
            {product.name}
          </h3>

          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
          )}

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold flex items-center">
                {product.rating}
                <Star className="w-2.5 h-2.5 ml-0.5 fill-white" />
              </span>
              <span className="text-xs text-gray-600">
                ({product.reviews_count?.toLocaleString()})
              </span>
            </div>
          )}

          {/* Price Section */}
          <div className="mb-1">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.original_price && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{product.original_price.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs text-green-600 font-semibold">
                  {discountPercent}% off
                </span>
              )}
            </div>
          </div>

          {/* Free Delivery */}
          <p className="text-xs text-green-700 font-medium">Free delivery</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
