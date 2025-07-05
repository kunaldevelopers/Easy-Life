import React, { useState } from "react";
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
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Orders = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Comprehensive demo orders data
  const allOrders = [
    {
      id: "ORD001",
      business: "Taste of Tibet Restaurant",
      businessPhone: "+91 9876543210",
      service: "Food Delivery",
      category: "Food & Dining",
      date: "Dec 28, 2024",
      orderDate: "December 28, 2024",
      amount: "₹450",
      status: "delivered",
      location: "MG Marg, Gangtok",
      estimatedTime: "45 minutes",
      deliveryTime: "42 minutes",
      rating: 5,
      orderItems: [
        "Momos (2 plates)",
        "Thukpa (1 bowl)",
        "Butter Tea (2 cups)",
      ],
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Authentic Tibetan cuisine delivered fresh and hot.",
    },
    {
      id: "ORD002",
      business: "Himalayan Electricians",
      businessPhone: "+91 9876543211",
      service: "Electrical Repair",
      category: "Home Services",
      date: "Dec 25, 2024",
      orderDate: "December 25, 2024",
      amount: "₹1,200",
      status: "completed",
      location: "Development Area, Gangtok",
      estimatedTime: "2 hours",
      completionTime: "1 hour 45 minutes",
      rating: 4,
      orderItems: ["Ceiling fan installation", "Wiring repair", "Safety check"],
      image:
        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Professional electrical services for your home.",
    },
    {
      id: "ORD003",
      business: "Green Valley Photographers",
      businessPhone: "+91 9876543212",
      service: "Event Photography",
      category: "Photography",
      date: "Dec 20, 2024",
      orderDate: "December 20, 2024",
      amount: "₹8,500",
      status: "confirmed",
      location: "Tadong, Gangtok",
      estimatedTime: "6 hours",
      scheduledDate: "January 5, 2025",
      orderItems: ["Wedding photography", "Pre-wedding shoot", "Digital album"],
      image:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Capturing your special moments with professional expertise.",
    },
    {
      id: "ORD004",
      business: "Sikkim Mobile Repair",
      businessPhone: "+91 9876543213",
      service: "Screen Replacement",
      category: "Electronics",
      date: "Dec 18, 2024",
      orderDate: "December 18, 2024",
      amount: "₹2,800",
      status: "completed",
      location: "Lal Market, Gangtok",
      estimatedTime: "3 hours",
      completionTime: "2 hours 30 minutes",
      rating: 5,
      orderItems: ["iPhone 12 screen replacement", "Tempered glass", "Case"],
      image:
        "https://images.pexels.com/photos/4792264/pexels-photo-4792264.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Expert mobile repair services with genuine parts.",
    },
    {
      id: "ORD005",
      business: "Mountain Bike Service",
      businessPhone: "+91 9876543214",
      service: "Bike Maintenance",
      category: "Automotive",
      date: "Dec 15, 2024",
      orderDate: "December 15, 2024",
      amount: "₹950",
      status: "delivered",
      location: "Zero Point, Gangtok",
      estimatedTime: "4 hours",
      completionTime: "3 hours 45 minutes",
      rating: 4,
      orderItems: ["Full service", "Chain lubrication", "Brake adjustment"],
      image:
        "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Professional bike maintenance and repair services.",
    },
    {
      id: "ORD006",
      business: "Gangtok Home Cleaners",
      businessPhone: "+91 9876543215",
      service: "Deep Cleaning",
      category: "Cleaning",
      date: "Dec 12, 2024",
      orderDate: "December 12, 2024",
      amount: "₹1,800",
      status: "completed",
      location: "Sichey, Gangtok",
      estimatedTime: "5 hours",
      completionTime: "4 hours 30 minutes",
      rating: 5,
      orderItems: [
        "Kitchen deep clean",
        "Bathroom sanitization",
        "Floor mopping",
      ],
      image:
        "https://images.pexels.com/photos/4239107/pexels-photo-4239107.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Professional home cleaning services for a spotless home.",
    },
  ];

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

  const filteredOrders = allOrders.filter((order) => {
    const matchesFilter =
      selectedFilter === "all" || order.status === selectedFilter;
    const matchesSearch =
      order.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
  ];

  return (
    <>
      <Helmet>
        <title>My Orders - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
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
          </div>

          {/* Search and Filters */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon={Search}
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedFilter === filter.id
                        ? "bg-primary-100 text-primary-600 border border-primary-200"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
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
                    <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        {/* Business Image */}
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={order.image}
                            alt={order.business}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 items-center justify-center text-white font-bold text-lg hidden">
                            {order.business.charAt(0)}
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {order.business}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {order.service}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                              <p className="text-lg font-bold text-gray-900">
                                {order.amount}
                              </p>
                              <p className="text-xs text-gray-500">
                                {order.id}
                              </p>
                            </div>
                          </div>

                          {/* Status and Date */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
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
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">Items:</p>
                            <div className="flex flex-wrap gap-1">
                              {order.orderItems.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(`tel:${order.businessPhone}`)
                                }
                                icon={Phone}
                                className="text-xs"
                              >
                                Call Business
                              </Button>
                              {order.status === "confirmed" && (
                                <span className="text-xs text-blue-600 font-medium">
                                  Scheduled: {order.scheduledDate}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() =>
                                navigate(
                                  `/business/${order.business
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                                )
                              }
                              className="text-xs"
                            >
                              View Business
                            </Button>
                          </div>
                        </div>
                      </div>
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
      </div>
    </>
  );
};

export default Orders;
