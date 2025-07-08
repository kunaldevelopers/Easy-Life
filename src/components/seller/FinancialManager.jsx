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
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const FinancialManager = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(1); // January
  const [activeTab, setActiveTab] = useState("overview"); // overview, transactions, reports, expenses
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
    { month: "Feb", revenue: 38200, expenses: 7800, profit: 24670 },
    { month: "Mar", revenue: 45800, expenses: 9200, profit: 29420 },
    { month: "Apr", revenue: 41200, expenses: 8100, profit: 26545 },
    { month: "May", revenue: 39600, expenses: 7900, profit: 25435 },
    { month: "Jun", revenue: 43800, expenses: 8800, profit: 28050 },
  ];

  const transactions = [
    {
      id: "TXN001",
      date: "2025-01-08",
      customerName: "Rajesh Sharma",
      service: "Emergency Electrical Repair",
      amount: 1500,
      platformFee: 225,
      netAmount: 1275,
      status: "completed",
      paymentMethod: "UPI",
      paymentId: "pay_MkB2Tx7QZghFK8",
      invoiceNumber: "INV-2025-001",
    },
    {
      id: "TXN002",
      date: "2025-01-07",
      customerName: "Priya Devi",
      service: "Electrical Installation",
      amount: 2500,
      platformFee: 375,
      netAmount: 2125,
      status: "completed",
      paymentMethod: "Card",
      paymentId: "pay_NlC3Uy8RahjGL9",
      invoiceNumber: "INV-2025-002",
    },
    {
      id: "TXN003",
      date: "2025-01-06",
      customerName: "Sita Gurung",
      service: "Consultation",
      amount: 500,
      platformFee: 75,
      netAmount: 425,
      status: "pending",
      paymentMethod: "UPI",
      paymentId: "pay_OmD4Vz9SbikHM0",
      invoiceNumber: "INV-2025-003",
    },
    {
      id: "TXN004",
      date: "2025-01-05",
      customerName: "Deepak Rai",
      service: "Home Automation",
      amount: 5000,
      platformFee: 750,
      netAmount: 4250,
      status: "failed",
      paymentMethod: "Card",
      paymentId: "pay_PnE5Wa0TcjlIN1",
      invoiceNumber: "INV-2025-004",
    },
    {
      id: "TXN005",
      date: "2025-01-04",
      customerName: "Karma Bhutia",
      service: "Electrical Maintenance",
      amount: 1200,
      platformFee: 180,
      netAmount: 1020,
      status: "completed",
      paymentMethod: "Cash",
      paymentId: "cash_001",
      invoiceNumber: "INV-2025-005",
    },
  ];

  const expenses = [
    {
      id: "EXP001",
      date: "2025-01-07",
      category: "Materials",
      description: "Electrical cables and switches",
      amount: 2500,
      vendor: "Electrical Supplies Co.",
      receipt: "receipt_001.pdf",
      tax: 450,
    },
    {
      id: "EXP002",
      date: "2025-01-05",
      category: "Transportation",
      description: "Fuel for service visits",
      amount: 800,
      vendor: "Petrol Pump",
      receipt: "receipt_002.pdf",
      tax: 144,
    },
    {
      id: "EXP003",
      date: "2025-01-03",
      category: "Tools",
      description: "New multimeter and testing equipment",
      amount: 3500,
      vendor: "Tool Mart",
      receipt: "receipt_003.pdf",
      tax: 630,
    },
    {
      id: "EXP004",
      date: "2025-01-02",
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

  const handleDownloadInvoice = (transaction) => {
    console.log(`Downloading invoice for ${transaction.invoiceNumber}`);
    alert(`Invoice ${transaction.invoiceNumber} would be downloaded`);
  };

  const handleDownloadReport = (reportType) => {
    console.log(`Downloading ${reportType} report`);
    alert(`${reportType} report would be downloaded`);
  };

  if (activeTab === "transactions") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
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

          {/* Filters */}
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

          {/* Transactions Table */}
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
    <div className="min-h-screen bg-gray-50 py-8">
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

        {/* Period Selector */}
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

        {/* Key Metrics */}
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
                  <div key={data.month} className="flex items-center space-x-4">
                    <span className="w-8 text-sm text-gray-600">
                      {data.month}
                    </span>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(data.revenue / 50000) * 100}%` }}
                        ></div>
                        <div
                          className="absolute top-0 bg-red-400 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(data.expenses / 50000) * 100}%`,
                            left: `${
                              (data.revenue / 50000) * 100 -
                              (data.expenses / 50000) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-20">
                        ₹{(data.revenue / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                  <span>Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span>Expenses</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Transactions & Quick Actions */}
          <div className="space-y-6">
            {/* Payment Status */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Payment Status
              </h3>
              <div className="space-y-3">
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
                    {transactions.filter((t) => t.status === "pending").length}
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
  );
};

export default FinancialManager;
