import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Download,
  X,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Search,
  Eye,
  Star,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const BookingManager = ({ onBack }) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // Mock booking data
  const bookings = [
    {
      id: "BK001",
      businessName: "Gangtok Electricians",
      businessImage:
        "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Home Electrical Repair",
      bookingDate: "2025-01-15",
      serviceDate: "2025-01-20",
      serviceTime: "10:00 AM - 2:00 PM",
      location: "MG Road, Gangtok",
      status: "confirmed",
      amount: 1500,
      paymentStatus: "paid",
      paymentId: "pay_MkB2Tx7QZghFK8",
      customerName: "You",
      phone: "+91 9876543210",
      email: "customer@email.com",
      specialRequests: "Need urgent repair for power outage in living room",
      providerContact: {
        name: "Rajesh Kumar",
        phone: "+91 8765432109",
        email: "rajesh@gangtokelectricians.com",
      },
      canCancel: true,
      receipt: "receipt_001.pdf",
    },
    {
      id: "BK002",
      businessName: "Mountain View Plumbers",
      businessImage:
        "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Bathroom Pipe Repair",
      bookingDate: "2025-01-10",
      serviceDate: "2025-01-12",
      serviceTime: "9:00 AM - 12:00 PM",
      location: "Tadong, Gangtok",
      status: "completed",
      amount: 850,
      paymentStatus: "paid",
      paymentId: "pay_NlC3Uy8RahjGL9",
      customerName: "You",
      phone: "+91 9876543210",
      email: "customer@email.com",
      specialRequests: "Leaking pipe in master bathroom, urgent fix needed",
      providerContact: {
        name: "Pemba Sherpa",
        phone: "+91 7654321098",
        email: "info@mountainplumbers.com",
      },
      canCancel: false,
      receipt: "receipt_002.pdf",
      rating: 5,
      review: "Excellent service! Fixed the issue quickly and professionally.",
    },
    {
      id: "BK003",
      businessName: "Tech Support Gangtok",
      businessImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Laptop Screen Repair",
      bookingDate: "2025-01-08",
      serviceDate: "2025-01-25",
      serviceTime: "11:00 AM - 3:00 PM",
      location: "Lal Market, Gangtok",
      status: "pending",
      amount: 3500,
      paymentStatus: "pending",
      paymentId: "pay_QoF6Xb1UdkmJO2",
      customerName: "You",
      phone: "+91 9876543210",
      email: "customer@email.com",
      specialRequests: "Replace cracked laptop screen, backup data if possible",
      providerContact: {
        name: "Sonam Lama",
        phone: "+91 4321098765",
        email: "tech@gangtoksupport.com",
      },
      canCancel: true,
      receipt: null,
    },
    {
      id: "BK004",
      businessName: "Sikkim Car Service",
      businessImage:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Car AC Repair",
      bookingDate: "2024-12-20",
      serviceDate: "2024-12-22",
      serviceTime: "2:00 PM - 5:00 PM",
      location: "Tibet Road, Gangtok",
      status: "cancelled",
      amount: 2200,
      paymentStatus: "refunded",
      paymentId: "pay_OmD4Vz9SbikHM0",
      customerName: "You",
      phone: "+91 9876543210",
      email: "customer@email.com",
      specialRequests: "AC not cooling properly, check compressor",
      providerContact: {
        name: "Karma Bhutia",
        phone: "+91 6543210987",
        email: "service@sikkimcar.com",
      },
      canCancel: false,
      receipt: "receipt_004.pdf",
      cancellationReason: "Customer cancelled due to emergency",
      cancellationDate: "2024-12-21",
    },
    {
      id: "BK005",
      businessName: "Gangtok Home Cleaners",
      businessImage:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Deep House Cleaning",
      bookingDate: "2024-12-15",
      serviceDate: "2024-12-18",
      serviceTime: "8:00 AM - 4:00 PM",
      location: "Ranipool, Gangtok",
      status: "completed",
      amount: 1200,
      paymentStatus: "paid",
      paymentId: "pay_PnE5Wa0TcjlIN1",
      customerName: "You",
      phone: "+91 9876543210",
      email: "customer@email.com",
      specialRequests:
        "Full house deep cleaning, focus on kitchen and bathrooms",
      providerContact: {
        name: "Tenzin Norbu",
        phone: "+91 5432109876",
        email: "clean@gangtok.com",
      },
      canCancel: false,
      receipt: "receipt_005.pdf",
      rating: 4,
      review: "Good service, house was thoroughly cleaned. Professional team.",
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || booking.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return AlertCircle;
      case "confirmed":
        return CheckCircle;
      case "completed":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
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
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelBooking = () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    // In real app, this would make an API call
    console.log(`Cancelling booking ${selectedBooking.id}:`, cancelReason);

    setShowCancelModal(false);
    setSelectedBooking(null);
    setCancelReason("");

    // Show success message
    alert(
      "Booking cancelled successfully. You will receive a confirmation email shortly."
    );
  };

  const handleDownloadReceipt = (booking) => {
    // In real app, this would download the actual receipt
    console.log(`Downloading receipt for booking ${booking.id}`);
    alert(`Receipt for booking ${booking.id} would be downloaded`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (selectedBooking) {
    const StatusIcon = getStatusIcon(selectedBooking.status);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedBooking(null)}
              >
                ← Back to Bookings
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Booking Details
              </h1>
            </div>

            {/* Booking Header */}
            <div className="flex items-start space-x-4 mb-6 pb-6 border-b">
              <img
                src={selectedBooking.businessImage}
                alt={selectedBooking.businessName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {selectedBooking.businessName}
                </h2>
                <p className="text-gray-600 mb-2">{selectedBooking.service}</p>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      selectedBooking.status
                    )}`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {selectedBooking.status.charAt(0).toUpperCase() +
                      selectedBooking.status.slice(1)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                      selectedBooking.paymentStatus
                    )}`}
                  >
                    {selectedBooking.paymentStatus.charAt(0).toUpperCase() +
                      selectedBooking.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{selectedBooking.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
            </div>

            {/* Service Details */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Service Information
                </h3>
                <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-600">
                        Service Date:
                      </span>
                      <span className="ml-2 font-medium">
                        {selectedBooking.serviceDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-600">Time:</span>
                      <span className="ml-2 font-medium">
                        {selectedBooking.serviceTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="ml-2 font-medium">
                        {selectedBooking.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Service Provider
                </h3>
                <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">
                      {selectedBooking.providerContact.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a
                      href={`tel:${selectedBooking.providerContact.phone}`}
                      className="text-primary-600 hover:underline"
                    >
                      {selectedBooking.providerContact.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a
                      href={`mailto:${selectedBooking.providerContact.email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {selectedBooking.providerContact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Special Requests
              </h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {selectedBooking.specialRequests}
              </p>
            </div>

            {/* Payment Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Payment Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-sm">
                    {selectedBooking.paymentId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">
                    ₹{selectedBooking.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(
                      selectedBooking.paymentStatus
                    )}`}
                  >
                    {selectedBooking.paymentStatus.charAt(0).toUpperCase() +
                      selectedBooking.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Cancellation Info */}
            {selectedBooking.status === "cancelled" &&
              selectedBooking.cancellationReason && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Cancellation Information
                  </h3>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-700 mb-2">
                      {selectedBooking.cancellationReason}
                    </p>
                    {selectedBooking.cancellationDate && (
                      <p className="text-sm text-red-600">
                        Cancelled on: {selectedBooking.cancellationDate}
                      </p>
                    )}
                  </div>
                </div>
              )}

            {/* Review Section */}
            {selectedBooking.status === "completed" &&
              selectedBooking.rating && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Your Review
                  </h3>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {renderStars(selectedBooking.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({selectedBooking.rating}/5)
                      </span>
                    </div>
                    <p className="text-gray-700">{selectedBooking.review}</p>
                  </div>
                </div>
              )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-6 border-t">
              {selectedBooking.receipt && (
                <Button
                  variant="outline"
                  onClick={() => handleDownloadReceipt(selectedBooking)}
                  icon={Download}
                >
                  Download Receipt
                </Button>
              )}

              {selectedBooking.canCancel &&
                selectedBooking.status !== "cancelled" && (
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelModal(true)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Cancel Booking
                  </Button>
                )}

              {selectedBooking.status === "completed" &&
                !selectedBooking.rating && (
                  <Button variant="primary">Write Review</Button>
                )}
            </div>
          </Card>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cancel Booking
                </h3>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel this booking? Please provide a
                reason:
              </p>

              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancellation..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />

              <div className="flex space-x-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1"
                >
                  Keep Booking
                </Button>
                <Button
                  onClick={handleCancelBooking}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Track and manage your service bookings
          </p>
        </div>

        {/* Stats Overview - Compact Mobile Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <Card className="p-3">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {bookingStats.total}
              </div>
              <div className="text-xs text-gray-600 mt-1">Total</div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-yellow-600">
                {bookingStats.pending}
              </div>
              <div className="text-xs text-gray-600 mt-1">Pending</div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-blue-600">
                {bookingStats.confirmed}
              </div>
              <div className="text-xs text-gray-600 mt-1">Confirmed</div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-green-600">
                {bookingStats.completed}
              </div>
              <div className="text-xs text-gray-600 mt-1">Completed</div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold text-red-600">
                {bookingStats.cancelled}
              </div>
              <div className="text-xs text-gray-600 mt-1">Cancelled</div>
            </div>
          </Card>
        </div>

        {/* Filters - Compact Mobile Design */}
        <Card className="p-3 sm:p-4 mb-4">
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={Search}
            />
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="flex flex-wrap gap-1.5">
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
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                      selectedStatus === filter.key
                        ? "bg-primary-100 text-primary-700 border border-primary-200"
                        : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {filter.label} ({filter.count}))
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const StatusIcon = getStatusIcon(booking.status);

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1 mb-4 sm:mb-0">
                    <img
                      src={booking.businessImage}
                      alt={booking.businessName}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                          {booking.businessName}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 sm:mt-0 self-start ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3 text-sm sm:text-base">
                        {booking.service}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{booking.serviceDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{booking.serviceTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{booking.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col sm:text-right sm:ml-4 items-center sm:items-end justify-between sm:justify-start">
                    <div className="sm:mb-3">
                      <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        ₹{booking.amount.toLocaleString()}
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(
                          booking.paymentStatus
                        )}`}
                      >
                        {booking.paymentStatus.charAt(0).toUpperCase() +
                          booking.paymentStatus.slice(1)}
                      </span>
                    </div>
                    <div className="sm:mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBooking(booking)}
                        icon={Eye}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                : "You haven't made any service bookings yet. Browse our services to get started."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingManager;
