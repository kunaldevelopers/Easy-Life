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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import ManageUsers from "../components/admin/ManageUsers";
import ListedBusinesses from "../components/admin/ListedBusinesses";
import PendingBusinesses from "../components/admin/PendingBusinesses";
import UnderReviewBusinesses from "../components/admin/UnderReviewBusinesses";

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

  // Render different views based on currentView state
  if (currentView === "manage-users") {
    return <ManageUsers onBack={handleBackToDashboard} />;
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
    {
      action: "User Report Review",
      item: "Inappropriate content",
      priority: "medium",
      actionType: "user-report",
    },
    {
      action: "Content Moderation",
      item: "3 pending reviews",
      priority: "low",
      actionType: "content-moderation",
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
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    icon={Calendar}
                    onClick={() => handleViewChange("service-bookings")}
                  >
                    Service Bookings
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

// Service Bookings Component
const ServiceBookings = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Mock data for service bookings (replace with real API data)
  const allBookings = [
    {
      id: "BK001",
      user: {
        name: "Rajesh Sharma",
        phone: "+91 9876543210",
        avatar:
          "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      seller: {
        name: "Gangtok Electricians",
        service: "Home Electrical Repair",
        phone: "+91 8765432109",
      },
      booking: {
        date: "22 September 2025",
        time: "11:24 AM",
        amount: "₹1,500",
        status: "completed",
        paymentId: "pay_MkB2Tx7QZghFK8",
        paymentMethod: "UPI",
        paymentDetails: "Google Pay",
      },
    },
    {
      id: "BK002",
      user: {
        name: "Priya Devi",
        phone: "+91 9988776655",
        avatar:
          "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      seller: {
        name: "Mountain View Plumbers",
        service: "Bathroom Pipe Repair",
        phone: "+91 7654321098",
      },
      booking: {
        date: "21 September 2025",
        time: "02:30 PM",
        amount: "₹850",
        status: "completed",
        paymentId: "pay_NlC3Uy8RahjGL9",
        paymentMethod: "Credit Card",
        paymentDetails: "Visa ****1234",
      },
    },
    {
      id: "BK003",
      user: {
        name: "Karma Bhutia",
        phone: "+91 8899001122",
        avatar:
          "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      seller: {
        name: "Sikkim Car Service",
        service: "Car AC Repair",
        phone: "+91 6543210987",
      },
      booking: {
        date: "20 September 2025",
        time: "09:15 AM",
        amount: "₹2,200",
        status: "completed",
        paymentId: "pay_OmD4Vz9SbikHM0",
        paymentMethod: "Net Banking",
        paymentDetails: "SBI Bank",
      },
    },
    {
      id: "BK004",
      user: {
        name: "Tenzin Norbu",
        phone: "+91 7766554433",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      seller: {
        name: "Gangtok Home Cleaners",
        service: "Deep House Cleaning",
        phone: "+91 5432109876",
      },
      booking: {
        date: "19 September 2025",
        time: "10:00 AM",
        amount: "₹1,200",
        status: "completed",
        paymentId: "pay_PnE5Wa0TcjlIN1",
        paymentMethod: "UPI",
        paymentDetails: "PhonePe",
      },
    },
    {
      id: "BK005",
      user: {
        name: "Sonam Choden",
        phone: "+91 6655443322",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      seller: {
        name: "Tech Support Gangtok",
        service: "Laptop Screen Repair",
        phone: "+91 4321098765",
      },
      booking: {
        date: "18 September 2025",
        time: "03:45 PM",
        amount: "₹3,500",
        status: "completed",
        paymentId: "pay_QoF6Xb1UdkmJO2",
        paymentMethod: "Debit Card",
        paymentDetails: "HDFC ****5678",
      },
    },
    {
      id: "BK006",
      user: {
        name: "Pema Lama",
        phone: "+91 9876512345",
        avatar:
          "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      seller: {
        name: "Quick Taxi Service",
        service: "Airport Drop Service",
        phone: "+91 8765431234",
      },
      booking: {
        date: "25 September 2025",
        time: "06:30 AM",
        amount: "₹650",
        status: "completed",
        paymentId: "pay_RpG7Yc2VdklKP3",
        paymentMethod: "Wallet",
        paymentDetails: "Paytm Wallet",
      },
    },
    {
      id: "BK007",
      user: {
        name: "Mingma Sherpa",
        phone: "+91 7654398765",
        avatar:
          "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      seller: {
        name: "Gangtok Beauty Salon",
        service: "Hair Cut & Styling",
        phone: "+91 6543298765",
      },
      booking: {
        date: "24 September 2025",
        time: "01:15 PM",
        amount: "₹750",
        status: "completed",
        paymentId: "pay_SqH8Zd3WeklLQ4",
        paymentMethod: "UPI",
        paymentDetails: "BHIM UPI",
      },
    },
  ];

  // Filter bookings based on selected date
  React.useEffect(() => {
    if (selectedDate) {
      const filtered = allBookings.filter((booking) => {
        const bookingDate = new Date(booking.booking.date);
        const selectedDateObj = new Date(selectedDate);
        return bookingDate.toDateString() === selectedDateObj.toDateString();
      });
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(allBookings);
    }
  }, [selectedDate]);

  const bookings = filteredBookings;

  // Calculate dynamic stats
  const totalRevenue = bookings.reduce((sum, booking) => {
    return (
      sum + parseInt(booking.booking.amount.replace("₹", "").replace(",", ""))
    );
  }, 0);

  const formatRevenue = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <>
      <Helmet>
        <title>Service Bookings - Admin Panel</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Service Bookings
                </h1>
                <p className="text-gray-600">
                  View all completed service bookings with payment details
                </p>
              </div>

              {/* Date Filter */}
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-3">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Filter by Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate("")}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.length}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatRevenue(totalRevenue)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Bookings List */}
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Bookings
                {selectedDate && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    • Filtered by{" "}
                    {new Date(selectedDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </h2>
            </div>

            {bookings.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500">
                  {selectedDate
                    ? "No bookings found for the selected date. Try selecting a different date."
                    : "No completed bookings available at the moment."}
                </p>
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate("")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Show All Bookings
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        {/* User Info */}
                        <img
                          src={booking.user.avatar}
                          alt={booking.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Customer Details */}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Customer
                              </h3>
                              <p className="text-gray-900 font-medium">
                                {booking.user.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.user.phone}
                              </p>
                            </div>

                            {/* Service Details */}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Service Provider
                              </h3>
                              <p className="text-gray-900 font-medium">
                                {booking.seller.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {booking.seller.service}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.seller.phone}
                              </p>
                            </div>
                          </div>{" "}
                          {/* Booking Details */}
                          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            {/* Mobile Layout - Stacked */}
                            <div className="block md:hidden space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">
                                  Date:
                                </span>
                                <span className="text-gray-600">
                                  {booking.booking.date}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">
                                  Time:
                                </span>
                                <span className="text-gray-600">
                                  {booking.booking.time}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">
                                  Amount:
                                </span>
                                <span className="text-green-600 font-semibold">
                                  {booking.booking.amount}
                                </span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="font-medium text-gray-900">
                                  Payment:
                                </span>
                                <div className="text-right">
                                  <p className="text-blue-600 font-medium">
                                    {booking.booking.paymentMethod}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {booking.booking.paymentDetails}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="font-medium text-gray-900">
                                  Payment ID:
                                </span>
                                <span className="text-gray-600 font-mono text-xs text-right break-all max-w-[150px]">
                                  {booking.booking.paymentId}
                                </span>
                              </div>
                            </div>

                            {/* Desktop Layout - Grid */}
                            <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-900 mb-1">
                                  Date
                                </span>
                                <p className="text-gray-600">
                                  {booking.booking.date}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-900 mb-1">
                                  Time
                                </span>
                                <p className="text-gray-600">
                                  {booking.booking.time}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-900 mb-1">
                                  Amount
                                </span>
                                <p className="text-green-600 font-semibold">
                                  {booking.booking.amount}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-900 mb-1">
                                  Payment Method
                                </span>
                                <p className="text-blue-600 font-medium">
                                  {booking.booking.paymentMethod}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {booking.booking.paymentDetails}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-900 mb-1">
                                  Payment ID
                                </span>
                                <p className="text-gray-600 font-mono text-xs break-all">
                                  {booking.booking.paymentId}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex flex-col items-end">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {booking.booking.status.charAt(0).toUpperCase() +
                            booking.booking.status.slice(1)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Booking ID: {booking.id}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
