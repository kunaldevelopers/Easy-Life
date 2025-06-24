import React from "react";
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

const SellerPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
  const stats = [
    {
      label: "Total Views",
      value: "1,234",
      icon: Eye,
      colorClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "Customer Inquiries",
      value: "23",
      icon: MessageCircle,
      colorClass: "bg-green-100 text-green-600",
    },
    {
      label: "Average Rating",
      value: "4.8",
      icon: Star,
      colorClass: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Monthly Revenue",
      value: "₹15,000",
      icon: DollarSign,
      colorClass: "bg-purple-100 text-purple-600",
    },
  ];

  const recentActivity = [
    {
      action: "New inquiry from",
      customer: "Rajesh Kumar",
      date: "2 hours ago",
    },
    {
      action: "Review received from",
      customer: "Priya Sharma",
      date: "1 day ago",
    },
    {
      action: "Profile viewed by",
      customer: "5 customers",
      date: "2 days ago",
    },
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
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.action}{" "}
                          <span className="text-primary-600">
                            {activity.customer}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance Chart */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Performance Overview
                  </h2>
                  <Button variant="outline" size="sm" icon={BarChart3}>
                    View Details
                  </Button>
                </div>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Analytics coming soon!</p>
                  <p className="text-sm text-gray-500">
                    Track your business performance with detailed analytics
                  </p>
                </div>
              </Card>

              {/* Customer Reviews */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Reviews
                  </h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No reviews yet</p>
                  <p className="text-sm text-gray-500">
                    Encourage customers to leave reviews to build trust
                  </p>
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
                    onClick={() => navigate("/profile")}
                    variant="primary"
                    className="w-full justify-start"
                    icon={Store}
                  >
                    Edit Business Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Plus}
                  >
                    Add New Photos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Calendar}
                  >
                    Update Hours
                  </Button>
                  <Button
                    onClick={() => navigate("/contact")}
                    variant="outline"
                    className="w-full justify-start"
                    icon={MessageCircle}
                  >
                    Contact Support
                  </Button>
                </div>
              </Card>

              {/* Business Summary */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Business Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Status</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verification</span>
                    <span className="font-medium text-green-600">Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed Since</span>
                    <span className="font-medium">
                      {user.joinDate || "Recently"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>
              </Card>

              {/* Upgrade Notice */}
              <Card className="p-6 bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Upgrade Your Plan
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get more visibility and features with our premium plan
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Learn More
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
