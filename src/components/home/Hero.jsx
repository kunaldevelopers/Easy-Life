import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { categories, locations } from '../../data/categories';
import Button from '../common/Button';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const navigate = useNavigate();

  const allSubcategories = categories.flatMap(cat => 
    cat.subcategories.map(sub => ({ ...sub, parentCategory: cat.id }))
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedLocation) params.append('location', selectedLocation);
    
    navigate(`/listings?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white text-shadow">
              Find Everything You Need in{' '}
              <span className="text-accent-400">Gangtok</span>
            </h1>
            <p className="text-lg lg:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted local business directory. Discover the best services, restaurants, 
              hotels, and more in your neighborhood.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between bg-white"
                  >
                    <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedCategory ? 
                        allSubcategories.find(sub => sub.id === selectedCategory)?.name : 
                        'All Categories'
                      }
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  {showCategories && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setSelectedCategory('');
                            setShowCategories(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          All Categories
                        </button>
                        {allSubcategories.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setSelectedCategory(sub.id);
                              setShowCategories(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Location Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowLocations(!showLocations)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between bg-white"
                  >
                    <span className={selectedLocation ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedLocation || 'All Locations'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  {showLocations && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setSelectedLocation('');
                            setShowLocations(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          All Locations
                        </button>
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => {
                              setSelectedLocation(location);
                              setShowLocations(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-6">
                <Button
                  onClick={handleSearch}
                  variant="primary"
                  size="lg"
                  icon={Search}
                  className="w-full lg:w-auto lg:px-12"
                >
                  Search Now
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto text-white"
          >
            {[
              { number: '500+', label: 'Local Businesses' },
              { number: '2000+', label: 'Happy Customers' },
              { number: '50+', label: 'Service Categories' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent-400">
                  {stat.number}
                </div>
                <div className="text-green-100 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-white bg-opacity-10 rounded-full" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 bg-accent-400 bg-opacity-20 rounded-full" />
      </div>
    </section>
  );
};

export default Hero;