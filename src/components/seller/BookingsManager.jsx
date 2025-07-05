import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  MapPin,
  Phone,
  Mail,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const BookingsManager = ({ onBack }) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
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
      additionalInfo:
        "This is a destination wedding with guests coming from abroad.",
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
      additionalInfo:
        "Sweet 16 party, teenage crowd, colorful decorations preferred.",
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
      additionalInfo: "Annual company meeting, professional setup required.",
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
      additionalInfo: "25th wedding anniversary, family gathering.",
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
      additionalInfo: "Engineering graduation celebration, young crowd.",
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || booking.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    totalRevenue: bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + parseInt(b.budget.replace(/[^0-9]/g, "")), 0),
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusUpdate = (bookingId, newStatus) => {
    // Handle status update logic here
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`);
    setSelectedBooking(null);
  };

  const handleSendMessage = (bookingId, message) => {
    // Handle sending message logic here
    console.log(`Sending message to booking ${bookingId}:`, message);
  };

  if (selectedBooking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedBooking(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bookings
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
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

            {/* Customer Information */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div>
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
                      className="text-primary-600 hover:underline"
                    >
                      {selectedBooking.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a
                      href={`tel:${selectedBooking.phone}`}
                      className="text-primary-600 hover:underline"
                    >
                      {selectedBooking.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div>
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
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Special Requests
              </h4>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                {selectedBooking.specialRequests}
              </p>
            </div>

            {/* Additional Information */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Additional Information
              </h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {selectedBooking.additionalInfo}
              </p>
            </div>

            {/* Cancellation Reason (if cancelled) */}
            {selectedBooking.status === "cancelled" &&
              selectedBooking.cancellationReason && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Cancellation Reason
                  </h4>
                  <p className="text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                    {selectedBooking.cancellationReason}
                  </p>
                </div>
              )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t">
              {selectedBooking.status === "pending" && (
                <>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleStatusUpdate(selectedBooking.id, "confirmed")
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleStatusUpdate(selectedBooking.id, "cancelled")
                    }
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                onClick={() => handleSendMessage(selectedBooking.id, "")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(`tel:${selectedBooking.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Customer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Booking Requests</h1>
          <p className="text-gray-600 mt-1">
            Manage and respond to customer booking requests
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {bookingStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg mr-3">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {bookingStats.pending}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {bookingStats.confirmed}
                </div>
                <div className="text-sm text-gray-600">Confirmed</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {bookingStats.cancelled}
                </div>
                <div className="text-sm text-gray-600">Cancelled</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  Rs. {bookingStats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={Search}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex space-x-1">
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
                    onClick={() => setSelectedStatus(filter.key)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedStatus === filter.key
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">
                      {booking.service}
                    </h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">
                        {booking.customerName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{booking.eventDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">
                        {booking.location.split(",")[0]}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{booking.budget}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {booking.specialRequests}
                  </p>

                  <div className="text-xs text-gray-500">
                    Requested {booking.requestDate} • {booking.guestCount}{" "}
                    guests
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    View Details
                  </Button>
                  {booking.status === "pending" && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      Respond
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Booking requests will appear here when customers request your services."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsManager;
