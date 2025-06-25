import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Store,
  TrendingUp,
  Settings,
  ArrowLeft,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import ManageUsers from "../components/admin/ManageUsers";
import ReviewBusinesses from "../components/admin/ReviewBusinesses";
import SystemSettings from "../components/admin/SystemSettings";
import ViewReports from "../components/admin/ViewReports";

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");

  if (!user || user.type !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You need admin privileges to access this page.
          </p>
          <Button onClick={() => navigate("/")} variant="primary">
            Go Home
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

  // Handle review actions for pending items
  const handleReviewAction = (actionType, itemId) => {
    console.log(`Review action: ${actionType} for item: ${itemId}`);
    // In real app, this would make API calls
    if (actionType === "business-verification") {
      setCurrentView("review-businesses");
    }
  };

  // Render different views based on currentView state
  if (currentView === "manage-users") {
    return <ManageUsers onBack={handleBackToDashboard} />;
  }

  if (currentView === "review-businesses") {
    return <ReviewBusinesses onBack={handleBackToDashboard} />;
  }

  if (currentView === "system-settings") {
    return <SystemSettings onBack={handleBackToDashboard} />;
  }

  if (currentView === "view-reports") {
    return <ViewReports onBack={handleBackToDashboard} />;
  }
  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: Users,
      colorClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "Listed Businesses",
      value: "156",
      icon: Store,
      colorClass: "bg-green-100 text-green-600",
    },
    {
      label: "Pending Approvals",
      value: "23",
      icon: Clock,
      colorClass: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Platform Growth",
      value: "+12%",
      icon: TrendingUp,
      colorClass: "bg-purple-100 text-purple-600",
    },
  ];

  const pendingActions = [
    {
      action: "Business Verification",
      item: "Gangtok Coffee House",
      priority: "high",
    },
    {
      action: "User Report Review",
      item: "Inappropriate content",
      priority: "medium",
    },
    {
      action: "Content Moderation",
      item: "3 pending reviews",
      priority: "low",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Easy Life Gangtok</title>
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
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage platform operations and monitor system health
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
              {/* Pending Actions */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Pending Actions
                </h2>
                <div className="space-y-4">
                  {pendingActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            action.priority === "high"
                              ? "bg-red-500"
                              : action.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {action.action}
                          </p>
                          <p className="text-sm text-gray-500">{action.item}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleReviewAction(
                            action.action.toLowerCase().replace(" ", "-"),
                            action.item
                          )
                        }
                      >
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* System Health */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  System Health
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-green-900">Server Status</p>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-green-900">Database</p>
                    <p className="text-sm text-green-600">Healthy</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-medium text-yellow-900">API Response</p>
                    <p className="text-sm text-yellow-600">Slow</p>
                  </div>
                </div>
              </Card>

              {/* Analytics Overview */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Analytics Overview
                  </h2>
                  <Button variant="outline" size="sm" icon={BarChart3}>
                    View Full Report
                  </Button>
                </div>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Detailed analytics coming soon!
                  </p>
                  <p className="text-sm text-gray-500">
                    Track user engagement, business performance, and platform
                    growth
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
                </h3>{" "}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    className="w-full justify-start"
                    icon={Users}
                    onClick={() => handleViewChange("manage-users")}
                  >
                    Manage Users
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Store}
                    onClick={() => handleViewChange("review-businesses")}
                  >
                    Review Businesses
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Settings}
                    onClick={() => handleViewChange("system-settings")}
                  >
                    System Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={BarChart3}
                    onClick={() => handleViewChange("view-reports")}
                  >
                    View Reports
                  </Button>
                </div>
              </Card>

              {/* System Info */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  System Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Version</span>
                    <span className="font-medium">v1.0.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Backup</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="font-medium">45%</span>
                  </div>
                </div>
              </Card>

              {/* Recent Logs */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      New user registered
                    </p>
                    <p className="text-gray-500">2 minutes ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      Business verified
                    </p>
                    <p className="text-gray-500">15 minutes ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      Content reported
                    </p>
                    <p className="text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </Card>

              {/* Admin Profile */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Admin Profile
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={
                      user.avatar ||
                      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150"
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">
                      System Administrator
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    All permissions
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
