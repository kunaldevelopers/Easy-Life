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
    <section className="relative hero-gradient overflow-hidden min-h-[85vh] lg:min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />{" "}
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 lg:py-20 min-h-[85vh] lg:min-h-screen flex flex-col justify-center">
        <div className="text-center space-y-5 lg:space-y-10">
          {/* Main Heading */}{" "}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 lg:space-y-4 mb-5 lg:mb-0"
          >
            {" "}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-shadow leading-tight">
              Find Everything You Need in{" "}
              <span className="text-accent-400">Gangtok</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed px-2">
              Your trusted local business directory. Discover the best services,
              restaurants, hotels, and more in your neighborhood.
            </p>
          </motion.div>{" "}
          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-5 lg:mb-0"
          >
            {" "}
            <div className="bg-white rounded-2xl shadow-2xl p-3 lg:p-8 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center">
                {" "}
                {/* Search Input */}
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-20" />
                  {/* Custom Styled Placeholder */}
                  {!searchQuery && (
                    <div className="absolute left-12 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-base lg:text-lg z-10">
                      Search for nearby{" "}
                      <motion.span
                        key={currentServiceIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-orange-500 font-bold"
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
                    className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base lg:text-lg bg-white relative z-5"
                  />
                </div>
                {/* Search Button */}
                <div className="w-full lg:w-auto">
                  <Button
                    onClick={handleSearch}
                    variant="primary"
                    size="lg"
                    icon={Search}
                    className="w-full lg:w-auto lg:px-12 py-3 lg:py-4 text-base lg:text-lg font-semibold"
                  >
                    Search Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>{" "}
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 max-w-4xl mx-auto text-white px-2"
          >
            {[
              { number: "500+", label: "Local Businesses" },
              { number: "2000+", label: "Happy Customers" },
              { number: "50+", label: "Service Categories" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-accent-400 mb-1 lg:mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100 text-xs lg:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>{" "}
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full" />
      </div>
      <div
        className="absolute bottom-20 right-10 animate-float hidden lg:block"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-20 h-20 bg-accent-400 bg-opacity-20 rounded-full" />
      </div>
      {/* Additional floating elements for better design */}
      <div
        className="absolute top-1/3 right-20 animate-float hidden lg:block"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-16 h-16 bg-white bg-opacity-5 rounded-full" />
      </div>
      <div
        className="absolute bottom-1/3 left-20 animate-float hidden lg:block"
        style={{ animationDelay: "3s" }}
      >
        <div className="w-12 h-12 bg-accent-400 bg-opacity-15 rounded-full" />
      </div>
    </section>
  );
};

export default Hero;
