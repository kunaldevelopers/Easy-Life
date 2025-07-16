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
  Eye,
  Edit,
  Ban,
  MessageCircle,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const ServiceBookings = ({ onBack }) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock service bookings data from all sellers
  const serviceBookings = [
    {
      id: "BK001",
      seller: {
        name: "Gangtok Electricians",
        email: "contact@gangtokelectricians.com",
        phone: "+91 8765432109",
        businessId: "BUS001",
      },
      customer: {
        name: "Rajesh Sharma",
        email: "rajesh.sharma@email.com",
        phone: "+91 9841234567",
      },
      service: "Home Electrical Repair",
      eventDate: "December 25, 2024",
      eventTime: "10:00 AM - 2:00 PM",
      location: "MG Road, Gangtok",
      bookingDate: "Dec 20, 2024",
      status: "confirmed",
      amount: 1500,
      commission: 225, // 15%
      guestCount: 1,
      specialRequests: "Need urgent repair for power outage",
      paymentStatus: "paid",
      paymentId: "pay_MkB2Tx7QZghFK8",
    },
    {
      id: "BK002",
      seller: {
        name: "Mountain View Plumbers",
        email: "info@mountainplumbers.com",
        phone: "+91 7654321098",
        businessId: "BUS002",
      },
      customer: {
        name: "Priya Devi",
        email: "priya.devi@email.com",
        phone: "+91 9812345678",
      },
      service: "Bathroom Pipe Repair",
      eventDate: "December 22, 2024",
      eventTime: "9:00 AM - 12:00 PM",
      location: "Tadong, Gangtok",
      bookingDate: "Dec 18, 2024",
      status: "pending",
      amount: 850,
      commission: 127.5, // 15%
      guestCount: 1,
      specialRequests: "Leaking pipe in master bathroom",
      paymentStatus: "pending",
      paymentId: "pay_NlC3Uy8RahjGL9",
    },
    {
      id: "BK003",
      seller: {
        name: "Sikkim Car Service",
        email: "service@sikkimcar.com",
        phone: "+91 6543210987",
        businessId: "BUS003",
      },
      customer: {
        name: "Karma Bhutia",
        email: "karma.bhutia@email.com",
        phone: "+91 9823456789",
      },
      service: "Car AC Repair",
      eventDate: "December 24, 2024",
      eventTime: "2:00 PM - 5:00 PM",
      location: "Tibet Road, Gangtok",
      bookingDate: "Dec 19, 2024",
      status: "completed",
      amount: 2200,
      commission: 330, // 15%
      guestCount: 1,
      specialRequests: "AC not cooling properly, check compressor",
      paymentStatus: "paid",
      paymentId: "pay_OmD4Vz9SbikHM0",
    },
    {
      id: "BK004",
      seller: {
        name: "Gangtok Home Cleaners",
        email: "clean@gangtok.com",
        phone: "+91 5432109876",
        businessId: "BUS004",
      },
      customer: {
        name: "Tenzin Norbu",
        email: "tenzin.norbu@email.com",
        phone: "+91 9834567890",
      },
      service: "Deep House Cleaning",
      eventDate: "December 26, 2024",
      eventTime: "8:00 AM - 4:00 PM",
      location: "Ranipool, Gangtok",
      bookingDate: "Dec 21, 2024",
      status: "cancelled",
      amount: 1200,
      commission: 180, // 15%
      guestCount: 1,
      specialRequests: "Full house deep cleaning before New Year",
      paymentStatus: "refunded",
      paymentId: "pay_PnE5Wa0TcjlIN1",
      cancellationReason: "Customer cancelled due to family emergency",
    },
    {
      id: "BK005",
      seller: {
        name: "Tech Support Gangtok",
        email: "tech@gangtoksupport.com",
        phone: "+91 4321098765",
        businessId: "BUS005",
      },
      customer: {
        name: "Sonam Choden",
        email: "sonam.choden@email.com",
        phone: "+91 9845678901",
      },
      service: "Laptop Screen Repair",
      eventDate: "December 27, 2024",
      eventTime: "11:00 AM - 3:00 PM",
      location: "Lal Market, Gangtok",
      bookingDate: "Dec 22, 2024",
      status: "confirmed",
      amount: 3500,
      commission: 525, // 15%
      guestCount: 1,
      specialRequests: "Replace cracked laptop screen, backup data",
      paymentStatus: "paid",
      paymentId: "pay_QoF6Xb1UdkmJO2",
    },
  ];

  const filteredBookings = serviceBookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || booking.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const bookingStats = {
    total: serviceBookings.length,
    pending: serviceBookings.filter((b) => b.status === "pending").length,
    confirmed: serviceBookings.filter((b) => b.status === "confirmed").length,
    completed: serviceBookings.filter((b) => b.status === "completed").length,
    cancelled: serviceBookings.filter((b) => b.status === "cancelled").length,
    totalRevenue: serviceBookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.amount, 0),
    totalCommission: serviceBookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.commission, 0),
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case "completed":
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
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const handleAdminAction = (bookingId, action) => {
    console.log(`Admin action: ${action} for booking: ${bookingId}`);
    // Handle admin actions like force cancel, refund, etc.
  };

  if (selectedBooking) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedBooking(null)}
              className="mb-4 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Service Bookings
            </Button>
          </div>

          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Booking #{selectedBooking.id}
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {getStatusIcon(selectedBooking.status)}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status.charAt(0).toUpperCase() +
                      selectedBooking.status.slice(1)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                      selectedBooking.paymentStatus
                    )}`}
                  >
                    Payment:{" "}
                    {selectedBooking.paymentStatus.charAt(0).toUpperCase() +
                      selectedBooking.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <div className="text-lg font-semibold text-gray-900">
                  ₹{selectedBooking.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Commission: ₹{selectedBooking.commission}
                </div>
              </div>
            </div>

            {/* Service & Seller Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Service Provider
                </h4>
                <div className="space-y-3 bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0">
                    <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-900 text-sm sm:text-base truncate">
                      {selectedBooking.seller.name}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 min-w-0">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${selectedBooking.seller.email}`}
                      className="text-primary-600 hover:underline text-sm sm:text-base break-all"
                    >
                      {selectedBooking.seller.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 min-w-0">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <a
                      href={`tel:${selectedBooking.seller.phone}`}
                      className="text-primary-600 hover:underline text-sm sm:text-base"
                    >
                      {selectedBooking.seller.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Customer Information
                </h4>
                <div className="space-y-3 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0">
                    <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-900 text-sm sm:text-base truncate">
                      {selectedBooking.customer.name}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 min-w-0">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${selectedBooking.customer.email}`}
                      className="text-primary-600 hover:underline text-sm sm:text-base break-all"
                    >
                      {selectedBooking.customer.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 min-w-0">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <a
                      href={`tel:${selectedBooking.customer.phone}`}
                      className="text-primary-600 hover:underline text-sm sm:text-base"
                    >
                      {selectedBooking.customer.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Service Details
              </h4>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-3">
                <div className="flex items-start space-x-3 min-w-0">
                  <span className="font-medium text-gray-900 text-sm flex-shrink-0">
                    Service:
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {selectedBooking.service}
                  </span>
                </div>
                <div className="flex items-start space-x-3 min-w-0">
                  <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">
                    {selectedBooking.eventDate}
                  </span>
                </div>
                <div className="flex items-start space-x-3 min-w-0">
                  <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">
                    {selectedBooking.eventTime}
                  </span>
                </div>
                <div className="flex items-start space-x-3 min-w-0">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base break-words">
                    {selectedBooking.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Special Requests
              </h4>
              <p className="text-gray-700 text-sm sm:text-base bg-blue-50 p-3 rounded-lg leading-relaxed">
                {selectedBooking.specialRequests}
              </p>
            </div>

            {/* Payment Information */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Payment Information
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-sm">
                    {selectedBooking.paymentId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Amount:</span>
                  <span className="font-semibold">
                    ₹{selectedBooking.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Platform Commission (15%):
                  </span>
                  <span className="font-semibold text-blue-600">
                    ₹{selectedBooking.commission}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Seller Payout:</span>
                  <span className="font-semibold">
                    ₹
                    {(
                      selectedBooking.amount - selectedBooking.commission
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
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

            {/* Admin Actions */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-4 sm:pt-6 border-t">
              <Button
                variant="outline"
                onClick={() =>
                  handleAdminAction(selectedBooking.id, "view-seller")
                }
                className="text-sm w-full sm:w-auto"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Seller Profile
              </Button>

              {selectedBooking.status !== "cancelled" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    handleAdminAction(selectedBooking.id, "force-cancel")
                  }
                  className="text-sm w-full sm:w-auto"
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Force Cancel
                </Button>
              )}

              {selectedBooking.paymentStatus === "paid" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    handleAdminAction(selectedBooking.id, "refund")
                  }
                  className="text-sm w-full sm:w-auto"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Initiate Refund
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => handleAdminAction(selectedBooking.id, "contact")}
                className="text-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Parties
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Service Bookings
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Monitor and manage all service bookings across the platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3 flex-shrink-0">
                <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {bookingStats.total}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Total Bookings
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3 flex-shrink-0">
                <DollarSign className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  ₹{bookingStats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Total Revenue
                </div>
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
                  ₹{bookingStats.totalCommission.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Platform Commission</div>
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
                <div className="text-sm text-gray-600">Pending Bookings</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Distribution */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Booking Status Distribution
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {bookingStats.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {bookingStats.confirmed}
              </div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bookingStats.completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {bookingStats.cancelled}
              </div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-4 sm:p-6 mb-6">
          <div className="flex flex-col space-y-4">
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Filter by:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
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
                    key: "completed",
                    label: "Completed",
                    count: bookingStats.completed,
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
                    className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap ${
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
              className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3">
                    <h4 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">
                      #{booking.id}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                          booking.paymentStatus
                        )}`}
                      >
                        {booking.paymentStatus.charAt(0).toUpperCase() +
                          booking.paymentStatus.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 text-sm">
                    <div className="min-w-0">
                      <span className="text-gray-600 block">Service:</span>
                      <div className="font-medium text-gray-900 truncate">
                        {booking.service}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-gray-600 block">Provider:</span>
                      <div className="font-medium text-gray-900 truncate">
                        {booking.seller.name}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-gray-600 block">Customer:</span>
                      <div className="font-medium text-gray-900 truncate">
                        {booking.customer.name}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-gray-600 block">Amount:</span>
                      <div className="font-medium text-gray-900">
                        ₹{booking.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600">
                    <div className="flex items-center space-x-1 min-w-0">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{booking.eventDate}</span>
                    </div>
                    <div className="flex items-center space-x-1 min-w-0">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{booking.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 min-w-0">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        Booked {booking.bookingDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col lg:flex-col space-x-2 sm:space-x-0 sm:space-y-2 lg:ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedBooking(booking)}
                    className="flex-1 sm:flex-none text-xs sm:text-sm"
                  >
                    View Details
                  </Button>
                  {booking.status === "pending" && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedBooking(booking)}
                      className="flex-1 sm:flex-none text-xs sm:text-sm"
                    >
                      Manage
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
                : "Service bookings will appear here when customers book services."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServiceBookings;
