import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Button from "../common/Button";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const navigate = useNavigate();

  const services = [
    "Electrician",
    "Plumber",
    "CCTV Services",
    "Carpenter",
    "Painter",
    "Sofa Designer",
    "Raj Mistiri",
    "Gadget Repair",
    "Sweepers",
    "Babysitter",
    "Barber",
    "Masseur",
    "Nurse",
    "Two-Wheeler Taxi",
    "Car Booking",
    "Bike Rental",
    "Food Delivery",
    "Product Delivery",
    "Shoe Repair",
    "Jobs",
    "Room Rent",
    "Hotels",
    "Restaurants",
    "Land",
    "Cars",
    "Gadgets",
    "Lease Flats",
    "Shoes",
    "Clothes",
    "Pharmacy",
    "Meat",
    "Groceries",
    "Books",
    "Local Food",
    "Flowers",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) =>
        prevIndex === services.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);

    navigate(`/listings?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden py-4 lg:py-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          {/* Main Heading - First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight text-center font-sans">
              <span className="inline-block">Find Everything You Need in</span>{" "}
              <span className="inline-block" style={{ color: "#22d5bd" }}>
                Gangtok
              </span>
            </h1>
          </motion.div>

          {/* Search Form - Second */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6 border border-gray-200">
              <div className="flex flex-row gap-3 lg:gap-4 items-stretch">
                {/* Search Input */}
                <div className="flex-1 relative">
                  {/* Custom Styled Placeholder */}
                  {!searchQuery && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 text-sm lg:text-lg z-10">
                      Search for nearby{" "}
                      <motion.span
                        key={currentServiceIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary-600 font-semibold"
                      >
                        {services[currentServiceIndex]}
                      </motion.span>
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder=""
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full h-12 lg:h-16 pl-4 pr-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm lg:text-lg bg-white relative z-5 transition-all"
                  />
                </div>
                {/* Search Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={handleSearch}
                    className="h-12 lg:h-16 w-12 lg:w-auto lg:px-10 text-white rounded-xl lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center lg:gap-2 font-semibold text-base lg:text-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #32E3C9, #7CF5FF, #F5B4F0, #C883FF)",
                    }}
                  >
                    <Search className="w-5 h-5 lg:w-5 lg:h-5" />
                    <span className="hidden lg:inline">Search Now</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
