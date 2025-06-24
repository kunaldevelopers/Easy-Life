import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import { topRatedBusinesses } from '../../data/businesses';
import Card from '../common/Card';
import Button from '../common/Button';

const TopRatedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % Math.ceil(topRatedBusinesses.length / 3)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % Math.ceil(topRatedBusinesses.length / 3)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(topRatedBusinesses.length / 3) - 1 : prevIndex - 1
    );
  };

  const getVisibleBusinesses = () => {
    const startIndex = currentIndex * 3;
    return topRatedBusinesses.slice(startIndex, startIndex + 3);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Rated Businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                            <span className="font-medium">{business.rating}</span>
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(topRatedBusinesses.length / 3) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate('/listings')}
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