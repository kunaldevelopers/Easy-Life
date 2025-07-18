import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";

const FreshRecommendations = () => {
  // Sample product data from actual categories - all from Gangtok
  const products = [
    {
      id: 1,
      title: "iPhone 14 Pro 128GB Space Black",
      price: "₹ 85,000",
      location: "MG Road, Gangtok",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
      featured: true,
      timeAgo: "TODAY",
    },
    {
      id: 2,
      title: "Samsung Galaxy S23 Ultra 256GB",
      price: "₹ 75,000",
      location: "Lal Bazaar, Gangtok",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
      featured: true,
      timeAgo: "1 day ago",
    },
    {
      id: 3,
      title: "Royal Enfield Classic 350 2023",
      price: "₹ 1,45,000",
      location: "Tadong, Gangtok",
      image: "https://i.ytimg.com/vi/TktHfh1CqJM/maxresdefault.jpg",
      timeAgo: "2 days ago",
    },
    {
      id: 4,
      title: "Maruti Swift Dzire 2020 Petrol",
      price: "₹ 6,85,000",
      location: "Ranipool, Gangtok",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
      timeAgo: "TODAY",
    },
    {
      id: 5,
      title: "2BHK Furnished Apartment",
      price: "₹ 15,000/month",
      location: "Development Area, Gangtok",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
      timeAgo: "3 days ago",
    },
    {
      id: 6,
      title: "Hotel The Elgin Nor-Khill Deluxe Room",
      price: "₹ 4,500/night",
      location: "The Ridge, Gangtok",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      timeAgo: "1 week ago",
    },
    {
      id: 7,
      title: "Software Developer Job - React/Node",
      price: "₹ 45,000/month",
      location: "IT Park, Gangtok",
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=200&fit=crop",
      timeAgo: "2 days ago",
    },
    {
      id: 8,
      title: "Fresh Organic Vegetables Daily",
      price: "₹ 200/kg",
      location: "Vegetable Market, Gangtok",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
      timeAgo: "TODAY",
    },
    {
      id: 9,
      title: "Homeopathic Medicine Store",
      price: "₹ 150 onwards",
      location: "Hospital Road, Gangtok",
      image:
        "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2017/10/10/Pictures/_d79aeca0-ad64-11e7-839f-5e4b0d653fbd.jpg",
      timeAgo: "1 day ago",
    },
    {
      id: 10,
      title: "Professional House Cleaning Service",
      price: "₹ 800/visit",
      location: "Deorali, Gangtok",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
      timeAgo: "4 days ago",
    },
    {
      id: 11,
      title: "Expert Electrician Available 24/7",
      price: "₹ 300/hour",
      location: "Gangtok Central",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop",
      timeAgo: "TODAY",
    },
    {
      id: 12,
      title: "Skilled Plumber for All Repairs",
      price: "₹ 400/hour",
      location: "Singtam Road, Gangtok",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop",
      timeAgo: "2 days ago",
    },
    {
      id: 13,
      title: "Modern Hair Salon & Spa",
      price: "₹ 500 onwards",
      location: "Tibet Road, Gangtok",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop",
      timeAgo: "1 day ago",
    },
    {
      id: 14,
      title: "Custom Furniture Carpenter",
      price: "₹ 15,000 onwards",
      location: "Lumsey, Gangtok",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      timeAgo: "5 days ago",
    },
    {
      id: 15,
      title: "Traditional Momo Restaurant",
      price: "₹ 120/plate",
      location: "Mall Road, Gangtok",
      image:
        "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=300&h=200&fit=crop",
      timeAgo: "TODAY",
    },
    {
      id: 16,
      title: "CCTV Installation & Maintenance",
      price: "₹ 8,000 onwards",
      location: "Arithang, Gangtok",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=300&h=200&fit=crop",
      timeAgo: "3 days ago",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Hot Recommendations
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest local trends.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
                    FEATURED
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {product.timeAgo}
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {product.title}
                </h3>

                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{product.location}</span>
                </div>

                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {product.price}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 text-sm sm:text-base"
          >
            View All Listings
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FreshRecommendations;
