import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const CategoryBar = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Main categories for the horizontal bar - based on your data
  const mainCategories = [
    { id: "all", name: "ALL CATEGORIES", hasDropdown: true },
    { id: "cars", name: "Cars" },
    { id: "gadgets", name: "Mobile Phones" },
    { id: "room-rent", name: "For Sale: Houses & Apartments" },
    { id: "hotels", name: "Hotels" },
    { id: "restaurants", name: "Restaurants" },
    { id: "services", name: "Services" },
    { id: "jobs", name: "Jobs" },
    { id: "groceries", name: "Groceries" },
    { id: "clothes", name: "Fashion" },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      navigate("/listings");
    } else {
      navigate(`/listings?category=${categoryId}`);
    }
  };

  return (
    // Only visible on desktop (hidden on mobile/tablet)
    <div className="hidden lg:block bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 py-3 overflow-x-auto scrollbar-hide">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-gray-100 ${
                selectedCategory === category.id
                  ? "bg-primary-100 text-primary-700 border border-primary-200"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <span>{category.name}</span>
              {category.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
