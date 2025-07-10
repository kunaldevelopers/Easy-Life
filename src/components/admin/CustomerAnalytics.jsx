import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  UserPlus,
  RotateCcw,
  UserX,
  Activity,
  Download,
  Calendar,
  Filter,
  Search,
  BarChart3,
  MapPin,
  Clock,
  Star,
  DollarSign,
  Eye,
  MessageCircle,
  RefreshCw,
  Target,
  UserCheck,
  AlertCircle,
  Heart,
  ShoppingCart,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import CustomerAnalyticsCard from "../common/CustomerAnalyticsCard";

const CustomerAnalytics = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [selectedView, setSelectedView] = useState("overview");

  // Mock customer analytics data
  const customerAnalytics = {
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

  const detailedMetrics = {
    acquisition: {
      organicSearch: { count: 28, percentage: 37 },
      socialMedia: { count: 18, percentage: 24 },
      referrals: { count: 15, percentage: 20 },
      directTraffic: { count: 12, percentage: 16 },
      advertising: { count: 3, percentage: 3 },
    },
    engagement: {
      averageSessionTime: "4m 32s",
      pageViews: 2847,
      bounceRate: "34%",
      returnVisitorRate: "43%",
    },
    retention: {
      firstWeek: 85,
      firstMonth: 62,
      threeMonths: 45,
      sixMonths: 38,
      oneYear: 28,
    },
    satisfaction: {
      averageRating: 4.6,
      totalReviews: 234,
      positiveReviews: 198,
      neutralReviews: 28,
      negativeReviews: 8,
    },
  };

  const recentCustomers = [
    {
      id: "cust-045",
      name: "Rajesh Sharma",
      email: "rajesh.sharma@email.com",
      joinDate: "2025-01-08",
      lastActive: "2025-01-08",
      status: "active",
      segment: "new",
      totalOrders: 1,
      totalSpent: 450,
      location: "MG Road, Gangtok",
      avatar: null,
    },
    {
      id: "cust-044",
      name: "Priya Devi",
      email: "priya.devi@email.com",
      joinDate: "2025-01-07",
      lastActive: "2025-01-08",
      status: "active",
      segment: "repeat",
      totalOrders: 3,
      totalSpent: 1250,
      location: "Tadong, Gangtok",
      avatar: null,
    },
    {
      id: "cust-043",
      name: "Sita Gurung",
      email: "sita.gurung@email.com",
      joinDate: "2025-01-06",
      lastActive: "2025-01-07",
      status: "active",
      segment: "new",
      totalOrders: 2,
      totalSpent: 890,
      location: "Ranipool, Gangtok",
      avatar: null,
    },
    {
      id: "cust-042",
      name: "Deepak Rai",
      email: "deepak.rai@email.com",
      joinDate: "2025-01-05",
      lastActive: "2025-01-06",
      status: "active",
      segment: "lapsed",
      totalOrders: 1,
      totalSpent: 320,
      location: "Tibet Road, Gangtok",
      avatar: null,
    },
    {
      id: "cust-041",
      name: "Maya Lama",
      email: "maya.lama@email.com",
      joinDate: "2025-01-04",
      lastActive: "2025-01-05",
      status: "active",
      segment: "repeat",
      totalOrders: 5,
      totalSpent: 2100,
      location: "Development Area, Gangtok",
      avatar: null,
    },
  ];

  const locationData = [
    { area: "MG Road", customers: 18, percentage: 24 },
    { area: "Tadong", customers: 15, percentage: 20 },
    { area: "Ranipool", customers: 12, percentage: 16 },
    { area: "Development Area", customers: 10, percentage: 13 },
    { area: "Tibet Road", customers: 8, percentage: 11 },
    { area: "Others", customers: 13, percentage: 17 },
  ];

  const getSegmentColor = (segment) => {
    switch (segment) {
      case "new":
        return "bg-green-100 text-green-800";
      case "repeat":
        return "bg-blue-100 text-blue-800";
      case "lapsed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleExportData = () => {
    console.log("Exporting customer analytics data");
    alert("Customer analytics data exported successfully!");
  };

  const handleGetDeeperInsights = () => {
    setSelectedView("detailed");
  };

  const getMaxValue = (data) => Math.max(...data.map((item) => item.customers));

  if (selectedView === "detailed") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedView("overview")}
              className="mb-4"
            >
              ← Back to Overview
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Detailed Customer Analytics
                </h1>
                <p className="text-gray-600 mt-1">
                  In-depth analysis of customer behavior and trends
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="last7days">Last 7 days</option>
                  <option value="last30days">Last 30 days</option>
                  <option value="last90days">Last 90 days</option>
                  <option value="last12months">Last 12 months</option>
                </select>
                <Button variant="outline" icon={RefreshCw} size="sm">
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Customer Acquisition */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Customer Acquisition Sources
                </h2>
                <div className="space-y-4">
                  {Object.entries(detailedMetrics.acquisition).map(
                    ([source, data]) => (
                      <div
                        key={source}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {source.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${data.percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-600 w-12 text-right">
                            {data.count}
                          </div>
                          <div className="text-sm text-gray-500 w-12 text-right">
                            {data.percentage}%
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>

              {/* Retention Analysis */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Customer Retention Over Time
                </h2>
                <div className="grid grid-cols-5 gap-4">
                  {Object.entries(detailedMetrics.retention).map(
                    ([period, percentage]) => (
                      <div key={period} className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {percentage}%
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {period.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>

              {/* Geographic Distribution */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Customer Distribution by Location
                </h2>
                <div className="space-y-4">
                  {locationData.map((location, index) => {
                    const maxCustomers = getMaxValue(locationData);
                    const barWidth = (location.customers / maxCustomers) * 100;

                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-32 text-sm text-gray-600">
                          {location.area}
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                            style={{ width: `${barWidth}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 w-12 text-right">
                          {location.customers}
                        </div>
                        <div className="text-sm text-gray-500 w-12 text-right">
                          {location.percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Engagement Metrics */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Engagement Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Avg Session Time
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {detailedMetrics.engagement.averageSessionTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Page Views</span>
                    <span className="text-sm font-medium text-gray-900">
                      {detailedMetrics.engagement.pageViews.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bounce Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {detailedMetrics.engagement.bounceRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Return Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {detailedMetrics.engagement.returnVisitorRate}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Satisfaction Metrics */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Satisfaction
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {detailedMetrics.satisfaction.averageRating}
                    </div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Positive</span>
                      <span className="text-sm font-medium text-green-600">
                        {detailedMetrics.satisfaction.positiveReviews}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Neutral</span>
                      <span className="text-sm font-medium text-gray-600">
                        {detailedMetrics.satisfaction.neutralReviews}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Negative</span>
                      <span className="text-sm font-medium text-red-600">
                        {detailedMetrics.satisfaction.negativeReviews}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" size="sm">
                    Send Newsletter
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Create Segment
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Export Data
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Customer Analytics - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
              ← Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Customer Analytics
                </h1>
                <p className="text-gray-600 mt-1">
                  Comprehensive analysis of customer behavior and trends
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="last7days">Last 7 days</option>
                  <option value="last30days">Last 30 days</option>
                  <option value="last90days">Last 90 days</option>
                  <option value="last12months">Last 12 months</option>
                </select>
                <Button
                  variant="outline"
                  icon={Download}
                  onClick={handleExportData}
                >
                  Export
                </Button>
                <Button variant="outline" icon={RefreshCw} size="sm">
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Customer Analytics Card */}
            <div className="lg:col-span-1">
              <CustomerAnalyticsCard
                title="Platform Customers"
                data={customerAnalytics}
                onGetDeeperInsights={handleGetDeeperInsights}
              />
            </div>

            {/* Additional Metrics */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Active Today
                      </p>
                      <p className="text-2xl font-bold text-gray-900">28</p>
                      <p className="text-sm text-green-600">
                        +12% vs yesterday
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Avg Order Value
                      </p>
                      <p className="text-2xl font-bold text-gray-900">₹1,245</p>
                      <p className="text-sm text-green-600">
                        +8% vs last month
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Conversion Rate
                      </p>
                      <p className="text-2xl font-bold text-gray-900">3.2%</p>
                      <p className="text-sm text-green-600">
                        +0.4% vs last month
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Customers */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Customers
                  </h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentCustomers.map((customer) => (
                    <motion.div
                      key={customer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {customer.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {customer.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(
                              customer.segment
                            )}`}
                          >
                            {customer.segment}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          ₹{customer.totalSpent} • {customer.totalOrders} orders
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAnalytics;
