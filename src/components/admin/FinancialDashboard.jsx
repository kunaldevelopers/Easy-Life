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
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Store,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  FileText,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const FinancialDashboard = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedView, setSelectedView] = useState("overview");

  // Mock financial data
  const financialData = {
    overview: {
      totalRevenue: 125000,
      totalCommission: 18750,
      netRevenue: 106250,
      transactions: 1847,
      averageTransaction: 67.7,
      monthlyGrowth: 12.5,
      commissionRate: 15,
    },
    recentTransactions: [
      {
        id: "txn-001",
        date: "2025-01-08",
        time: "14:30",
        type: "commission",
        amount: 45.0,
        business: "Gangtok Coffee House",
        customer: "Rajesh Sharma",
        status: "completed",
        description: "Coffee & Snacks Order",
      },
      {
        id: "txn-002",
        date: "2025-01-08",
        time: "13:15",
        type: "commission",
        amount: 120.0,
        business: "Tech Repair Hub",
        customer: "Priya Devi",
        status: "completed",
        description: "Laptop Repair Service",
      },
      {
        id: "txn-003",
        date: "2025-01-08",
        time: "11:45",
        type: "refund",
        amount: -25.5,
        business: "Local Grocery Store",
        customer: "Sita Gurung",
        status: "processed",
        description: "Order Cancellation Refund",
      },
      {
        id: "txn-004",
        date: "2025-01-07",
        time: "16:20",
        type: "commission",
        amount: 75.0,
        business: "Mountain View Restaurant",
        customer: "Deepak Rai",
        status: "pending",
        description: "Dinner Booking",
      },
      {
        id: "txn-005",
        date: "2025-01-07",
        time: "10:30",
        type: "commission",
        amount: 200.0,
        business: "Sikkim Adventures",
        customer: "Maya Lama",
        status: "completed",
        description: "Trekking Package",
      },
    ],
    monthlyData: [
      { month: "Jul", revenue: 85000, commission: 12750, transactions: 1200 },
      { month: "Aug", revenue: 92000, commission: 13800, transactions: 1350 },
      { month: "Sep", revenue: 88000, commission: 13200, transactions: 1180 },
      { month: "Oct", revenue: 95000, commission: 14250, transactions: 1420 },
      { month: "Nov", revenue: 110000, commission: 16500, transactions: 1650 },
      { month: "Dec", revenue: 125000, commission: 18750, transactions: 1847 },
    ],
    topBusinesses: [
      {
        name: "Gangtok Coffee House",
        revenue: 8500,
        commission: 1275,
        transactions: 142,
        growth: 15.2,
      },
      {
        name: "Tech Repair Hub",
        revenue: 12000,
        commission: 1800,
        transactions: 89,
        growth: 8.7,
      },
      {
        name: "Mountain View Restaurant",
        revenue: 15500,
        commission: 2325,
        transactions: 95,
        growth: 22.1,
      },
      {
        name: "Sikkim Adventures",
        revenue: 25000,
        commission: 3750,
        transactions: 35,
        growth: 18.9,
      },
    ],
    paymentMethods: [
      { method: "Digital Wallet", percentage: 45, amount: 56250 },
      { method: "Credit Card", percentage: 30, amount: 37500 },
      { method: "Bank Transfer", percentage: 20, amount: 25000 },
      { method: "Cash on Delivery", percentage: 5, amount: 6250 },
    ],
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "commission":
        return DollarSign;
      case "refund":
        return RefreshCw;
      case "payment":
        return CreditCard;
      default:
        return Receipt;
    }
  };

  const getTransactionColor = (type, status) => {
    if (status === "pending") return "text-yellow-600";
    if (type === "refund") return "text-red-600";
    return "text-green-600";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "processed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleExportData = (format) => {
    console.log(`Exporting financial data in ${format} format`);
    alert(`Financial data will be exported in ${format.toUpperCase()} format`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(financialData.overview.totalRevenue)}
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  +{financialData.overview.monthlyGrowth}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Commission Earned</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(financialData.overview.totalCommission)}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">
                  {financialData.overview.commissionRate}% rate
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {financialData.overview.transactions.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <Activity className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">
                  Avg:{" "}
                  {formatCurrency(financialData.overview.averageTransaction)}
                </span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Receipt className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(financialData.overview.netRevenue)}
              </p>
              <div className="flex items-center mt-1">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">After commission</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Trend
            </h3>
            <div className="flex space-x-2">
              {["week", "month", "quarter"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    selectedPeriod === period
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {financialData.monthlyData.slice(-6).map((data, index) => (
              <div
                key={data.month}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 w-8">
                    {data.month}
                  </span>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2 w-32">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.revenue / 125000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(data.revenue)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data.transactions} txns
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Payment Methods
          </h3>
          <div className="space-y-4">
            {financialData.paymentMethods.map((method, index) => (
              <div
                key={method.method}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : index === 2
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {method.method}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {method.percentage}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatCurrency(method.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => handleExportData("csv")}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => handleExportData("pdf")}
          >
            Export PDF
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialData.recentTransactions.map((transaction) => {
                const TransactionIcon = getTransactionIcon(transaction.type);

                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-lg mr-3 ${
                            transaction.type === "refund"
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        >
                          <TransactionIcon
                            className={`w-4 h-4 ${
                              transaction.type === "refund"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.business}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${getTransactionColor(
                          transaction.type,
                          transaction.status
                        )}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{transaction.date}</div>
                      <div>{transaction.time}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderBusinessAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Top Performing Businesses
      </h3>

      <div className="grid gap-6">
        {financialData.topBusinesses.map((business, index) => (
          <Card key={business.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-bold text-lg">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {business.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {business.transactions} transactions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(business.revenue)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Commission</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(business.commission)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Growth</p>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-lg font-semibold text-green-600">
                      +{business.growth}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

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
                Monitor revenue, commissions, and financial performance
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" icon={RefreshCw}>
                Refresh Data
              </Button>
              <Button variant="primary" icon={FileText}>
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* View Selector */}
        <Card className="p-4 mb-6">
          <div className="flex space-x-1">
            {[
              { key: "overview", label: "Overview", icon: BarChart3 },
              { key: "transactions", label: "Transactions", icon: Receipt },
              {
                key: "analytics",
                label: "Business Analytics",
                icon: TrendingUp,
              },
            ].map((view) => (
              <button
                key={view.key}
                onClick={() => setSelectedView(view.key)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedView === view.key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <view.icon className="w-4 h-4 mr-2" />
                {view.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Render selected view */}
        {selectedView === "overview" && renderOverview()}
        {selectedView === "transactions" && renderTransactions()}
        {selectedView === "analytics" && renderBusinessAnalytics()}
      </div>
    </div>
  );
};

export default FinancialDashboard;
