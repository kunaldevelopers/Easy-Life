import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  Activity,
  CreditCard,
  ShoppingCart,
  Bell,
  CalendarCheck,
  Clock,
  Settings,
  MapPin,
  Tag,
  Camera,
  User,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import CustomerAnalyticsCard from "../components/common/CustomerAnalyticsCard";
import BusinessProfileEditor from "../components/seller/BusinessProfileEditor";
import InquiriesManager from "../components/seller/InquiriesManager";
import PhotoManager from "../components/seller/PhotoManager";
import BusinessHoursManager from "../components/seller/BusinessHoursManager";
import ReviewsManager from "../components/seller/ReviewsManager";
import EngagementManager from "../components/seller/EngagementManager";
import ViewsManager from "../components/seller/ViewsManager";
import BookingsManager from "../components/seller/BookingsManager";
import ServiceManagement from "../components/seller/ServiceManagement";
import NotificationManager from "../components/seller/NotificationManager";
import CalendarManager from "../components/seller/CalendarManager";
import FinancialManager from "../components/seller/FinancialManager";
import FinancialDashboard from "../components/seller/FinancialDashboard";
import CRMManager from "../components/seller/CRMManager";
import SellerCustomerAnalytics from "../components/seller/SellerCustomerAnalytics";

const SellerPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get("view") || "dashboard";
  const [serviceManagementTab, setServiceManagementTab] = useState("orders");

  // Mobile orders state - moved to top level to avoid hooks violations
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mobile orders data - moved to top level to avoid hooks violations
  const mobileBookings = [
    {
      id: 1,
      customerName: "Deepak Rai",
      email: "deepak.rai@email.com",
      phone: "+977 9841234567",
      service: "Wedding Photography",
      eventDate: "December 15, 2024",
      eventTime: "10:00 AM - 6:00 PM",
      location: "Marriott Hotel, Kathmandu",
      requestDate: "Yesterday",
      timestamp: "Dec 14, 2024 3:30 PM",
      status: "pending",
      guestCount: 150,
      budget: "Rs. 75,000",
      specialRequests:
        "Need drone photography and traditional ceremony coverage",
    },
    {
      id: 2,
      customerName: "Sita Gurung",
      email: "sita.gurung@email.com",
      phone: "+977 9812345678",
      service: "Birthday Party Catering",
      eventDate: "December 20, 2024",
      eventTime: "6:00 PM - 10:00 PM",
      location: "Private Residence, Lalitpur",
      requestDate: "3 days ago",
      timestamp: "Dec 12, 2024 2:15 PM",
      status: "confirmed",
      guestCount: 25,
      budget: "Rs. 15,000",
      specialRequests: "Vegetarian menu only, birthday cake included",
    },
    {
      id: 3,
      customerName: "Rajesh Thapa",
      email: "rajesh.thapa@email.com",
      phone: "+977 9823456789",
      service: "Corporate Event Catering",
      eventDate: "December 18, 2024",
      eventTime: "12:00 PM - 2:00 PM",
      location: "Soaltee Hotel, Kathmandu",
      requestDate: "1 week ago",
      timestamp: "Dec 8, 2024 10:45 AM",
      status: "confirmed",
      guestCount: 80,
      budget: "Rs. 40,000",
      specialRequests: "Lunch buffet, corporate presentation setup",
    },
    {
      id: 4,
      customerName: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+977 9834567890",
      service: "Anniversary Celebration",
      eventDate: "December 25, 2024",
      eventTime: "7:00 PM - 11:00 PM",
      location: "Garden Venue, Bhaktapur",
      requestDate: "2 weeks ago",
      timestamp: "Dec 1, 2024 4:20 PM",
      status: "cancelled",
      guestCount: 40,
      budget: "Rs. 25,000",
      specialRequests: "Romantic setup, live music arrangement",
      cancellationReason: "Venue changed due to weather concerns",
    },
    {
      id: 5,
      customerName: "Amit Lama",
      email: "amit.lama@email.com",
      phone: "+977 9845678901",
      service: "Graduation Party",
      eventDate: "January 5, 2025",
      eventTime: "5:00 PM - 9:00 PM",
      location: "Community Hall, Pokhara",
      requestDate: "3 weeks ago",
      timestamp: "Nov 24, 2024 6:30 PM",
      status: "confirmed",
      guestCount: 60,
      budget: "Rs. 30,000",
      specialRequests: "Photo booth setup, mixed cuisine",
    },
  ];

  // Mock customer analytics data for seller dashboard
  const sellerCustomerAnalytics = {
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

  // Handle navigation between different views
  const handleViewChange = (view) => {
    if (view === "dashboard") {
      setSearchParams({});
    } else {
      setSearchParams({ view });
    }
  };

  // Handle service management navigation with specific tab
  const handleServiceManagementView = (tab = "orders") => {
    setServiceManagementTab(tab);
    setSearchParams({ view: "service-management" });
  };

  // Handle activity-specific navigation
  const handleActivityAction = (activity) => {
    switch (activity.type) {
      case "inquiry":
        handleViewChange("inquiries");
        break;
      case "review":
        handleViewChange("reviews");
        break;
      case "engagement":
        handleViewChange("engagement");
        break;
      case "views":
        handleViewChange("views");
        break;
      case "booking":
        handleViewChange("bookings");
        break;
      default:
        handleViewChange("inquiries");
    }
  };

  const handleBackToDashboard = () => {
    setSearchParams({});
  };

  // Render different views based on currentView state
  if (currentView === "business-profile") {
    return <BusinessProfileEditor onBack={handleBackToDashboard} />;
  }

  if (currentView === "inquiries") {
    return <InquiriesManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "photos") {
    return <PhotoManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "analytics") {
    return (
      <>
        <Helmet>
          <title>Analytics - Easy Life Gangtok</title>
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
                    Business Analytics
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    Track your business performance and insights
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
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +12%
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">2,847</p>
                  <p className="text-xs text-gray-600">Total Views</p>
                  <p className="text-xs text-gray-500">+12% vs last month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +8%
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">47</p>
                  <p className="text-xs text-gray-600">Inquiries</p>
                  <p className="text-xs text-gray-500">+8% vs last month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +0.2
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">4.6</p>
                  <p className="text-xs text-gray-600">Avg Rating</p>
                  <p className="text-xs text-gray-500">+0.2 vs last month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    +0.3%
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">1.65%</p>
                  <p className="text-xs text-gray-600">Conversion</p>
                  <p className="text-xs text-gray-500">+0.3% vs last month</p>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Performance Trends
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Views Growth</span>
                  <span className="font-medium text-green-600">+24%</span>
                </div>
                {[
                  { month: "Jan", views: 2100 },
                  { month: "Feb", views: 2300 },
                  { month: "Mar", views: 2847 },
                ].map((data, index) => (
                  <div key={data.month} className="flex items-center space-x-3">
                    <span className="w-8 text-sm text-gray-600">
                      {data.month}
                    </span>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.views / 3000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {data.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Insights */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Customer Insights
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Peak Activity Time
                  </span>
                  <span className="text-sm font-medium">2-6 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Top Service Category
                  </span>
                  <span className="text-sm font-medium">Food & Catering</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="text-sm font-medium text-green-600">
                    95%
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
                onClick={() => handleViewChange("orders")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "orders" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Orders</span>
              </button>
              <button
                onClick={() => handleViewChange("earnings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "earnings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <DollarSign className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Earnings</span>
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
                onClick={() => handleViewChange("profile")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "profile" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (currentView === "business-hours") {
    return <BusinessHoursManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "reviews") {
    return <ReviewsManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "engagement") {
    return <EngagementManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "views") {
    return <ViewsManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "bookings") {
    return <BookingsManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "service-management") {
    return (
      <ServiceManagement
        onBack={handleBackToDashboard}
        initialTab={serviceManagementTab}
      />
    );
  }

  if (currentView === "notifications") {
    return <NotificationManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "calendar") {
    return <CalendarManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "financial") {
    return <FinancialManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "crm") {
    return <CRMManager onBack={handleBackToDashboard} />;
  }

  if (currentView === "customer-analytics") {
    return <SellerCustomerAnalytics onBack={handleBackToDashboard} />;
  }

  // Mobile Orders View (Same as Desktop BookingsManager)
  if (currentView === "orders") {
    // Data is now defined at top level to avoid hooks violations
    const filteredBookings = mobileBookings.filter((booking) => {
      const matchesStatus =
        selectedOrderStatus === "all" || booking.status === selectedOrderStatus;
      return matchesStatus;
    });

    const bookingStats = {
      total: mobileBookings.length,
      pending: mobileBookings.filter((b) => b.status === "pending").length,
      confirmed: mobileBookings.filter((b) => b.status === "confirmed").length,
      cancelled: mobileBookings.filter((b) => b.status === "cancelled").length,
      totalRevenue: mobileBookings
        .filter((b) => b.status === "confirmed")
        .reduce((sum, b) => sum + parseInt(b.budget.replace(/[^0-9]/g, "")), 0),
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "pending":
          return "bg-orange-100 text-orange-700";
        case "confirmed":
          return "bg-green-100 text-green-700";
        case "cancelled":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case "pending":
          return <AlertCircle className="w-4 h-4 text-orange-500" />;
        case "confirmed":
          return <CheckCircle className="w-4 h-4 text-green-500" />;
        case "cancelled":
          return <XCircle className="w-4 h-4 text-red-500" />;
        default:
          return <AlertCircle className="w-4 h-4 text-gray-500" />;
      }
    };

    const handleStatusUpdate = (bookingId, newStatus) => {
      alert(`Order ${bookingId} ${newStatus}`);
    };

    const handleSendMessage = (bookingId) => {
      alert(`Sending message to customer for booking ${bookingId}`);
    };

    if (selectedBooking) {
      return (
        <>
          <Helmet>
            <title>Order Details - Easy Life Gangtok</title>
          </Helmet>
          <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg font-bold text-gray-900 truncate">
                      Order Details
                    </h1>
                    <p className="text-xs text-gray-500 truncate">
                      {selectedBooking.service}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="px-4 max-w-md mx-auto space-y-4">
              {/* Order Header */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {selectedBooking.service}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedBooking.status)}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          selectedBooking.status
                        )}`}
                      >
                        {selectedBooking.status.charAt(0).toUpperCase() +
                          selectedBooking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedBooking.budget}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedBooking.guestCount} guests
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Customer Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {selectedBooking.customerName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a
                      href={`mailto:${selectedBooking.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedBooking.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a
                      href={`tel:${selectedBooking.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedBooking.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Event Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {selectedBooking.eventDate}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {selectedBooking.eventTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {selectedBooking.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Special Requests
                </h4>
                <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg">
                  {selectedBooking.specialRequests}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pb-4">
                {selectedBooking.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedBooking.id, "confirmed")
                      }
                      className="w-full bg-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm Booking</span>
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedBooking.id, "cancelled")
                      }
                      className="w-full bg-red-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Decline Booking</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleSendMessage(selectedBooking.id)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
                <button
                  onClick={() => window.open(`tel:${selectedBooking.phone}`)}
                  className="w-full bg-gray-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Customer</span>
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Helmet>
          <title>Orders - Easy Life Gangtok</title>
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
                    Orders
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    Manage booking requests
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button className="p-2 rounded-lg bg-gray-100">
                  <Activity className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Orders Stats */}
          <div className="px-4 mb-6 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600">
                    Total
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {bookingStats.total}
                  </p>
                  <p className="text-xs text-gray-600">Total Bookings</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-orange-100 flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-xs font-medium text-orange-600">
                    {bookingStats.pending} pending
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    Rs. {bookingStats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>
            </div>

            {/* Order Status Filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
                {[
                  { key: "all", label: "All", count: bookingStats.total },
                  {
                    key: "pending",
                    label: "Pending",
                    count: bookingStats.pending,
                  },
                  {
                    key: "confirmed",
                    label: "Confirmed",
                    count: bookingStats.confirmed,
                  },
                  {
                    key: "cancelled",
                    label: "Cancelled",
                    count: bookingStats.cancelled,
                  },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedOrderStatus(filter.key)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                      selectedOrderStatus === filter.key
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-3">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        {booking.customerName.split(" ")[0][0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {booking.service}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-bold text-gray-900 text-sm">
                        {booking.budget}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 flex-1 min-w-0 truncate">
                      {booking.eventDate} • {booking.guestCount} guests
                    </p>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium flex-shrink-0 ml-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
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
                onClick={() => handleViewChange("orders")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "orders" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Orders</span>
              </button>
              <button
                onClick={() => handleViewChange("earnings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "earnings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <DollarSign className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Earnings</span>
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
                onClick={() => handleViewChange("profile")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "profile" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Profile</span>
              </button>
            </div>
          </div>

          <div className="h-20"></div>
        </div>
      </>
    );
  }

  // Mobile Earnings View
  if (currentView === "earnings") {
    return (
      <>
        <Helmet>
          <title>Earnings - Easy Life Gangtok</title>
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
                    Earnings
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    Track your income
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button className="p-2 rounded-lg bg-gray-100">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="px-4 mb-6 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow-sm border border-green-100 mb-4">
              <div className="text-center">
                <h2 className="text-xs text-gray-600 mb-1">
                  Total Earnings This Month
                </h2>
                <p className="text-3xl font-bold text-gray-900 mb-2">₹28,500</p>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +24% from last month
                  </span>
                </div>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600">
                    Today
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">₹2,480</p>
                  <p className="text-xs text-gray-600">8 orders</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-purple-600">
                    This Week
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">₹12,340</p>
                  <p className="text-xs text-gray-600">32 orders</p>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-green-600" />
                Payment Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Available Balance
                  </span>
                  <span className="font-bold text-green-600">₹15,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Pending Settlement
                  </span>
                  <span className="font-bold text-yellow-600">₹8,300</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Withdrawn</span>
                  <span className="font-bold text-gray-900">₹45,600</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium">
                Withdraw Earnings
              </button>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Recent Transactions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    type: "order",
                    amount: "+₹1,200",
                    desc: "Wedding Catering - Priya S.",
                    time: "2 hours ago",
                  },
                  {
                    type: "withdrawal",
                    amount: "-₹5,000",
                    desc: "Bank Transfer",
                    time: "1 day ago",
                  },
                  {
                    type: "order",
                    amount: "+₹800",
                    desc: "Birthday Party - Rajesh K.",
                    time: "2 days ago",
                  },
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          transaction.type === "order"
                            ? "bg-green-100"
                            : "bg-blue-100"
                        }`}
                      >
                        {transaction.type === "order" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {transaction.desc}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.time}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-bold flex-shrink-0 ml-2 ${
                        transaction.type === "order"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {transaction.amount}
                    </span>
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
                onClick={() => handleViewChange("orders")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "orders" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Orders</span>
              </button>
              <button
                onClick={() => handleViewChange("earnings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "earnings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <DollarSign className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Earnings</span>
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
                onClick={() => handleViewChange("profile")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "profile" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Profile</span>
              </button>
            </div>
          </div>

          <div className="h-20"></div>
        </div>
      </>
    );
  }

  // Mobile Profile View
  if (currentView === "profile") {
    return (
      <>
        <Helmet>
          <title>Business Profile - Easy Life Gangtok</title>
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
                    Profile
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    Manage your business
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button className="p-2 rounded-lg bg-gray-100">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-4 mb-6 max-w-md mx-auto">
            {/* Business Info Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  HD
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    Himalayan Delights
                  </h3>
                  <p className="text-sm text-gray-600">Food & Catering</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.6</span>
                    <span className="text-xs text-gray-500">(12 reviews)</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-blue-100">
                  <Camera className="w-5 h-5 text-blue-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-blue-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-blue-900">2,847</p>
                  <p className="text-xs text-blue-700">Profile Views</p>
                </div>
                <div className="text-center bg-green-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-green-900">85%</p>
                  <p className="text-xs text-green-700">Profile Complete</p>
                </div>
              </div>
            </div>

            {/* Profile Management */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Profile Management
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: Store,
                    label: "Edit Business Info",
                    badge: null,
                    color: "blue",
                  },
                  {
                    icon: Plus,
                    label: "Add Photos",
                    badge: "3 pending",
                    color: "red",
                  },
                  {
                    icon: Clock,
                    label: "Business Hours",
                    badge: null,
                    color: "purple",
                  },
                  {
                    icon: MapPin,
                    label: "Location & Contact",
                    badge: null,
                    color: "green",
                  },
                  {
                    icon: Tag,
                    label: "Services & Pricing",
                    badge: "Update",
                    color: "yellow",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div
                        className={`p-2 rounded-lg bg-${item.color}-100 flex-shrink-0`}
                      >
                        <item.icon
                          className={`w-5 h-5 text-${item.color}-600`}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {item.badge && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                            item.color === "red"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Business Stats */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Business Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex-1 min-w-0 truncate">
                    Profile Status
                  </span>
                  <span className="flex items-center flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-600">Active</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex-1 min-w-0 truncate">
                    Verification
                  </span>
                  <span className="flex items-center flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-600">Verified</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex-1 min-w-0 truncate">
                    Listed Since
                  </span>
                  <span className="font-medium flex-shrink-0">
                    Jan 15, 2024
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex-1 min-w-0 truncate">
                    Response Time
                  </span>
                  <span className="font-medium text-green-600 flex-shrink-0">
                    &lt; 2 hours
                  </span>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Account Settings
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Bell, label: "Notifications", color: "blue" },
                  { icon: Users, label: "Privacy Settings", color: "purple" },
                  { icon: Phone, label: "Contact Support", color: "green" },
                  { icon: Settings, label: "App Preferences", color: "gray" },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div
                        className={`p-2 rounded-lg bg-${item.color}-100 flex-shrink-0`}
                      >
                        <item.icon
                          className={`w-5 h-5 text-${item.color}-600`}
                        />
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
                onClick={() => handleViewChange("orders")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "orders" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Orders</span>
              </button>
              <button
                onClick={() => handleViewChange("earnings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "earnings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <DollarSign className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Earnings</span>
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
                onClick={() => handleViewChange("profile")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "profile" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Profile</span>
              </button>
            </div>
          </div>

          <div className="h-20"></div>
        </div>
      </>
    );
  }

  const stats = [
    {
      label: "Total Views",
      value: "2,847",
      icon: Eye,
      colorClass: "bg-blue-100 text-blue-600",
      change: "+12%",
      period: "this month",
    },
    {
      label: "Customer Inquiries",
      value: "47",
      icon: MessageCircle,
      colorClass: "bg-green-100 text-green-600",
      change: "+8%",
      period: "this week",
    },
    {
      label: "Average Rating",
      value: "4.6",
      icon: Star,
      colorClass: "bg-yellow-100 text-yellow-600",
      change: "+0.2",
      period: "this month",
    },
    {
      label: "Monthly Revenue",
      value: "₹28,500",
      icon: DollarSign,
      colorClass: "bg-purple-100 text-purple-600",
      change: "+24%",
      period: "vs last month",
    },
  ];

  const recentActivity = [
    {
      action: "New inquiry from",
      customer: "Priya Sharma",
      date: "45 minutes ago",
      type: "inquiry",
      message: "Looking for catering services for 50 people",
    },
    {
      action: "Review received from",
      customer: "Rajesh Kumar",
      date: "2 hours ago",
      type: "review",
      rating: 5,
      message: "Excellent service and very professional staff!",
    },
    {
      action: "Photo liked by",
      customer: "Anjali Thapa",
      date: "4 hours ago",
      type: "engagement",
      message: "Your new menu photos look amazing",
    },
    {
      action: "Profile viewed by",
      customer: "12 potential customers",
      date: "Today",
      type: "views",
      message: "High interest in your services",
    },
    {
      action: "Booking request from",
      customer: "Deepak Rai",
      date: "Yesterday",
      type: "booking",
      message: "Wedding photography for December 15th",
    },
    {
      action: "Review received from",
      customer: "Sunita Gurung",
      date: "2 days ago",
      type: "review",
      rating: 4,
      message: "Good food quality, timely delivery",
    },
  ];

  const customerReviews = [
    {
      id: 1,
      customerName: "Rajesh Kumar",
      rating: 5,
      date: "2 hours ago",
      comment:
        "Excellent service and very professional staff! The food quality was outstanding and delivery was on time. Highly recommended for any event.",
      verified: true,
    },
    {
      id: 2,
      customerName: "Sunita Gurung",
      rating: 4,
      date: "2 days ago",
      comment:
        "Good food quality and timely delivery. The presentation could be improved a bit, but overall satisfied with the service.",
      verified: true,
    },
    {
      id: 3,
      customerName: "Amit Sharma",
      rating: 5,
      date: "1 week ago",
      comment:
        "Amazing experience! The team was very responsive and accommodating. Will definitely use their services again.",
      verified: false,
    },
    {
      id: 4,
      customerName: "Deepika Rai",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Professional service with good attention to detail. Pricing is reasonable and staff is friendly.",
      verified: true,
    },
  ];

  const performanceData = [
    { month: "Jan", views: 1850, inquiries: 32, bookings: 18 },
    { month: "Feb", views: 2100, inquiries: 38, bookings: 22 },
    { month: "Mar", views: 2400, inquiries: 45, bookings: 28 },
    { month: "Apr", views: 2847, inquiries: 47, bookings: 31 },
  ];

  const handleCustomerAnalyticsInsights = () => {
    handleViewChange("customer-analytics");
  };

  return (
    <>
      <Helmet>
        <title>Business Dashboard - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 lg:py-8">
        <div className="max-w-7xl mx-auto lg:px-4 lg:sm:px-6 lg:lg:px-8">
          {/* Desktop Back Button - Hidden on mobile */}
          <button
            onClick={() => navigate(-1)}
            className="hidden lg:flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
                  <p className="text-xs text-gray-500">Himalayan Delights</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewChange("notifications")}
                  className="relative p-2 rounded-lg bg-gray-100"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                <button
                  onClick={() => handleViewChange("calendar")}
                  className="p-2 rounded-lg bg-blue-100"
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Header - Hidden on mobile */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Business Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your business profile and track performance
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handleViewChange("notifications")}
                  className="relative"
                  icon={Bell}
                >
                  Notifications
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleViewChange("calendar")}
                  icon={Calendar}
                >
                  Calendar
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Quick Stats Cards */}
          <div className="lg:hidden px-4 mb-4">
            <div className="grid grid-cols-2 gap-3">
              {stats.slice(0, 4).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        stat.colorClass.split(" ")[0]
                      }`}
                    >
                      <stat.icon
                        className={`w-4 h-4 ${stat.colorClass.split(" ")[1]}`}
                      />
                    </div>
                    <span className="text-xs font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Today So Far Chart */}
          <div className="lg:hidden px-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Today so far
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">
                    Live
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">₹2,480</div>
                  <div className="text-xs text-gray-600">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <div className="text-xs text-gray-600">Orders</div>
                </div>
              </div>

              {/* Mini Bar Chart */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>Now</span>
                </div>
                <div className="flex items-end gap-1 h-16 bg-gray-50 rounded-lg p-2">
                  <div
                    className="bg-blue-400 rounded-sm flex-1"
                    style={{ height: "20%" }}
                  ></div>
                  <div
                    className="bg-blue-400 rounded-sm flex-1"
                    style={{ height: "30%" }}
                  ></div>
                  <div
                    className="bg-blue-400 rounded-sm flex-1"
                    style={{ height: "45%" }}
                  ></div>
                  <div
                    className="bg-blue-400 rounded-sm flex-1"
                    style={{ height: "25%" }}
                  ></div>
                  <div
                    className="bg-blue-400 rounded-sm flex-1"
                    style={{ height: "60%" }}
                  ></div>
                  <div
                    className="bg-blue-400 rounded-sm flex-1"
                    style={{ height: "40%" }}
                  ></div>
                  <div
                    className="bg-blue-400 rounded-sm flex-1"
                    style={{ height: "70%" }}
                  ></div>
                  <div
                    className="bg-blue-500 rounded-sm flex-1"
                    style={{ height: "85%" }}
                  ></div>
                  <div
                    className="bg-blue-500 rounded-sm flex-1"
                    style={{ height: "75%" }}
                  ></div>
                  <div
                    className="bg-blue-600 rounded-sm flex-1"
                    style={{ height: "90%" }}
                  ></div>
                  <div
                    className="bg-blue-600 rounded-sm flex-1"
                    style={{ height: "95%" }}
                  ></div>
                  <div
                    className="bg-green-500 rounded-sm flex-1"
                    style={{ height: "100%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  Hourly sales activity
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden px-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleViewChange("inquiries")}
                  className="flex flex-col items-center p-3 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <MessageCircle className="w-6 h-6 text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-blue-900">
                    Inquiries
                  </span>
                  <span className="text-xs text-blue-600">5 new</span>
                </button>
                <button
                  onClick={() => handleViewChange("bookings")}
                  className="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-100"
                >
                  <CalendarCheck className="w-6 h-6 text-green-600 mb-1" />
                  <span className="text-xs font-medium text-green-900">
                    Bookings
                  </span>
                  <span className="text-xs text-green-600">3 today</span>
                </button>
                <button
                  onClick={() => handleViewChange("financial")}
                  className="flex flex-col items-center p-3 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <DollarSign className="w-6 h-6 text-purple-600 mb-1" />
                  <span className="text-xs font-medium text-purple-900">
                    Revenue
                  </span>
                  <span className="text-xs text-purple-600">₹2,500</span>
                </button>
                <button
                  onClick={() => handleViewChange("reviews")}
                  className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100"
                >
                  <Star className="w-6 h-6 text-yellow-600 mb-1" />
                  <span className="text-xs font-medium text-yellow-900">
                    Reviews
                  </span>
                  <span className="text-xs text-yellow-600">4.6 rating</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Today's Highlights */}
          <div className="lg:hidden px-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-3">
                Today's Highlights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-900">5</div>
                  <div className="text-xs text-blue-700">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-900">₹2,500</div>
                  <div className="text-xs text-blue-700">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-900">12</div>
                  <div className="text-xs text-blue-700">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-900">3</div>
                  <div className="text-xs text-blue-700">Urgent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Recent Activity */}
          <div className="lg:hidden px-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                <button
                  onClick={() => handleViewChange("analytics")}
                  className="text-xs text-blue-600 font-medium"
                >
                  View All
                </button>
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
                        {activity.action}{" "}
                        <span className="text-blue-600">
                          {activity.customer}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <button
                      onClick={() => handleActivityAction(activity)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                    >
                      {activity.type === "inquiry" ||
                      activity.type === "booking"
                        ? "Reply"
                        : "View"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Management Tools */}
          <div className="lg:hidden px-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                Manage Business
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleViewChange("business-profile")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Store className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Edit Profile
                    </span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </button>
                <button
                  onClick={() => handleViewChange("photos")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Plus className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Add Photos
                    </span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    3 pending
                  </span>
                </button>
                <button
                  onClick={() => handleViewChange("business-hours")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Business Hours
                    </span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </button>
                <button
                  onClick={() => handleViewChange("crm")}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Customer Management
                    </span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Hidden on mobile */}
          <div className="hidden lg:block">
            {/* Desktop Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`p-3 rounded-lg ${
                            stat.colorClass.split(" ")[0]
                          }`}
                        >
                          <stat.icon
                            className={`w-6 h-6 ${
                              stat.colorClass.split(" ")[1]
                            }`}
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
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {stat.change}
                        </p>
                        <p className="text-xs text-gray-500">{stat.period}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Main Dashboard Layout - Two Column Layout */}
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Financial Dashboard Section */}
                <div>
                  <FinancialDashboard
                    onViewDetails={() => handleViewChange("financial")}
                  />
                </div>

                {/* First Row - Analytics Cards */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Customer Analytics */}
                  <div>
                    <CustomerAnalyticsCard
                      title="Your Customers"
                      data={sellerCustomerAnalytics}
                      onGetDeeperInsights={handleCustomerAnalyticsInsights}
                    />
                  </div>

                  {/* Performance Chart */}
                  <div>
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Performance Overview
                        </h2>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={BarChart3}
                          onClick={() => handleViewChange("analytics")}
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="space-y-6">
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                              2,847
                            </p>
                            <p className="text-sm text-gray-600">Total Views</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                              47
                            </p>
                            <p className="text-sm text-gray-600">Inquiries</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">
                              31
                            </p>
                            <p className="text-sm text-gray-600">Bookings</p>
                          </div>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Monthly Growth
                            </span>
                            <span className="font-medium text-green-600">
                              +24%
                            </span>
                          </div>
                          {performanceData.map((data, index) => (
                            <div
                              key={data.month}
                              className="flex items-center space-x-3"
                            >
                              <span className="w-8 text-sm text-gray-600">
                                {data.month}
                              </span>
                              <div className="flex-1 flex items-center space-x-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${(data.views / 3000) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-12">
                                  {data.views}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Key Insights */}
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Key Insights
                          </h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• 54% increase in profile views this month</li>
                            <li>• Peak activity on weekends (Fri-Sun)</li>
                            <li>
                              • High conversion rate: 66% inquiries to bookings
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Second Row - Activity and Reviews */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div>
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Recent Activity
                        </h2>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewChange("analytics")}
                        >
                          View All
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {recentActivity.slice(0, 4).map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                {activity.customer.split(" ")[0][0]}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium text-gray-900 text-sm">
                                    {activity.action}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {activity.customer}
                                  </p>
                                </div>
                                {activity.type === "review" && (
                                  <div className="flex items-center space-x-1 mt-1">
                                    {[...Array(activity.rating)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < activity.rating
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                  {activity.date}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleActivityAction(activity)}
                            >
                              {activity.type === "inquiry" ||
                              activity.type === "booking"
                                ? "Respond"
                                : "View"}
                            </Button>
                          </div>
                        ))}
                        <div className="pt-4 border-t">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleViewChange("analytics")}
                          >
                            View All Activities
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Recent Reviews */}
                  <div>
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Recent Reviews
                        </h2>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewChange("reviews")}
                        >
                          View All (12)
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {customerReviews.slice(0, 3).map((review) => (
                          <div
                            key={review.id}
                            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                  {review.customerName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <p className="font-medium text-gray-900 text-sm">
                                      {review.customerName}
                                    </p>
                                    {review.verified && (
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              "{review.comment.substring(0, 100)}..."
                            </p>
                          </div>
                        ))}

                        {/* Review Summary */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                Overall Rating
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-yellow-600">
                                  4.6
                                </span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-5 h-5 ${
                                        i < 4
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  (12 reviews)
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                Response Rate
                              </p>
                              <p className="font-bold text-green-600">95%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Third Row - Business Summary and Growth Tips */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Business Summary */}
                  <div>
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Business Summary
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Profile Status</span>
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="font-medium text-green-600">
                              Active
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Verification</span>
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="font-medium text-green-600">
                              Verified
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Listed Since</span>
                          <span className="font-medium">Jan 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category</span>
                          <span className="font-medium">Food & Catering</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Profile Views</span>
                          <span className="font-medium">2,847 this month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Response Time</span>
                          <span className="font-medium text-green-600">
                            &lt; 2 hours
                          </span>
                        </div>
                      </div>

                      {/* Profile Completion */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900">
                            Profile Completion
                          </span>
                          <span className="text-sm font-bold text-blue-600">
                            85%
                          </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-blue-800 mt-2">
                          Add more photos to reach 100%
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Tips to Grow */}
                  <div>
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Tips to Grow Your Business
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-green-900 mb-1">
                              Add High-Quality Photos
                            </p>
                            <p className="text-xs text-green-700">
                              Businesses with 5+ photos get 42% more views
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-blue-900 mb-1">
                              Respond Quickly to Inquiries
                            </p>
                            <p className="text-xs text-blue-700">
                              Fast responses increase booking chances by 60%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-yellow-900 mb-1">
                              Keep Business Hours Updated
                            </p>
                            <p className="text-xs text-yellow-700">
                              Accurate hours reduce customer confusion
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-purple-900 mb-1">
                              Encourage Customer Reviews
                            </p>
                            <p className="text-xs text-purple-700">
                              More reviews boost your search ranking
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Growth Progress */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-900">
                            Growth Progress This Month
                          </span>
                          <span className="text-sm font-bold text-green-600">
                            +24%
                          </span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-green-800 mt-2">
                          Great progress! Keep implementing these tips
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Essential Business Tools */}
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Essential Business Tools
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleViewChange("notifications")}
                      variant="primary"
                      className="w-full justify-start relative"
                      icon={Bell}
                    >
                      Notifications
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        3
                      </span>
                    </Button>
                    <Button
                      onClick={() => handleViewChange("calendar")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={Calendar}
                    >
                      Calendar & Availability
                    </Button>
                    <Button
                      onClick={() => handleViewChange("financial")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={DollarSign}
                    >
                      Financial Dashboard
                    </Button>
                    <Button
                      onClick={() => handleViewChange("crm")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={Users}
                    >
                      Customer Management
                    </Button>
                  </div>

                  {/* Essential Stats */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-3">
                      Today's Highlights
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-lg font-bold text-blue-900">3</div>
                        <div className="text-blue-700">
                          Urgent Notifications
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-900">
                          5
                        </div>
                        <div className="text-blue-700">Today's Bookings</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-900">
                          ₹2,500
                        </div>
                        <div className="text-blue-700">Today's Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-900">
                          12
                        </div>
                        <div className="text-blue-700">Active Customers</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Profile & Settings */}
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Profile & Settings
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleViewChange("business-profile")}
                      variant="primary"
                      className="w-full justify-start"
                      icon={Store}
                    >
                      Edit Business Profile
                    </Button>
                    <Button
                      onClick={() => handleViewChange("photos")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={Plus}
                    >
                      Add New Photos (3 pending)
                    </Button>
                    <Button
                      onClick={() => handleViewChange("business-hours")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={Calendar}
                    >
                      Update Business Hours
                    </Button>
                    <Button
                      onClick={() => handleViewChange("inquiries")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={MessageCircle}
                    >
                      Respond to Inquiries (5)
                    </Button>
                    <Button
                      onClick={() => navigate("/contact")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={Phone}
                    >
                      Contact Support
                    </Button>
                  </div>

                  {/* Pending Tasks */}
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2">
                      Pending Tasks
                    </h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Respond to 2 urgent inquiries</li>
                      <li>• Update holiday hours for Diwali</li>
                      <li>• Upload menu photos</li>
                    </ul>
                  </div>
                </Card>

                {/* Service Management */}
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Service Management
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleServiceManagementView("orders")}
                      variant="primary"
                      className="w-full justify-start"
                      icon={ShoppingCart}
                    >
                      Order Management
                    </Button>
                    <Button
                      onClick={() => handleServiceManagementView("settlements")}
                      variant="outline"
                      className="w-full justify-start"
                      icon={CreditCard}
                    >
                      Settlement Tracker
                    </Button>
                  </div>

                  {/* Service Stats */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-3">
                      Quick Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-lg font-bold text-blue-900">3</div>
                        <div className="text-blue-700">Pending Orders</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-900">
                          ₹12,450
                        </div>
                        <div className="text-blue-700">This Month</div>
                      </div>
                    </div>
                  </div>
                </Card>
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
                onClick={() => handleViewChange("orders")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "orders" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Orders</span>
              </button>
              <button
                onClick={() => handleViewChange("earnings")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "earnings" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <DollarSign className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Earnings</span>
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
                onClick={() => handleViewChange("profile")}
                className={`flex flex-col items-center py-2 px-1 min-w-0 ${
                  currentView === "profile" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Store className="w-5 h-5 mb-1 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Profile</span>
              </button>
            </div>
          </div>

          {/* Add bottom padding for mobile to account for fixed bottom navigation */}
          <div className="lg:hidden h-20"></div>
        </div>
      </div>
    </>
  );
};

export default SellerPanel;
