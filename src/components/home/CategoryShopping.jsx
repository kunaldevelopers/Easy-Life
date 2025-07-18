import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { topCategories } from "../../data/categories";

const CategoryShopping = () => {
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [viewType, setViewType] = useState(""); // "shopping" or "all"

  const handleCategoryClick = (categoryId) => {
    // Handle business partner signup separately
    if (categoryId === "business-partner") {
      navigate("/auth?mode=business-signup");
      return;
    }
    navigate(`/listings?category=${categoryId}`);
  };

  const handleViewAllClick = (type = "all") => {
    setShowAllCategories(true);
    setViewType(type);
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
      id: "electrician",
      name: "Electrician",
      icon: "Zap",
      count: "150+ providers",
    },
    // Hotels & Transport categories
    hotels: topCategories.find((cat) => cat.id === "hotels") || {
      id: "hotels",
      name: "Hotel Booking",
      icon: "Hotel",
      count: "45+ hotels",
    },
    cab: topCategories.find((cat) => cat.id === "car-taxi-booking") || {
      id: "car-taxi-booking",
      name: "Cab",
      icon: "Car",
      count: "40+ services",
    },
    // Job Seeker & Providers categories
    jobFinder: {
      id: "jobs",
      name: "Job Finder",
      icon: "Search",
      count: "200+ openings",
    },
    jobProviders: {
      id: "job-providers",
      name: "Job Providers",
      icon: "Briefcase",
      count: "50+ companies",
    },
    jobTraining: {
      id: "job-training",
      name: "Available Jobs",
      icon: "GraduationCap",
      count: "30+ programs",
    },
    // Food Delivery & Restaurants categories
    restaurants: topCategories.find((cat) => cat.id === "restaurants") || {
      id: "restaurants",
      name: "Restaurants",
      icon: "UtensilsCrossed",
      count: "80+ restaurants",
    },
    deliveryPartner: {
      id: "delivery-partner",
      name: "Delivery Partner",
      icon: "Truck",
      count: "Join our fleet",
    },
    businessPartner: {
      id: "business-partner",
      name: "Join as Partner",
      icon: "Handshake",
      count: "Partner with us",
    },
    // Loan & Finance categories
    personalLoan: {
      id: "loan-finance-consultant",
      name: "Personal Loans",
      icon: "Banknote",
      count: "Quick Approval",
    },
    businessLoan: {
      id: "loan-finance-consultant",
      name: "Business Loans",
      icon: "Building2",
      count: "Growth Capital",
    },
    financialAdvice: {
      id: "loan-finance-consultant",
      name: "Financial Advice",
      icon: "TrendingUp",
      count: "Expert Guidance",
    },
  };

  // Additional categories for desktop sidebar
  const popularCategories = [
    topCategories.find((cat) => cat.id === "restaurants") || {
      id: "restaurants",
      name: "Restaurants",
      icon: "UtensilsCrossed",
      count: "80+",
    },
    topCategories.find((cat) => cat.id === "hotels") || {
      id: "hotels",
      name: "Hotels",
      icon: "Hotel",
      count: "45+",
    },
    topCategories.find((cat) => cat.id === "plumber") || {
      id: "plumber",
      name: "Plumber",
      icon: "Droplets",
      count: "120+",
    },
    topCategories.find((cat) => cat.id === "pharmacy") || {
      id: "pharmacy",
      name: "Pharmacy",
      icon: "Pill",
      count: "25+",
    },
  ];

  // Shopping categories only
  const shoppingCategories = topCategories.filter((cat) =>
    ["groceries", "pharmacy", "fashion"].includes(cat.id)
  );

  // Service categories only
  const serviceCategories = topCategories.filter((cat) =>
    [
      "electrician",
      "plumber",
      "cctv-services",
      "carpenter",
      "barber",
      "sweepers",
      "painter",
      "electronic-repair",
      "loan-finance-consultant",
    ].includes(cat.id)
  );

  // Hotels & Transport categories only
  const hotelsTransportCategories = topCategories.filter((cat) =>
    ["hotels", "room-rent", "car-taxi-booking", "bike-rental"].includes(cat.id)
  );

  // Job Seeker & Providers categories only
  const jobsSeekerProvidersCategories = topCategories.filter((cat) =>
    ["jobs", "job-providers", "job-training"].includes(cat.id)
  );

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

  const ViewAllBox = ({ delay = 0, type = "all" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={() =>
        type === "hotels-transport"
          ? handleCategoryClick("room-rent")
          : handleViewAllClick(type)
      }
      className="group cursor-pointer"
    >
      <div
        className={`${
          type === "hotels-transport"
            ? "bg-gradient-to-br from-blue-100 to-indigo-200"
            : "bg-gradient-to-br from-gray-100 to-gray-200"
        } rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover:shadow-lg transition-all duration-300 border ${
          type === "hotels-transport"
            ? "border-blue-200 hover:border-blue-300"
            : "border-gray-200 hover:border-gray-300"
        } h-32 sm:h-36 lg:h-40 overflow-hidden flex flex-col`}
      >
        <div className="flex items-center justify-center flex-shrink-0 mb-3 lg:mb-4">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${
              type === "hotels-transport"
                ? "bg-gradient-to-br from-blue-600 to-indigo-700"
                : "bg-gradient-to-br from-gray-600 to-gray-700"
            } rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md`}
          >
            {type === "hotels-transport" ? (
              <Icons.Home className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            ) : (
              <Icons.Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center min-h-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight text-center mb-1">
            {type === "services"
              ? "View All"
              : type === "hotels-transport"
              ? "Room Rents"
              : type === "jobs-training"
              ? "View All"
              : "View All"}
          </h3>
          <p className="text-gray-500 text-xs lg:text-sm leading-tight">
            {type === "services"
              ? "Services Categories"
              : type === "hotels-transport"
              ? "Available Now"
              : type === "jobs-training"
              ? "Job Seeker & Providers"
              : "All Categories"}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className="hidden xl:block">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 sticky top-8"
      >
        {/* Popular Today */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Icons.TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900 text-lg">Popular Today</h3>
          </div>
          <div className="space-y-3">
            {popularCategories.map((category, index) => {
              const IconComponent = Icons[category.icon] || Icons.Store;
              const colorClass =
                categoryColors[(index + 5) % categoryColors.length];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div
                    className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {category.name}
                    </h4>
                    <p className="text-xs text-gray-500">{category.count}</p>
                  </div>
                  <Icons.ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Icons.Zap className="w-4 h-4 text-purple-500" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/listings")}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <Icons.Search className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Browse All
                </span>
              </div>
              <Icons.ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/listings?category=restaurants")}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <Icons.UtensilsCrossed className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">
                  Find Food
                </span>
              </div>
              <Icons.ChevronRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/listings?category=electrician")}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <Icons.Wrench className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">
                  Get Service
                </span>
              </div>
              <Icons.ChevronRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Background Pattern Component
  const BackgroundPattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-2xl"></div>
    </div>
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

    // Choose categories based on view type
    const categoriesToShow =
      viewType === "shopping"
        ? shoppingCategories
        : viewType === "services"
        ? serviceCategories
        : viewType === "hotels-transport"
        ? hotelsTransportCategories
        : viewType === "jobs-training"
        ? jobsSeekerProvidersCategories
        : topCategories;

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mt-6"
      >
        {categoriesToShow.map((category, index) => {
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
    <section className="py-6 sm:py-8 lg:py-12 bg-white relative">
      <BackgroundPattern />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          className={
            showAllCategories ? "w-full" : "xl:grid xl:grid-cols-12 xl:gap-8"
          }
        >
          {/* Main Content */}
          <div className={showAllCategories ? "w-full" : "xl:col-span-8"}>
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
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-3 mb-4 sm:mb-6"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Icons.ShoppingBag className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        Shopping
                      </h2>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <Icons.Flame className="w-3 h-3" />
                        Trending
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
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
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        onClick={() => handleViewAllClick("shopping")}
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
                              Shopping Categories
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Services Section */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex items-center gap-3 mb-4 sm:mb-6"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <Icons.Grid3X3 className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        Services
                      </h2>
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <Icons.Star className="w-3 h-3" />
                        Popular
                      </div>
                    </motion.div>
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
                      <ViewAllBox delay={0.6} type="services" />
                    </div>
                  </div>

                  {/* Hotels & Transport Section */}
                  <div className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="flex items-center gap-3 mb-4 sm:mb-6"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Icons.Car className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        Hotels & Transport
                      </h2>
                      <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        <Icons.MapPin className="w-3 h-3" />
                        Travel
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <CategoryBox
                        category={featuredCategories.hotels}
                        colorIndex={3}
                        delay={0.7}
                      />
                      <CategoryBox
                        category={featuredCategories.cab}
                        colorIndex={5}
                        delay={0.8}
                      />
                      <ViewAllBox delay={0.9} type="hotels-transport" />
                    </div>
                  </div>

                  {/* Job Seeker & Providers Section */}
                  <div className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="flex items-center gap-3 mb-4 sm:mb-6"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Icons.Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        Job Seeker & Providers
                      </h2>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <Icons.TrendingUp className="w-3 h-3" />
                        Career
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <CategoryBox
                        category={featuredCategories.jobFinder}
                        colorIndex={6}
                        delay={1.0}
                      />
                      <CategoryBox
                        category={featuredCategories.jobProviders}
                        colorIndex={7}
                        delay={1.1}
                      />
                      <CategoryBox
                        category={featuredCategories.jobTraining}
                        colorIndex={8}
                        delay={1.2}
                      />
                    </div>
                  </div>

                  {/* Food Delivery and Restaurants Section */}
                  <div className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                      className="flex items-center gap-3 mb-4 sm:mb-6"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <Icons.UtensilsCrossed className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        Food Delivery & Restaurants
                      </h2>
                      <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        <Icons.ChefHat className="w-3 h-3" />
                        Tasty
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <CategoryBox
                        category={featuredCategories.restaurants}
                        colorIndex={9}
                        delay={1.4}
                      />
                      <CategoryBox
                        category={featuredCategories.deliveryPartner}
                        colorIndex={2}
                        delay={1.5}
                      />
                      <CategoryBox
                        category={featuredCategories.businessPartner}
                        colorIndex={5}
                        delay={1.6}
                      />
                    </div>
                  </div>

                  {/* Loan And Finance Consultant Section */}
                  <div className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.7 }}
                      className="flex items-center gap-3 mb-4 sm:mb-6"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Icons.CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        Loan And Finance Consultant
                      </h2>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <Icons.TrendingUp className="w-3 h-3" />
                        Financial
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <CategoryBox
                        category={featuredCategories.personalLoan}
                        colorIndex={1}
                        delay={1.8}
                      />
                      <CategoryBox
                        category={featuredCategories.businessLoan}
                        colorIndex={3}
                        delay={1.9}
                      />
                      <CategoryBox
                        category={featuredCategories.financialAdvice}
                        colorIndex={6}
                        delay={2.0}
                      />
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
                      {viewType === "shopping"
                        ? "Shopping Categories"
                        : viewType === "services"
                        ? "Services Categories"
                        : viewType === "hotels-transport"
                        ? "Hotels & Transport Categories"
                        : viewType === "jobs-training"
                        ? "Job Seeker & Providers Categories"
                        : "All Categories"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowAllCategories(false);
                        setViewType("");
                      }}
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

          {/* Desktop Sidebar - Only show when not showing all categories */}
          {!showAllCategories && (
            <div className="xl:col-span-4">
              <DesktopSidebar />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryShopping;
