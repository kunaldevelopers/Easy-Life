import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  User,
  Calendar,
  Filter,
  Search,
  Eye,
  ThumbsUp,
  Share2,
  Image as ImageIcon,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const EngagementManager = ({ onBack }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEngagement, setSelectedEngagement] = useState(null);

  const engagements = [
    {
      id: 1,
      type: "photo_like",
      customerName: "Anjali Thapa",
      date: "4 hours ago",
      timestamp: "Dec 15, 2024 11:30 AM",
      message: "Your new menu photos look amazing",
      photoTitle: "Delicious Momo Platter",
      photoDescription: "Fresh steamed momos with authentic Nepali spices",
      likes: 23,
      comments: 5,
      shares: 2,
    },
    {
      id: 2,
      type: "comment",
      customerName: "Suresh Maharjan",
      date: "6 hours ago",
      timestamp: "Dec 15, 2024 9:15 AM",
      message: "This looks absolutely delicious! Do you deliver to Patan?",
      photoTitle: "Traditional Dal Bhat",
      photoDescription: "Authentic Nepali meal with fresh vegetables",
      likes: 8,
      comments: 12,
      shares: 1,
    },
    {
      id: 3,
      type: "photo_like",
      customerName: "Rina Tamang",
      date: "8 hours ago",
      timestamp: "Dec 15, 2024 7:45 AM",
      message: "Love the presentation! Very professional.",
      photoTitle: "Wedding Catering Setup",
      photoDescription: "Elegant buffet setup for 200+ guests",
      likes: 45,
      comments: 8,
      shares: 5,
    },
    {
      id: 4,
      type: "share",
      customerName: "Dipak Gurung",
      date: "12 hours ago",
      timestamp: "Dec 15, 2024 3:20 AM",
      message: "Shared your business profile with friends",
      photoTitle: "Business Profile",
      photoDescription: "Himalayan Delights Catering Services",
      likes: 15,
      comments: 3,
      shares: 8,
    },
    {
      id: 5,
      type: "comment",
      customerName: "Sita Rai",
      date: "1 day ago",
      timestamp: "Dec 14, 2024 5:30 PM",
      message: "What are your rates for birthday party catering?",
      photoTitle: "Birthday Party Setup",
      photoDescription: "Colorful decorations with kid-friendly food options",
      likes: 12,
      comments: 15,
      shares: 2,
    },
    {
      id: 6,
      type: "photo_like",
      customerName: "Ramesh Shrestha",
      date: "1 day ago",
      timestamp: "Dec 14, 2024 2:15 PM",
      message: "Great quality photos! Very appetizing.",
      photoTitle: "Fresh Ingredients",
      photoDescription: "Locally sourced vegetables and spices",
      likes: 31,
      comments: 6,
      shares: 3,
    },
  ];

  const filteredEngagements = engagements.filter((engagement) => {
    const matchesSearch =
      engagement.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      engagement.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engagement.photoTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = selectedTab === "all" || engagement.type === selectedTab;

    return matchesSearch && matchesTab;
  });

  const engagementStats = {
    total: engagements.length,
    photo_likes: engagements.filter((e) => e.type === "photo_like").length,
    comments: engagements.filter((e) => e.type === "comment").length,
    shares: engagements.filter((e) => e.type === "share").length,
    totalLikes: engagements.reduce((sum, e) => sum + e.likes, 0),
    totalComments: engagements.reduce((sum, e) => sum + e.comments, 0),
    totalShares: engagements.reduce((sum, e) => sum + e.shares, 0),
  };

  const getEngagementIcon = (type) => {
    switch (type) {
      case "photo_like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "share":
        return <Share2 className="w-5 h-5 text-green-500" />;
      default:
        return <Eye className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEngagementTypeText = (type) => {
    switch (type) {
      case "photo_like":
        return "liked your photo";
      case "comment":
        return "commented on your photo";
      case "share":
        return "shared your content";
      default:
        return "engaged with your content";
    }
  };

  const handleRespond = (engagementId, responseText) => {
    // Handle response logic here
    console.log(`Responding to engagement ${engagementId}:`, responseText);
    setSelectedEngagement(null);
  };

  if (selectedEngagement) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedEngagement(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Engagements
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getEngagementIcon(selectedEngagement.type)}
                  <span className="font-medium text-gray-900">
                    {selectedEngagement.customerName}
                  </span>
                  <span className="text-gray-600">
                    {getEngagementTypeText(selectedEngagement.type)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {selectedEngagement.timestamp}
                </p>
              </div>
            </div>

            {/* Photo/Content Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {selectedEngagement.photoTitle}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {selectedEngagement.photoDescription}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedEngagement.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{selectedEngagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-4 h-4" />
                      <span>{selectedEngagement.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Message */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Customer Message
              </h4>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                {selectedEngagement.message}
              </p>
            </div>

            {/* Response Form */}
            {(selectedEngagement.type === "comment" ||
              selectedEngagement.type === "share") && (
              <ResponseForm
                engagementId={selectedEngagement.id}
                onResponse={handleRespond}
                type={selectedEngagement.type}
              />
            )}

            {selectedEngagement.type === "photo_like" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <ThumbsUp className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-green-800">
                    Customer engagement noted. Consider reaching out personally
                    to build stronger relationships!
                  </p>
                </div>
              </div>
            )}
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
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Engagement
          </h1>
          <p className="text-gray-600 mt-1">
            Track and respond to customer interactions with your content
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {engagementStats.totalLikes}
                </div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {engagementStats.totalComments}
                </div>
                <div className="text-sm text-gray-600">Total Comments</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {engagementStats.totalShares}
                </div>
                <div className="text-sm text-gray-600">Total Shares</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {engagementStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Engagements</div>
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
                placeholder="Search engagements..."
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
                  { key: "all", label: "All", count: engagementStats.total },
                  {
                    key: "photo_like",
                    label: "Likes",
                    count: engagementStats.photo_likes,
                  },
                  {
                    key: "comment",
                    label: "Comments",
                    count: engagementStats.comments,
                  },
                  {
                    key: "share",
                    label: "Shares",
                    count: engagementStats.shares,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedTab === tab.key
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Engagements List */}
        <div className="space-y-4">
          {filteredEngagements.map((engagement) => (
            <motion.div
              key={engagement.id}
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
                      {getEngagementIcon(engagement.type)}
                      <span className="font-medium text-gray-900">
                        {engagement.customerName}
                      </span>
                      <span className="text-gray-600">
                        {getEngagementTypeText(engagement.type)}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {engagement.date}
                      </span>
                    </div>

                    <div className="flex items-start space-x-3 mt-2">
                      <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {engagement.photoTitle}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {engagement.message}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{engagement.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{engagement.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-3 h-3" />
                            <span>{engagement.shares}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedEngagement(engagement)}
                  >
                    View Details
                  </Button>
                  {(engagement.type === "comment" ||
                    engagement.type === "share") && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedEngagement(engagement)}
                    >
                      Respond
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEngagements.length === 0 && (
          <Card className="p-12 text-center">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No engagements found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedTab !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Customer engagements will appear here when they interact with your content."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

const ResponseForm = ({ engagementId, onResponse, type }) => {
  const [responseText, setResponseText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (responseText.trim()) {
      onResponse(engagementId, responseText);
      setResponseText("");
    }
  };

  const placeholder =
    type === "comment"
      ? "Reply to this comment..."
      : "Thank the customer for sharing...";

  return (
    <form onSubmit={handleSubmit} className="border-t pt-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        {type === "comment" ? "Reply to Comment" : "Respond to Share"}
      </h4>
      <textarea
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        rows={3}
        required
      />
      <div className="flex justify-end space-x-2 mt-3">
        <Button type="button" variant="outline" size="sm">
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          Send Response
        </Button>
      </div>
    </form>
  );
};

export default EngagementManager;
