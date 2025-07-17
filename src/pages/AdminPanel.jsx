import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  Plus,
  MessageCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Tag,
  Camera,
  User,
  XCircle,
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
import AdminNotificationCenter from "../components/admin/AdminNotificationCenter";
import FinancialDashboard from "../components/admin/FinancialDashboard";
import ContentModerationPanel from "../components/admin/ContentModerationPanel";
import CustomerAnalytics from "../components/admin/CustomerAnalytics";
import CustomerAnalyticsCard from "../components/common/CustomerAnalyticsCard";

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get("view") || "dashboard";
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
    if (view === "dashboard") {
      setSearchParams({});
    } else {
      setSearchParams({ view });
    }
  };

  const handleBackToDashboard = () => {
    setSearchParams({});
  };

  // Mobile Analytics View
  if (currentView === "analytics") {
    return (
      <>
        <Helmet>
          <title>Analytics Dashboard - Easy Life Gangtok</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => handleViewChange("dashboard")}
                  className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-bold text-gray-900 truncate">
                    Analytics Dashboard
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    Platform performance and insights
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <select className="text-xs px-2 py-1 border rounded bg-white">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Analytics Content */}
          <div className="px-4 space-y-4 pb-24">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +18%
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">1,234</p>
                  <p className="text-xs text-gray-600">Total Users</p>
                  <p className="text-xs text-gray-500">+18% vs last month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Store className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +12%
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">156</p>
                  <p className="text-xs text-gray-600">Businesses</p>
                  <p className="text-xs text-gray-500">+12% vs last month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +25%
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">892</p>
                  <p className="text-xs text-gray-600">Bookings</p>
                  <p className="text-xs text-gray-500">+25% vs last month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +32%
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">₹1.2M</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                  <p className="text-xs text-gray-500">+32% vs last month</p>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Platform Growth
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Overall Growth</span>
                  <span className="font-medium text-green-600">+28%</span>
                </div>
                {[
                  { month: "Jan", value: 850 },
                  { month: "Feb", value: 920 },
                  { month: "Mar", value: 1234 },
                ].map((data, index) => (
                  <div key={data.month} className="flex items-center space-x-3">
                    <span className="w-8 text-sm text-gray-600">
                      {data.month}
                    </span>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.value / 1500) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {data.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                System Health
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Healthy
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Response</span>
                  <span className="text-sm font-medium text-blue-600">
                    125ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50 shadow-lg">
            <div className="grid grid-cols-5 gap-1 max-w-sm mx-auto">
              <button
                onClick={() => handleViewChange("dashboard")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "dashboard"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Activity className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Dashboard</span>
              </button>
              <button
                onClick={() => handleViewChange("users")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "users" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Users className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Users</span>
              </button>
              <button
                onClick={() => handleViewChange("businesses")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "businesses"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Business</span>
              </button>
              <button
                onClick={() => handleViewChange("analytics")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "analytics"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <BarChart3 className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Analytics</span>
              </button>
              <button
                onClick={() => handleViewChange("settings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "settings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Settings className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Mobile Users Management View
  if (currentView === "users") {
    return (
      <>
        <Helmet>
          <title>User Management - Easy Life Gangtok</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => handleViewChange("dashboard")}
                  className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-bold text-gray-900 truncate">
                    User Management
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    Manage platform users and permissions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button className="p-2 rounded-lg bg-gray-100">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Users Content */}
          <div className="px-4 space-y-4 pb-24">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleViewChange("manage-users")}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  All Users
                </span>
                <span className="text-xs text-gray-500">1,234 total</span>
              </button>
              <button
                onClick={() => handleViewChange("banned-users")}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <Ban className="w-8 h-8 text-red-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Banned
                </span>
                <span className="text-xs text-gray-500">12 users</span>
              </button>
            </div>

            {/* User Stats */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                User Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">1,156</div>
                  <div className="text-xs text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">78</div>
                  <div className="text-xs text-gray-600">New This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">245</div>
                  <div className="text-xs text-gray-600">Sellers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">989</div>
                  <div className="text-xs text-gray-600">Customers</div>
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Recent Users</h3>
                <button
                  onClick={() => handleViewChange("manage-users")}
                  className="text-xs text-blue-600 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "Rajesh Kumar",
                    email: "rajesh@email.com",
                    type: "customer",
                    status: "active",
                  },
                  {
                    name: "Priya Sharma",
                    email: "priya@email.com",
                    type: "seller",
                    status: "pending",
                  },
                  {
                    name: "Amit Singh",
                    email: "amit@email.com",
                    type: "customer",
                    status: "active",
                  },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {user.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{user.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50 shadow-lg">
            <div className="grid grid-cols-5 gap-1 max-w-sm mx-auto">
              <button
                onClick={() => handleViewChange("dashboard")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "dashboard"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Activity className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Dashboard</span>
              </button>
              <button
                onClick={() => handleViewChange("users")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "users" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Users className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Users</span>
              </button>
              <button
                onClick={() => handleViewChange("businesses")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "businesses"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Business</span>
              </button>
              <button
                onClick={() => handleViewChange("analytics")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "analytics"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <BarChart3 className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Analytics</span>
              </button>
              <button
                onClick={() => handleViewChange("settings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "settings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Settings className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Mobile Business Management View
  if (currentView === "businesses") {
    return (
      <>
        <Helmet>
          <title>Business Management - Easy Life Gangtok</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => handleViewChange("dashboard")}
                  className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-bold text-gray-900 truncate">
                    Business Management
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    Manage and review businesses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Content */}
          <div className="px-4 space-y-4 pb-24">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleViewChange("pending-businesses")}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Pending
                </span>
                <span className="text-xs text-gray-500">23 businesses</span>
              </button>
              <button
                onClick={() => handleViewChange("under-review-businesses")}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <Clock className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Under Review
                </span>
                <span className="text-xs text-gray-500">8 businesses</span>
              </button>
              <button
                onClick={() => handleViewChange("listed-businesses")}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <Store className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Listed
                </span>
                <span className="text-xs text-gray-500">156 businesses</span>
              </button>
              <button
                onClick={() => handleViewChange("service-bookings")}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Bookings
                </span>
                <span className="text-xs text-gray-500">892 total</span>
              </button>
            </div>

            {/* Business Stats */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Business Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">156</div>
                  <div className="text-xs text-gray-600">Active Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">23</div>
                  <div className="text-xs text-gray-600">Pending Review</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">₹1.2M</div>
                  <div className="text-xs text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">98%</div>
                  <div className="text-xs text-gray-600">Approval Rate</div>
                </div>
              </div>
            </div>

            {/* Recent Business Activity */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  {
                    business: "Himalayan Catering",
                    action: "New registration",
                    status: "pending",
                    time: "2 hours ago",
                  },
                  {
                    business: "Gangtok Electronics",
                    action: "Profile updated",
                    status: "active",
                    time: "5 hours ago",
                  },
                  {
                    business: "Mountain View Restaurant",
                    action: "Verification completed",
                    status: "approved",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {activity.business
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.business}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {activity.action}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === "active" ||
                          activity.status === "approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {activity.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50 shadow-lg">
            <div className="grid grid-cols-5 gap-1 max-w-sm mx-auto">
              <button
                onClick={() => handleViewChange("dashboard")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "dashboard"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Activity className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Dashboard</span>
              </button>
              <button
                onClick={() => handleViewChange("users")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "users" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Users className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Users</span>
              </button>
              <button
                onClick={() => handleViewChange("businesses")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "businesses"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Business</span>
              </button>
              <button
                onClick={() => handleViewChange("analytics")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "analytics"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <BarChart3 className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Analytics</span>
              </button>
              <button
                onClick={() => handleViewChange("settings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "settings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Settings className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Mobile Settings View
  if (currentView === "settings") {
    return (
      <>
        <Helmet>
          <title>Settings - Easy Life Gangtok</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => handleViewChange("dashboard")}
                  className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-bold text-gray-900 truncate">
                    Settings
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    System settings and controls
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="px-4 space-y-4 pb-24">
            {/* System Controls */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                System Controls
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: Globe,
                    label: "Website Control",
                    action: "website-control-center",
                  },
                  {
                    icon: Bell,
                    label: "Notifications",
                    action: "notifications",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleViewChange(item.action)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {item.label}
                      </span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Commission Management */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Commission Management
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Commission Status
                    </p>
                    <p className="text-sm text-gray-500">
                      {commissionEnabled ? "Active" : "Disabled"}
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security & Moderation */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Security & Moderation
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: Shield,
                    label: "Content Moderation",
                    action: "content-moderation",
                  },
                  { icon: Eye, label: "View Reports", action: "view-reports" },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleViewChange(item.action)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-red-100 flex-shrink-0">
                        <item.icon className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {item.label}
                      </span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Controls */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Financial Controls
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: DollarSign,
                    label: "Financial Dashboard",
                    action: "financial-dashboard",
                  },
                  {
                    icon: CreditCard,
                    label: "Settlement Checker",
                    action: "settlement-checker",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleViewChange(item.action)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-green-100 flex-shrink-0">
                        <item.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {item.label}
                      </span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50 shadow-lg">
            <div className="grid grid-cols-5 gap-1 max-w-sm mx-auto">
              <button
                onClick={() => handleViewChange("dashboard")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "dashboard"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Activity className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Dashboard</span>
              </button>
              <button
                onClick={() => handleViewChange("users")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "users" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Users className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Users</span>
              </button>
              <button
                onClick={() => handleViewChange("businesses")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "businesses"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Business</span>
              </button>
              <button
                onClick={() => handleViewChange("analytics")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "analytics"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <BarChart3 className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Analytics</span>
              </button>
              <button
                onClick={() => handleViewChange("settings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "settings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Settings className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

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

  if (currentView === "notifications") {
    return <AdminNotificationCenter onBack={handleBackToDashboard} />;
  }

  if (currentView === "financial-dashboard") {
    return <FinancialDashboard onBack={handleBackToDashboard} />;
  }

  if (currentView === "content-moderation") {
    return <ContentModerationPanel onBack={handleBackToDashboard} />;
  }

  if (currentView === "customer-analytics") {
    return <CustomerAnalytics onBack={handleBackToDashboard} />;
  }

  // Handle review actions for pending items
  const handleReviewAction = (actionType, itemId) => {
    console.log(`Review action: ${actionType} for item: ${itemId}`);
    // In real app, this would make API calls
    if (actionType === "pending-businesses") {
      handleViewChange("pending-businesses");
    } else if (actionType === "under-review-businesses") {
      handleViewChange("under-review-businesses");
    } else if (actionType === "business-verification") {
      handleViewChange("listed-businesses");
    }
  };

  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: Users,
      colorClass: "bg-blue-100 text-blue-600",
      change: "+18%",
      period: "this month",
    },
    {
      label: "Listed Businesses",
      value: "156",
      icon: Store,
      colorClass: "bg-green-100 text-green-600",
      change: "+12%",
      period: "this month",
    },
    {
      label: "Under Review",
      value: "8",
      icon: Clock,
      colorClass: "bg-blue-100 text-blue-600",
      change: "+2",
      period: "this week",
    },
    {
      label: "Pending Approvals",
      value: "23",
      icon: AlertTriangle,
      colorClass: "bg-yellow-100 text-yellow-600",
      change: "+5",
      period: "today",
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

  const recentActivity = [
    {
      action: "New user registered",
      customer: "Rajesh Kumar",
      date: "2 minutes ago",
      type: "user",
    },
    {
      action: "Business verified",
      customer: "Himalayan Catering",
      date: "15 minutes ago",
      type: "business",
    },
    {
      action: "Content reported",
      customer: "Mountain View Restaurant",
      date: "1 hour ago",
      type: "report",
    },
    {
      action: "Settlement completed",
      customer: "Gangtok Electronics",
      date: "2 hours ago",
      type: "settlement",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Desktop Header - Hidden on Mobile */}
        <div className="hidden lg:block py-8">
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
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-gray-900 truncate">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  Platform overview and controls
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button className="p-2 rounded-lg bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8">
          {/* Stats Cards - Professional Desktop Design */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 mb-6 lg:mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-sm lg:shadow-xl border border-gray-100 lg:border-gray-200 hover:shadow-2xl lg:hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Desktop Professional Layout */}
                <div className="hidden lg:block">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and Change Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`p-4 rounded-2xl ${
                          stat.colorClass.split(" ")[0]
                        } shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <stat.icon
                          className={`w-8 h-8 ${stat.colorClass.split(" ")[1]}`}
                        />
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 shadow-sm">
                          {stat.change}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {stat.label}
                      </h3>
                      <p className="text-4xl font-bold text-gray-900 leading-none">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        vs {stat.period}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout (unchanged for mobile compatibility) */}
                <div className="lg:hidden">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg ${
                        stat.colorClass.split(" ")[0]
                      } flex-shrink-0`}
                    >
                      <stat.icon
                        className={`w-4 h-4 ${stat.colorClass.split(" ")[1]}`}
                      />
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-600 truncate">
                        {stat.label}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600">
                        {stat.change} {stat.period}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleViewChange("pending-businesses")}
                  className="flex flex-col items-center p-3 bg-orange-50 rounded-lg border border-orange-100"
                >
                  <AlertTriangle className="w-6 h-6 text-orange-600 mb-1" />
                  <span className="text-xs font-medium text-orange-900">
                    Pending
                  </span>
                  <span className="text-xs text-orange-600">23 businesses</span>
                </button>
                <button
                  onClick={() => handleViewChange("manage-users")}
                  className="flex flex-col items-center p-3 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <Users className="w-6 h-6 text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-blue-900">
                    Users
                  </span>
                  <span className="text-xs text-blue-600">1,234 total</span>
                </button>
                <button
                  onClick={() => handleViewChange("service-bookings")}
                  className="flex flex-col items-center p-3 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <Calendar className="w-6 h-6 text-purple-600 mb-1" />
                  <span className="text-xs font-medium text-purple-900">
                    Bookings
                  </span>
                  <span className="text-xs text-purple-600">892 today</span>
                </button>
                <button
                  onClick={() => handleViewChange("settlement-checker")}
                  className="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-100"
                >
                  <CreditCard className="w-6 h-6 text-green-600 mb-1" />
                  <span className="text-xs font-medium text-green-900">
                    Settlements
                  </span>
                  <span className="text-xs text-green-600">₹15.4K</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Today's Summary */}
          <div className="lg:hidden mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-3">
                Today's Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-900">12</div>
                  <div className="text-xs text-blue-700">New Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-900">28</div>
                  <div className="text-xs text-blue-700">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-900">
                    ₹15,420
                  </div>
                  <div className="text-xs text-blue-700">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-900">3</div>
                  <div className="text-xs text-blue-700">Urgent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Recent Activity */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {recentActivity.slice(0, 3).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                      {activity.customer.split(" ")[0][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {activity.customer} • {activity.date}
                      </p>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        activity.type === "user"
                          ? "bg-blue-500"
                          : activity.type === "business"
                          ? "bg-green-500"
                          : activity.type === "report"
                          ? "bg-red-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
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
                            <p className="text-sm text-gray-500">
                              {action.item}
                            </p>
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
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
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

              {/* Desktop Sidebar */}
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
                      onClick={() =>
                        handleViewChange("under-review-businesses")
                      }
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
                            commissionEnabled
                              ? "translate-x-6"
                              : "translate-x-1"
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

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50 shadow-lg">
          <div className="grid grid-cols-5 gap-1 max-w-sm mx-auto">
            <button
              onClick={() => handleViewChange("dashboard")}
              className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                currentView === "dashboard" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Activity className="w-5 h-5 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate">Dashboard</span>
            </button>
            <button
              onClick={() => handleViewChange("users")}
              className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                currentView === "users" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Users className="w-5 h-5 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate">Users</span>
            </button>
            <button
              onClick={() => handleViewChange("businesses")}
              className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                currentView === "businesses" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Store className="w-5 h-5 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate">Business</span>
            </button>
            <button
              onClick={() => handleViewChange("analytics")}
              className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                currentView === "analytics" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <BarChart3 className="w-5 h-5 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate">Analytics</span>
            </button>
            <button
              onClick={() => handleViewChange("settings")}
              className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                currentView === "settings" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Settings className="w-5 h-5 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
