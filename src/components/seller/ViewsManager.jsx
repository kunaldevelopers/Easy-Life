import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  User,
  Calendar,
  Filter,
  Search,
  Clock,
  MapPin,
  Phone,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const ViewsManager = ({ onBack }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState(null);

  const profileViews = [
    {
      id: 1,
      viewerName: "Anonymous User",
      location: "Kathmandu, Bagmati",
      date: "2 hours ago",
      timestamp: "Dec 15, 2024 1:30 PM",
      viewDuration: "2 min 45 sec",
      pagesViewed: ["Profile", "Photos", "Reviews"],
      source: "Search Results",
      device: "Mobile",
      inquiryMade: false,
    },
    {
      id: 2,
      viewerName: "Priya Sharma",
      location: "Lalitpur, Bagmati",
      date: "4 hours ago",
      timestamp: "Dec 15, 2024 11:15 AM",
      viewDuration: "5 min 12 sec",
      pagesViewed: ["Profile", "Photos", "Reviews", "Contact"],
      source: "Direct Link",
      device: "Desktop",
      inquiryMade: true,
    },
    {
      id: 3,
      viewerName: "Anonymous User",
      location: "Bhaktapur, Bagmati",
      date: "6 hours ago",
      timestamp: "Dec 15, 2024 9:45 AM",
      viewDuration: "1 min 32 sec",
      pagesViewed: ["Profile"],
      source: "Category Browse",
      device: "Mobile",
      inquiryMade: false,
    },
    {
      id: 4,
      viewerName: "Rajesh Kumar",
      location: "Pokhara, Gandaki",
      date: "8 hours ago",
      timestamp: "Dec 15, 2024 7:20 AM",
      viewDuration: "3 min 58 sec",
      pagesViewed: ["Profile", "Photos", "Business Hours"],
      source: "Search Results",
      device: "Tablet",
      inquiryMade: false,
    },
    {
      id: 5,
      viewerName: "Sita Rai",
      location: "Kathmandu, Bagmati",
      date: "12 hours ago",
      timestamp: "Dec 15, 2024 3:30 AM",
      viewDuration: "4 min 21 sec",
      pagesViewed: ["Profile", "Photos", "Reviews", "Location"],
      source: "Social Media",
      device: "Mobile",
      inquiryMade: true,
    },
    {
      id: 6,
      viewerName: "Anonymous User",
      location: "Chitwan, Bagmati",
      date: "1 day ago",
      timestamp: "Dec 14, 2024 8:15 PM",
      viewDuration: "2 min 15 sec",
      pagesViewed: ["Profile", "Reviews"],
      source: "Search Results",
      device: "Desktop",
      inquiryMade: false,
    },
    {
      id: 7,
      viewerName: "Deepak Gurung",
      location: "Biratnagar, Province 1",
      date: "1 day ago",
      timestamp: "Dec 14, 2024 4:45 PM",
      viewDuration: "6 min 33 sec",
      pagesViewed: [
        "Profile",
        "Photos",
        "Reviews",
        "Contact",
        "Business Hours",
      ],
      source: "Referral",
      device: "Mobile",
      inquiryMade: true,
    },
    {
      id: 8,
      viewerName: "Anonymous User",
      location: "Kathmandu, Bagmati",
      date: "1 day ago",
      timestamp: "Dec 14, 2024 2:10 PM",
      viewDuration: "1 min 45 sec",
      pagesViewed: ["Profile"],
      source: "Category Browse",
      device: "Mobile",
      inquiryMade: false,
    },
  ];

  const timeframes = [
    { key: "today", label: "Today", days: 1 },
    { key: "week", label: "This Week", days: 7 },
    { key: "month", label: "This Month", days: 30 },
    { key: "quarter", label: "Last 3 Months", days: 90 },
  ];

  const filteredViews = profileViews.filter((view) => {
    const matchesSearch =
      view.viewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      view.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      view.source.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by timeframe (simplified for demo)
    const selectedDays =
      timeframes.find((t) => t.key === selectedTimeframe)?.days || 7;
    const isWithinTimeframe = true; // Simplified for demo

    return matchesSearch && isWithinTimeframe;
  });

  const viewStats = {
    total: profileViews.length,
    withInquiry: profileViews.filter((v) => v.inquiryMade).length,
    averageDuration: "3 min 12 sec",
    uniqueViewers: profileViews.filter((v) => v.viewerName !== "Anonymous User")
      .length,
    topSource: "Search Results",
    mobileViews: profileViews.filter((v) => v.device === "Mobile").length,
    desktopViews: profileViews.filter((v) => v.device === "Desktop").length,
    tabletViews: profileViews.filter((v) => v.device === "Tablet").length,
  };

  const conversionRate = (
    (viewStats.withInquiry / viewStats.total) *
    100
  ).toFixed(1);

  const getSourceIcon = (source) => {
    switch (source) {
      case "Search Results":
        return <Search className="w-4 h-4 text-blue-500" />;
      case "Category Browse":
        return <BarChart3 className="w-4 h-4 text-green-500" />;
      case "Direct Link":
        return <Eye className="w-4 h-4 text-purple-500" />;
      case "Social Media":
        return <TrendingUp className="w-4 h-4 text-pink-500" />;
      case "Referral":
        return <User className="w-4 h-4 text-orange-500" />;
      default:
        return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  if (selectedView) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedView(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Views
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedView.viewerName}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedView.location}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{selectedView.timestamp}</span>
                  </div>
                </div>
              </div>
              {selectedView.inquiryMade && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Made Inquiry
                </span>
              )}
            </div>

            {/* View Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">View Duration</div>
                <div className="text-lg font-semibold text-gray-900">
                  {selectedView.viewDuration}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Pages Viewed</div>
                <div className="text-lg font-semibold text-gray-900">
                  {selectedView.pagesViewed.length}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Source</div>
                <div className="flex items-center space-x-1">
                  {getSourceIcon(selectedView.source)}
                  <span className="text-sm font-medium text-gray-900">
                    {selectedView.source}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Device</div>
                <div className="text-lg font-semibold text-gray-900">
                  {selectedView.device}
                </div>
              </div>
            </div>

            {/* Pages Viewed */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Pages Viewed
              </h4>
              <div className="space-y-2">
                {selectedView.pagesViewed.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <span className="text-sm text-blue-900">{page}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Recommendations */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">
                Recommendations
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                {!selectedView.inquiryMade && (
                  <li>
                    • Consider reaching out to this viewer with a special offer
                  </li>
                )}
                {selectedView.viewDuration.includes("1 min") && (
                  <li>
                    • Short view duration - consider improving profile appeal
                  </li>
                )}
                {selectedView.pagesViewed.length === 1 && (
                  <li>
                    • Only viewed main profile - add more engaging content
                  </li>
                )}
                {selectedView.source === "Search Results" && (
                  <li>
                    • Came from search - ensure your SEO keywords are working
                  </li>
                )}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Profile Views</h1>
          <p className="text-gray-600 mt-1">
            Track who's viewing your business profile and their behavior
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {viewStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {conversionRate}%
                </div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {viewStats.uniqueViewers}
                </div>
                <div className="text-sm text-gray-600">Unique Viewers</div>
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
                  {viewStats.averageDuration}
                </div>
                <div className="text-sm text-gray-600">Avg. Duration</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg mr-3">
                <Phone className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {viewStats.withInquiry}
                </div>{" "}
                <div className="text-sm text-gray-600">Led to Inquiry</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Device Breakdown */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Device Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {viewStats.mobileViews}
              </div>
              <div className="text-sm text-gray-600">Mobile</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {viewStats.desktopViews}
              </div>
              <div className="text-sm text-gray-600">Desktop</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {viewStats.tabletViews}
              </div>
              <div className="text-sm text-gray-600">Tablet</div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search views..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={Search}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {timeframes.map((timeframe) => (
                  <option key={timeframe.key} value={timeframe.key}>
                    {timeframe.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Views List */}
        <div className="space-y-4">
          {filteredViews.map((view) => (
            <motion.div
              key={view.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {view.viewerName}
                      </span>
                      {view.inquiryMade && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Inquired
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3 text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{view.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{view.viewDuration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        {getSourceIcon(view.source)}
                        <span>{view.source}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span>{view.pagesViewed.length} pages</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 mt-2">
                      {view.date} • {view.device}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedView(view)}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredViews.length === 0 && (
          <Card className="p-12 text-center">
            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No views found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "Profile views will appear here when customers visit your business page."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewsManager;
