import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, Verified } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import Button from '../common/Button';

const BusinessCard = ({ business, index = 0 }) => {
  const navigate = useNavigate();

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

  const isOpen = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false });
    
    const todayHours = business.hours?.[currentDay];
    if (!todayHours || todayHours === 'Closed' || todayHours === '24 Hours') {
      return todayHours === '24 Hours';
    }
    
    // Simple time check (would need more robust parsing in real app)
    return true;
  };

  const handleCall = (e) => {
    e.stopPropagation();
    window.open(`tel:${business.phone}`, '_self');
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    window.open(`https://wa.me/${business.whatsapp?.replace('+', '')}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        onClick={() => navigate(`/business/${business.id}`)}
        className="cursor-pointer group overflow-hidden"
        hover={true}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={business.images?.[0] || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={business.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {business.verified && (
              <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <Verified className="w-3 h-3 mr-1" />
                Verified
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isOpen() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isOpen() ? 'Open' : 'Closed'}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{business.rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
              {business.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{business.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {business.description}
          </p>

          {/* Services */}
          {business.services && business.services.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {business.services.slice(0, 2).map((service) => (
                  <span
                    key={service}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {business.services.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{business.services.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {business.tags && business.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {business.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-50 text-primary-700 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Rating & Reviews */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(business.rating)}
              </div>
              <span className="text-sm text-gray-600">
                ({business.reviewCount})
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {business.phone && (
                <Button
                  onClick={handleCall}
                  variant="ghost"
                  size="sm"
                  icon={Phone}
                  className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                />
              )}
              {business.pricing && (
                <span className="text-sm font-medium text-gray-900">
                  {business.pricing}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BusinessCard;