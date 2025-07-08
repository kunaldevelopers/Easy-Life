import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Users,
  Store,
  DollarSign,
  Eye,
  MessageCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Filter,
  Search,
  Download,
  Bell,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const ActivityMonitor = ({ onBack }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("live");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock real-time activity data
  const [activities, setActivities] = useState([
    {
      id: "act-001",
      type: "user_registration",
      user: "Rajesh Sharma",
      action: "New user registered",
      details: "Customer account created from Gangtok",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      location: "Gangtok, Sikkim",
      device: "mobile",
      ip: "192.168.1.100",
      severity: "info",
    },
    {
      id: "act-002",
      type: "business_listing",
      user: "Priya Devi",
      action: "Business listing updated",
      details: "Coffee Corner updated business hours and photos",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      location: "Gangtok, Sikkim",
      device: "desktop",
      ip: "192.168.1.101",
      severity: "info",
    },
    {
      id: "act-003",
      type: "transaction",
      user: "Sita Gurung",
      action: "Payment processed",
      details: "₹1,250 payment for tech repair service",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      location: "Gangtok, Sikkim",
      device: "mobile",
      ip: "192.168.1.102",
      severity: "success",
    },
    {
      id: "act-004",
      type: "security_alert",
      user: "System",
      action: "Multiple failed login attempts",
      details: "5 failed attempts for user 'john_doe' from suspicious IP",
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      location: "Unknown",
      device: "unknown",
      ip: "203.45.67.89",
      severity: "warning",
    },
    {
      id: "act-005",
      type: "review_posted",
      user: "Deepak Rai",
      action: "Review posted",
      details: "5-star review for Mountain View Restaurant",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      location: "Gangtok, Sikkim",
      device: "mobile",
      ip: "192.168.1.103",
      severity: "info",
    },
    {
      id: "act-006",
      type: "error",
      user: "System",
      action: "Database connection error",
      details: "Temporary connection timeout resolved automatically",
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      location: "Server",
      device: "server",
      ip: "10.0.0.1",
      severity: "error",
    },
    {
      id: "act-007",
      type: "booking",
      user: "Maya Lama",
      action: "Service booked",
      details: "Booked electrical repair service for tomorrow",
      timestamp: new Date(Date.now() - 22 * 60 * 1000),
      location: "Gangtok, Sikkim",
      device: "desktop",
      ip: "192.168.1.104",
      severity: "info",
    },
    {
      id: "act-008",
      type: "admin_action",
      user: "Admin User",
      action: "User account suspended",
      details: "Suspended user account for policy violation",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      location: "Admin Panel",
      device: "desktop",
      ip: "192.168.1.1",
      severity: "warning",
    },
  ]);

  // Mock system metrics
  const systemMetrics = {
    activeUsers: 847,
    onlineBusinesses: 156,
    transactionsPerHour: 23,
    avgResponseTime: 245,
    systemUptime: "99.8%",
    errorRate: "0.02%",
    peakHours: "2:00 PM - 4:00 PM",
    mostActiveLocation: "Gangtok",
  };

  // Mock performance data
  const performanceData = {
    cpuUsage: 65,
    memoryUsage: 72,
    diskUsage: 45,
    networkLoad: 38,
    databaseQueries: 156,
    apiRequests: 1247,
  };

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity = {
        id: `act-${Date.now()}`,
        type: ["user_registration", "transaction", "review_posted", "booking"][
          Math.floor(Math.random() * 4)
        ],
        user: ["New User", "Anonymous", "Customer"][
          Math.floor(Math.random() * 3)
        ],
        action: "Real-time activity",
        details: "Live activity simulation",
        timestamp: new Date(),
        location: "Gangtok, Sikkim",
        device: ["mobile", "desktop"][Math.floor(Math.random() * 2)],
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        severity: "info",
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 19)]); // Keep last 20
      setLastUpdate(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter =
      selectedFilter === "all" || activity.type === selectedFilter;
    const matchesSearch =
      searchTerm === "" ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case "user_registration":
        return Users;
      case "business_listing":
        return Store;
      case "transaction":
        return DollarSign;
      case "security_alert":
        return AlertCircle;
      case "review_posted":
        return MessageCircle;
      case "booking":
        return Calendar;
      case "admin_action":
        return Eye;
      case "error":
        return AlertCircle;
      default:
        return Activity;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "error":
        return "text-red-600 bg-red-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "success":
        return "text-green-600 bg-green-100";
      case "info":
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case "mobile":
        return Smartphone;
      case "desktop":
        return Monitor;
      case "server":
        return Globe;
      default:
        return Monitor;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const exportActivityLog = () => {
    console.log("Exporting activity log...");
    alert("Activity log will be exported to CSV format");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Activity Monitor
              </h1>
              <p className="text-gray-600 mt-1 flex items-center">
                Real-time platform activity and system monitoring
                <span className="ml-2 flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                  Live
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Auto-refresh</span>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoRefresh ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoRefresh ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <Button
                variant="outline"
                icon={Download}
                onClick={exportActivityLog}
              >
                Export Log
              </Button>
              <Button
                variant="outline"
                icon={RefreshCw}
                onClick={() => setLastUpdate(new Date())}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* System Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-blue-600">
                  {systemMetrics.activeUsers}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Online Businesses</p>
                <p className="text-2xl font-bold text-green-600">
                  {systemMetrics.onlineBusinesses}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Store className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions/Hour</p>
                <p className="text-2xl font-bold text-purple-600">
                  {systemMetrics.transactionsPerHour}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-green-600">
                  {systemMetrics.systemUptime}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Performance
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "CPU Usage",
                  value: performanceData.cpuUsage,
                  color: "blue",
                },
                {
                  label: "Memory Usage",
                  value: performanceData.memoryUsage,
                  color: "green",
                },
                {
                  label: "Disk Usage",
                  value: performanceData.diskUsage,
                  color: "yellow",
                },
                {
                  label: "Network Load",
                  value: performanceData.networkLoad,
                  color: "purple",
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {metric.label}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-${metric.color}-500`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {metric.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              API & Database
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Database Queries</p>
                  <p className="text-xl font-bold text-blue-600">
                    {performanceData.databaseQueries}/min
                  </p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">API Requests</p>
                  <p className="text-xl font-bold text-green-600">
                    {performanceData.apiRequests}/min
                  </p>
                </div>
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {systemMetrics.avgResponseTime}ms
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex space-x-1">
                {[
                  { key: "all", label: "All" },
                  { key: "user_registration", label: "Users" },
                  { key: "transaction", label: "Payments" },
                  { key: "security_alert", label: "Security" },
                  { key: "error", label: "Errors" },
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
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()} • Showing{" "}
            {filteredActivities.length} activities
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Live Activity Feed
            </h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredActivities.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type);
              const DeviceIcon = getDeviceIcon(activity.device);

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${getSeverityColor(
                        activity.severity
                      )}`}
                    >
                      <ActivityIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <DeviceIcon className="w-3 h-3" />
                          <span>{formatTimeAgo(activity.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {activity.details}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {activity.user}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {activity.location}
                        </span>
                        <span className="font-mono">{activity.ip}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {filteredActivities.length === 0 && (
          <Card className="p-12 text-center mt-6">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No activities found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No recent activities to display."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ActivityMonitor;
