import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Users,
  Search,
  MoreVertical,
  ArrowLeft,
  Download,
  Activity,
  Calendar,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CreditCard,
  BarChart3,
  FileSpreadsheet,
  Filter,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const SettlementChecker = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSettlements, setSelectedSettlements] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [showCharts, setShowCharts] = useState(true);

  // Commission rate (this should come from admin settings)
  const commissionRate = 15; // 15%

  // Mock settlement data with more historical data for charts
  const settlements = [
    {
      id: "STL001",
      seller: {
        name: "Gangtok Electricians",
        email: "contact@gangtokelectricians.com",
        phone: "+91 8765432109",
        avatar:
          "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Home Electrical Repair",
      customer: "Rajesh Sharma",
      transactionDate: "2025-07-06",
      settlementDate: "2025-07-10",
      grossAmount: 1500,
      commissionAmount: 225,
      netAmount: 1275,
      status: "pending",
      paymentId: "pay_MkB2Tx7QZghFK8",
      daysRemaining: 0,
    },
    {
      id: "STL002",
      seller: {
        name: "Mountain View Plumbers",
        email: "info@mountainplumbers.com",
        phone: "+91 7654321098",
        avatar:
          "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Bathroom Pipe Repair",
      customer: "Priya Devi",
      transactionDate: "2025-07-05",
      settlementDate: "2025-07-09",
      grossAmount: 850,
      commissionAmount: 127.5,
      netAmount: 722.5,
      status: "processing",
      paymentId: "pay_NlC3Uy8RahjGL9",
      daysRemaining: -1,
    },
    {
      id: "STL003",
      seller: {
        name: "Sikkim Car Service",
        email: "service@sikkimcar.com",
        phone: "+91 6543210987",
        avatar:
          "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Car AC Repair",
      customer: "Karma Bhutia",
      transactionDate: "2025-07-04",
      settlementDate: "2025-07-08",
      grossAmount: 2200,
      commissionAmount: 330,
      netAmount: 1870,
      status: "completed",
      paymentId: "pay_OmD4Vz9SbikHM0",
      daysRemaining: -2,
    },
    {
      id: "STL004",
      seller: {
        name: "Gangtok Home Cleaners",
        email: "clean@gangtok.com",
        phone: "+91 5432109876",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Deep House Cleaning",
      customer: "Tenzin Norbu",
      transactionDate: "2025-07-07",
      settlementDate: "2025-07-11",
      grossAmount: 1200,
      commissionAmount: 180,
      netAmount: 1020,
      status: "pending",
      paymentId: "pay_PnE5Wa0TcjlIN1",
      daysRemaining: 1,
    },
    {
      id: "STL005",
      seller: {
        name: "Tech Support Gangtok",
        email: "tech@gangtoksupport.com",
        phone: "+91 4321098765",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Laptop Screen Repair",
      customer: "Sonam Choden",
      transactionDate: "2025-07-08",
      settlementDate: "2025-07-12",
      grossAmount: 3500,
      commissionAmount: 525,
      netAmount: 2975,
      status: "pending",
      paymentId: "pay_QoF6Xb1UdkmJO2",
      daysRemaining: 2,
    },
    // Additional historical data for charts
    {
      id: "STL006",
      seller: {
        name: "Gangtok Electricians",
        email: "contact@gangtokelectricians.com",
        phone: "+91 8765432109",
        avatar:
          "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Electrical Installation",
      customer: "Dorji Lama",
      transactionDate: "2025-06-25",
      settlementDate: "2025-06-29",
      grossAmount: 3200,
      commissionAmount: 480,
      netAmount: 2720,
      status: "completed",
      paymentId: "pay_Jun2501",
      daysRemaining: -5,
    },
    {
      id: "STL007",
      seller: {
        name: "Mountain View Plumbers",
        email: "info@mountainplumbers.com",
        phone: "+91 7654321098",
        avatar:
          "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Kitchen Plumbing",
      customer: "Pemba Sherpa",
      transactionDate: "2025-06-20",
      settlementDate: "2025-06-24",
      grossAmount: 1800,
      commissionAmount: 270,
      netAmount: 1530,
      status: "completed",
      paymentId: "pay_Jun2002",
      daysRemaining: -8,
    },
    {
      id: "STL008",
      seller: {
        name: "Tech Support Gangtok",
        email: "tech@gangtoksupport.com",
        phone: "+91 4321098765",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Computer Repair",
      customer: "Sangay Doma",
      transactionDate: "2025-05-15",
      settlementDate: "2025-05-19",
      grossAmount: 2500,
      commissionAmount: 375,
      netAmount: 2125,
      status: "completed",
      paymentId: "pay_May1503",
      daysRemaining: -15,
    },
    {
      id: "STL009",
      seller: {
        name: "Sikkim Car Service",
        email: "service@sikkimcar.com",
        phone: "+91 6543210987",
        avatar:
          "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Car Service",
      customer: "Norbu Lama",
      transactionDate: "2025-05-10",
      settlementDate: "2025-05-14",
      grossAmount: 4000,
      commissionAmount: 600,
      netAmount: 3400,
      status: "completed",
      paymentId: "pay_May1004",
      daysRemaining: -20,
    },
    {
      id: "STL010",
      seller: {
        name: "Gangtok Home Cleaners",
        email: "clean@gangtok.com",
        phone: "+91 5432109876",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      service: "Office Cleaning",
      customer: "Tashi Wangmo",
      transactionDate: "2025-04-28",
      settlementDate: "2025-05-02",
      grossAmount: 1500,
      commissionAmount: 225,
      netAmount: 1275,
      status: "completed",
      paymentId: "pay_Apr2805",
      daysRemaining: -25,
    },
  ];

  // Date filtering logic
  const filterByDateRange = (settlement) => {
    const transactionDate = new Date(settlement.transactionDate);
    const now = new Date();

    switch (dateRange) {
      case "today":
        return transactionDate.toDateString() === now.toDateString();
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return transactionDate >= weekAgo;
      case "month":
        return (
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      case "quarter":
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const settlementQuarter = Math.floor(transactionDate.getMonth() / 3);
        return (
          currentQuarter === settlementQuarter &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      case "year":
        return transactionDate.getFullYear() === now.getFullYear();
      case "custom":
        if (!customStartDate || !customEndDate) return true;
        const startDate = new Date(customStartDate);
        const endDate = new Date(customEndDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      default:
        return true;
    }
  };

  const filteredSettlements = settlements.filter((settlement) => {
    const matchesSearch =
      settlement.seller.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      settlement.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      settlement.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      settlement.paymentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || settlement.status === statusFilter;

    const matchesDate = filterByDateRange(settlement);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Chart data preparation
  const chartData = useMemo(() => {
    const monthlyData = {};

    filteredSettlements.forEach((settlement) => {
      const date = new Date(settlement.transactionDate);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          revenue: 0,
          commission: 0,
          transactions: 0,
        };
      }

      monthlyData[monthKey].revenue += settlement.grossAmount;
      monthlyData[monthKey].commission += settlement.commissionAmount;
      monthlyData[monthKey].transactions += 1;
    });

    return Object.values(monthlyData).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [filteredSettlements]);

  // Enhanced CSV export function
  const exportToCSV = () => {
    const headers = [
      "Settlement ID",
      "Seller Name",
      "Seller Email",
      "Seller Phone",
      "Service",
      "Customer",
      "Transaction Date",
      "Settlement Date",
      "Gross Amount",
      "Commission Amount",
      "Commission Rate",
      "Net Amount",
      "Status",
      "Payment ID",
      "Days Remaining",
    ];

    const csvData = filteredSettlements.map((settlement) => [
      settlement.id,
      settlement.seller.name,
      settlement.seller.email,
      settlement.seller.phone,
      settlement.service,
      settlement.customer,
      settlement.transactionDate,
      settlement.settlementDate,
      settlement.grossAmount,
      settlement.commissionAmount,
      `${commissionRate}%`,
      settlement.netAmount,
      settlement.status,
      settlement.paymentId,
      settlement.daysRemaining,
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `settlements_${dateRange}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSettlements_old = settlements.filter((settlement) => {
    const matchesSearch =
      settlement.seller.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      settlement.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      settlement.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      settlement.paymentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || settlement.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSettlementAction = (settlementId, action) => {
    console.log(`${action} settlement:`, settlementId);
    // In real app, this would make API calls
    if (action === "process") {
      alert(`Processing settlement ${settlementId}`);
    } else if (action === "hold") {
      alert(`Putting settlement ${settlementId} on hold`);
    }
  };

  const toggleSettlementSelection = (settlementId) => {
    setSelectedSettlements((prev) =>
      prev.includes(settlementId)
        ? prev.filter((id) => id !== settlementId)
        : [...prev, settlementId]
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Activity className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Calculate statistics
  const totalGrossAmount = filteredSettlements.reduce(
    (sum, settlement) => sum + settlement.grossAmount,
    0
  );
  const totalCommissionAmount = filteredSettlements.reduce(
    (sum, settlement) => sum + settlement.commissionAmount,
    0
  );
  const totalNetAmount = filteredSettlements.reduce(
    (sum, settlement) => sum + settlement.netAmount,
    0
  );
  const pendingCount = filteredSettlements.filter(
    (s) => s.status === "pending"
  ).length;
  const processingCount = filteredSettlements.filter(
    (s) => s.status === "processing"
  ).length;
  const completedCount = filteredSettlements.filter(
    (s) => s.status === "completed"
  ).length;

  return (
    <>
      <Helmet>
        <title>Settlement Checker - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Settlement Checker
                </h1>
                <p className="text-gray-600">
                  Monitor seller settlements with T+4 processing timeline
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  icon={Download}
                  size="sm"
                  onClick={exportToCSV}
                >
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  icon={FileSpreadsheet}
                  size="sm"
                  onClick={() => setShowCharts(!showCharts)}
                >
                  {showCharts ? "Hide" : "Show"} Charts
                </Button>
                {selectedSettlements.length > 0 && (
                  <Button variant="primary" icon={CreditCard}>
                    Process Selected ({selectedSettlements.length})
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{totalGrossAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Commission Earned
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{totalCommissionAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-yellow-100">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pendingCount}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {completedCount}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Charts Section */}
          {showCharts && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Trend Chart */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Revenue Trends
                  </h3>
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `₹${value.toLocaleString()}`,
                        name === "revenue" ? "Revenue" : "Commission",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="commission"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="commission"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Transaction Volume Chart */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Transaction Volume
                  </h3>
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, "Transactions"]} />
                    <Bar dataKey="transactions" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* Search and Filter */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 lg:max-w-md lg:mr-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by seller, customer, service, or payment ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Custom Date Range Inputs */}
            {dateRange === "custom" && (
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    From:
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    To:
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Settlements Table */}
          <Card className="overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Settlements ({filteredSettlements.length})
                </h3>
                {selectedSettlements.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {selectedSettlements.length} selected
                    </span>
                    <Button size="sm" variant="outline">
                      Bulk Actions
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSettlements(
                              filteredSettlements.map((s) => s.id)
                            );
                          } else {
                            setSelectedSettlements([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seller
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Settlement Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSettlements.map((settlement, index) => (
                    <motion.tr
                      key={settlement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedSettlements.includes(settlement.id)}
                          onChange={() =>
                            toggleSettlementSelection(settlement.id)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={settlement.seller.avatar}
                            alt={settlement.seller.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {settlement.seller.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {settlement.seller.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {settlement.service}
                          </div>
                          <div className="text-sm text-gray-500">
                            Customer: {settlement.customer}
                          </div>
                          <div className="text-xs text-gray-400">
                            Payment ID: {settlement.paymentId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                        {new Date(
                          settlement.transactionDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(
                              settlement.settlementDate
                            ).toLocaleDateString()}
                          </div>
                          <div
                            className={`text-xs ${
                              settlement.daysRemaining === 0
                                ? "text-yellow-600"
                                : settlement.daysRemaining > 0
                                ? "text-blue-600"
                                : "text-green-600"
                            }`}
                          >
                            {settlement.daysRemaining === 0
                              ? "Due Today"
                              : settlement.daysRemaining > 0
                              ? `T+${4 - settlement.daysRemaining} (${
                                  settlement.daysRemaining
                                } days left)`
                              : "Completed"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            Gross: ₹{settlement.grossAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-red-600">
                            Commission: -₹
                            {settlement.commissionAmount.toLocaleString()} (
                            {commissionRate}%)
                          </div>
                          <div className="text-sm font-semibold text-green-600">
                            Net: ₹{settlement.netAmount.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            settlement.status
                          )}`}
                        >
                          {getStatusIcon(settlement.status)}
                          <span className="ml-1 capitalize">
                            {settlement.status}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {settlement.status === "pending" && (
                            <button
                              onClick={() =>
                                handleSettlementAction(settlement.id, "process")
                              }
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="Process Settlement"
                            >
                              <CreditCard className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleSettlementAction(settlement.id, "view")
                            }
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                            title="More Actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredSettlements.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  No settlements found
                </h3>
                <p className="text-sm text-gray-500">
                  {searchQuery
                    ? "Try adjusting your search criteria."
                    : "No settlements to display."}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default SettlementChecker;
