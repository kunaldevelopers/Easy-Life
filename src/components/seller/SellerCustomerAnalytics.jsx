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
  Star,
  DollarSign,
  MessageCircle,
  RefreshCw,
  Target,
  Heart,
  MapPin,
  Phone,
  Mail,
  Eye,
  Clock,
  BarChart3,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import CustomerAnalyticsCard from "../common/CustomerAnalyticsCard";

const SellerCustomerAnalytics = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [selectedView, setSelectedView] = useState("overview");

  // Mock seller-specific customer analytics data
  const customerAnalytics = {
    lastUpdated: "a day ago",
    total: {
      count: 42,
      percentage: 18,
      previousCount: 36,
    },
    new: {
      count: 18,
      percentage: 25,
      description: "First-time customers",
    },
    repeat: {
      count: 20,
      percentage: 15,
      description: "Returning customers",
    },
    lapsed: {
      count: 4,
      percentage: 33,
      description: "Haven't booked in 60+ days",
    },
  };

  const businessMetrics = {
    averageOrderValue: 1850,
    customerLifetimeValue: 4250,
    repeatCustomerRate: 48,
    customerSatisfactionScore: 4.7,
    referralRate: 12,
    churnRate: 8,
  };

  const topCustomers = [
    {
      id: "cust-001",
      name: "Rajesh Sharma",
      email: "rajesh.sharma@email.com",
      phone: "+91 9841234567",
      location: "MG Road, Gangtok",
      totalBookings: 8,
      totalSpent: 15500,
      averageRating: 4.9,
      lastBooking: "2025-01-08",
      segment: "vip",
      notes: "Prefers weekend appointments",
    },
    {
      id: "cust-002",
      name: "Priya Devi",
      email: "priya.devi@email.com",
      phone: "+91 9812345678",
      location: "Tadong, Gangtok",
      totalBookings: 6,
      totalSpent: 12200,
      averageRating: 4.8,
      lastBooking: "2025-01-07",
      segment: "regular",
      notes: "Always books morning slots",
    },
    {
      id: "cust-003",
      name: "Sita Gurung",
      email: "sita.gurung@email.com",
      phone: "+91 9823456789",
      location: "Ranipool, Gangtok",
      totalBookings: 5,
      totalSpent: 9800,
      averageRating: 4.6,
      lastBooking: "2025-01-06",
      segment: "regular",
      notes: "Prefers eco-friendly options",
    },
    {
      id: "cust-004",
      name: "Deepak Rai",
      email: "deepak.rai@email.com",
      phone: "+91 9834567890",
      location: "Tibet Road, Gangtok",
      totalBookings: 4,
      totalSpent: 8500,
      averageRating: 4.5,
      lastBooking: "2025-01-05",
      segment: "regular",
      notes: "Budget-conscious customer",
    },
    {
      id: "cust-005",
      name: "Maya Lama",
      email: "maya.lama@email.com",
      phone: "+91 9845678901",
      location: "Development Area, Gangtok",
      totalBookings: 3,
      totalSpent: 6750,
      averageRating: 4.7,
      lastBooking: "2025-01-04",
      segment: "new",
      notes: "Referred by Rajesh Sharma",
    },
  ];

  const customerJourney = [
    { stage: "Awareness", customers: 150, percentage: 100 },
    { stage: "Interest", customers: 89, percentage: 59 },
    { stage: "Consideration", customers: 67, percentage: 45 },
    { stage: "Purchase", customers: 42, percentage: 28 },
    { stage: "Retention", customers: 20, percentage: 13 },
    { stage: "Advocacy", customers: 8, percentage: 5 },
  ];

  const getSegmentColor = (segment) => {
    switch (segment) {
      case "vip":
        return "bg-purple-100 text-purple-800";
      case "regular":
        return "bg-blue-100 text-blue-800";
      case "new":
        return "bg-green-100 text-green-800";
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

  const handleCustomerAction = (customerId, action) => {
    console.log(`${action} customer:`, customerId);
    // In real app, this would trigger appropriate actions
  };

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
                  Detailed Customer Insights
                </h1>
                <p className="text-gray-600 mt-1">
                  Deep dive into your customer relationships and behavior
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
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Journey Funnel */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Customer Journey Funnel
                </h2>
                <div className="space-y-4">
                  {customerJourney.map((stage, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-24 text-sm text-gray-600">
                        {stage.stage}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ width: `${stage.percentage}%` }}
                        >
                          {stage.customers}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 w-12 text-right">
                        {stage.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Customers */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Top Customers
                </h2>
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <motion.div
                      key={customer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
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
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500">
                              {customer.totalBookings} bookings
                            </span>
                            <span className="text-xs text-green-600">
                              ₹{customer.totalSpent.toLocaleString()}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-500">
                                {customer.averageRating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSegmentColor(
                            customer.segment
                          )}`}
                        >
                          {customer.segment.toUpperCase()}
                        </span>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleCustomerAction(customer.id, "message")
                            }
                          >
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleCustomerAction(customer.id, "call")
                            }
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleCustomerAction(customer.id, "view")
                            }
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Business Metrics */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Business Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Avg Order Value
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{businessMetrics.averageOrderValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer LTV</span>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{businessMetrics.customerLifetimeValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Repeat Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {businessMetrics.repeatCustomerRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Satisfaction</span>
                    <span className="text-sm font-medium text-gray-900">
                      {businessMetrics.customerSatisfactionScore}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Referral Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {businessMetrics.referralRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Churn Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {businessMetrics.churnRate}%
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" size="sm">
                    Send Follow-up Message
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Schedule Reminder
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Create Loyalty Program
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    Export Customer List
                  </Button>
                </div>
              </Card>

              {/* Customer Insights */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Insights
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      Peak booking time: 2-4 PM on weekdays
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      Highest satisfaction: Emergency services
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      Most referrals come from satisfied VIP customers
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      Weekend bookings have 15% higher value
                    </p>
                  </div>
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
        <title>Customer Analytics - Business Dashboard</title>
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
                  Understand your customer base and improve relationships
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
                title="Your Customers"
                data={customerAnalytics}
                onGetDeeperInsights={handleGetDeeperInsights}
              />
            </div>

            {/* Additional Business Metrics */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Avg Order Value
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{businessMetrics.averageOrderValue.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600">
                        +12% vs last month
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <RotateCcw className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Repeat Rate
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {businessMetrics.repeatCustomerRate}%
                      </p>
                      <p className="text-sm text-green-600">
                        +3% vs last month
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-yellow-100">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Satisfaction
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {businessMetrics.customerSatisfactionScore}
                      </p>
                      <p className="text-sm text-green-600">
                        +0.2 vs last month
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Customer Overview */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Customer Overview
                  </h2>
                  <Button variant="outline" size="sm">
                    View All Customers
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Customer Segments
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">VIP</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          5
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Regular</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          20
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">New</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          18
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Top Locations
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">MG Road</span>
                        <span className="text-sm font-medium text-gray-900">
                          12
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Tadong</span>
                        <span className="text-sm font-medium text-gray-900">
                          8
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Ranipool</span>
                        <span className="text-sm font-medium text-gray-900">
                          6
                        </span>
                      </div>
                    </div>
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

export default SellerCustomerAnalytics;
