import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  Download,
  Calendar,
  Filter,
  Search,
  Eye,
  FileText,
  PieChart,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Percent,
  ArrowLeft,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const FinancialManager = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(1); // January
  const [activeTab, setActiveTab] = useState("overview"); // overview, transactions, reports, expenses
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock financial data
  const financialOverview = {
    currentMonth: {
      totalRevenue: 42500,
      platformFees: 6375, // 15%
      netRevenue: 36125,
      totalExpenses: 8500,
      profit: 27625,
      transactions: 28,
      averageOrderValue: 1518,
    },
    previousMonth: {
      totalRevenue: 38200,
      platformFees: 5730,
      netRevenue: 32470,
      totalExpenses: 7800,
      profit: 24670,
      transactions: 25,
      averageOrderValue: 1528,
    },
    yearToDate: {
      totalRevenue: 145200,
      platformFees: 21780,
      netRevenue: 123420,
      totalExpenses: 28900,
      profit: 94520,
      transactions: 95,
    },
  };

  const monthlyData = [
    { month: "Jan", revenue: 42500, expenses: 8500, profit: 27625 },
    { month: "Dec", revenue: 38200, expenses: 7800, profit: 24670 },
    { month: "Nov", revenue: 35800, expenses: 7200, profit: 22400 },
    { month: "Oct", revenue: 40100, expenses: 8100, profit: 25200 },
    { month: "Sep", revenue: 36900, expenses: 7600, profit: 23100 },
    { month: "Aug", revenue: 39500, expenses: 8000, profit: 24875 },
  ];

  // Mock transaction data
  const transactions = [
    {
      id: "T001",
      invoiceNumber: "INV-2025-001",
      date: "Jan 15, 2025",
      customerName: "Rajesh Kumar",
      service: "Electrical Repair",
      amount: 2500,
      platformFee: 375,
      netAmount: 2125,
      status: "completed",
      paymentMethod: "UPI",
    },
    {
      id: "T002",
      invoiceNumber: "INV-2025-002",
      date: "Jan 14, 2025",
      customerName: "Priya Sharma",
      service: "Home Cleaning",
      amount: 1800,
      platformFee: 270,
      netAmount: 1530,
      status: "completed",
      paymentMethod: "Card",
    },
    {
      id: "T003",
      invoiceNumber: "INV-2025-003",
      date: "Jan 13, 2025",
      customerName: "Amit Patel",
      service: "Plumbing Service",
      amount: 3200,
      platformFee: 480,
      netAmount: 2720,
      status: "pending",
      paymentMethod: "UPI",
    },
    {
      id: "T004",
      invoiceNumber: "INV-2025-004",
      date: "Jan 12, 2025",
      customerName: "Sunita Singh",
      service: "AC Repair",
      amount: 4500,
      platformFee: 675,
      netAmount: 3825,
      status: "completed",
      paymentMethod: "Cash",
    },
    {
      id: "T005",
      invoiceNumber: "INV-2025-005",
      date: "Jan 11, 2025",
      customerName: "Ravi Gupta",
      service: "Electrical Installation",
      amount: 6800,
      platformFee: 1020,
      netAmount: 5780,
      status: "failed",
      paymentMethod: "Card",
    },
  ];

  // Mock expense data
  const expenses = [
    {
      id: "E001",
      date: "Jan 10, 2025",
      category: "Tools",
      description: "Professional electrical tools",
      amount: 3500,
      vendor: "ToolMart",
      receipt: "receipt_001.pdf",
      tax: 350,
    },
    {
      id: "E002",
      date: "Jan 08, 2025",
      category: "Transportation",
      description: "Fuel and vehicle maintenance",
      amount: 2800,
      vendor: "Local Gas Station",
      receipt: "receipt_002.pdf",
      tax: 280,
    },
    {
      id: "E003",
      date: "Jan 05, 2025",
      category: "Materials",
      description: "Electrical components and supplies",
      amount: 1500,
      vendor: "ElectroSupply Co.",
      receipt: "receipt_003.pdf",
      tax: 150,
    },
    {
      id: "E004",
      date: "Jan 03, 2025",
      category: "Insurance",
      description: "Professional liability insurance",
      amount: 1200,
      vendor: "Insurance Corp",
      receipt: "receipt_004.pdf",
      tax: 0,
    },
  ];

  const calculateChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "pending":
        return AlertCircle;
      case "failed":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mobile detection useEffect
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownloadInvoice = (transaction) => {
    console.log(`Downloading invoice for ${transaction.invoiceNumber}`);
    alert(`Invoice ${transaction.invoiceNumber} would be downloaded`);
  };

  const handleDownloadReport = (reportType) => {
    console.log(`Downloading ${reportType} report`);
    alert(`${reportType} report would be downloaded`);
  };

  // Mobile Transaction Detail View
  if (isMobile && selectedTransaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Transaction Details
                </h1>
                <p className="text-sm text-gray-500">
                  {selectedTransaction.invoiceNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedTransaction.customerName}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedTransaction.service}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  ₹{selectedTransaction.amount.toLocaleString()}
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedTransaction.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : selectedTransaction.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedTransaction.status.charAt(0).toUpperCase() +
                    selectedTransaction.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{selectedTransaction.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Invoice Number</span>
                <span className="font-medium">
                  {selectedTransaction.invoiceNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium text-red-600">
                  -₹{selectedTransaction.platformFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">Net Amount</span>
                <span className="font-bold text-green-600">
                  ₹{selectedTransaction.netAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleDownloadInvoice(selectedTransaction)}
            >
              Download Invoice
            </Button>
            <Button variant="primary" className="flex-1">
              Contact Customer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "transactions") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Transactions
                </h1>
                <p className="text-sm text-gray-500">
                  {filteredTransactions.length} transactions
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Button variant="outline" onClick={onBack} className="mb-4">
                ← Back to Dashboard
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Transaction History
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Detailed view of all payments and transactions
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("overview")}
                  >
                    Back to Overview
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleDownloadReport("transactions")}
                    icon={Download}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Filters */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={Search}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Methods</option>
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile Transactions List */}
        <div className="lg:hidden p-4 space-y-3">
          {filteredTransactions.map((transaction) => {
            const StatusIcon = getStatusIcon(transaction.status);

            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          getStatusColor(transaction.status).split(" ")[0]
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.service}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ₹{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600">
                        +₹{transaction.netAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500">{transaction.date}</span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </div>
                    <span className="text-gray-400">
                      {transaction.invoiceNumber}
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {filteredTransactions.length === 0 && (
            <Card className="p-8 text-center">
              <div className="text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">
                  No transactions found
                </h3>
                <p className="text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Desktop Transactions Table */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform Fee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => {
                    const StatusIcon = getStatusIcon(transaction.status);

                    return (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.invoiceNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.date}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.service}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{transaction.platformFee.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{transaction.netAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setSelectedTransaction(transaction)
                              }
                              icon={Eye}
                            >
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadInvoice(transaction)}
                              icon={Download}
                            >
                              Invoice
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Financial Dashboard
              </h1>
              <p className="text-sm text-gray-500">Revenue & Analytics</p>
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="mt-4 flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "overview"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "transactions"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Transactions
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
              ← Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Financial Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Track revenue, expenses, and financial performance
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => handleDownloadReport("financial")}
                  icon={Download}
                >
                  Download Report
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab("transactions")}
                  icon={FileText}
                >
                  View Transactions
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Period Selector */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div className="flex space-x-2">
                  {["week", "month", "quarter", "year"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        selectedPeriod === period
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
                {selectedPeriod === "month" && (
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(2025, i).toLocaleDateString("en-US", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Quick Stats */}
      <div className="lg:hidden p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {
              label: "Total Revenue",
              value: financialOverview.currentMonth.totalRevenue,
              previous: financialOverview.previousMonth.totalRevenue,
              icon: DollarSign,
              color: "bg-green-100 text-green-600",
            },
            {
              label: "Net Revenue",
              value: financialOverview.currentMonth.netRevenue,
              previous: financialOverview.previousMonth.netRevenue,
              icon: TrendingUp,
              color: "bg-blue-100 text-blue-600",
            },
            {
              label: "Platform Fees",
              value: financialOverview.currentMonth.platformFees,
              previous: financialOverview.previousMonth.platformFees,
              icon: Percent,
              color: "bg-orange-100 text-orange-600",
            },
            {
              label: "Profit",
              value: financialOverview.currentMonth.profit,
              previous: financialOverview.previousMonth.profit,
              icon: PieChart,
              color: "bg-purple-100 text-purple-600",
            },
          ].map((metric, index) => {
            const change = calculateChange(metric.value, metric.previous);
            const isPositive = change >= 0;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${metric.color.split(" ")[0]}`}
                    >
                      <metric.icon
                        className={`w-4 h-4 ${metric.color.split(" ")[1]}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-600 truncate">
                        {metric.label}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{(metric.value / 1000).toFixed(0)}k
                      </p>
                      <div
                        className={`flex items-center text-xs font-medium ${
                          isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(change).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            variant="outline"
            onClick={() => setActiveTab("transactions")}
            className="w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            Transactions
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDownloadReport("financial")}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Mobile Revenue Trend */}
        <Card className="p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Revenue Trend</h3>
          <div className="space-y-3">
            {monthlyData.slice(0, 3).map((data, index) => (
              <div key={data.month} className="flex items-center space-x-3">
                <span className="w-8 text-sm text-gray-600">{data.month}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      ₹{(data.revenue / 1000).toFixed(0)}k
                    </span>
                    <span className="text-xs text-gray-500">
                      {((data.revenue / 50000) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (data.revenue / 50000) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Mobile Recent Transactions */}
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("transactions")}
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 3).map((transaction) => {
              const StatusIcon = getStatusIcon(transaction.status);

              return (
                <div
                  key={transaction.id}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      getStatusColor(transaction.status).split(" ")[0]
                    }`}
                  >
                    <StatusIcon className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {transaction.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{transaction.netAmount.toLocaleString()} •{" "}
                      {transaction.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Desktop Content */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Revenue",
                value: financialOverview.currentMonth.totalRevenue,
                previous: financialOverview.previousMonth.totalRevenue,
                icon: DollarSign,
                color: "bg-green-100 text-green-600",
                format: "currency",
              },
              {
                label: "Net Revenue",
                value: financialOverview.currentMonth.netRevenue,
                previous: financialOverview.previousMonth.netRevenue,
                icon: TrendingUp,
                color: "bg-blue-100 text-blue-600",
                format: "currency",
              },
              {
                label: "Platform Fees",
                value: financialOverview.currentMonth.platformFees,
                previous: financialOverview.previousMonth.platformFees,
                icon: Percent,
                color: "bg-orange-100 text-orange-600",
                format: "currency",
              },
              {
                label: "Profit",
                value: financialOverview.currentMonth.profit,
                previous: financialOverview.previousMonth.profit,
                icon: PieChart,
                color: "bg-purple-100 text-purple-600",
                format: "currency",
              },
            ].map((metric, index) => {
              const change = calculateChange(metric.value, metric.previous);
              const isPositive = change >= 0;

              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`p-3 rounded-lg ${
                            metric.color.split(" ")[0]
                          }`}
                        >
                          <metric.icon
                            className={`w-6 h-6 ${metric.color.split(" ")[1]}`}
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">
                            {metric.label}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {metric.format === "currency"
                              ? `₹${metric.value.toLocaleString()}`
                              : metric.value.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`flex items-center text-sm font-medium ${
                            isPositive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(change).toFixed(1)}%
                        </div>
                        <p className="text-xs text-gray-500">vs last month</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Revenue Trend
                  </h2>
                  <Button variant="outline" size="sm" icon={BarChart3}>
                    View Details
                  </Button>
                </div>

                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div
                      key={data.month}
                      className="flex items-center space-x-4"
                    >
                      <span className="w-8 text-sm text-gray-600">
                        {data.month}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            ₹{data.revenue.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {((data.revenue / 50000) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                (data.revenue / 50000) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 w-16 text-right">
                        ₹{data.profit.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-6">
              {/* Transaction Summary */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Transaction Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium">{transactions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-green-600">
                      {
                        transactions.filter((t) => t.status === "completed")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium text-yellow-600">
                      {
                        transactions.filter((t) => t.status === "pending")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Failed</span>
                    <span className="font-medium text-red-600">
                      {transactions.filter((t) => t.status === "failed").length}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-medium">
                      {(
                        (transactions.filter((t) => t.status === "completed")
                          .length /
                          transactions.length) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </Card>

              {/* Recent Transactions */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Recent Transactions
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("transactions")}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {transactions.slice(0, 4).map((transaction) => {
                    const StatusIcon = getStatusIcon(transaction.status);

                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            getStatusColor(transaction.status).split(" ")[0]
                          }`}
                        >
                          <StatusIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {transaction.customerName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ₹{transaction.netAmount.toLocaleString()} •{" "}
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Expense Summary */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  This Month's Expenses
                </h3>
                <div className="space-y-3">
                  {expenses.slice(0, 3).map((expense) => (
                    <div key={expense.id} className="flex justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {expense.category}
                        </span>
                        <p className="text-xs text-gray-500">
                          {expense.description}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-red-600">
                        -₹{expense.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Total Expenses
                      </span>
                      <span className="text-sm font-bold text-red-600">
                        -₹
                        {expenses
                          .reduce((sum, exp) => sum + exp.amount, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialManager;
