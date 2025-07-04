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
    <section className="py-6 sm:py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default CategoriesGrid;
