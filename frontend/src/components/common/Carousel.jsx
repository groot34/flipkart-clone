import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/image1.png',
    '/image2.png',
    '/image3.png',
    '/image4.png'
  ];

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
<div className="w-full bg-white relative group">
  {/* Main Carousel */}
  <div className="w-full h-[220px] md:h-[260px] lg:h-[320px] overflow-hidden relative">
    <div className="relative w-full h-full">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'translate-x-0 opacity-100'
              : index < currentSlide
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0'
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/1200x400?text=Banner+${index + 1}`;
            }}
          />
        </div>
      ))}
    </div>

    {/* Prev */}
    <button
      onClick={goToPrevious}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow p-2 rounded-full opacity-0 group-hover:opacity-100"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>

    {/* Next */}
    <button
      onClick={goToNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow p-2 rounded-full opacity-0 group-hover:opacity-100"
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  </div>

  {/* Dots */}
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`transition-all ${
          index === currentSlide
            ? 'bg-gray-800 w-6 h-2 rounded-full'
            : 'bg-gray-400 w-2 h-2 rounded-full'
        }`}
      />
    ))}
  </div>
</div>

  );
};

export default Carousel;
