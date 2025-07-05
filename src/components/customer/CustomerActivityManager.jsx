import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Heart,
  MessageCircle,
  CheckCircle,
  Package,
  ExternalLink,
  Phone,
  Filter,
  Search,
  Calendar,
  MapPin,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const CustomerActivityManager = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Extended activity data for the dedicated page
  const allActivities = [
    {
      id: 1,
      type: "review",
      business: "Taste of Tibet Restaurant",
      action: "Left a review",
      date: "Dec 28, 2024",
      rating: 5,
      category: "Food & Dining",
      location: "MG Marg",
      reviewText:
        "Excellent service! The food was delicious and the staff was very friendly. Highly recommend this place for authentic Tibetan cuisine.",
      businessImage:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 2,
      type: "save",
      business: "Green Valley Photographers",
      action: "Saved business",
      date: "Dec 27, 2024",
      category: "Photography",
      location: "Tadong",
      businessImage:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 3,
      type: "inquiry",
      business: "Mountain View AC Services",
      action: "Sent inquiry",
      date: "Dec 26, 2024",
      status: "responded",
      category: "Home Services",
      location: "Sichey",
      inquiryText:
        "Hi, I need AC repair service for my home. When would be the earliest available appointment?",
      businessImage:
        "https://images.pexels.com/photos/7464706/pexels-photo-7464706.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 4,
      type: "booking",
      business: "Himalayan Electricians",
      action: "Booked service",
      date: "Dec 25, 2024",
      status: "confirmed",
      category: "Electrical",
      location: "Development Area",
      bookingDetails: {
        service: "Electrical Repair",
        scheduledDate: "December 30, 2024",
        time: "2:00 PM - 4:00 PM",
        bookingId: "#BK2024001",
      },
      businessImage:
        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 5,
      type: "review",
      business: "Sikkim Mobile Repair",
      action: "Left a review",
      date: "Dec 24, 2024",
      rating: 4,
      category: "Electronics",
      location: "Lal Market",
      reviewText:
        "Good service and quick repair. The technician was knowledgeable and fixed my phone screen perfectly.",
      businessImage:
        "https://images.pexels.com/photos/4792264/pexels-photo-4792264.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 6,
      type: "save",
      business: "Mountain Bike Rentals",
      action: "Saved business",
      date: "Dec 23, 2024",
      category: "Transport",
      location: "MG Marg",
      businessImage:
        "https://images.pexels.com/photos/1618986/pexels-photo-1618986.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 7,
      type: "order",
      business: "Taste of Tibet Restaurant",
      action: "Placed order",
      date: "Dec 22, 2024",
      status: "delivered",
      category: "Food & Dining",
      location: "MG Marg",
      orderDetails: {
        orderId: "#ORD001",
        items: [
          "Chicken Momos (2 plates)",
          "Thukpa (1 bowl)",
          "Butter Tea (2 cups)",
        ],
        amount: "₹450",
        deliveryTime: "Dec 22, 2024 at 7:30 PM",
      },
      businessImage:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 8,
      type: "order",
      business: "Fresh Mart Groceries",
      action: "Placed order",
      date: "Dec 21, 2024",
      status: "completed",
      category: "Groceries",
      location: "Sichey",
      orderDetails: {
        orderId: "#ORD002",
        items: ["Rice (5kg)", "Dal (2kg)", "Vegetables", "Milk (2L)"],
        amount: "₹680",
        deliveryTime: "Dec 21, 2024 at 4:00 PM",
      },
      businessImage:
        "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "review":
        return Star;
      case "save":
        return Heart;
      case "inquiry":
        return MessageCircle;
      case "booking":
        return CheckCircle;
      case "order":
        return Package;
      default:
        return Package;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "review":
        return "bg-yellow-100 text-yellow-600";
      case "save":
        return "bg-red-100 text-red-600";
      case "inquiry":
        return "bg-blue-100 text-blue-600";
      case "booking":
        return "bg-green-100 text-green-600";
      case "order":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusBadge = (activity) => {
    if (!activity.status) return null;

    const statusColors = {
      responded: "bg-green-100 text-green-800",
      confirmed: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`inline-block px-2 py-1 text-xs rounded-full ${
          statusColors[activity.status] || statusColors.pending
        }`}
      >
        {activity.status}
      </span>
    );
  };

  const filteredActivities = allActivities.filter((activity) => {
    const matchesFilter =
      selectedFilter === "all" || activity.type === selectedFilter;
    const matchesSearch =
      activity.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">My Activity</h1>
          <p className="text-gray-600 mt-1">
            Track your interactions with local businesses
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search businesses or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={Search}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {[
                { value: "all", label: "All" },
                { value: "review", label: "Reviews" },
                { value: "save", label: "Saved" },
                { value: "inquiry", label: "Inquiries" },
                { value: "booking", label: "Bookings" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={
                    selectedFilter === filter.value ? "primary" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className="whitespace-nowrap"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => {
            const IconComponent = getActivityIcon(activity.type);
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Business Image */}
                    <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img
                        src={activity.businessImage}
                        alt={activity.business}
                        className="w-full h-full object-cover transition-opacity duration-200"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                        onLoad={(e) => {
                          e.target.style.opacity = "1";
                        }}
                        style={{ opacity: 0 }}
                      />
                      {/* Fallback placeholder */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 items-center justify-center"
                        style={{ display: "none" }}
                      >
                        <div className="text-primary-600 text-xs font-medium text-center">
                          {activity.business
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Activity Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-full ${getActivityColor(
                              activity.type
                            )} flex-shrink-0`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {activity.business}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {activity.action} • {activity.date}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {activity.category}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {activity.location}
                              </span>
                              {getStatusBadge(activity)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Activity-specific content */}
                      {activity.type === "review" && (
                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < activity.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-yellow-900">
                              {activity.rating}/5 Stars
                            </span>
                          </div>
                          <p className="text-yellow-800 text-sm leading-relaxed">
                            "{activity.reviewText}"
                          </p>
                        </div>
                      )}

                      {activity.type === "inquiry" && (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Your Inquiry
                          </h4>
                          <p className="text-blue-800 text-sm leading-relaxed">
                            "{activity.inquiryText}"
                          </p>
                          {activity.status === "responded" && (
                            <div className="mt-2 pt-2 border-t border-blue-200">
                              <p className="text-blue-700 text-xs">
                                ✓ Business responded
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {activity.type === "booking" &&
                        activity.bookingDetails && (
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <h4 className="font-medium text-green-900 mb-2">
                              Booking Details
                            </h4>
                            <div className="text-green-800 text-sm space-y-1">
                              <p>📅 {activity.bookingDetails.scheduledDate}</p>
                              <p>⏰ {activity.bookingDetails.time}</p>
                              <p>🔧 {activity.bookingDetails.service}</p>
                              <p>🆔 {activity.bookingDetails.bookingId}</p>
                            </div>
                          </div>
                        )}

                      {activity.type === "save" && (
                        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span className="text-sm font-medium text-red-900">
                              Saved to Favorites
                            </span>
                          </div>
                          <p className="text-red-800 text-sm mt-1">
                            Quick access from your saved businesses list.
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            // Navigate to business detail page
                            window.location.href = `/business/${activity.business
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`;
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Business
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`tel:+919876543210`)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        {activity.type === "inquiry" &&
                          activity.status === "responded" && (
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              View Response
                            </Button>
                          )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <Card className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No activities found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start exploring businesses to see your activity here"}
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerActivityManager;
