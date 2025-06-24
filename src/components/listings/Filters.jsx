import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, Star } from "lucide-react";
import { categories, locations } from "../../data/categories";
import Button from "../common/Button";

const Filters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle,
  isMobile = false,
}) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    location: true,
    rating: true,
    features: true,
  });

  const allSubcategories = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      ...sub,
      parentCategory: cat.id,
      parentName: cat.name,
    }))
  );

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];

    handleFilterChange("categories", newCategories);
  };

  const handleLocationChange = (location) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((loc) => loc !== location)
      : [...filters.locations, location];

    handleFilterChange("locations", newLocations);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getActiveFiltersCount = () => {
    return (
      filters.categories.length +
      filters.locations.length +
      (filters.minRating ? 1 : 0) +
      (filters.openNow ? 1 : 0) +
      (filters.verified ? 1 : 0) +
      (filters.hasOffers ? 1 : 0)
    );
  };

  const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const filtersContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFiltersCount() > 0 && (
            <Button
              onClick={onClearFilters}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
            >
              Clear All
            </Button>
          )}
          {isMobile && (
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <FilterSection
        title="Category"
        isOpen={openSections.category}
        onToggle={() => toggleSection("category")}
      >
        <div className="max-h-48 overflow-y-auto space-y-2">
          {allSubcategories.map((subcategory) => (
            <label
              key={subcategory.id}
              className="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(subcategory.id)}
                onChange={() => handleCategoryChange(subcategory.id)}
                className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700">{subcategory.name}</span>
              <span className="text-gray-400 text-xs">
                ({subcategory.parentName})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Location Filter */}
      <FilterSection
        title="Location"
        isOpen={openSections.location}
        onToggle={() => toggleSection("location")}
      >
        <div className="space-y-2">
          {locations.map((location) => (
            <label
              key={location}
              className="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                checked={filters.locations.includes(location)}
                onChange={() => handleLocationChange(location)}
                className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection
        title="Minimum Rating"
        isOpen={openSections.rating}
        onToggle={() => toggleSection("rating")}
      >
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => handleFilterChange("minRating", rating)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <div className="flex items-center space-x-1">
                {renderStars(rating)}
                <span className="text-gray-700">& up</span>
              </div>
            </label>
          ))}
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === null}
              onChange={() => handleFilterChange("minRating", null)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="text-gray-700">Any rating</span>
          </label>
        </div>
      </FilterSection>

      {/* Additional Filters */}
      <FilterSection
        title="Additional Filters"
        isOpen={openSections.features}
        onToggle={() => toggleSection("features")}
      >
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={filters.openNow}
              onChange={(e) => handleFilterChange("openNow", e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="text-gray-700">Open Now</span>
          </label>

          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(e) => handleFilterChange("verified", e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="text-gray-700">Verified Businesses</span>
          </label>

          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hasOffers}
              onChange={(e) =>
                handleFilterChange("hasOffers", e.target.checked)
              }
              className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="text-gray-700">Has Offers/Discounts</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );

  // Mobile Modal
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onToggle}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto p-6"
            >
              {filtersContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Sidebar
  return filtersContent;
};

export default Filters;
