import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BellRing,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Filter,
  Trash2,
  Settings,
  X,
  Clock,
  Users,
  Store,
  DollarSign,
  Activity,
  Search,
  Mail,
  Calendar,
  Shield,
  Globe,
  ArrowLeft,
  FileText,
  Menu,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const AdminNotificationCenter = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mock admin notifications data
  const notifications = [
    {
      id: "admin-001",
      type: "urgent",
      category: "security",
      title: "Suspicious Login Activity Detected",
      message:
        "Multiple failed login attempts from IP 192.168.1.100. User account 'john_doe' may be compromised.",
      timestamp: "2 minutes ago",
      isRead: false,
      priority: "high",
      source: "Security System",
      actions: ["Block IP", "Lock Account", "Investigate"],
    },
    {
      id: "admin-002",
      type: "warning",
      category: "content",
      title: "Content Violation Reported",
      message:
        "Business listing 'XYZ Services' has been reported for inappropriate content by 3 users.",
      timestamp: "15 minutes ago",
      isRead: false,
      priority: "medium",
      source: "Content Moderation",
      actions: ["Review Content", "Contact Business", "Remove Listing"],
    },
    {
      id: "admin-003",
      type: "info",
      category: "business",
      title: "New Business Registration",
      message:
        "ABC Electronics has submitted a new business registration and is pending approval.",
      timestamp: "1 hour ago",
      isRead: true,
      priority: "medium",
      source: "Business Management",
      actions: ["Review Application", "Approve", "Request More Info"],
    },
    {
      id: "admin-004",
      type: "success",
      category: "financial",
      title: "Monthly Revenue Target Achieved",
      message:
        "Platform has reached 105% of monthly revenue target with ₹1,25,000 total earnings.",
      timestamp: "2 hours ago",
      isRead: true,
      priority: "low",
      source: "Financial System",
      actions: ["View Details", "Generate Report"],
    },
    {
      id: "admin-005",
      type: "urgent",
      category: "system",
      title: "Database Performance Alert",
      message:
        "Database query response time increased by 40%. Immediate attention required.",
      timestamp: "3 hours ago",
      isRead: false,
      priority: "high",
      source: "System Monitor",
      actions: ["Check Logs", "Optimize Database", "Scale Resources"],
    },
    {
      id: "admin-006",
      type: "info",
      category: "users",
      title: "User Growth Milestone",
      message:
        "Platform has reached 1,500 registered users! Growth rate: +12% this month.",
      timestamp: "5 hours ago",
      isRead: true,
      priority: "low",
      source: "Analytics System",
      actions: ["View Analytics", "Celebration Post"],
    },
    {
      id: "admin-007",
      type: "warning",
      category: "financial",
      title: "Payment Gateway Issue",
      message:
        "Payment processing failed for 5 transactions. Gateway timeout errors detected.",
      timestamp: "6 hours ago",
      isRead: false,
      priority: "high",
      source: "Payment System",
      actions: ["Check Gateway", "Retry Payments", "Contact Support"],
    },
    {
      id: "admin-008",
      type: "info",
      category: "content",
      title: "Weekly Content Summary",
      message:
        "This week: 24 new business listings, 156 reviews, 89 photos uploaded.",
      timestamp: "1 day ago",
      isRead: true,
      priority: "low",
      source: "Content System",
      actions: ["View Details", "Quality Check"],
    },
  ];

  const notificationStats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    urgent: notifications.filter((n) => n.type === "urgent").length,
    high: notifications.filter((n) => n.priority === "high").length,
  };

  // Filter options for mobile filter panel
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "urgent", label: "Urgent" },
    { id: "warning", label: "Warning" },
    { id: "info", label: "Info" },
    { id: "success", label: "Success" },
    { id: "security", label: "Security" },
    { id: "system", label: "System" },
    { id: "financial", label: "Financial" },
    { id: "business", label: "Business" },
    { id: "content", label: "Content" },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      selectedFilter === "all" ||
      notification.category === selectedFilter ||
      notification.type === selectedFilter ||
      notification.priority === selectedFilter;

    const matchesSearch =
      searchTerm === "" ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.source.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case "urgent":
        return AlertTriangle;
      case "warning":
        return XCircle;
      case "success":
        return CheckCircle;
      case "info":
      default:
        return Info;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "high") {
      return "border-l-red-500 bg-red-50";
    }
    switch (type) {
      case "urgent":
        return "border-l-red-500 bg-red-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "success":
        return "border-l-green-500 bg-green-50";
      case "info":
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "security":
        return Shield;
      case "content":
        return FileText;
      case "business":
        return Store;
      case "financial":
        return DollarSign;
      case "system":
        return Settings;
      case "users":
        return Users;
      default:
        return Bell;
    }
  };

  const handleNotificationAction = (notification, action) => {
    console.log(`Action: ${action} for notification: ${notification.id}`);
    alert(`${action} action would be performed for: ${notification.title}`);
  };

  const markAsRead = (notificationId) => {
    console.log(`Marking notification ${notificationId} as read`);
  };

  const deleteNotification = (notificationId) => {
    console.log(`Deleting notification ${notificationId}`);
  };

  const markAllAsRead = () => {
    console.log("Marking all notifications as read");
    alert("All notifications marked as read!");
  };

  const clearAllNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      console.log("Clearing all notifications");
      alert("All notifications cleared!");
    }
  };

  if (selectedNotification) {
    const NotificationIcon = getNotificationIcon(selectedNotification.type);
    const CategoryIcon = getCategoryIcon(selectedNotification.category);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        {isMobile ? (
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedNotification(null)}
                icon={ArrowLeft}
              >
                Back to Notifications
              </Button>
              <h1 className="text-lg font-bold text-gray-900 truncate">
                Notification Details
              </h1>
              <div className="w-20"></div> {/* Spacer for balance */}
            </div>
          </div>
        ) : (
          /* Desktop Header */
          <div className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedNotification(null)}
                    icon={ArrowLeft}
                  >
                    Back to Notifications
                  </Button>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Notification Details
                  </h1>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 ${
            isMobile ? "max-w-md" : "max-w-4xl"
          }`}
        >
          <Card className={`${isMobile ? "p-4" : "p-6"}`}>
            <div
              className={`border-l-4 rounded-lg ${getNotificationColor(
                selectedNotification.type,
                selectedNotification.priority
              )} ${isMobile ? "p-4" : "p-6"}`}
            >
              <div
                className={`mb-4 ${
                  isMobile ? "space-y-4" : "flex items-start justify-between"
                }`}
              >
                <div
                  className={`${
                    isMobile ? "space-y-3" : "flex items-start space-x-4"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <NotificationIcon
                      className={`${isMobile ? "w-5 h-5" : "w-6 h-6"}`}
                    />
                    <CategoryIcon
                      className={`text-gray-600 ${
                        isMobile ? "w-4 h-4" : "w-5 h-5"
                      }`}
                    />
                  </div>
                  <div>
                    <h2
                      className={`font-semibold text-gray-900 mb-2 ${
                        isMobile ? "text-lg" : "text-xl"
                      }`}
                    >
                      {selectedNotification.title}
                    </h2>
                    <div
                      className={`text-gray-600 mb-4 ${
                        isMobile
                          ? "space-y-2 text-xs"
                          : "flex items-center space-x-4 text-sm"
                      }`}
                    >
                      <span className="flex items-center">
                        <Clock
                          className={`mr-1 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
                        />
                        {selectedNotification.timestamp}
                      </span>
                      <span className="flex items-center">
                        <Activity
                          className={`mr-1 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
                        />
                        {selectedNotification.source}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full font-medium ${
                          isMobile ? "text-xs" : "text-xs"
                        } ${
                          selectedNotification.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : selectedNotification.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedNotification.priority.charAt(0).toUpperCase() +
                          selectedNotification.priority.slice(1)}{" "}
                        Priority
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    isMobile ? "flex space-x-2" : "flex space-x-2"
                  }`}
                >
                  {!selectedNotification.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsRead(selectedNotification.id)}
                      className={isMobile ? "flex-1 text-xs" : ""}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteNotification(selectedNotification.id)}
                    icon={Trash2}
                    className={isMobile ? "flex-1 text-xs" : ""}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <p
                  className={`text-gray-700 leading-relaxed ${
                    isMobile ? "text-sm" : "text-lg"
                  }`}
                >
                  {selectedNotification.message}
                </p>
              </div>

              {selectedNotification.actions &&
                selectedNotification.actions.length > 0 && (
                  <div>
                    <h3
                      className={`font-semibold text-gray-900 mb-3 ${
                        isMobile ? "text-base" : "text-lg"
                      }`}
                    >
                      Available Actions
                    </h3>
                    <div
                      className={`gap-3 ${
                        isMobile
                          ? "grid grid-cols-1 space-y-2"
                          : "flex flex-wrap"
                      }`}
                    >
                      {selectedNotification.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant={index === 0 ? "primary" : "outline"}
                          onClick={() =>
                            handleNotificationAction(
                              selectedNotification,
                              action
                            )
                          }
                          className={isMobile ? "w-full text-sm" : ""}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile ? (
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
              >
                Back
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-gray-900 truncate">
                  Admin Notifications
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  System alerts and activities
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                icon={Filter}
              >
                Filter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                icon={Settings}
              >
                Settings
              </Button>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {isMobileFilterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setSelectedFilter(filter.id);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                      selectedFilter === filter.id
                        ? "bg-blue-100 text-blue-700"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  icon={CheckCircle}
                  className="flex-1 text-xs"
                >
                  Mark All Read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllNotifications}
                  icon={Trash2}
                  className="flex-1 text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Desktop Header */
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={onBack}
                className="mb-4"
                icon={ArrowLeft}
              >
                Back to Dashboard
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Admin Notification Center
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Monitor system alerts, user activities, and platform
                    notifications
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={markAllAsRead}
                    icon={CheckCircle}
                  >
                    Mark All Read
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearAllNotifications}
                    icon={Trash2}
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(true)}
                    icon={Settings}
                  >
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${
          isMobile ? "max-w-md" : "max-w-7xl"
        }`}
      >
        {/* Stats Overview */}
        <div
          className={`grid gap-4 mb-6 ${
            isMobile ? "grid-cols-2" : "grid-cols-1 md:grid-cols-4"
          }`}
        >
          <Card className={`${isMobile ? "p-4" : "p-6"}`}>
            <div
              className={`font-bold text-gray-900 ${
                isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              {notificationStats.total}
            </div>
            <div
              className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}
            >
              Total Notifications
            </div>
          </Card>
          <Card className={`${isMobile ? "p-4" : "p-6"}`}>
            <div
              className={`font-bold text-blue-600 ${
                isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              {notificationStats.unread}
            </div>
            <div
              className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}
            >
              Unread
            </div>
          </Card>
          <Card className={`${isMobile ? "p-4" : "p-6"}`}>
            <div
              className={`font-bold text-red-600 ${
                isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              {notificationStats.urgent}
            </div>
            <div
              className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}
            >
              Urgent
            </div>
          </Card>
          <Card className={`${isMobile ? "p-4" : "p-6"}`}>
            <div
              className={`font-bold text-yellow-600 ${
                isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              {notificationStats.high}
            </div>
            <div
              className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}
            >
              High Priority
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        {!isMobile && (
          <Card className="p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <div className="flex space-x-1">
                  {[
                    {
                      key: "all",
                      label: "All",
                      count: notificationStats.total,
                    },
                    {
                      key: "urgent",
                      label: "Urgent",
                      count: notificationStats.urgent,
                    },
                    { key: "security", label: "Security" },
                    { key: "financial", label: "Financial" },
                    { key: "business", label: "Business" },
                    { key: "content", label: "Content" },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setSelectedFilter(filter.key)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        selectedFilter === filter.key
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {filter.label} {filter.count && `(${filter.count})`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Mobile Search */}
        {isMobile && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              className="text-sm"
            />
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const NotificationIcon = getNotificationIcon(notification.type);
            const CategoryIcon = getCategoryIcon(notification.category);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-l-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${getNotificationColor(
                  notification.type,
                  notification.priority
                )} ${!notification.isRead ? "ring-2 ring-blue-100" : ""} ${
                  isMobile ? "p-4" : "p-6"
                }`}
                onClick={() => setSelectedNotification(notification)}
              >
                <div
                  className={`flex items-start ${
                    isMobile ? "flex-col space-y-3" : "justify-between"
                  }`}
                >
                  <div
                    className={`flex items-start flex-1 ${
                      isMobile ? "space-y-2 flex-col" : "space-x-4"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <NotificationIcon
                        className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`}
                      />
                      <CategoryIcon
                        className={`text-gray-600 ${
                          isMobile ? "w-3 h-3" : "w-4 h-4"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`flex items-center space-x-2 mb-1 ${
                          isMobile ? "flex-wrap" : ""
                        }`}
                      >
                        <h3
                          className={`font-semibold ${
                            !notification.isRead
                              ? "text-gray-900"
                              : "text-gray-700"
                          } ${isMobile ? "text-sm" : ""}`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {notification.message}
                      </p>
                      <div
                        className={`flex items-center text-xs text-gray-500 ${
                          isMobile
                            ? "flex-col space-y-1 items-start"
                            : "space-x-4"
                        }`}
                      >
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {notification.timestamp}
                        </span>
                        <span className="flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          {notification.source}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full font-medium ${
                            notification.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : notification.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {notification.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${
                      isMobile ? "space-x-1 mt-2" : "space-x-2"
                    }`}
                  >
                    {notification.actions &&
                      notification.actions.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {notification.actions.length} action
                          {notification.actions.length > 1 ? "s" : ""}
                        </span>
                      )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      icon={Trash2}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <Card className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You're all caught up! No new notifications at this time."}
            </p>
          </Card>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notification Settings
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSettings(false)}
                  icon={X}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Push Notifications
                  </span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    High Priority Only
                  </span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowSettings(false)}
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotificationCenter;
