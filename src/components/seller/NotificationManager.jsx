import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BellRing,
  Calendar,
  MessageCircle,
  Star,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Mail,
  Trash2,
  Settings,
  X,
  ArrowLeft,
  Search,
  MoreVertical,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const NotificationManager = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock notifications data
  const notifications = [
    {
      id: "notif-001",
      type: "booking",
      priority: "high",
      title: "New Urgent Booking Request",
      message: "Emergency electrical repair needed at MG Road, Gangtok",
      customer: "Rajesh Sharma",
      timestamp: "2 minutes ago",
      isRead: false,
      actionRequired: true,
      relatedId: "ORD001",
      amount: 1500,
      icon: Calendar,
      color: "bg-red-100 text-red-600",
    },
    {
      id: "notif-002",
      type: "review",
      priority: "medium",
      title: "New 5-Star Review Received",
      message: "Excellent service and very professional staff!",
      customer: "Priya Devi",
      timestamp: "15 minutes ago",
      isRead: false,
      actionRequired: false,
      relatedId: "REV002",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "notif-003",
      type: "payment",
      priority: "high",
      title: "Payment Received",
      message: "₹2,500 payment confirmed for electrical installation",
      customer: "Deepak Rai",
      timestamp: "1 hour ago",
      isRead: true,
      actionRequired: false,
      relatedId: "PAY003",
      amount: 2500,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "notif-004",
      type: "inquiry",
      priority: "medium",
      title: "New Service Inquiry",
      message: "Looking for home automation installation services",
      customer: "Sita Gurung",
      timestamp: "3 hours ago",
      isRead: true,
      actionRequired: true,
      relatedId: "INQ004",
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "notif-005",
      type: "booking",
      priority: "low",
      title: "Booking Confirmed",
      message: "Customer confirmed appointment for December 25th",
      customer: "Amit Thapa",
      timestamp: "5 hours ago",
      isRead: true,
      actionRequired: false,
      relatedId: "ORD005",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "notif-006",
      type: "system",
      priority: "medium",
      title: "Profile Views Spike",
      message: "Your profile received 50+ views in the last hour",
      timestamp: "6 hours ago",
      isRead: false,
      actionRequired: false,
      icon: Bell,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "notif-007",
      type: "booking",
      priority: "high",
      title: "Booking Cancellation",
      message: "Customer cancelled wedding photography booking",
      customer: "Karma Bhutia",
      timestamp: "1 day ago",
      isRead: true,
      actionRequired: false,
      relatedId: "ORD007",
      amount: -5000,
      icon: X,
      color: "bg-red-100 text-red-600",
    },
  ];

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      newBookings: true,
      payments: true,
      reviews: true,
      cancellations: true,
    },
    pushNotifications: {
      urgentBookings: true,
      payments: true,
      reviews: false,
      systemUpdates: true,
    },
    soundAlerts: {
      urgentBookings: true,
      payments: false,
      allNotifications: false,
    },
  });

  // Mobile detection useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter and search functionality
  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      selectedFilter === "all" || notification.type === selectedFilter;
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notification.customer &&
        notification.customer.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const urgentCount = notifications.filter(
    (n) => n.priority === "high" && !n.isRead
  ).length;

  const handleMarkAsRead = (notificationId) => {
    // In real app, this would update the backend
    console.log(`Marking notification ${notificationId} as read`);
  };

  const handleMarkAllAsRead = () => {
    // In real app, this would update all notifications
    console.log("Marking all notifications as read");
  };

  const handleDeleteNotification = (notificationId) => {
    // In real app, this would delete from backend
    console.log(`Deleting notification ${notificationId}`);
  };

  const handleNotificationAction = (notification) => {
    switch (notification.type) {
      case "booking":
        // Navigate to booking details
        console.log(`Opening booking ${notification.relatedId}`);
        break;
      case "inquiry":
        // Navigate to inquiries
        console.log(`Opening inquiry ${notification.relatedId}`);
        break;
      case "review":
        // Navigate to reviews
        console.log(`Opening review ${notification.relatedId}`);
        break;
      case "payment":
        // Navigate to financial dashboard
        console.log(`Opening payment ${notification.relatedId}`);
        break;
      default:
        break;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Mobile Notification Detail View
  if (isMobile && selectedNotification) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Notification Details
                </h1>
                <p className="text-sm text-gray-500">
                  {selectedNotification.timestamp}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteNotification(selectedNotification.id)}
              className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Content */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <div className="flex items-start space-x-3 mb-4">
              <div
                className={`p-3 rounded-lg ${
                  selectedNotification.color.split(" ")[0]
                }`}
              >
                <selectedNotification.icon
                  className={`w-5 h-5 ${
                    selectedNotification.color.split(" ")[1]
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedNotification.title}
                  </h2>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
                      selectedNotification.priority
                    )}`}
                  >
                    {selectedNotification.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {selectedNotification.message}
                </p>
              </div>
            </div>

            {selectedNotification.customer && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer</span>
                  <span className="font-medium">
                    {selectedNotification.customer}
                  </span>
                </div>
              </div>
            )}

            {selectedNotification.amount && (
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount</span>
                  <span
                    className={`font-bold ${
                      selectedNotification.amount > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedNotification.amount > 0 ? "+" : ""}₹
                    {Math.abs(selectedNotification.amount).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </Card>

          {selectedNotification.actionRequired && (
            <div className="flex space-x-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => handleNotificationAction(selectedNotification)}
              >
                Take Action
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleMarkAsRead(selectedNotification.id)}
              >
                Mark as Read
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                ← Back to Notifications
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Notification Settings
              </h1>
            </div>

            <div className="space-y-8">
              {/* Email Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Email Notifications
                </h3>
                <div className="space-y-3">
                  {Object.entries(notificationSettings.emailNotifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                emailNotifications: {
                                  ...prev.emailNotifications,
                                  [key]: e.target.checked,
                                },
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Push Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Push Notifications
                </h3>
                <div className="space-y-3">
                  {Object.entries(notificationSettings.pushNotifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                pushNotifications: {
                                  ...prev.pushNotifications,
                                  [key]: e.target.checked,
                                },
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Sound Alerts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sound Alerts
                </h3>
                <div className="space-y-3">
                  {Object.entries(notificationSettings.soundAlerts).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                soundAlerts: {
                                  ...prev.soundAlerts,
                                  [key]: e.target.checked,
                                },
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button variant="primary" className="w-full">
                  Save Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Notifications
              </h1>
              <p className="text-sm text-gray-500">
                {unreadCount} unread • {urgentCount} urgent
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search & Filter */}
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-2">
            {["all", "booking", "payment", "review", "system"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedFilter === filter
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
              ← Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-gray-600 mt-1">
                  Stay updated with your business activities
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleMarkAllAsRead}
                  icon={CheckCircle}
                >
                  Mark All Read
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

          {/* Desktop Search & Filter */}
          <Card className="p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Types</option>
                  <option value="booking">Bookings</option>
                  <option value="payment">Payments</option>
                  <option value="review">Reviews</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Desktop Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {filteredNotifications.length}
              </div>
              <div className="text-sm text-gray-600">Total Notifications</div>
            </Card>
            <Card className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {unreadCount}
              </div>
              <div className="text-sm text-gray-600">Unread</div>
            </Card>
            <Card className="p-6">
              <div className="text-2xl font-bold text-red-600">
                {urgentCount}
              </div>
              <div className="text-sm text-gray-600">Urgent</div>
            </Card>
            <Card className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {
                  filteredNotifications.filter(
                    (n) => n.actionRequired && !n.isRead
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Action Required</div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All", count: notifications.length },
                  { key: "unread", label: "Unread", count: unreadCount },
                  { key: "urgent", label: "Urgent", count: urgentCount },
                  {
                    key: "booking",
                    label: "Bookings",
                    count: notifications.filter((n) => n.type === "booking")
                      .length,
                  },
                  {
                    key: "payment",
                    label: "Payments",
                    count: notifications.filter((n) => n.type === "payment")
                      .length,
                  },
                  {
                    key: "review",
                    label: "Reviews",
                    count: notifications.filter((n) => n.type === "review")
                      .length,
                  },
                  {
                    key: "inquiry",
                    label: "Inquiries",
                    count: notifications.filter((n) => n.type === "inquiry")
                      .length,
                  },
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
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Search Bar - New Addition */}
          <div className="mb-6">
            <Card className="p-4">
              <div className="flex items-center">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder-gray-400"
                />
              </div>
            </Card>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${
                    !notification.isRead
                      ? "border-l-4 border-l-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${notification.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full border ${getPriorityBadge(
                              notification.priority
                            )}`}
                          >
                            {notification.priority}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>

                        <p className="text-gray-600 mb-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{notification.timestamp}</span>
                          </div>
                          {notification.customer && (
                            <span>from {notification.customer}</span>
                          )}
                          {notification.amount && (
                            <span
                              className={`font-medium ${
                                notification.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {notification.amount > 0 ? "+" : ""}₹
                              {Math.abs(notification.amount).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {notification.actionRequired && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleNotificationAction(notification)}
                        >
                          {notification.type === "booking"
                            ? "Review"
                            : "Respond"}
                        </Button>
                      )}

                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(notification.id)}
                          icon={Mail}
                        >
                          Mark Read
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleDeleteNotification(notification.id)
                        }
                        icon={Trash2}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Delete
                      </Button>
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
                {selectedFilter !== "all"
                  ? "Try adjusting your filter criteria."
                  : "You're all caught up! No new notifications."}
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Mobile Notifications List */}
      <div className="lg:hidden p-4 space-y-3">
        {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all ${
                !notification.isRead
                  ? "border-l-4 border-blue-500 bg-blue-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    notification.color.split(" ")[0]
                  } flex-shrink-0`}
                >
                  <notification.icon
                    className={`w-4 h-4 ${notification.color.split(" ")[1]}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {notification.customer && (
                        <span className="text-xs text-gray-500">
                          {notification.customer}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
                          notification.priority
                        )}`}
                      >
                        {notification.priority.toUpperCase()}
                      </span>
                    </div>
                    {notification.amount && (
                      <span
                        className={`text-sm font-bold ${
                          notification.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {notification.amount > 0 ? "+" : ""}₹
                        {Math.abs(notification.amount).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredNotifications.length === 0 && (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">
                No notifications found
              </h3>
              <p className="text-sm">
                {searchTerm || selectedFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "All caught up! No new notifications."}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Desktop Notifications List */}
      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.isRead
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        notification.color.split(" ")[0]
                      } flex-shrink-0`}
                    >
                      <notification.icon
                        className={`w-5 h-5 ${
                          notification.color.split(" ")[1]
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityBadge(
                              notification.priority
                            )}`}
                          >
                            {notification.priority.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {notification.customer && (
                            <span className="text-sm text-gray-500">
                              Customer: {notification.customer}
                            </span>
                          )}
                          {notification.amount && (
                            <span
                              className={`text-sm font-bold ${
                                notification.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {notification.amount > 0 ? "+" : ""}₹
                              {Math.abs(notification.amount).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {notification.actionRequired && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() =>
                                handleNotificationAction(notification)
                              }
                            >
                              Take Action
                            </Button>
                          )}
                          {!notification.isRead && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteNotification(notification.id)
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-gray-500">
                  <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">
                    No notifications found
                  </h3>
                  <p>
                    {searchTerm || selectedFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "All caught up! No new notifications."}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationManager;
