import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Star,
  MessageCircle,
  Plus,
  ArrowLeft,
  BarChart3,
  Eye,
  Phone,
  Calendar,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const CustomerPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
  const stats = [
    {
      label: "Saved Businesses",
      value: "5",
      icon: Users,
      colorClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "Reviews Posted",
      value: "12",
      icon: Star,
      colorClass: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Inquiries Made",
      value: "8",
      icon: MessageCircle,
      colorClass: "bg-green-100 text-green-600",
    },
    {
      label: "Profile Views",
      value: "23",
      icon: Eye,
      colorClass: "bg-purple-100 text-purple-600",
    },
  ];

  const recentActivity = [
    {
      action: "Reviewed",
      business: "Gangtok Electronics Repair Hub",
      date: "2 days ago",
    },
    {
      action: "Saved",
      business: "Himalayan Plumbing Solutions",
      date: "1 week ago",
    },
    {
      action: "Contacted",
      business: "Quick Home Delivery",
      date: "2 weeks ago",
    },
  ];

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

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">
              Manage your saved businesses, reviews, and preferences
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
                            {activity.business}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Saved Businesses */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Saved Businesses
                  </h2>
                  <Button
                    onClick={() => navigate("/listings")}
                    variant="outline"
                    size="sm"
                  >
                    Browse More
                  </Button>
                </div>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No saved businesses yet</p>
                  <Button
                    onClick={() => navigate("/listings")}
                    variant="primary"
                  >
                    Discover Businesses
                  </Button>
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
                    onClick={() => navigate("/listings")}
                    variant="outline"
                    className="w-full justify-start"
                    icon={Users}
                  >
                    Find Businesses
                  </Button>
                  <Button
                    onClick={() => navigate("/profile")}
                    variant="outline"
                    className="w-full justify-start"
                    icon={Users}
                  >
                    Edit Profile
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

              {/* Profile Summary */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Profile Summary
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={
                      user.avatar ||
                      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150"
                    }
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profile Completion</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </Card>

              {/* Tips */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Tips for You
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Save businesses you like for quick access
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Leave reviews to help other customers
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Use filters to find exactly what you need
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

export default CustomerPanel;
