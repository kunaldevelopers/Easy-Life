import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Store,
  TrendingUp,
  Star,
  MessageCircle,
  Plus,
  ArrowLeft,
  BarChart3,
  Eye,
  Phone,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import BusinessProfileEditor from "../components/seller/BusinessProfileEditor";
import InquiriesManager from "../components/seller/InquiriesManager";
import PhotoManager from "../components/seller/PhotoManager";
import BusinessAnalytics from "../components/seller/BusinessAnalytics";
import BusinessHoursManager from "../components/seller/BusinessHoursManager";

const SellerPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");

  if (!user || user.type !== "seller") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in as a business owner to access this page.
          </p>
          <Button onClick={() => navigate("/auth")} variant="primary">
            Log In
          </Button>
        </Card>
      </div>
    );
  }

  // Handle navigation between different views
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  // Render different views based on currentView state
  if (currentView === "business-profile") {
    return <BusinessProfileEditor onBack={handleBackToDashboard} />;
  }

  if (currentView === "inquiries") {
    return <InquiriesManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "photos") {
    return <PhotoManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "analytics") {
    return <BusinessAnalytics onBack={handleBackToDashboard} />;
  }

  if (currentView === "business-hours") {
    return <BusinessHoursManager onBack={handleBackToDashboard} />;
  }
  const stats = [
    {
      label: "Total Views",
      value: "2,847",
      icon: Eye,
      colorClass: "bg-blue-100 text-blue-600",
      change: "+12%",
      period: "this month",
    },
    {
      label: "Customer Inquiries",
      value: "47",
      icon: MessageCircle,
      colorClass: "bg-green-100 text-green-600",
      change: "+8%",
      period: "this week",
    },
    {
      label: "Average Rating",
      value: "4.6",
      icon: Star,
      colorClass: "bg-yellow-100 text-yellow-600",
      change: "+0.2",
      period: "this month",
    },
    {
      label: "Monthly Revenue",
      value: "₹28,500",
      icon: DollarSign,
      colorClass: "bg-purple-100 text-purple-600",
      change: "+24%",
      period: "vs last month",
    },
  ];

  const recentActivity = [
    {
      action: "New inquiry from",
      customer: "Priya Sharma",
      date: "45 minutes ago",
      type: "inquiry",
      message: "Looking for catering services for 50 people",
    },
    {
      action: "Review received from",
      customer: "Rajesh Kumar",
      date: "2 hours ago",
      type: "review",
      rating: 5,
      message: "Excellent service and very professional staff!",
    },
    {
      action: "Photo liked by",
      customer: "Anjali Thapa",
      date: "4 hours ago",
      type: "engagement",
      message: "Your new menu photos look amazing",
    },
    {
      action: "Profile viewed by",
      customer: "12 potential customers",
      date: "Today",
      type: "views",
      message: "High interest in your services",
    },
    {
      action: "Booking request from",
      customer: "Deepak Rai",
      date: "Yesterday",
      type: "booking",
      message: "Wedding photography for December 15th",
    },
    {
      action: "Review received from",
      customer: "Sunita Gurung",
      date: "2 days ago",
      type: "review",
      rating: 4,
      message: "Good food quality, timely delivery",
    },
  ];

  const customerReviews = [
    {
      id: 1,
      customerName: "Rajesh Kumar",
      rating: 5,
      date: "2 hours ago",
      comment:
        "Excellent service and very professional staff! The food quality was outstanding and delivery was on time. Highly recommended for any event.",
      verified: true,
    },
    {
      id: 2,
      customerName: "Sunita Gurung",
      rating: 4,
      date: "2 days ago",
      comment:
        "Good food quality and timely delivery. The presentation could be improved a bit, but overall satisfied with the service.",
      verified: true,
    },
    {
      id: 3,
      customerName: "Amit Sharma",
      rating: 5,
      date: "1 week ago",
      comment:
        "Amazing experience! The team was very responsive and accommodating. Will definitely use their services again.",
      verified: false,
    },
    {
      id: 4,
      customerName: "Deepika Rai",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Professional service with good attention to detail. Pricing is reasonable and staff is friendly.",
      verified: true,
    },
  ];

  const performanceData = [
    { month: "Jan", views: 1850, inquiries: 32, bookings: 18 },
    { month: "Feb", views: 2100, inquiries: 38, bookings: 22 },
    { month: "Mar", views: 2400, inquiries: 45, bookings: 28 },
    { month: "Apr", views: 2847, inquiries: 47, bookings: 31 },
  ];

  return (
    <>
      <Helmet>
        <title>Business Dashboard - Easy Life Gangtok</title>
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

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Business Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your business profile and track performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {" "}
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`p-3 rounded-lg ${
                          stat.colorClass.split(" ")[0]
                        }`}
                      >
                        <stat.icon
                          className={`w-6 h-6 ${stat.colorClass.split(" ")[1]}`}
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {stat.change}
                      </p>
                      <p className="text-xs text-gray-500">{stat.period}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Activity */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.slice(0, 4).map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <p className="font-medium text-gray-900">
                            {activity.action}{" "}
                            <span className="text-primary-600">
                              {activity.customer}
                            </span>
                          </p>
                          {activity.type === "review" && (
                            <div className="flex items-center ml-2">
                              {[...Array(activity.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewChange("inquiries")}
                      >
                        {activity.type === "inquiry" ||
                        activity.type === "booking"
                          ? "Respond"
                          : "View"}
                      </Button>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleViewChange("inquiries")}
                    >
                      View All Activities
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Performance Chart */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Performance Overview
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={BarChart3}
                    onClick={() => handleViewChange("analytics")}
                  >
                    View Details
                  </Button>
                </div>
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">2,847</p>
                      <p className="text-sm text-gray-600">Total Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">47</p>
                      <p className="text-sm text-gray-600">Inquiries</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">31</p>
                      <p className="text-sm text-gray-600">Bookings</p>
                    </div>
                  </div>

                  {/* Simple Bar Chart */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Monthly Growth</span>
                      <span className="font-medium text-green-600">+24%</span>
                    </div>
                    {performanceData.map((data, index) => (
                      <div
                        key={data.month}
                        className="flex items-center space-x-3"
                      >
                        <span className="w-8 text-sm text-gray-600">
                          {data.month}
                        </span>
                        <div className="flex-1 flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(data.views / 3000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {data.views}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Insights */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Key Insights
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 54% increase in profile views this month</li>
                      <li>• Peak activity on weekends (Fri-Sun)</li>
                      <li>• High conversion rate: 66% inquiries to bookings</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Customer Reviews */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Reviews
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewChange("analytics")}
                  >
                    View All (12)
                  </Button>
                </div>
                <div className="space-y-4">
                  {customerReviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {review.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900">
                                {review.customerName}
                              </p>
                              {review.verified && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}

                  {/* Review Summary */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Overall Rating
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-yellow-600">
                            4.6
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < 4
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            (12 reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Response Rate</p>
                        <p className="font-bold text-green-600">95%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleViewChange("business-profile")}
                    variant="primary"
                    className="w-full justify-start"
                    icon={Store}
                  >
                    Edit Business Profile
                  </Button>
                  <Button
                    onClick={() => handleViewChange("photos")}
                    variant="outline"
                    className="w-full justify-start"
                    icon={Plus}
                  >
                    Add New Photos (3 pending)
                  </Button>
                  <Button
                    onClick={() => handleViewChange("business-hours")}
                    variant="outline"
                    className="w-full justify-start"
                    icon={Calendar}
                  >
                    Update Business Hours
                  </Button>
                  <Button
                    onClick={() => handleViewChange("inquiries")}
                    variant="outline"
                    className="w-full justify-start"
                    icon={MessageCircle}
                  >
                    Respond to Inquiries (5)
                  </Button>
                  <Button
                    onClick={() => navigate("/contact")}
                    variant="outline"
                    className="w-full justify-start"
                    icon={Phone}
                  >
                    Contact Support
                  </Button>
                </div>

                {/* Pending Tasks */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Pending Tasks
                  </h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Respond to 2 urgent inquiries</li>
                    <li>• Update holiday hours for Diwali</li>
                    <li>• Upload menu photos</li>
                  </ul>
                </div>
              </Card>

              {/* Business Summary */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Business Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Profile Status</span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium text-green-600">Active</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Verification</span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium text-green-600">
                        Verified
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed Since</span>
                    <span className="font-medium">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">Food & Catering</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium text-blue-600">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-medium">2,847 this month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium text-green-600">
                      &lt; 2 hours
                    </span>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">
                      Profile Completion
                    </span>
                    <span className="text-sm font-bold text-blue-600">85%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-800 mt-2">
                    Add more photos to reach 100%
                  </p>
                </div>
              </Card>

              {/* Premium Features */}
              <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Premium Benefits
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Priority listing in search results
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Advanced analytics & insights
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Unlimited photo uploads
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    24/7 priority support
                  </div>
                </div>
                <p className="text-xs text-green-700 mb-4">
                  Expires on May 15, 2024 • Auto-renewal enabled
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Manage Plan
                </Button>
              </Card>

              {/* Tips */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Tips to Grow
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Add high-quality photos of your business
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Respond quickly to customer inquiries
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Keep your business hours updated
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Encourage satisfied customers to leave reviews
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerPanel;
