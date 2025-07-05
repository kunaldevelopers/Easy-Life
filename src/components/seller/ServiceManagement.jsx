import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Activity,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Search,
  User,
  MapPin,
  Phone,
  Mail,
  XCircle,
  MessageCircle,
  Download,
  Banknote,
  Edit,
  Bell,
  Package,
  Truck,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const ServiceManagement = ({ onBack, initialTab = "orders" }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // "orders" or "settlements"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  // Mock orders data for current seller
  const orders = [
    {
      id: "ORD001",
      customer: {
        name: "Rajesh Sharma",
        email: "rajesh.sharma@email.com",
        phone: "+91 9841234567",
      },
      service: "Home Electrical Repair",
      serviceType: "Emergency Repair",
      eventDate: "December 25, 2024",
      eventTime: "10:00 AM - 2:00 PM",
      location: "MG Road, Gangtok",
      orderDate: "Dec 20, 2024",
      status: "pending", // pending, confirmed, in-progress, completed, cancelled, rejected
      amount: 1500,
      platformFee: 225, // 15%
      netAmount: 1275,
      priority: "high",
      specialRequests: "Need urgent repair for power outage",
      description:
        "Main electrical panel needs inspection and repair. Customer experiencing complete power outage.",
      paymentStatus: "paid",
      paymentId: "pay_MkB2Tx7QZghFK8",
      customerRating: null,
      customerReview: null,
      estimatedDuration: "4 hours",
      requiresApproval: true,
      notifications: ["New urgent order", "Payment confirmed"],
    },
    {
      id: "ORD002",
      customer: {
        name: "Priya Devi",
        email: "priya.devi@email.com",
        phone: "+91 9812345678",
      },
      service: "Electrical Installation",
      serviceType: "New Installation",
      eventDate: "December 22, 2024",
      eventTime: "9:00 AM - 5:00 PM",
      location: "Tadong, Gangtok",
      orderDate: "Dec 18, 2024",
      status: "confirmed",
      amount: 2500,
      platformFee: 375, // 15%
      netAmount: 2125,
      priority: "medium",
      specialRequests: "Install new electrical points and ceiling fans",
      description:
        "Complete electrical installation for newly constructed rooms. Includes wiring, switches, and fixtures.",
      paymentStatus: "paid",
      paymentId: "pay_NlC3Uy8RahjGL9",
      customerRating: null,
      customerReview: null,
      estimatedDuration: "8 hours",
      requiresApproval: false,
      notifications: ["Order confirmed", "Materials list required"],
    },
    {
      id: "ORD003",
      customer: {
        name: "Karma Bhutia",
        email: "karma.bhutia@email.com",
        phone: "+91 9823456789",
      },
      service: "Emergency Electrical Fix",
      serviceType: "Emergency Repair",
      eventDate: "December 15, 2024",
      eventTime: "2:00 PM - 4:00 PM",
      location: "Tibet Road, Gangtok",
      orderDate: "Dec 15, 2024",
      status: "completed",
      amount: 800,
      platformFee: 120, // 15%
      netAmount: 680,
      priority: "high",
      specialRequests: "Urgent power restoration",
      description:
        "Short circuit repair and safety inspection completed successfully.",
      paymentStatus: "paid",
      paymentId: "pay_OmD4Vz9SbikHM0",
      customerRating: 5,
      customerReview: "Excellent and prompt service! Fixed the issue quickly.",
      estimatedDuration: "2 hours",
      requiresApproval: false,
      notifications: ["Service completed", "Payment settled"],
    },
    {
      id: "ORD004",
      customer: {
        name: "Tenzin Norbu",
        email: "tenzin.norbu@email.com",
        phone: "+91 9834567890",
      },
      service: "Electrical Inspection",
      serviceType: "Safety Inspection",
      eventDate: "December 28, 2024",
      eventTime: "10:00 AM - 12:00 PM",
      location: "Ranipool, Gangtok",
      orderDate: "Dec 21, 2024",
      status: "cancelled",
      amount: 500,
      platformFee: 75, // 15%
      netAmount: 425,
      priority: "low",
      specialRequests: "Safety inspection for old wiring",
      description:
        "Comprehensive electrical safety inspection for old residential wiring.",
      paymentStatus: "refunded",
      paymentId: "pay_PnE5Wa0TcjlIN1",
      cancellationReason:
        "Customer rescheduled, but we couldn't accommodate new date",
      customerRating: null,
      customerReview: null,
      estimatedDuration: "2 hours",
      requiresApproval: false,
      notifications: ["Order cancelled", "Refund processed"],
    },
    {
      id: "ORD005",
      customer: {
        name: "Sonam Lhamo",
        email: "sonam.lhamo@email.com",
        phone: "+91 9845678901",
      },
      service: "Smart Home Setup",
      serviceType: "Installation & Configuration",
      eventDate: "December 30, 2024",
      eventTime: "11:00 AM - 6:00 PM",
      location: "Development Area, Gangtok",
      orderDate: "Dec 23, 2024",
      status: "in-progress",
      amount: 4500,
      platformFee: 675, // 15%
      netAmount: 3825,
      priority: "medium",
      specialRequests: "Setup smart switches, security cameras, and automation",
      description:
        "Complete smart home automation setup including WiFi switches, security system, and mobile app configuration.",
      paymentStatus: "paid",
      paymentId: "pay_RpG7Yc2VelmKP3",
      customerRating: null,
      customerReview: null,
      estimatedDuration: "7 hours",
      requiresApproval: false,
      notifications: ["Work in progress", "50% completed"],
    },
  ];

  // Mock settlements data for current seller
  const settlements = [
    {
      id: "STL001",
      orderId: "ORD003",
      customer: "Karma Bhutia",
      service: "Emergency Electrical Fix",
      transactionDate: "Dec 15, 2024",
      settlementDate: "Dec 19, 2024", // T+4 days
      actualSettlementDate: "Dec 19, 2024",
      grossAmount: 800,
      platformFee: 120,
      taxDeduction: 0,
      netAmount: 680,
      status: "completed", // pending, processing, completed, failed, on-hold
      paymentMode: "Bank Transfer",
      utrNumber: "UTR123456789",
      bankAccount: "SBI ****1234",
      processingDays: 4,
      settlementCycle: "T+4",
      razorpayOrderId: "order_MkB2Tx7QZghFK8",
      settlementType: "automatic",
    },
    {
      id: "STL002",
      orderId: "ORD002",
      customer: "Priya Devi",
      service: "Electrical Installation",
      transactionDate: "Dec 22, 2024",
      settlementDate: "Dec 26, 2024", // T+4 days
      actualSettlementDate: null,
      grossAmount: 2500,
      platformFee: 375,
      taxDeduction: 0,
      netAmount: 2125,
      status: "processing",
      paymentMode: "Bank Transfer",
      utrNumber: null,
      bankAccount: "SBI ****1234",
      processingDays: 2,
      settlementCycle: "T+4",
      razorpayOrderId: "order_NlC3Uy8RahjGL9",
      settlementType: "automatic",
      estimatedSettlement: "Dec 26, 2024",
    },
    {
      id: "STL003",
      orderId: "ORD001",
      customer: "Rajesh Sharma",
      service: "Home Electrical Repair",
      transactionDate: "Dec 25, 2024",
      settlementDate: "Dec 29, 2024", // T+4 days
      actualSettlementDate: null,
      grossAmount: 1500,
      platformFee: 225,
      taxDeduction: 0,
      netAmount: 1275,
      status: "pending",
      paymentMode: "Bank Transfer",
      utrNumber: null,
      bankAccount: "SBI ****1234",
      processingDays: 4,
      settlementCycle: "T+4",
      razorpayOrderId: "order_MkB2Tx7QZghFK8",
      settlementType: "automatic",
      estimatedSettlement: "Dec 29, 2024",
    },
    {
      id: "STL004",
      orderId: "ORD005",
      customer: "Sonam Lhamo",
      service: "Smart Home Setup",
      transactionDate: "Dec 30, 2024",
      settlementDate: "Jan 3, 2025", // T+4 days
      actualSettlementDate: null,
      grossAmount: 4500,
      platformFee: 675,
      taxDeduction: 135, // TDS if applicable
      netAmount: 3690,
      status: "on-hold",
      paymentMode: "Bank Transfer",
      utrNumber: null,
      bankAccount: "SBI ****1234",
      processingDays: 4,
      settlementCycle: "T+4",
      razorpayOrderId: "order_RpG7Yc2VelmKP3",
      settlementType: "manual_review",
      holdReason: "Large transaction under review",
      estimatedSettlement: "Jan 5, 2025",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const filteredSettlements = settlements.filter((settlement) => {
    const matchesSearch =
      settlement.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || settlement.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    inProgress: orders.filter((o) => o.status === "in-progress").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
    totalRevenue: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.amount, 0),
    totalEarnings: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.netAmount, 0),
  };

  const settlementStats = {
    total: settlements.length,
    pending: settlements.filter((s) => s.status === "pending").length,
    processing: settlements.filter((s) => s.status === "processing").length,
    completed: settlements.filter((s) => s.status === "completed").length,
    failed: settlements.filter((s) => s.status === "failed").length,
    onHold: settlements.filter((s) => s.status === "on-hold").length,
    totalPending: settlements
      .filter((s) => s.status === "pending")
      .reduce((sum, s) => sum + s.netAmount, 0),
    totalCompleted: settlements
      .filter((s) => s.status === "completed")
      .reduce((sum, s) => sum + s.netAmount, 0),
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case "in-progress":
        return <Package className="w-5 h-5 text-purple-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-red-100 text-red-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSettlementStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "processing":
        return <Activity className="w-5 h-5 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "on-hold":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSettlementStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Order Management Functions
  const handleOrderAction = (orderId, action, reason = null) => {
    console.log(
      `${action} order ${orderId}`,
      reason ? `Reason: ${reason}` : ""
    );

    // Simulate API call
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedOrder = { ...order };

        switch (action) {
          case "approve":
            updatedOrder.status = "confirmed";
            updatedOrder.notifications = [
              ...(order.notifications || []),
              "Order approved by seller",
            ];
            break;
          case "reject":
            updatedOrder.status = "rejected";
            updatedOrder.rejectionReason = reason;
            updatedOrder.notifications = [
              ...(order.notifications || []),
              "Order rejected by seller",
            ];
            break;
          case "start":
            updatedOrder.status = "in-progress";
            updatedOrder.startTime = new Date().toISOString();
            updatedOrder.notifications = [
              ...(order.notifications || []),
              "Work started",
            ];
            break;
          case "complete":
            updatedOrder.status = "completed";
            updatedOrder.completionTime = new Date().toISOString();
            updatedOrder.notifications = [
              ...(order.notifications || []),
              "Service completed",
            ];
            break;
          case "cancel":
            updatedOrder.status = "cancelled";
            updatedOrder.cancellationReason = reason;
            updatedOrder.notifications = [
              ...(order.notifications || []),
              "Order cancelled",
            ];
            break;
          default:
            break;
        }

        return updatedOrder;
      }
      return order;
    });

    // In real app, this would update the state and make API call
    setSelectedOrder(null);
    alert(`Order ${action}ed successfully!`);
  };

  const handleSendMessage = (orderId, message) => {
    console.log(`Sending message to order ${orderId}:`, message);
    // In real app, this would send message to customer
    alert("Message sent to customer!");
  };

  const handleNotificationAction = (notification) => {
    console.log("Handling notification:", notification);
    // Mark notification as read or take appropriate action
  };

  const downloadSettlementReport = () => {
    console.log("Downloading settlement report...");
    // In real app, this would generate and download a report
    alert("Settlement report downloaded!");
  };

  const handleContactCustomer = (customerPhone) => {
    window.open(`tel:${customerPhone}`);
  };

  // Render Order Detail View
  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedOrder(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Order #{selectedOrder.id}
                </h3>
                <div className="flex items-center space-x-3">
                  {getOrderStatusIcon(selectedOrder.status)}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ₹{selectedOrder.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  You earn: ₹{selectedOrder.netAmount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Customer Information
              </h4>
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">
                    {selectedOrder.customer.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a
                    href={`mailto:${selectedOrder.customer.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {selectedOrder.customer.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a
                    href={`tel:${selectedOrder.customer.phone}`}
                    className="text-primary-600 hover:underline"
                  >
                    {selectedOrder.customer.phone}
                  </a>
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
                  <span className="text-gray-700">{selectedOrder.service}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">
                    {selectedOrder.eventDate}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">
                    {selectedOrder.eventTime}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">
                    {selectedOrder.location}
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
                {selectedOrder.specialRequests}
              </p>
            </div>

            {/* Payment Breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Payment Breakdown
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Amount:</span>
                  <span className="font-semibold">
                    ₹{selectedOrder.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (15%):</span>
                  <span className="font-semibold text-red-600">
                    -₹{selectedOrder.platformFee}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Your Earnings:</span>
                  <span className="font-semibold text-green-600">
                    ₹{selectedOrder.netAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Review (if completed) */}
            {selectedOrder.status === "completed" &&
              selectedOrder.customerReview && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Customer Review
                  </h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      {[...Array(selectedOrder.customerRating)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 bg-yellow-400 rounded-sm"
                        ></div>
                      ))}
                      <span className="text-sm text-gray-600">
                        ({selectedOrder.customerRating}/5)
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {selectedOrder.customerReview}
                    </p>
                  </div>
                </div>
              )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-6 border-t">
              {selectedOrder.status === "pending" && (
                <>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleOrderAction(selectedOrder.id, "accept")
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Order
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleOrderAction(selectedOrder.id, "reject")
                    }
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Order
                  </Button>
                </>
              )}

              {selectedOrder.status === "confirmed" && (
                <Button
                  variant="primary"
                  onClick={() =>
                    handleOrderAction(selectedOrder.id, "complete")
                  }
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Completed
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() =>
                  handleContactCustomer(selectedOrder.customer.phone)
                }
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Customer
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  window.open(`mailto:${selectedOrder.customer.email}`)
                }
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Customer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Render Settlement Detail View
  if (selectedSettlement) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedSettlement(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settlements
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Settlement #{selectedSettlement.id}
                </h3>
                <div className="flex items-center space-x-3">
                  {getSettlementStatusIcon(selectedSettlement.status)}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSettlementStatusColor(
                      selectedSettlement.status
                    )}`}
                  >
                    {selectedSettlement.status.charAt(0).toUpperCase() +
                      selectedSettlement.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">
                  ₹{selectedSettlement.netAmount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Settlement Amount</div>
              </div>
            </div>

            {/* Settlement Details */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Transaction Details
                </h4>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono text-sm">
                      {selectedSettlement.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">
                      {selectedSettlement.customer}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">
                      {selectedSettlement.service}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction Date:</span>
                    <span className="font-medium">
                      {selectedSettlement.transactionDate}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Payment Details
                </h4>
                <div className="bg-green-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Settlement Date:</span>
                    <span className="font-medium">
                      {selectedSettlement.settlementDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Mode:</span>
                    <span className="font-medium">
                      {selectedSettlement.paymentMode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Account:</span>
                    <span className="font-mono text-sm">
                      {selectedSettlement.bankAccount}
                    </span>
                  </div>
                  {selectedSettlement.utrNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">UTR Number:</span>
                      <span className="font-mono text-sm">
                        {selectedSettlement.utrNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Amount Breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Amount Breakdown
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Amount:</span>
                  <span className="font-semibold">
                    ₹{selectedSettlement.grossAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (15%):</span>
                  <span className="font-semibold text-red-600">
                    -₹{selectedSettlement.platformFee}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Net Settlement:</span>
                  <span className="font-semibold text-green-600">
                    ₹{selectedSettlement.netAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Processing Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">
                Processing Information
              </h4>
              <p className="text-sm text-yellow-800">
                Settlements are processed within 4 business days after service
                completion. Current processing time:{" "}
                {selectedSettlement.processingDays} days.
              </p>
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
            Back to Dashboard
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Service Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your orders and track settlement payments
              </p>
            </div>

            <div className="flex space-x-3">
              {activeTab === "settlements" && (
                <Button
                  variant="outline"
                  onClick={downloadSettlementReport}
                  className="flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              )}

              <div className="bg-green-100 px-3 py-2 rounded-lg">
                <div className="text-sm text-green-800">
                  <span className="font-medium">Total Earnings:</span> ₹
                  {orderStats.totalEarnings.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Order Management ({orderStats.total})
            </button>
            <button
              onClick={() => setActiveTab("settlements")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "settlements"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Settlement Tracker ({settlementStats.total})
            </button>
          </div>

          {activeTab === "orders" && orderStats.pending > 0 && (
            <div className="bg-orange-100 border border-orange-200 px-3 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-800">
                  <span className="font-medium">{orderStats.pending}</span>{" "}
                  orders awaiting your response
                </span>
              </div>
            </div>
          )}

          {activeTab === "settlements" && settlementStats.pending > 0 && (
            <div className="bg-blue-100 border border-blue-200 px-3 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  ₹{settlementStats.totalPending.toLocaleString()} pending
                  settlement
                </span>
              </div>
            </div>
          )}
        </div>

        {activeTab === "orders" ? (
          <>
            {/* Order Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {orderStats.total}
                    </div>
                    <div className="text-sm text-gray-600">Total Orders</div>
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
                      {orderStats.pending}
                    </div>
                    <div className="text-sm text-gray-600">Pending Orders</div>
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
                      ₹{orderStats.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Banknote className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{orderStats.totalEarnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Your Earnings</div>
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
                    placeholder="Search orders..."
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
                      { key: "all", label: "All", count: orderStats.total },
                      {
                        key: "pending",
                        label: "Pending",
                        count: orderStats.pending,
                      },
                      {
                        key: "confirmed",
                        label: "Confirmed",
                        count: orderStats.confirmed,
                      },
                      {
                        key: "in-progress",
                        label: "In Progress",
                        count: orderStats.inProgress,
                      },
                      {
                        key: "completed",
                        label: "Completed",
                        count: orderStats.completed,
                      },
                      {
                        key: "cancelled",
                        label: "Cancelled",
                        count: orderStats.cancelled,
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

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">
                          {order.service}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(
                            order.status
                          )}`}
                        >
                          {getOrderStatusIcon(order.status)}
                          <span className="ml-1">
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1).replace("-", " ")}
                          </span>
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            order.priority
                          )}`}
                        >
                          {order.priority.charAt(0).toUpperCase() +
                            order.priority.slice(1)}{" "}
                          Priority
                        </span>
                        {order.requiresApproval && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Bell className="w-3 h-3 mr-1" />
                            Approval Required
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-gray-600">Order ID:</span>
                          <div className="font-medium text-gray-900">
                            {order.id}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Customer:</span>
                          <div className="font-medium text-gray-900">
                            {order.customer.name}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Service Type:</span>
                          <div className="font-medium text-gray-900">
                            {order.serviceType}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Event Date:</span>
                          <div className="font-medium text-gray-900">
                            {order.eventDate}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Your Earnings:</span>
                          <div className="font-medium text-green-600">
                            ₹{order.netAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{order.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{order.estimatedDuration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Ordered {order.orderDate}</span>
                          </div>
                        </div>

                        {order.notifications &&
                          order.notifications.length > 0 && (
                            <div className="flex items-center space-x-1 text-xs text-blue-600">
                              <Bell className="w-3 h-3" />
                              <span>
                                {order.notifications.length} notifications
                              </span>
                            </div>
                          )}
                      </div>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {order.description || order.specialRequests}
                      </p>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>

                      {order.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() =>
                              handleOrderAction(order.id, "approve")
                            }
                            className="flex-1"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleOrderAction(
                                order.id,
                                "reject",
                                "Cannot accommodate this request"
                              )
                            }
                            className="flex-1"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {order.status === "confirmed" && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleOrderAction(order.id, "start")}
                        >
                          <Package className="w-3 h-3 mr-1" />
                          Start Work
                        </Button>
                      )}

                      {order.status === "in-progress" && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() =>
                            handleOrderAction(order.id, "complete")
                          }
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Mark Complete
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(`tel:${order.customer.phone}`)
                        }
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Settlement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {settlementStats.total}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Settlements
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg mr-3">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{settlementStats.totalPending.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Pending Amount</div>
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
                      ₹{settlementStats.totalCompleted.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Settled Amount</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {settlementStats.processing}
                    </div>
                    <div className="text-sm text-gray-600">Processing</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Settlement Info */}
            <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Settlement Information
              </h3>
              <p className="text-blue-800 text-sm">
                🕒 Settlements are processed automatically within 4 business
                days after service completion.
                <br />
                💳 Payments are transferred directly to your registered bank
                account.
                <br />
                📧 You'll receive email notifications for each settlement status
                update.
              </p>
            </Card>

            {/* Settlement Filters */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search settlements..."
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
                      {
                        key: "all",
                        label: "All",
                        count: settlementStats.total,
                      },
                      {
                        key: "pending",
                        label: "Pending",
                        count: settlementStats.pending,
                      },
                      {
                        key: "processing",
                        label: "Processing",
                        count: settlementStats.processing,
                      },
                      {
                        key: "completed",
                        label: "Completed",
                        count: settlementStats.completed,
                      },
                      {
                        key: "on-hold",
                        label: "On Hold",
                        count: settlementStats.onHold,
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

            {/* Settlements List */}
            <div className="space-y-4">
              {filteredSettlements.map((settlement) => (
                <motion.div
                  key={settlement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">
                          {settlement.service}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSettlementStatusColor(
                            settlement.status
                          )}`}
                        >
                          {getSettlementStatusIcon(settlement.status)}
                          <span className="ml-1">
                            {settlement.status.charAt(0).toUpperCase() +
                              settlement.status.slice(1).replace("-", " ")}
                          </span>
                        </span>
                        {settlement.settlementType === "manual_review" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Manual Review
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-gray-600">Settlement ID:</span>
                          <div className="font-medium text-gray-900">
                            {settlement.id}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Order ID:</span>
                          <div className="font-medium text-gray-900">
                            {settlement.orderId}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Customer:</span>
                          <div className="font-medium text-gray-900">
                            {settlement.customer}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">
                            Transaction Date:
                          </span>
                          <div className="font-medium text-gray-900">
                            {settlement.transactionDate}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Net Amount:</span>
                          <div className="font-medium text-green-600">
                            ₹{settlement.netAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Gross Amount:</span>
                            <div className="font-medium text-gray-900">
                              ₹{settlement.grossAmount.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Platform Fee:</span>
                            <div className="font-medium text-red-600">
                              -₹{settlement.platformFee}
                            </div>
                          </div>
                          {settlement.taxDeduction > 0 && (
                            <div>
                              <span className="text-gray-600">
                                Tax Deduction:
                              </span>
                              <div className="font-medium text-red-600">
                                -₹{settlement.taxDeduction}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <CreditCard className="w-4 h-4" />
                            <span>{settlement.paymentMode}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Banknote className="w-4 h-4" />
                            <span>{settlement.bankAccount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{settlement.settlementCycle}</span>
                          </div>
                          {settlement.utrNumber && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>UTR: {settlement.utrNumber}</span>
                            </div>
                          )}
                        </div>

                        {settlement.status === "pending" &&
                          settlement.estimatedSettlement && (
                            <div className="text-xs text-blue-600">
                              Expected: {settlement.estimatedSettlement}
                            </div>
                          )}

                        {settlement.status === "on-hold" &&
                          settlement.holdReason && (
                            <div className="text-xs text-yellow-600">
                              Hold: {settlement.holdReason}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedSettlement(settlement)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      {settlement.status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => console.log("Download receipt")}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {((activeTab === "orders" && filteredOrders.length === 0) ||
          (activeTab === "settlements" &&
            filteredSettlements.length === 0)) && (
          <Card className="p-12 text-center">
            {activeTab === "orders" ? (
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            ) : (
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            )}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === "orders" ? "orders" : "settlements"} found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : activeTab === "orders"
                ? "Customer orders will appear here when they book your services."
                : "Settlement records will appear here after you complete services."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServiceManagement;
