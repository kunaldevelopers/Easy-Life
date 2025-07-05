import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users,
  Star,
  MessageCircle,
  ArrowLeft,
  Phone,
  ExternalLink,
  Heart,
  CheckCircle,
  Package,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import CustomerActivityManager from "../components/customer/CustomerActivityManager";

const CustomerPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");

  // Handle navigation to activity manager
  const handleViewActivityManager = () => {
    setCurrentView("activity");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  // If showing activity manager, render it
  if (currentView === "activity") {
    return <CustomerActivityManager onBack={handleBackToDashboard} />;
  }

  if (!user || user.type !== "customer") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in as a customer to access this page.
          </p>
          <Button onClick={() => navigate("/auth")} variant="primary">
            Log In
          </Button>
        </Card>
      </div>
    );
  }
  // Mobile-focused essential stats only
  const stats = [
    {
      label: "Saved",
      value: "5",
      icon: Heart,
      colorClass: "bg-red-100 text-red-600",
    },
    {
      label: "Orders",
      value: "12",
      icon: CheckCircle,
      colorClass: "bg-green-100 text-green-600",
    },
    {
      label: "Recent",
      value: "4",
      icon: Star,
      colorClass: "bg-blue-100 text-blue-600",
    },
  ];

  // Enhanced demo activity data with detailed information
  const recentActivity = [
    {
      id: 1,
      type: "review",
      business: "Taste of Tibet Restaurant",
      action: "Left a review",
      date: "Dec 28, 2024",
      rating: 5,
    },
    {
      id: 2,
      type: "save",
      business: "Green Valley Photographers",
      action: "Saved business",
      date: "Dec 27, 2024",
    },
    {
      id: 3,
      type: "inquiry",
      business: "Mountain View AC Services",
      action: "Sent inquiry",
      date: "Dec 26, 2024",
      status: "responded",
    },
    {
      id: 4,
      type: "booking",
      business: "Himalayan Electricians",
      action: "Booked service",
      date: "Dec 25, 2024",
      status: "confirmed",
    },
  ];

  // Helper functions
  const getActivityIcon = (type) => {
    switch (type) {
      case "review":
        return Star;
      case "save":
        return Heart;
      case "inquiry":
        return MessageCircle;
      case "booking":
        return CheckCircle;
      default:
        return Package;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "review":
        return "bg-yellow-100 text-yellow-600";
      case "save":
        return "bg-red-100 text-red-600";
      case "inquiry":
        return "bg-blue-100 text-blue-600";
      case "booking":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusBadge = (activity) => {
    if (!activity.status) return null;

    const statusColors = {
      responded: "bg-green-100 text-green-800",
      confirmed: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`inline-block px-2 py-1 text-xs rounded-full ${
          statusColors[activity.status] || statusColors.pending
        }`}
      >
        {activity.status}
      </span>
    );
  };

  return (
    <>
      <Helmet>
        <title>Customer Dashboard - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          {/* Mobile-first Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Hi, {user.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Find local services in Gangtok
            </p>
          </div>

          {/* Search CTA - Primary Action for Mobile Users */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Find Services</h2>
                <p className="text-primary-100 text-sm">
                  500+ verified businesses
                </p>
              </div>
              <Button
                onClick={() => navigate("/listings")}
                variant="outline"
                className="bg-white text-primary-600 hover:bg-gray-50 border-white"
              >
                Search
              </Button>
            </div>
          </Card>

          {/* Mobile-optimized Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`p-2 rounded-lg ${
                        stat.colorClass.split(" ")[0]
                      }`}
                    >
                      <stat.icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          stat.colorClass.split(" ")[1]
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Mobile-first Single Column Layout */}
          <div className="space-y-6">
            {/* Recent Orders - Essential Mobile Feature */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Recent Orders
                </h2>
                <Button
                  onClick={() => navigate("/orders")}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "ORD001",
                    business: "Taste of Tibet Restaurant",
                    service: "Food Delivery",
                    date: "Dec 28, 2024",
                    amount: "₹450",
                    status: "delivered",
                    image:
                      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=100",
                  },
                  {
                    id: "ORD002",
                    business: "Himalayan Electricians",
                    service: "Electrical Repair",
                    date: "Dec 25, 2024",
                    amount: "₹1,200",
                    status: "completed",
                    image:
                      "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=100",
                  },
                  {
                    id: "ORD003",
                    business: "Green Valley Photographers",
                    service: "Event Photography",
                    date: "Dec 20, 2024",
                    amount: "₹8,500",
                    status: "confirmed",
                    image:
                      "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=100",
                  },
                  {
                    id: "ORD004",
                    business: "Sikkim Mobile Repair",
                    service: "Screen Replacement",
                    date: "Dec 18, 2024",
                    amount: "₹2,800",
                    status: "completed",
                    image:
                      "https://images.pexels.com/photos/4792264/pexels-photo-4792264.jpeg?auto=compress&cs=tinysrgb&w=100",
                  },
                  {
                    id: "ORD005",
                    business: "Mountain Bike Service",
                    service: "Bike Maintenance",
                    date: "Dec 15, 2024",
                    amount: "₹950",
                    status: "delivered",
                    image:
                      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=100",
                  },
                ]
                  .slice(0, 3)
                  .map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => navigate("/orders")}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={order.image}
                            alt={order.business}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 items-center justify-center text-white font-bold text-sm hidden">
                            {order.business.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm leading-tight truncate">
                            {order.business}
                          </p>
                          <p className="text-gray-600 text-xs truncate">
                            {order.service}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-xs text-gray-500">
                              {order.date}
                            </p>
                            <span
                              className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                                order.status === "delivered" ||
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "confirmed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-semibold text-gray-900 text-sm">
                          {order.amount}
                        </p>
                        <ExternalLink className="w-3 h-3 text-gray-400 mt-1" />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </Card>

            {/* Recent Activity - Most Important for Mobile */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <Button
                  onClick={handleViewActivityManager}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleViewActivityManager}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors active:bg-gray-200"
                    >
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div
                          className={`p-2 rounded-full ${getActivityColor(
                            activity.type
                          )} flex-shrink-0`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm leading-tight">
                            {activity.action}
                          </p>
                          <p className="text-primary-600 text-sm font-medium truncate">
                            {activity.business}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-xs text-gray-500">
                              {activity.date}
                            </p>
                            {getStatusBadge(activity)}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Saved Businesses - Essential Mobile Feature */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Saved Businesses
                </h2>
                <Button
                  onClick={() => navigate("/listings")}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  Browse
                </Button>
              </div>
              <div className="text-center py-6">
                <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-3 text-sm">
                  No saved businesses yet
                </p>
                <Button
                  onClick={() => navigate("/listings")}
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Discover Local Services
                </Button>
              </div>
            </Card>

            {/* Essential Quick Actions - Mobile Optimized */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={() => navigate("/listings")}
                  variant="outline"
                  className="w-full justify-center py-3 text-sm"
                  icon={Users}
                >
                  Find Services
                </Button>
                <Button
                  onClick={() => navigate("/listings?category=emergency")}
                  variant="outline"
                  className="w-full justify-center py-3 text-sm"
                  icon={Phone}
                >
                  Emergency Services
                </Button>
              </div>
            </Card>

            {/* Compact Profile Section - Mobile Essential */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 flex-shrink-0">
                    <img
                      src={
                        user.avatar ||
                        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                      }
                      alt={user.name}
                      className="w-full h-full object-cover transition-opacity duration-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                      onLoad={(e) => {
                        e.target.style.opacity = "1";
                      }}
                      style={{ opacity: 0 }}
                    />
                    {/* Fallback avatar */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 items-center justify-center text-white font-medium text-sm"
                      style={{ display: "none" }}
                    >
                      {user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Customer since {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/profile")}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Edit Profile
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerPanel;
