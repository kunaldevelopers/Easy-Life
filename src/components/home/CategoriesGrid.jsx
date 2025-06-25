import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { topCategories } from "../../data/categories";

const CategoriesGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/listings?category=${categoryId}`);
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
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Popular Categories
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Find the services you need from trusted local providers in Gangtok
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 xl:gap-6"
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
                <div className="bg-white rounded-md sm:rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-5 text-center hover:shadow-md lg:hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  <div className="flex flex-col items-center space-y-1 sm:space-y-2 lg:space-y-3">
                    <div
                      className={`w-9 h-9 sm:w-12 sm:h-12 lg:w-16 lg:h-16 ${colorClass} rounded-md sm:rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-300 shadow-md lg:shadow-lg`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="space-y-0 sm:space-y-0.5 lg:space-y-1 min-h-[32px] sm:min-h-[36px] lg:min-h-[40px] flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base leading-tight line-clamp-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-xs lg:text-sm leading-tight">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/listings")}
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 text-sm sm:text-base"
          >
            View All Categories
            <Icons.ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
