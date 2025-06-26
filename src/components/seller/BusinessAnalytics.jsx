import React, { useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  Eye,
  MessageCircle,
  Star,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const BusinessAnalytics = ({ onBack }) => {
  const [timeframe, setTimeframe] = useState("30"); // days
  const [selectedMetric, setSelectedMetric] = useState("views");

  const analyticsData = {
    overview: {
      totalViews: 2847,
      totalInquiries: 47,
      averageRating: 4.6,
      totalReviews: 12,
      conversionRate: 1.65, // inquiries/views * 100
      responseRate: 95,
    },
    trends: {
      views: [
        { date: "2024-06-01", value: 85 },
        { date: "2024-06-02", value: 92 },
        { date: "2024-06-03", value: 78 },
        { date: "2024-06-04", value: 95 },
        { date: "2024-06-05", value: 103 },
        { date: "2024-06-06", value: 88 },
        { date: "2024-06-07", value: 97 },
        { date: "2024-06-08", value: 105 },
        { date: "2024-06-09", value: 92 },
        { date: "2024-06-10", value: 110 },
        { date: "2024-06-11", value: 98 },
        { date: "2024-06-12", value: 115 },
        { date: "2024-06-13", value: 108 },
        { date: "2024-06-14", value: 125 },
        { date: "2024-06-15", value: 118 },
        { date: "2024-06-16", value: 132 },
        { date: "2024-06-17", value: 128 },
        { date: "2024-06-18", value: 145 },
        { date: "2024-06-19", value: 138 },
        { date: "2024-06-20", value: 152 },
        { date: "2024-06-21", value: 148 },
        { date: "2024-06-22", value: 165 },
        { date: "2024-06-23", value: 158 },
        { date: "2024-06-24", value: 172 },
        { date: "2024-06-25", value: 168 },
      ],
      inquiries: [
        2, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 3, 5, 2, 4, 3, 6, 4, 5, 3, 7, 4, 6,
        5,
      ],
    },
    demographics: {
      ageGroups: [
        { group: "18-25", percentage: 15, count: 427 },
        { group: "26-35", percentage: 35, count: 996 },
        { group: "36-45", percentage: 28, count: 797 },
        { group: "46-55", percentage: 15, count: 427 },
        { group: "55+", percentage: 7, count: 200 },
      ],
      locations: [
        { area: "MG Road", percentage: 25, count: 712 },
        { area: "Ranipool", percentage: 20, count: 569 },
        { area: "Tadong", percentage: 18, count: 512 },
        { area: "Development Area", percentage: 15, count: 427 },
        { area: "Others", percentage: 22, count: 627 },
      ],
    },
    topPhotos: [
      { id: 1, title: "Delicious Momos", views: 245, likes: 18 },
      { id: 2, title: "Wedding Catering Setup", views: 312, likes: 45 },
      { id: 3, title: "Restaurant Interior", views: 189, likes: 12 },
      { id: 4, title: "Traditional Thukpa", views: 156, likes: 24 },
      { id: 5, title: "Fresh Ingredients", views: 123, likes: 15 },
    ],
    peakHours: [
      { hour: "9 AM", views: 45 },
      { hour: "10 AM", views: 62 },
      { hour: "11 AM", views: 78 },
      { hour: "12 PM", views: 95 },
      { hour: "1 PM", views: 112 },
      { hour: "2 PM", views: 88 },
      { hour: "3 PM", views: 72 },
      { hour: "4 PM", views: 85 },
      { hour: "5 PM", views: 98 },
      { hour: "6 PM", views: 125 },
      { hour: "7 PM", views: 138 },
      { hour: "8 PM", views: 145 },
    ],
  };

  const getMaxValue = (data) => Math.max(...data);
  const getPercentage = (value, max) => (value / max) * 100;

  const handleExportData = () => {
    console.log("Exporting analytics data");
    alert("Analytics data exported successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Business Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Track your business performance and insights
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <Button
              onClick={handleExportData}
              variant="outline"
              icon={Download}
            >
              Export Data
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">+12% vs last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.totalInquiries}
                </p>
                <p className="text-sm text-green-600">+8% vs last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.averageRating}
                </p>
                <p className="text-sm text-green-600">+0.2 vs last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.conversionRate}%
                </p>
                <p className="text-sm text-green-600">+0.3% vs last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100">
                <MessageCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Response Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.responseRate}%
                </p>
                <p className="text-sm text-green-600">+2% vs last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-100">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reviews</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.overview.totalReviews}
                </p>
                <p className="text-sm text-green-600">+4 this month</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Views Trend Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Views Trend
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedMetric("views")}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedMetric === "views"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Views
                  </button>
                  <button
                    onClick={() => setSelectedMetric("inquiries")}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedMetric === "inquiries"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Inquiries
                  </button>
                </div>
              </div>

              {/* Simple Line Chart */}
              <div className="h-64 flex items-end space-x-1">
                {analyticsData.trends.views.slice(-15).map((data, index) => {
                  const maxValue = getMaxValue(
                    analyticsData.trends.views.slice(-15).map((d) => d.value)
                  );
                  const height = getPercentage(data.value, maxValue);
                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-400"
                        style={{ height: `${height}%` }}
                        title={`${data.date}: ${data.value} views`}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2 transform rotate-45 origin-left">
                        {data.date.split("-")[2]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Peak Hours Chart */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Peak Activity Hours
              </h2>
              <div className="space-y-3">
                {analyticsData.peakHours.map((data, index) => {
                  const maxValue = getMaxValue(
                    analyticsData.peakHours.map((d) => d.views)
                  );
                  const width = getPercentage(data.views, maxValue);
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="w-16 text-sm text-gray-600">
                        {data.hour}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-sm text-gray-600 text-right">
                        {data.views}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar Analytics */}
          <div className="space-y-6">
            {/* Demographics */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Customer Demographics
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Age Groups
                  </h4>
                  <div className="space-y-2">
                    {analyticsData.demographics.ageGroups.map(
                      (group, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-600">
                            {group.group}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${group.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-8">
                              {group.percentage}%
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Top Locations
                  </h4>
                  <div className="space-y-2">
                    {analyticsData.demographics.locations.map(
                      (location, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-600">
                            {location.area}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${location.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-8">
                              {location.percentage}%
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Top Performing Photos */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Top Performing Photos
              </h3>
              <div className="space-y-3">
                {analyticsData.topPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-xs text-gray-600">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {photo.title}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span>👁 {photo.views}</span>
                        <span>❤️ {photo.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Insights */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Insights
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Your busiest day is Friday with 25% more views
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Evening hours (6-8 PM) generate most inquiries
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Food photos get 60% more engagement
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Customers aged 26-35 are your primary audience
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
