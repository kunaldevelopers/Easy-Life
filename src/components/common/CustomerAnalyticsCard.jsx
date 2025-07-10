import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  UserPlus,
  RotateCcw,
  UserX,
  Activity,
} from "lucide-react";
import Card from "./Card";
import Button from "./Button";

const CustomerAnalyticsCard = ({
  title = "Customers",
  data,
  onGetDeeperInsights,
  showInsightsButton = true,
  variant = "default", // default, compact, detailed
}) => {
  const getPercentageColor = (percentage) => {
    if (percentage > 0) return "text-green-600";
    if (percentage < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getIcon = (type) => {
    switch (type) {
      case "new":
        return UserPlus;
      case "repeat":
        return RotateCcw;
      case "lapsed":
        return UserX;
      case "active":
        return Activity;
      default:
        return Users;
    }
  };

  if (variant === "compact") {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          <TrendingUp className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                {data.total.count}
              </div>
              <div className="text-xs text-gray-500">Total customers</div>
            </div>
          </div>
          {data.total.percentage && (
            <div
              className={`text-xs font-medium ${getPercentageColor(
                data.total.percentage
              )}`}
            >
              {data.total.percentage > 0 ? "↗" : "↘"}{" "}
              {Math.abs(data.total.percentage)}%
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-xs text-gray-500">
          Last updated: {data.lastUpdated}
        </div>
      </div>

      {/* Main Total Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Donut Chart Background */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center relative">
            {/* Donut segments - simulating the pie chart */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                from 0deg,
                #ef4444 0deg ${(data.new.count / data.total.count) * 360}deg,
                #8b5cf6 ${(data.new.count / data.total.count) * 360}deg ${
                  ((data.new.count + data.repeat.count) / data.total.count) *
                  360
                }deg,
                #3b82f6 ${
                  ((data.new.count + data.repeat.count) / data.total.count) *
                  360
                }deg 360deg
              )`,
              }}
            >
              <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {data.total.count}
                  </div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total with Percentage */}
      <div className="text-center mb-6">
        <div className="text-sm text-gray-600">Total customers</div>
        <div className="flex items-center justify-center space-x-2 mt-1">
          <span className="text-2xl font-bold text-gray-900">
            {data.total.count}
          </span>
          {data.total.percentage && (
            <span
              className={`text-sm font-medium ${getPercentageColor(
                data.total.percentage
              )}`}
            >
              {data.total.percentage > 0 ? "↗" : "↘"}{" "}
              {Math.abs(data.total.percentage)}%
            </span>
          )}
        </div>
      </div>

      {/* Customer Segments */}
      <div className="space-y-4">
        {/* New Customers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                New customers
              </div>
              <div className="text-xs text-gray-500">
                {data.new.description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              {data.new.count}
            </div>
            {data.new.percentage && (
              <div
                className={`text-xs font-medium ${getPercentageColor(
                  data.new.percentage
                )}`}
              >
                {data.new.percentage > 0 ? "↗" : "↘"}{" "}
                {Math.abs(data.new.percentage)}%
              </div>
            )}
          </div>
        </motion.div>

        {/* Repeat Customers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Repeat customers
              </div>
              <div className="text-xs text-gray-500">
                {data.repeat.description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              {data.repeat.count}
            </div>
            {data.repeat.percentage && (
              <div
                className={`text-xs font-medium ${getPercentageColor(
                  data.repeat.percentage
                )}`}
              >
                {data.repeat.percentage > 0 ? "↗" : "↘"}{" "}
                {Math.abs(data.repeat.percentage)}%
              </div>
            )}
          </div>
        </motion.div>

        {/* Lapsed Customers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Lapsed customers
              </div>
              <div className="text-xs text-gray-500">
                {data.lapsed.description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              {data.lapsed.count}
            </div>
            {data.lapsed.percentage && (
              <div
                className={`text-xs font-medium ${getPercentageColor(
                  data.lapsed.percentage
                )}`}
              >
                {data.lapsed.percentage > 0 ? "↗" : "↘"}{" "}
                {Math.abs(data.lapsed.percentage)}%
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Get Deeper Insights Button */}
      {showInsightsButton && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            className="w-full"
            onClick={onGetDeeperInsights}
          >
            Get deeper insights
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CustomerAnalyticsCard;
