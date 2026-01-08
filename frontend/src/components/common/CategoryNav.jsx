import React from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Shirt,
  Laptop,
  Sofa,
  Utensils,
  Book,
  Plane,
  ShoppingBag,
  Clock,
} from "lucide-react";

const CategoryNav = () => {
  const categories = [
    { name: "Minutes", slug: "minutes", icon: Clock, badge: "NEW" },
    { name: "Mobiles", slug: "electronics", icon: Smartphone },
    { name: "Fashion", slug: "fashion", icon: Shirt },
    { name: "Electronics", slug: "electronics", icon: Laptop },
    { name: "Home & Kitchen", slug: "home-kitchen", icon: Utensils },
    { name: "Furniture", slug: "home-kitchen", icon: Sofa },
    { name: "Books", slug: "books", icon: Book },
    { name: "Flights", slug: "flights", icon: Plane },
    { name: "Grocery", slug: "home-kitchen", icon: ShoppingBag },
  ];

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm mt-4 ml-3 mr-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center gap-12 px-6 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 min-w-20 group relative hover:scale-105 transition-transform"
              >
                {/* Badge */}
                {cat.badge && (
                  <span className="absolute -top-4 bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {cat.badge}
                  </span>
                )}
                
                {/* Icon */}
                <Icon className="w-10 h-10 text-gray-700 group-hover:text-blue-600 transition" />

                {/* Label */}
                <span className="text-xs font-medium text-gray-800 text-center line-clamp-2">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryNav;
