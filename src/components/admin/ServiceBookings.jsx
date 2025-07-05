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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedBooking(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Service Bookings
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Booking #{selectedBooking.id}
                </h3>
                <div className="flex items-center space-x-3">
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
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ₹{selectedBooking.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Commission: ₹{selectedBooking.commission}
                </div>
              </div>
            </div>

            {/* Service & Seller Information */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Service Provider
                </h4>
                <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {selectedBooking.seller.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a
                      href={`mailto:${selectedBooking.seller.email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {selectedBooking.seller.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a
                      href={`tel:${selectedBooking.seller.phone}`}
                      className="text-primary-600 hover:underline"
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
                <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {selectedBooking.customer.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a
                      href={`mailto:${selectedBooking.customer.email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {selectedBooking.customer.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a
                      href={`tel:${selectedBooking.customer.phone}`}
                      className="text-primary-600 hover:underline"
                    >
                      {selectedBooking.customer.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Service Details
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">Service:</span>
                  <span className="text-gray-700">
                    {selectedBooking.service}
                  </span>
                </div>
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
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Special Requests
              </h4>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
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
            <div className="flex flex-wrap gap-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() =>
                  handleAdminAction(selectedBooking.id, "view-seller")
                }
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
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Initiate Refund
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => handleAdminAction(selectedBooking.id, "contact")}
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Service Bookings</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage all service bookings across the platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{bookingStats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
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
                      #{booking.id}
                    </h4>
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600">Service:</span>
                      <div className="font-medium text-gray-900">
                        {booking.service}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Provider:</span>
                      <div className="font-medium text-gray-900">
                        {booking.seller.name}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Customer:</span>
                      <div className="font-medium text-gray-900">
                        {booking.customer.name}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <div className="font-medium text-gray-900">
                        ₹{booking.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.eventDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Booked {booking.bookingDate}</span>
                    </div>
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
