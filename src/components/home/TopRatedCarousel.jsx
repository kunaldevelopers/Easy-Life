import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import { topRatedBusinesses } from "../../data/businesses";
import Card from "../common/Card";
import Button from "../common/Button";

const TopRatedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const navigate = useNavigate();

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet: 2 cards
      } else {
        setItemsPerSlide(3); // Desktop: 3 cards
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % Math.ceil(topRatedBusinesses.length / itemsPerSlide)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerSlide]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(topRatedBusinesses.length / itemsPerSlide)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(topRatedBusinesses.length / itemsPerSlide) - 1
        : prevIndex - 1
    );
  };

  const getVisibleBusinesses = () => {
    const startIndex = currentIndex * itemsPerSlide;
    return topRatedBusinesses.slice(startIndex, startIndex + itemsPerSlide);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Hot Deals Today
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover highly rated local businesses trusted by our community
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`grid gap-4 sm:gap-6 ${
                  itemsPerSlide === 1
                    ? "grid-cols-1"
                    : itemsPerSlide === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {getVisibleBusinesses().map((business) => (
                  <Card
                    key={business.id}
                    onClick={() => navigate(`/business/${business.id}`)}
                    className="cursor-pointer group"
                    hover={true}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={business.images[0]}
                        alt={business.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {business.verified && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Verified
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                          {business.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {renderStars(business.rating)}
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{business.location}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {business.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {business.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-primary-50 text-primary-700 text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-500 mb-1">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            <span className="font-medium">
                              {business.rating}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {business.reviewCount} reviews
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:-left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-10 border border-gray-200 hover:border-primary-300 hover:bg-primary-50"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800 hover:text-primary-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:-right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-10 border border-gray-200 hover:border-primary-300 hover:bg-primary-50"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800 hover:text-primary-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {Array.from(
              { length: Math.ceil(topRatedBusinesses.length / itemsPerSlide) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                    i === currentIndex
                      ? "bg-primary-600 shadow-lg"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                />
              )
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/listings")}
            variant="primary"
            size="lg"
          >
            View All Businesses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedCarousel;
