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

  // Demo orders data
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
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300",
      canCancel: false,
      canReorder: true,
      canReview: false,
      canTrack: true,
    },
    {
      id: "ORD002",
      business: "Quick Fix Electronics",
      businessPhone: "+91 9876543211",
      businessEmail: "support@quickfix.com",
      service: "Phone Repair",
      category: "Electronics",
      date: "Dec 25, 2024",
      orderDate: "December 25, 2024",
      timestamp: "2024-12-25T10:15:00Z",
      amount: "₹1,200",
      status: "confirmed",
      location: "Lal Market, Gangtok",
      serviceAddress: "Shop 15, Lal Market, Gangtok - 737101",
      estimatedTime: "2 hours",
      orderItems: [
        { name: "Screen Replacement", price: "₹800", qty: 1 },
        { name: "Tempered Glass", price: "₹200", qty: 1 },
        { name: "Phone Case", price: "₹200", qty: 1 },
      ],
      trackingSteps: [
        { status: "Order Placed", time: "10:15", completed: true },
        { status: "Confirmed", time: "10:20", completed: true },
        { status: "In Progress", time: "Pending", completed: false },
        { status: "Quality Check", time: "Pending", completed: false },
        { status: "Ready for Pickup", time: "Pending", completed: false },
      ],
      paymentMethod: "Cash",
      invoice: "INV-002-2024",
      image: "https://images.pexels.com/photos/4792264/pexels-photo-4792264.jpeg?auto=compress&cs=tinysrgb&w=300",
      canCancel: true,
      canReorder: false,
      canReview: false,
      canTrack: true,
    },
    {
      id: "ORD003",
      business: "Himalayan Spa & Wellness",
      businessPhone: "+91 9876543212",
      businessEmail: "info@himalayanspa.com",
      service: "Massage Therapy",
      category: "Health & Wellness",
      date: "Dec 22, 2024",
      orderDate: "December 22, 2024",
      timestamp: "2024-12-22T16:00:00Z",
      amount: "₹2,500",
      status: "completed",
      location: "Tibet Road, Gangtok",
      serviceAddress: "Himalayan Spa, Tibet Road, Gangtok - 737101",
      estimatedTime: "90 minutes",
      completedTime: "95 minutes",
      rating: 4,
      review: "Very relaxing session. Professional staff and great ambiance.",
      orderItems: [
        { name: "Deep Tissue Massage", price: "₹1,500", qty: 1 },
        { name: "Aromatherapy Add-on", price: "₹500", qty: 1 },
        { name: "Herbal Tea", price: "₹500", qty: 1 },
      ],
      trackingSteps: [
        { status: "Booking Confirmed", time: "16:00", completed: true },
        { status: "Therapist Assigned", time: "16:05", completed: true },
        { status: "Service Started", time: "16:30", completed: true },
        { status: "Service Completed", time: "18:05", completed: true },
      ],
      paymentMethod: "Card",
      invoice: "INV-003-2024",
      image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=300",
      canCancel: false,
      canReorder: true,
      canReview: false,
      canTrack: false,
    },
    {
      id: "ORD004",
      business: "Mountain View Laundry",
      businessPhone: "+91 9876543213",
      businessEmail: "service@mountainlaundry.com",
      service: "Laundry Service",
      category: "Home Services",
      date: "Dec 20, 2024",
      orderDate: "December 20, 2024",
      timestamp: "2024-12-20T09:30:00Z",
      amount: "₹350",
      status: "in-progress",
      location: "NH-31A, Gangtok",
      serviceAddress: "Mountain View Laundry, NH-31A, Gangtok - 737101",
      estimatedTime: "24 hours",
      orderItems: [
        { name: "Washing & Ironing (5kg)", price: "₹250", qty: 1 },
        { name: "Dry Cleaning (2 items)", price: "₹100", qty: 1 },
      ],
      trackingSteps: [
        { status: "Pickup Scheduled", time: "09:30", completed: true },
        { status: "Items Collected", time: "10:15", completed: true },
        { status: "Washing in Progress", time: "11:00", completed: true },
        { status: "Drying", time: "Pending", completed: false },
        { status: "Ready for Delivery", time: "Pending", completed: false },
      ],
      paymentMethod: "UPI",
      invoice: "INV-004-2024",
      image: "https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=300",
      canCancel: true,
      canReorder: true,
      canReview: false,
      canTrack: true,
    },
    {
      id: "ORD005",
      business: "Gangtok Cab Services",
      businessPhone: "+91 9876543214",
      businessEmail: "booking@gangtokcabs.com",
      service: "Airport Transfer",
      category: "Transportation",
      date: "Dec 18, 2024",
      orderDate: "December 18, 2024",
      timestamp: "2024-12-18T07:00:00Z",
      amount: "₹800",
      status: "pending",
      location: "Bagdogra Airport to Gangtok",
      serviceAddress: "Pickup: Bagdogra Airport, Drop: MG Marg, Gangtok",
      estimatedTime: "3 hours",
      orderItems: [
        { name: "Airport Transfer (SUV)", price: "₹700", qty: 1 },
        { name: "Toll Charges", price: "₹100", qty: 1 },
      ],
      trackingSteps: [
        { status: "Booking Confirmed", time: "07:00", completed: true },
        { status: "Driver Assigned", time: "Pending", completed: false },
        { status: "Trip Started", time: "Pending", completed: false },
        { status: "Trip Completed", time: "Pending", completed: false },
      ],
      paymentMethod: "Cash",
      invoice: "INV-005-2024",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=300",
      canCancel: true,
      canReorder: true,
      canReview: false,
      canTrack: true,
    },
  ];

  // Filter and search logic
  const filteredOrders = allOrders.filter((order) => {
    const matchesFilter = selectedFilter === "all" || order.status === selectedFilter;
    const matchesSearch = 
      order.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'amount':
        return parseFloat(b.amount.replace(/[₹,]/g, '')) - parseFloat(a.amount.replace(/[₹,]/g, ''));
      case 'status':
        return a.status.localeCompare(b.status);
      case 'business':
        return a.business.localeCompare(b.business);
      default:
        return 0;
    }
  });

  // Filter options
  const filters = [
    { id: "all", label: "All", count: allOrders.length },
    { id: "pending", label: "Pending", count: allOrders.filter((o) => o.status === "pending").length },
    { id: "confirmed", label: "Confirmed", count: allOrders.filter((o) => o.status === "confirmed").length },
    { id: "in-progress", label: "In Progress", count: allOrders.filter((o) => o.status === "in-progress").length },
    { id: "completed", label: "Completed", count: allOrders.filter((o) => o.status === "completed").length },
    { id: "delivered", label: "Delivered", count: allOrders.filter((o) => o.status === "delivered").length },
  ];

  // Utility functions
  const refreshOrders = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
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
        return "text-green-600 bg-green-50";
      case "confirmed":
        return "text-blue-600 bg-blue-50";
      case "in-progress":
        return "text-orange-600 bg-orange-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleOrderAction = (action, order) => {
    switch (action) {
      case 'view':
        setSelectedOrder(order);
        break;
      case 'track':
        setSelectedOrder(order);
        setShowTrackingModal(true);
        break;
      case 'cancel':
        if (window.confirm('Are you sure you want to cancel this order?')) {
          alert('Order cancelled successfully');
        }
        break;
      case 'reorder':
        alert('Redirecting to place new order...');
        break;
      case 'review':
        setSelectedOrder(order);
        setShowReviewModal(true);
        break;
      case 'download':
        alert('Downloading invoice...');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>My Orders - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">My Orders</h1>
                  <p className="text-sm text-gray-500">{sortedOrders.length} orders</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={refreshOrders}
                  disabled={refreshing}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <div className="bg-white border-b border-gray-200 px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">{sortedOrders.length} total orders</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={refreshOrders}
                    disabled={refreshing}
                    icon={RefreshCw}
                    className={refreshing ? 'animate-pulse' : ''}
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
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className={`${isMobile ? 'p-4' : 'max-w-7xl mx-auto px-6 py-6'}`}>
          <Card className="p-4 mb-6">
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
              
              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => {
                      console.log('Filter clicked:', filter.id);
                      setSelectedFilter(filter.id);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 min-w-fit ${
                      selectedFilter === filter.id
                        ? "bg-blue-500 text-white shadow-md transform scale-105"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Results Summary */}
              {(searchTerm || selectedFilter !== "all") && (
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {sortedOrders.length} result{sortedOrders.length !== 1 ? 's' : ''} found
                  </span>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      {/* Mobile Card Layout */}
                      {isMobile ? (
                        <div className="p-4">
                          <div className="flex items-start space-x-3">
                            <img
                              src={order.image}
                              alt={order.business}
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-gray-900 truncate">
                                    {order.business}
                                  </h3>
                                  <p className="text-sm text-gray-600 truncate">
                                    {order.service}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-1 ml-2">
                                  <StatusIcon className={`w-4 h-4 ${getStatusColor(order.status).split(' ')[0]}`} />
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="mt-2 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                  <p>Order #{order.id}</p>
                                  <p>{order.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-gray-900">{order.amount}</p>
                                  <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOrderAction('view', order)}
                                  icon={Eye}
                                >
                                  View
                                </Button>
                                {order.canTrack && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOrderAction('track', order)}
                                    icon={Navigation}
                                  >
                                    Track
                                  </Button>
                                )}
                                {order.canCancel && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOrderAction('cancel', order)}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Desktop Card Layout */
                        <div className="p-6">
                          <div className="flex items-center space-x-6">
                            <img
                              src={order.image}
                              alt={order.business}
                              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {order.business}
                                  </h3>
                                  <p className="text-gray-600">{order.service}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Order #{order.id} • {order.date}
                                  </p>
                                </div>
                                
                                <div className="text-right">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <StatusIcon className={`w-5 h-5 ${getStatusColor(order.status).split(' ')[0]}`} />
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                      {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                                    </span>
                                  </div>
                                  <p className="text-xl font-bold text-gray-900">{order.amount}</p>
                                  <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{order.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{order.estimatedTime}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOrderAction('view', order)}
                                    icon={Eye}
                                  >
                                    View Details
                                  </Button>
                                  {order.canTrack && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleOrderAction('track', order)}
                                      icon={Navigation}
                                    >
                                      Track Order
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOrderAction('download', order)}
                                    icon={Download}
                                  >
                                    Invoice
                                  </Button>
                                  {order.canCancel && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleOrderAction('cancel', order)}
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                  {order.canReorder && (
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={() => handleOrderAction('reorder', order)}
                                    >
                                      Reorder
                                    </Button>
                                  )}
                                </div>
                              </div>
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
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "You haven't placed any orders yet"}
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && !showTrackingModal && !showReviewModal && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedOrder(null)}
            title="Order Details"
            size="lg"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedOrder.image}
                  alt={selectedOrder.business}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedOrder.business}
                  </h3>
                  <p className="text-gray-600">{selectedOrder.service}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order ID
                  </label>
                  <p className="text-gray-900">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Date
                  </label>
                  <p className="text-gray-900">{selectedOrder.orderDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Amount
                  </label>
                  <p className="text-gray-900 font-semibold">{selectedOrder.amount}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Items
                </label>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name} x{item.qty}</span>
                      <span className="font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                {selectedOrder.canTrack && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowTrackingModal(true);
                    }}
                    icon={Navigation}
                  >
                    Track Order
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleOrderAction('download', selectedOrder)}
                  icon={Download}
                >
                  Download Invoice
                </Button>
                {selectedOrder.canCancel && (
                  <Button
                    variant="outline"
                    onClick={() => handleOrderAction('cancel', selectedOrder)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        )}

        {/* Tracking Modal */}
        {showTrackingModal && selectedOrder && (
          <Modal
            isOpen={showTrackingModal}
            onClose={() => setShowTrackingModal(false)}
            title="Track Order"
            size="md"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedOrder.business}
                </h3>
                <p className="text-gray-600">Order #{selectedOrder.id}</p>
              </div>

              <div className="space-y-4">
                {selectedOrder.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.status}
                      </p>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setShowTrackingModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Orders;
