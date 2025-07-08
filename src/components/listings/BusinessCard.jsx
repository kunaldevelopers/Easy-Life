import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Verified, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Card from "../common/Card";
import Button from "../common/Button";

const BusinessCard = ({ business, index = 0 }) => {
  const navigate = useNavigate();

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

  const isOpen = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
    const currentTime = now.toLocaleTimeString("en-US", { hour12: false });

    const todayHours = business.hours?.[currentDay];
    if (!todayHours || todayHours === "Closed" || todayHours === "24 Hours") {
      return todayHours === "24 Hours";
    }

    // Simple time check (would need more robust parsing in real app)
    return true;
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    window.open(
      `https://wa.me/${business.whatsapp?.replace("+", "")}`,
      "_blank"
    );
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/book/${business.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        onClick={() => navigate(`/business/${business.id}`)}
        className="cursor-pointer group overflow-hidden h-full flex flex-col"
        hover={true}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={
              business.images?.[0] ||
              "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
            alt={business.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {business.verified && (
              <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center shadow-sm">
                <Verified className="w-3 h-3 mr-1" />
                Verified
              </span>
            )}
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full shadow-sm flex items-center justify-center ${
                isOpen()
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isOpen() ? "Open" : "Closed"}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white bg-opacity-95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{business.rating}</span>
          </div>

          {/* Book Now Button - Appears on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleBookNow}
              variant="primary"
              icon={Calendar}
              className="px-6 py-2 shadow-lg"
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Content Section - Flex grow to fill remaining space */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Header - Fixed height */}
          <div className="mb-3 flex-shrink-0">
            <h3
              className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors mb-1.5 line-clamp-1 leading-tight"
              title={business.name}
            >
              {business.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{business.location}</span>
            </div>
          </div>

          {/* Description - Fixed height */}
          <div className="mb-4 flex-shrink-0">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 min-h-[2.75rem]">
              {business.description}
            </p>
          </div>

          {/* Services & Tags - Flexible space */}
          <div className="flex-grow space-y-3 min-h-[3rem]">
            {/* Services */}
            {business.services && business.services.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {business.services.slice(0, 2).map((service) => (
                    <span
                      key={service}
                      className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full truncate max-w-[8rem]"
                      title={service}
                    >
                      {service}
                    </span>
                  ))}
                  {business.services.length > 2 && (
                    <span className="text-xs text-gray-500 px-1 py-1">
                      +{business.services.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {business.tags && business.tags.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {business.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full truncate max-w-[8rem]"
                      title={tag}
                    >
                      {tag}
                    </span>
                  ))}
                  {business.tags.length > 2 && (
                    <span className="text-xs text-primary-600 px-1 py-1">
                      +{business.tags.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
            {/* Rating & Reviews */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <div className="flex items-center space-x-0.5">
                {renderStars(business.rating)}
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                ({business.reviewCount})
              </span>
            </div>

            {/* Single Price */}
            {business.pricing && (
              <div className="flex-shrink-0">
                <span className="text-sm font-medium text-gray-900">
                  {business.pricing.split(" - ")[0] || business.pricing}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BusinessCard;
