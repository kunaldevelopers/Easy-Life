import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Store,
  TrendingUp,
  ArrowLeft,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Calendar,
  CreditCard,
  Filter,
  Ban,
  Globe,
  Bell,
  Settings,
  FileText,
  DollarSign,
  Eye,
  Database,
  Download,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import ManageUsers from "../components/admin/ManageUsers";
import BannedUsers from "../components/admin/BannedUsers";
import SettlementChecker from "../components/admin/SettlementChecker";
import ServiceBookings from "../components/admin/ServiceBookings";
import ListedBusinesses from "../components/admin/ListedBusinesses";
import PendingBusinesses from "../components/admin/PendingBusinesses";
import UnderReviewBusinesses from "../components/admin/UnderReviewBusinesses";
import WebsiteControlCenter from "../components/admin/WebsiteControlCenter";
import ViewReports from "../components/admin/ViewReports";
import SystemSettings from "../components/admin/SystemSettings";
import AdminNotificationCenter from "../components/admin/AdminNotificationCenter";
import FinancialDashboard from "../components/admin/FinancialDashboard";
import ContentModerationPanel from "../components/admin/ContentModerationPanel";
import ActivityMonitor from "../components/admin/ActivityMonitor";
import DataManagement from "../components/admin/DataManagement";
import CustomerAnalytics from "../components/admin/CustomerAnalytics";
import CustomerAnalyticsCard from "../components/common/CustomerAnalyticsCard";

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [commissionEnabled, setCommissionEnabled] = useState(true);
  const [commissionRate, setCommissionRate] = useState(15);

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
    if (actionType === "pending-businesses") {
      setCurrentView("pending-businesses");
    } else if (actionType === "under-review-businesses") {
      setCurrentView("under-review-businesses");
    } else if (actionType === "business-verification") {
      setCurrentView("listed-businesses");
    }
  };

  // Mock customer analytics data for dashboard
  const dashboardCustomerAnalytics = {
    lastUpdated: "a day ago",
    total: {
      count: 76,
      percentage: 22,
      previousCount: 62,
    },
    new: {
      count: 38,
      percentage: 32,
      description: "No orders in last 365 days",
    },
    repeat: {
      count: 33,
      percentage: 3,
      description: "Ordered in last 60 days",
    },
    lapsed: {
      count: 5,
      percentage: 29,
      description: "Last order 60 to 365 days ago",
    },
  };

  const handleCustomerAnalyticsInsights = () => {
    handleViewChange("customer-analytics");
  };

  // Render different views based on currentView state
  if (currentView === "manage-users") {
    return <ManageUsers onBack={handleBackToDashboard} />;
  }

  if (currentView === "banned-users") {
    return <BannedUsers onBack={handleBackToDashboard} />;
  }

  if (currentView === "settlement-checker") {
    return <SettlementChecker onBack={handleBackToDashboard} />;
  }

  if (currentView === "listed-businesses") {
    return <ListedBusinesses onBack={handleBackToDashboard} />;
  }

  if (currentView === "pending-businesses") {
    return <PendingBusinesses onBack={handleBackToDashboard} />;
  }

  if (currentView === "under-review-businesses") {
    return <UnderReviewBusinesses onBack={handleBackToDashboard} />;
  }

  if (currentView === "service-bookings") {
    return <ServiceBookings onBack={handleBackToDashboard} />;
  }

  if (currentView === "website-control-center") {
    return <WebsiteControlCenter onBack={handleBackToDashboard} />;
  }

  if (currentView === "view-reports") {
    return <ViewReports onBack={handleBackToDashboard} />;
  }

  if (currentView === "system-settings") {
    return <SystemSettings onBack={handleBackToDashboard} />;
  }

  if (currentView === "notifications") {
    return <AdminNotificationCenter onBack={handleBackToDashboard} />;
  }

  if (currentView === "financial-dashboard") {
    return <FinancialDashboard onBack={handleBackToDashboard} />;
  }

  if (currentView === "content-moderation") {
    return <ContentModerationPanel onBack={handleBackToDashboard} />;
  }

  if (currentView === "activity-monitor") {
    return <ActivityMonitor onBack={handleBackToDashboard} />;
  }

  if (currentView === "data-management") {
    return <DataManagement onBack={handleBackToDashboard} />;
  }

  if (currentView === "customer-analytics") {
    return <CustomerAnalytics onBack={handleBackToDashboard} />;
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
      label: "Under Review",
      value: "8",
      icon: Clock,
      colorClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "Pending Approvals",
      value: "23",
      icon: AlertTriangle,
      colorClass: "bg-yellow-100 text-yellow-600",
    },
  ];

  const pendingActions = [
    {
      action: "Pending Business Approval",
      item: "3 businesses awaiting review",
      priority: "high",
      actionType: "pending-businesses",
    },
    {
      action: "Under Review Follow-up",
      item: "2 businesses need final decision",
      priority: "high",
      actionType: "under-review-businesses",
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

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Pending Actions */}
              <Card className="p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Pending Actions
                </h2>
                <div className="space-y-4">
                  {pendingActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
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
                            action.actionType ||
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

              {/* Customer Analytics and System Overview */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Customer Analytics Card */}
                <CustomerAnalyticsCard
                  title="Platform Customers"
                  data={dashboardCustomerAnalytics}
                  onGetDeeperInsights={handleCustomerAnalyticsInsights}
                />

                {/* System Overview */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    System Overview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Platform Health */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Platform Health
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">
                              Server Status
                            </span>
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            Online
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">
                              Database
                            </span>
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            Healthy
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Activity className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">
                              API Response
                            </span>
                          </div>
                          <span className="text-sm font-medium text-blue-600">
                            125ms
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Today's Summary */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Today's Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">
                              New Users
                            </span>
                          </div>
                          <span className="text-sm font-medium text-blue-600">
                            12
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-gray-700">
                              Bookings
                            </span>
                          </div>
                          <span className="text-sm font-medium text-purple-600">
                            28
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">
                              Revenue
                            </span>
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            ₹15,420
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions Grid */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col justify-center"
                    icon={Store}
                    onClick={() => handleViewChange("pending-businesses")}
                  >
                    <span className="mt-2 text-sm">Review Businesses</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col justify-center"
                    icon={Users}
                    onClick={() => handleViewChange("manage-users")}
                  >
                    <span className="mt-2 text-sm">Manage Users</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col justify-center"
                    icon={Calendar}
                    onClick={() => handleViewChange("service-bookings")}
                  >
                    <span className="mt-2 text-sm">View Bookings</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col justify-center"
                    icon={CreditCard}
                    onClick={() => handleViewChange("settlement-checker")}
                  >
                    <span className="mt-2 text-sm">Settlements</span>
                  </Button>
                </div>
              </Card>

              {/* Activity & Profile */}
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div>
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
                  </div>

                  {/* Admin Profile */}
                  <div>
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
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Business Management */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Store className="h-5 w-5 text-blue-600" />
                  Business Management
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={AlertTriangle}
                    onClick={() => handleViewChange("pending-businesses")}
                  >
                    Pending Businesses
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Clock}
                    onClick={() => handleViewChange("under-review-businesses")}
                  >
                    Under Review Businesses
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Store}
                    onClick={() => handleViewChange("listed-businesses")}
                  >
                    Listed Businesses
                  </Button>
                </div>
              </Card>

              {/* Service Management */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Service Management
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Calendar}
                    onClick={() => handleViewChange("service-bookings")}
                  >
                    Service Bookings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={CreditCard}
                    onClick={() => handleViewChange("settlement-checker")}
                  >
                    Settlement Checker
                  </Button>
                </div>
              </Card>

              {/* User Management */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  User Management
                </h3>
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
                    icon={Ban}
                    onClick={() => handleViewChange("banned-users")}
                  >
                    Banned Users
                  </Button>
                </div>
              </Card>

              {/* Website Control */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Website Control
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Globe}
                    onClick={() => handleViewChange("website-control-center")}
                  >
                    Website Control Center
                  </Button>
                </div>
              </Card>

              {/* Analytics & Reports */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Analytics & Reports
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={BarChart3}
                    onClick={() => handleViewChange("view-reports")}
                  >
                    Analytics Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={DollarSign}
                    onClick={() => handleViewChange("financial-dashboard")}
                  >
                    Financial Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Users}
                    onClick={() => handleViewChange("customer-analytics")}
                  >
                    Customer Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Activity}
                    onClick={() => handleViewChange("activity-monitor")}
                  >
                    Activity Monitor
                  </Button>
                </div>
              </Card>

              {/* Content & Moderation */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Content & Moderation
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Eye}
                    onClick={() => handleViewChange("content-moderation")}
                  >
                    Content Moderation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Bell}
                    onClick={() => handleViewChange("notifications")}
                  >
                    Notification Center
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
                    icon={Database}
                    onClick={() => handleViewChange("data-management")}
                  >
                    Data Management
                  </Button>
                </div>
              </Card>

              {/* Commission Management */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Commission Management
                </h3>
                <div className="space-y-4">
                  {/* Commission Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Commission Status
                      </p>
                      <p className="text-sm text-gray-500">
                        {commissionEnabled
                          ? "Commission charging is active"
                          : "Commission charging is disabled"}
                      </p>
                    </div>
                    <button
                      onClick={() => setCommissionEnabled(!commissionEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        commissionEnabled ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          commissionEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Commission Rate Input */}
                  {commissionEnabled && (
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commission Rate (%)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={commissionRate}
                          onChange={(e) =>
                            setCommissionRate(parseFloat(e.target.value) || 0)
                          }
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500">%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Current rate: {commissionRate}% will be deducted from
                        seller payments
                      </p>
                    </div>
                  )}

                  {/* Commission Summary */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      How it works:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>
                        • Client pays for service → Money goes to your account
                      </li>
                      <li>
                        • Commission ({commissionRate}%) is deducted
                        automatically
                      </li>
                      <li>• Remaining amount is sent to seller's account</li>
                      <li>• Toggle off to disable commission temporarily</li>
                    </ul>
                  </div>
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
