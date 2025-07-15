import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { topCategories } from "../../data/categories";

const CategoryShopping = () => {
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleCategoryClick = (categoryId) => {
    navigate(`/listings?category=${categoryId}`);
  };

  const handleViewAllClick = () => {
    setShowAllCategories(true);
  };

  // Define specific featured categories
  const featuredCategories = {
    grocery: topCategories.find((cat) => cat.id === "groceries") || {
      id: "groceries",
      name: "Groceries",
      icon: "ShoppingCart",
      count: "60+ stores",
    },
    fashion: {
      id: "fashion",
      name: "Fashion",
      icon: "Shirt",
      count: "35+ stores",
    },
    hardware: {
      id: "hardware",
      name: "Hardware",
      icon: "Wrench",
      count: "45+ stores",
    },
    services: topCategories.find((cat) => cat.id === "electrician") || {
      id: "services",
      name: "Services",
      icon: "Tool",
      count: "200+ providers",
    },
  };

  // Modern color palette for category backgrounds
  const categoryColors = [
    "bg-gradient-to-br from-blue-500 to-blue-600",
    "bg-gradient-to-br from-emerald-500 to-emerald-600",
    "bg-gradient-to-br from-orange-500 to-orange-600",
    "bg-gradient-to-br from-purple-500 to-purple-600",
    "bg-gradient-to-br from-rose-500 to-rose-600",
    "bg-gradient-to-br from-cyan-500 to-cyan-600",
    "bg-gradient-to-br from-amber-500 to-amber-600",
    "bg-gradient-to-br from-indigo-500 to-indigo-600",
    "bg-gradient-to-br from-teal-500 to-teal-600",
    "bg-gradient-to-br from-pink-500 to-pink-600",
  ];

  const CategoryBox = ({
    category,
    size = "large",
    colorIndex = 0,
    delay = 0,
  }) => {
    const IconComponent = Icons[category.icon] || Icons.Wrench;
    const colorClass = categoryColors[colorIndex % categoryColors.length];

    const sizeClasses =
      size === "large"
        ? "h-32 sm:h-36 lg:h-40"
        : "h-[120px] sm:h-[130px] lg:h-[150px]";

    const iconSizes =
      size === "large"
        ? "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
        : "w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12";

    const iconInnerSizes =
      size === "large"
        ? "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
        : "w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6";

    const textSizes =
      size === "large"
        ? "text-sm sm:text-base lg:text-lg"
        : "text-xs sm:text-sm lg:text-base";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        onClick={() => handleCategoryClick(category.id)}
        className="group cursor-pointer"
      >
        <div
          className={`bg-white rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 ${sizeClasses} overflow-hidden flex flex-col`}
        >
          <div className="flex items-center justify-center flex-shrink-0 mb-3 lg:mb-4">
            <div
              className={`${iconSizes} ${colorClass} rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md`}
            >
              <IconComponent className={`${iconInnerSizes} text-white`} />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center min-h-0">
            <h3
              className={`font-semibold text-gray-900 ${textSizes} leading-tight text-center mb-1`}
            >
              {category.name}
            </h3>
            <p className="text-gray-500 text-xs lg:text-sm leading-tight">
              {category.count}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const ViewAllBox = ({ delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={handleViewAllClick}
      className="group cursor-pointer"
    >
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 h-32 sm:h-36 lg:h-40 overflow-hidden flex flex-col">
        <div className="flex items-center justify-center flex-shrink-0 mb-3 lg:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
            <Icons.Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center min-h-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight text-center mb-1">
            View All
          </h3>
          <p className="text-gray-500 text-xs lg:text-sm leading-tight">
            All Categories
          </p>
        </div>
      </div>
    </motion.div>
  );

  const AllCategoriesGrid = () => {
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
        },
      },
    };

    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mt-6"
      >
        {topCategories.map((category, index) => {
          const IconComponent = Icons[category.icon] || Icons.Wrench;
          const colorClass = categoryColors[index % categoryColors.length];

          return (
            <motion.div
              key={category.id}
              variants={item}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-md sm:rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:shadow-md lg:hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 h-[120px] sm:h-[130px] lg:h-[150px] overflow-hidden">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <div
                      className={`w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${colorClass} rounded-md sm:rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md`}
                    >
                      <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-h-0 px-1">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base leading-tight text-center mb-1 line-clamp-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-xs lg:text-sm leading-tight truncate">
                      {category.count}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!showAllCategories ? (
            <motion.div
              key="featured-categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Shopping Section */}
              <div className="mb-8">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
                >
                  Shopping
                </motion.h2>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <CategoryBox
                    category={featuredCategories.grocery}
                    colorIndex={1}
                    delay={0.1}
                  />
                  <CategoryBox
                    category={featuredCategories.fashion}
                    colorIndex={4}
                    delay={0.2}
                  />
                </div>
              </div>

              {/* Others Section */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
                >
                  Others
                </motion.h2>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  <CategoryBox
                    category={featuredCategories.hardware}
                    colorIndex={2}
                    delay={0.4}
                  />
                  <CategoryBox
                    category={featuredCategories.services}
                    colorIndex={0}
                    delay={0.5}
                  />
                  <ViewAllBox delay={0.6} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="all-categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  All Categories
                </h2>
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  <Icons.ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back</span>
                </button>
              </div>
              <AllCategoriesGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategoryShopping;
