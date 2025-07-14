import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  Truck,
  Star,
  MapPin,
  Phone,
  Calendar,
  Filter,
  Search,
  Eye,
  Download,
  MessageCircle,
  MoreVertical,
  RefreshCw,
  X,
  FileText,
  Navigation,
  User,
  CreditCard,
  Edit,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";

const Orders = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [sortBy, setSortBy] = useState("date");
  const [refreshing, setRefreshing] = useState(false);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Comprehensive demo orders data with enhanced details
  const allOrders = [
    {
      id: "ORD001",
      business: "Taste of Tibet Restaurant",
      businessPhone: "+91 9876543210",
      businessEmail: "contact@tasteoftibet.com",
      service: "Food Delivery",
      category: "Food & Dining",
      date: "Dec 28, 2024",
      orderDate: "December 28, 2024",
      timestamp: "2024-12-28T14:30:00Z",
      amount: "₹450",
      originalAmount: "₹500",
      discount: "₹50",
      deliveryCharges: "₹30",
      taxes: "₹23",
      status: "delivered",
      location: "MG Marg, Gangtok",
      deliveryAddress: "Room 205, Hotel Sonam Delek, MG Marg, Gangtok - 737101",
      estimatedTime: "45 minutes",
      deliveryTime: "42 minutes",
      rating: 5,
      review: "Amazing food quality and quick delivery. Highly recommended!",
      orderItems: [
        { name: "Momos (2 plates)", price: "₹120", qty: 2 },
        { name: "Thukpa (1 bowl)", price: "₹80", qty: 1 },
        { name: "Butter Tea (2 cups)", price: "₹60", qty: 2 },
      ],
      trackingSteps: [
        { status: "Order Placed", time: "14:30", completed: true },
        { status: "Confirmed", time: "14:32", completed: true },
        { status: "Preparing", time: "14:35", completed: true },
        { status: "Out for Delivery", time: "15:00", completed: true },
        { status: "Delivered", time: "15:12", completed: true },
      ],
      paymentMethod: "UPI",
      invoice: "INV-001-2024",
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Authentic Tibetan cuisine delivered fresh and hot.",
      canCancel: false,
      canReorder: true,
      canReview: false,
      canTrack: false,
    },
    {
      id: "ORD002",
      business: "Himalayan Electricians",
      businessPhone: "+91 9876543211",
      businessEmail: "service@himalayanelectric.com",
      service: "Electrical Repair",
      category: "Home Services",
      date: "Dec 25, 2024",
      orderDate: "December 25, 2024",
      timestamp: "2024-12-25T10:00:00Z",
      amount: "₹1,200",
      originalAmount: "₹1,200",
      discount: "₹0",
      serviceCharges: "₹100",
      taxes: "₹54",
      status: "completed",
      location: "Development Area, Gangtok",
      serviceAddress: "Building A, Block 3, Development Area, Gangtok - 737102",
      estimatedTime: "2 hours",
      completionTime: "1 hour 45 minutes",
      rating: 4,
      review: "Good service, completed on time. Professional work.",
      orderItems: [
        { name: "Ceiling fan installation", price: "₹400", qty: 1 },
        { name: "Wiring repair", price: "₹600", qty: 1 },
        { name: "Safety check", price: "₹200", qty: 1 },
      ],
      trackingSteps: [
        { status: "Service Booked", time: "10:00", completed: true },
        { status: "Technician Assigned", time: "10:15", completed: true },
        { status: "On the Way", time: "11:00", completed: true },
        { status: "Service Started", time: "11:30", completed: true },
        { status: "Completed", time: "13:15", completed: true },
      ],
      technicianName: "Raj Kumar",
      technicianPhone: "+91 9876543299",
      paymentMethod: "Cash",
      invoice: "INV-002-2024",
      image:
        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Professional electrical services for your home.",
      canCancel: false,
      canReorder: true,
      canReview: false,
      canTrack: false,
    },
    {
      id: "ORD003",
      business: "Green Valley Photographers",
      businessPhone: "+91 9876543212",
      businessEmail: "book@greenvalleyphoto.com",
      service: "Event Photography",
      category: "Photography",
      date: "Dec 20, 2024",
      orderDate: "December 20, 2024",
      timestamp: "2024-12-20T09:00:00Z",
      amount: "₹8,500",
      originalAmount: "₹10,000",
      discount: "₹1,500",
      advanceAmount: "₹3,000",
      taxes: "₹382",
      status: "confirmed",
      location: "Tadong, Gangtok",
      eventAddress: "Grand Banquet Hall, Tadong, Gangtok - 737103",
      estimatedTime: "6 hours",
      scheduledDate: "January 5, 2025",
      scheduledTime: "10:00 AM",
      orderItems: [
        { name: "Wedding photography", price: "₹5,000", qty: 1 },
        { name: "Pre-wedding shoot", price: "₹2,500", qty: 1 },
        { name: "Digital album", price: "₹1,000", qty: 1 },
      ],
      trackingSteps: [
        { status: "Booking Confirmed", time: "09:00", completed: true },
        { status: "Advance Paid", time: "09:30", completed: true },
        { status: "Equipment Ready", time: "Pending", completed: false },
        { status: "Event Day", time: "Jan 5, 10:00 AM", completed: false },
        { status: "Completed", time: "Pending", completed: false },
      ],
      photographerName: "Suresh Tamang",
      photographerPhone: "+91 9876543298",
      paymentMethod: "Bank Transfer",
      invoice: "INV-003-2024",
      image:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Capturing your special moments with professional expertise.",
      canCancel: true,
      canReorder: false,
      canReview: false,
      canTrack: true,
    },
    {
      id: "ORD004",
      business: "Sikkim Mobile Repair",
      businessPhone: "+91 9876543213",
      businessEmail: "repair@sikkimmobile.com",
      service: "Screen Replacement",
      category: "Electronics",
      date: "Dec 18, 2024",
      orderDate: "December 18, 2024",
      timestamp: "2024-12-18T15:20:00Z",
      amount: "₹2,800",
      originalAmount: "₹3,000",
      discount: "₹200",
      serviceCharges: "₹0",
      taxes: "₹126",
      status: "in-progress",
      location: "Lal Market, Gangtok",
      serviceAddress: "Shop 15, Lal Market, Gangtok - 737101",
      estimatedTime: "3 hours",
      orderItems: [
        { name: "iPhone 12 screen replacement", price: "₹2,200", qty: 1 },
        { name: "Tempered glass", price: "₹300", qty: 1 },
        { name: "Case", price: "₹300", qty: 1 },
      ],
      trackingSteps: [
        { status: "Device Received", time: "15:20", completed: true },
        { status: "Diagnosis Complete", time: "15:45", completed: true },
        { status: "Parts Ordered", time: "16:00", completed: true },
        { status: "Repair in Progress", time: "17:30", completed: false },
        { status: "Quality Check", time: "Pending", completed: false },
        { status: "Ready for Pickup", time: "Pending", completed: false },
      ],
      technicianName: "Binod Rai",
      technicianPhone: "+91 9876543297",
      paymentMethod: "UPI",
      invoice: "INV-004-2024",
      image:
        "https://images.pexels.com/photos/4792264/pexels-photo-4792264.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Expert mobile repair services with genuine parts.",
      canCancel: true,
      canReorder: false,
      canReview: false,
      canTrack: true,
    },
  ];

  // Utility functions
  const refreshOrders = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleOrderAction = (action, order) => {
    switch (action) {
      case "view":
        setSelectedOrder(order);
        break;
      case "track":
        setSelectedOrder(order);
        setShowTrackingModal(true);
        break;
      case "cancel":
        if (window.confirm("Are you sure you want to cancel this order?")) {
          alert("Order cancelled successfully");
        }
        break;
      case "reorder":
        alert("Redirecting to place new order...");
        break;
      case "review":
        setSelectedOrder(order);
        setShowReviewModal(true);
        break;
      case "download":
        alert("Downloading invoice...");
        break;
      default:
        break;
    }
  };

  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.timestamp) - new Date(a.timestamp);
        case "amount":
          return (
            parseFloat(b.amount.replace(/[₹,]/g, "")) -
            parseFloat(a.amount.replace(/[₹,]/g, ""))
          );
        case "status":
          return a.status.localeCompare(b.status);
        case "business":
          return a.business.localeCompare(b.business);
        default:
          return 0;
      }
    });
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
      case "completed":
        return CheckCircle;
      case "confirmed":
        return Calendar;
      case "in-progress":
        return Truck;
      case "pending":
        return Clock;
      default:
        return Package;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredOrders = sortOrders(
    allOrders.filter((order) => {
      const matchesFilter =
        selectedFilter === "all" || order.status === selectedFilter;
      const matchesSearch =
        order.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
  );

  const filters = [
    { id: "all", label: "All", count: allOrders.length },
    {
      id: "completed",
      label: "Completed",
      count: allOrders.filter((o) => o.status === "completed").length,
    },
    {
      id: "delivered",
      label: "Delivered",
      count: allOrders.filter((o) => o.status === "delivered").length,
    },
    {
      id: "confirmed",
      label: "Confirmed",
      count: allOrders.filter((o) => o.status === "confirmed").length,
    },
    {
      id: "in-progress",
      label: "In Progress",
      count: allOrders.filter((o) => o.status === "in-progress").length,
    },
    {
      id: "pending",
      label: "Pending",
      count: allOrders.filter((o) => o.status === "pending").length,
    },
  ];

  return (
    <>
      <Helmet>
        <title>My Orders - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    My Orders
                  </h1>
                  <p className="text-sm text-gray-500">
                    {filteredOrders.length} orders
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={refreshOrders}
                  disabled={refreshing}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${
            isMobile ? "" : "py-8"
          } max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          {/* Desktop Header */}
          {!isMobile && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    My Orders
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Track and manage your service orders
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={refreshOrders}
                  disabled={refreshing}
                  icon={RefreshCw}
                  className={refreshing ? "animate-pulse" : ""}
                >
                  Refresh
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="status">Sort by Status</option>
                  <option value="business">Sort by Business</option>
                </select>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <Card
            className={`${isMobile ? "mx-4 mb-4" : "mb-6"} p-4 relative z-10`}
          >
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    icon={Search}
                    placeholder="Search orders, businesses, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                {isMobile && (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="date">Latest First</option>
                    <option value="amount">Amount High to Low</option>
                    <option value="status">Status</option>
                    <option value="business">Business A-Z</option>
                  </select>
                )}
              </div>

              {/* Filter Pills */}
              <div
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                style={{ touchAction: "pan-x" }}
              >
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Filter clicked:", filter.id); // Debug log
                      setSelectedFilter(filter.id);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Filter touched:", filter.id); // Debug log
                      setSelectedFilter(filter.id);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer select-none touch-manipulation flex-shrink-0 ${
                      selectedFilter === filter.id
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
                    }`}
                    style={{
                      minWidth: "fit-content",
                      touchAction: "manipulation",
                      WebkitTapHighlightColor: "transparent",
                      position: "relative",
                      zIndex: 20,
                    }}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Results Summary */}
              {(searchTerm || selectedFilter !== "all") && (
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {filteredOrders.length} result
                    {filteredOrders.length !== 1 ? "s" : ""} found
                  </span>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Orders List */}
          <div className={`space-y-4 ${isMobile ? "px-4" : ""}`}>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Mobile Card */}
                      {isMobile ? (
                        <div className="p-4">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={order.image}
                                  alt={order.business}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                  }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center text-white font-bold text-lg hidden">
                                  {order.business.charAt(0)}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                  {order.business}
                                </h3>
                                <p className="text-xs text-gray-600 truncate">
                                  {order.service}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {order.id}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-bold text-gray-900 text-sm">
                                {order.amount}
                              </p>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                            </div>
                          </div>

                          {/* Order Details */}
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center text-xs text-gray-600">
                              <Calendar className="w-3 h-3 mr-1" />
                              {order.orderDate}
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <MapPin className="w-3 h-3 mr-1" />
                              {order.location}
                            </div>
                            {order.scheduledDate && (
                              <div className="flex items-center text-xs text-blue-600">
                                <Clock className="w-3 h-3 mr-1" />
                                Scheduled: {order.scheduledDate}
                              </div>
                            )}
                          </div>

                          {/* Order Items Preview */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {order.orderItems.slice(0, 2).map((item, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded"
                                >
                                  {typeof item === "string" ? item : item.name}
                                </span>
                              ))}
                              {order.orderItems.length > 2 && (
                                <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                                  +{order.orderItems.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {order.canTrack && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleOrderAction("track", order)
                                  }
                                  icon={Navigation}
                                  className="text-xs"
                                >
                                  Track
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(`tel:${order.businessPhone}`)
                                }
                                icon={Phone}
                                className="text-xs"
                              >
                                Call
                              </Button>
                            </div>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleOrderAction("view", order)}
                              icon={Eye}
                              className="text-xs"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* Desktop Card */
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            {/* Business Image */}
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={order.image}
                                alt={order.business}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center text-white font-bold text-xl hidden">
                                {order.business.charAt(0)}
                              </div>
                            </div>

                            {/* Order Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900 truncate">
                                    {order.business}
                                  </h3>
                                  <p className="text-gray-600">
                                    {order.service}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {order.id}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                  <p className="text-2xl font-bold text-gray-900">
                                    {order.amount}
                                  </p>
                                  {order.originalAmount !== order.amount && (
                                    <p className="text-sm text-gray-500 line-through">
                                      {order.originalAmount}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Status and Date */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                      order.status
                                    )}`}
                                  >
                                    <StatusIcon className="w-4 h-4 mr-1" />
                                    {order.status.charAt(0).toUpperCase() +
                                      order.status.slice(1)}
                                  </span>
                                  {order.rating && (
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-sm text-gray-600">
                                        {order.rating}
                                      </span>
                                    </div>
                                  )}
                                  {order.paymentMethod && (
                                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                                      <CreditCard className="w-3 h-3 mr-1" />
                                      {order.paymentMethod}
                                    </span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">
                                    {order.orderDate}
                                  </p>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {order.location}
                                  </div>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">
                                  Items:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {order.orderItems.map((item, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-block px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-lg"
                                    >
                                      {typeof item === "string"
                                        ? item
                                        : `${item.name} (${item.price})`}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  {order.canTrack && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOrderAction("track", order)
                                      }
                                      icon={Navigation}
                                    >
                                      Track Order
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      window.open(`tel:${order.businessPhone}`)
                                    }
                                    icon={Phone}
                                  >
                                    Call Business
                                  </Button>
                                  {order.canReorder && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOrderAction("reorder", order)
                                      }
                                      icon={RefreshCw}
                                    >
                                      Reorder
                                    </Button>
                                  )}
                                  {order.canCancel && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOrderAction("cancel", order)
                                      }
                                      icon={X}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleOrderAction("download", order)
                                    }
                                    icon={Download}
                                  >
                                    Invoice
                                  </Button>
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() =>
                                      handleOrderAction("view", order)
                                    }
                                    icon={Eye}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>

                              {/* Special Messages */}
                              {order.scheduledDate && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <div className="flex items-center text-blue-800">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">
                                      Scheduled for {order.scheduledDate} at{" "}
                                      {order.scheduledTime}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <Card className="p-8 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
                <Button onClick={() => navigate("/listings")} variant="primary">
                  Browse Services
                </Button>
              </Card>
            )}
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && !showTrackingModal && !showReviewModal && (
          <Modal
            isOpen={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
            title="Order Details"
            size="lg"
          >
            <div className="space-y-6">
              {/* Order Header */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={selectedOrder.image}
                    alt={selectedOrder.business}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center text-white font-bold text-xl hidden">
                    {selectedOrder.business.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedOrder.business}
                  </h3>
                  <p className="text-gray-600">{selectedOrder.service}</p>
                  <p className="text-sm text-gray-500">
                    Order ID: {selectedOrder.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedOrder.amount}
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Order Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">
                        {selectedOrder.orderDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">
                        {selectedOrder.category}
                      </span>
                    </div>
                    {selectedOrder.scheduledDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scheduled:</span>
                        <span className="font-medium">
                          {selectedOrder.scheduledDate}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium">
                        {selectedOrder.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedOrder.businessPhone}</span>
                    </div>
                    {selectedOrder.businessEmail && (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{selectedOrder.businessEmail}</span>
                      </div>
                    )}
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>
                        {selectedOrder.serviceAddress ||
                          selectedOrder.deliveryAddress ||
                          selectedOrder.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Order Items
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  {selectedOrder.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="text-gray-900">
                        {typeof item === "string" ? item : item.name}
                        {typeof item === "object" &&
                          item.qty &&
                          ` x${item.qty}`}
                      </span>
                      {typeof item === "object" && item.price && (
                        <span className="font-medium text-gray-900">
                          {item.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Pricing Details
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {selectedOrder.originalAmount &&
                    selectedOrder.originalAmount !== selectedOrder.amount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Original Amount:</span>
                        <span className="line-through text-gray-500">
                          {selectedOrder.originalAmount}
                        </span>
                      </div>
                    )}
                  {selectedOrder.discount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount:</span>
                      <span className="text-green-600">
                        -{selectedOrder.discount}
                      </span>
                    </div>
                  )}
                  {selectedOrder.deliveryCharges && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charges:</span>
                      <span>{selectedOrder.deliveryCharges}</span>
                    </div>
                  )}
                  {selectedOrder.serviceCharges && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Charges:</span>
                      <span>{selectedOrder.serviceCharges}</span>
                    </div>
                  )}
                  {selectedOrder.taxes && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes:</span>
                      <span>{selectedOrder.taxes}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {selectedOrder.canTrack && (
                  <Button
                    variant="primary"
                    onClick={() => setShowTrackingModal(true)}
                    icon={Navigation}
                    className="flex-1"
                  >
                    Track Order
                  </Button>
                )}
                {selectedOrder.canReview && (
                  <Button
                    variant="outline"
                    onClick={() => setShowReviewModal(true)}
                    icon={Star}
                    className="flex-1"
                  >
                    Write Review
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleOrderAction("download", selectedOrder)}
                  icon={Download}
                  className="flex-1"
                >
                  Download Invoice
                </Button>
                {selectedOrder.canCancel && (
                  <Button
                    variant="outline"
                    onClick={() => handleOrderAction("cancel", selectedOrder)}
                    icon={X}
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        )}

        {/* Order Tracking Modal */}
        {showTrackingModal && selectedOrder && (
          <Modal
            isOpen={showTrackingModal}
            onClose={() => {
              setShowTrackingModal(false);
              setSelectedOrder(null);
            }}
            title="Track Your Order"
            size="md"
          >
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedOrder.business}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Order ID: {selectedOrder.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Tracking Steps */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Order Progress</h4>
                <div className="space-y-4">
                  {selectedOrder.trackingSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h5
                          className={`font-medium ${
                            step.completed ? "text-gray-900" : "text-gray-600"
                          }`}
                        >
                          {step.status}
                        </h5>
                        <p
                          className={`text-sm ${
                            step.completed ? "text-gray-600" : "text-gray-500"
                          }`}
                        >
                          {step.completed
                            ? `Completed at ${step.time}`
                            : `Expected: ${step.time}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              {(selectedOrder.technicianName ||
                selectedOrder.photographerName) && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Service Provider
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-900">
                        {selectedOrder.technicianName ||
                          selectedOrder.photographerName}
                      </p>
                      <p className="text-sm text-blue-700">
                        {selectedOrder.technicianPhone ||
                          selectedOrder.photographerPhone}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `tel:${
                            selectedOrder.technicianPhone ||
                            selectedOrder.photographerPhone
                          }`
                        )
                      }
                      icon={Phone}
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      Call
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}

        {/* Review Modal */}
        {showReviewModal && selectedOrder && (
          <Modal
            isOpen={showReviewModal}
            onClose={() => {
              setShowReviewModal(false);
              setSelectedOrder(null);
            }}
            title="Write a Review"
            size="md"
          >
            <div className="space-y-6">
              {/* Business Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedOrder.image}
                    alt={selectedOrder.business}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedOrder.business}
                  </h3>
                  <p className="text-gray-600">{selectedOrder.service}</p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate your experience
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="w-8 h-8 text-yellow-400 hover:text-yellow-500"
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share your feedback
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell others about your experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Submit */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    alert("Review submitted successfully!");
                    setShowReviewModal(false);
                    setSelectedOrder(null);
                  }}
                  className="flex-1"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Orders;
