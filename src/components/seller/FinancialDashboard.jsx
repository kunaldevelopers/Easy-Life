import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Calendar,
  Eye,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const FinancialDashboard = ({ onViewDetails }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  // Mock financial data
  const todayStats = {
    totalSales: 3774,
    totalOrders: 9,
    avgOrderValue: 419,
    profit: 1887,
    growth: 18,
    previousSales: 3200,
  };

  const yesterdayStats = {
    totalSales: 2850,
    totalOrders: 7,
    avgOrderValue: 407,
    profit: 1425,
    growth: 12,
    previousSales: 2540,
  };

  const weekStats = {
    totalSales: 18750,
    totalOrders: 42,
    avgOrderValue: 446,
    profit: 9375,
    growth: 24,
    previousSales: 15120,
  };

  const monthStats = {
    totalSales: 85600,
    totalOrders: 198,
    avgOrderValue: 432,
    profit: 42800,
    growth: 32,
    previousSales: 64800,
  };

  const getCurrentStats = () => {
    switch (selectedPeriod) {
      case "yesterday":
        return yesterdayStats;
      case "week":
        return weekStats;
      case "month":
        return monthStats;
      default:
        return todayStats;
    }
  };

  const currentStats = getCurrentStats();

  // Hourly sales data for chart
  const hourlyData = [
    { time: "12am", sales: 120 },
    { time: "4am", sales: 80 },
    { time: "8am", sales: 350 },
    { time: "12pm", sales: 680 },
    { time: "4pm", sales: 920 },
    { time: "8pm", sales: 1200 },
    { time: "11pm", sales: 850 },
  ];

  const maxSales = Math.max(...hourlyData.map((d) => d.sales));

  const recentTransactions = [
    {
      id: "TXN001",
      customer: "Priya Sharma",
      amount: 450,
      time: "2 hours ago",
      status: "completed",
      service: "Catering Service",
    },
    {
      id: "TXN002",
      customer: "Rajesh Kumar",
      amount: 320,
      time: "4 hours ago",
      status: "completed",
      service: "Photography",
    },
    {
      id: "TXN003",
      customer: "Anjali Thapa",
      amount: 180,
      time: "6 hours ago",
      status: "pending",
      service: "Home Cleaning",
    },
    {
      id: "TXN004",
      customer: "Deepak Rai",
      amount: 650,
      time: "8 hours ago",
      status: "completed",
      service: "Event Planning",
    },
  ];

  const periodOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 border-l-4 border-l-green-500">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <DollarSign className="w-6 h-6 text-green-600 mr-2" />
              Financial Dashboard
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Track your earnings and financial performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Period Selector */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {periodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPeriod(option.value)}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${
                    selectedPeriod === option.value
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={BarChart3}
              onClick={onViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Financial Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">
                  Total Sales
                </p>
                <p className="text-2xl font-bold text-green-800">
                  ₹{currentStats.totalSales.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">
                    +{currentStats.growth}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">• Live</span>
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-blue-800">
                  {currentStats.totalOrders}
                </p>
                <div className="flex items-center mt-1">
                  <Activity className="w-3 h-3 text-blue-600 mr-1" />
                  <span className="text-xs text-blue-600 font-medium">
                    Active
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Avg Order</p>
                <p className="text-2xl font-bold text-purple-800">
                  ₹{currentStats.avgOrderValue}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-purple-600 mr-1" />
                  <span className="text-xs text-purple-600 font-medium">
                    +8%
                  </span>
                </div>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">
                  Net Profit
                </p>
                <p className="text-2xl font-bold text-orange-800">
                  ₹{currentStats.profit.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-orange-600 mr-1" />
                  <span className="text-xs text-orange-600 font-medium">
                    +15%
                  </span>
                </div>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <PieChart className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sales Chart */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedPeriod === "today"
                    ? "Today so far"
                    : selectedPeriod === "yesterday"
                    ? "Yesterday"
                    : selectedPeriod === "week"
                    ? "This Week"
                    : "This Month"}
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Sales</span>
                  </div>
                </div>
              </div>

              {/* Professional Bar Chart */}
              <div className="relative h-48 bg-white rounded-lg p-4 border border-gray-200">
                <div className="absolute inset-4 flex items-end justify-between space-x-1">
                  {hourlyData.map((data, index) => (
                    <div
                      key={data.time}
                      className="flex-1 flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: `${(data.sales / maxSales) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md min-h-[8px] relative group shadow-sm"
                      >
                        {/* Hover tooltip */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ₹{data.sales.toLocaleString()}
                        </div>
                      </motion.div>
                      <span className="text-xs text-gray-500 mt-3 font-medium">
                        {data.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chart Grid Lines */}
                <div className="absolute inset-4 pointer-events-none">
                  {[25, 50, 75].map((percent) => (
                    <div
                      key={percent}
                      className="absolute left-0 right-0 border-t border-gray-100"
                      style={{ top: `${100 - percent}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {recentTransactions.slice(0, 4).map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.customer}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.service}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{transaction.amount}
                      </p>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-1 ${
                            transaction.status === "completed"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-500">
                          {transaction.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={onViewDetails}
            >
              View All Transactions
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FinancialDashboard;
