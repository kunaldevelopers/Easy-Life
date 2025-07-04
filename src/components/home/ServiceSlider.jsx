import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Wrench,
  Zap,
  Droplets,
  Hammer,
  Palette,
  Shield,
  Settings,
} from "lucide-react";
import { businesses } from "../../data/businesses";
import Card from "../common/Card";
import Button from "../common/Button";

// Icon mapping for different service categories
const categoryIcons = {
  electrician: Zap,
  plumber: Droplets,
  carpenter: Hammer,
  painter: Palette,
  "cctv-services": Shield,
  "electronic-repair": Settings,
  default: Wrench,
};

// Category display names
const categoryNames = {
  electrician: "Electrician",
  plumber: "Plumber",
  carpenter: "Carpenter",
  painter: "Painter",
  "cctv-services": "CCTV Services",
  "electronic-repair": "Electronic Repair",
};

const ServiceSlider = ({
  title = "Best Services",
  description = "Top-rated services in Gangtok",
  selectedCategory = "electrician",
  maxItems = 10,
  isRandomized = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const navigate = useNavigate();

  // Get the appropriate icon for the category
  const CategoryIcon = categoryIcons[selectedCategory] || categoryIcons.default;
  const categoryDisplayName =
    categoryNames[selectedCategory] ||
    selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  // Filter businesses based on selected category
  const getFilteredBusinesses = () => {
    let filtered = businesses.filter((business) => {
      if (business.category === "services") {
        return (
          business.subcategory === selectedCategory ||
          business.name.toLowerCase().includes(selectedCategory) ||
          business.services?.some((service) =>
            service.toLowerCase().includes(selectedCategory.replace("-", " "))
          ) ||
          business.description
            .toLowerCase()
            .includes(selectedCategory.replace("-", " "))
        );
      }
      return false;
    });

    // Apply randomization if enabled
    if (isRandomized) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    // Limit to maxItems
    return filtered.slice(0, maxItems);
  };

  const serviceBusinesses = getFilteredBusinesses();

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
    if (!isAutoPlaying || serviceBusinesses.length <= itemsPerSlide) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % Math.ceil(serviceBusinesses.length / itemsPerSlide)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerSlide, serviceBusinesses.length]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(serviceBusinesses.length / itemsPerSlide)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(serviceBusinesses.length / itemsPerSlide) - 1
        : prevIndex - 1
    );
  };

  const handleViewBusiness = (businessId) => {
    navigate(`/business/${businessId}`);
  };

  const handleViewAll = () => {
    navigate(`/listings?category=services&subcategory=${selectedCategory}`);
  };

  const getCurrentSlideBusinesses = () => {
    const startIndex = currentIndex * itemsPerSlide;
    return serviceBusinesses.slice(startIndex, startIndex + itemsPerSlide);
  };

  if (serviceBusinesses.length === 0) {
    return null; // Don't render if no businesses found
  }

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <CategoryIcon className="w-8 h-8 text-yellow-500 mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {getCurrentSlideBusinesses().map((business, index) => (
                <Card
                  key={business.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100 overflow-hidden"
                >
                  {/* Business Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        business.images?.[0] ||
                        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800"
                      }
                      alt={business.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {categoryDisplayName}
                      </span>
                    </div>
                    {business.verified && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(business.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {business.rating}
                      </span>
                      <span className="ml-1 text-xs text-gray-500">
                        ({business.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Business Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {business.name}
                    </h3>

                    {/* Services */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {business.services?.slice(0, 2).map((service, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {service}
                          </span>
                        ))}
                        {business.services?.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{business.services.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{business.location}</span>
                    </div>

                    {/* Pricing */}
                    {business.pricing && (
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-green-600">
                          {business.pricing}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleViewBusiness(business.id)}
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() =>
                          window.open(`tel:${business.phone}`, "_self")
                        }
                        variant="outline"
                        size="sm"
                        icon={Phone}
                        className="flex-shrink-0"
                      >
                        Call
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {serviceBusinesses.length > itemsPerSlide && (
            <>
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
            </>
          )}

          {/* Dots Indicator */}
          {serviceBusinesses.length > itemsPerSlide && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from(
                { length: Math.ceil(serviceBusinesses.length / itemsPerSlide) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? "bg-primary-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            onClick={handleViewAll}
            variant="outline"
            size="lg"
            className="px-8 py-3"
          >
            View All {categoryDisplayName}s
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSlider;
