import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Eye,
  EyeOff,
  Ban,
  CheckCircle,
  XCircle,
  Flag,
  MessageSquare,
  Image,
  Star,
  User,
  Store,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const ContentModerationPanel = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock reported content data
  const reportedContent = [
    {
      id: "report-001",
      type: "review",
      content:
        "This business is terrible! They stole my money and the owner is a fraud. Worst experience ever!!!",
      reportedBy: {
        name: "Anonymous User",
        email: "user@example.com",
        id: "user-123",
      },
      targetBusiness: {
        name: "Gangtok Coffee House",
        id: "business-456",
        owner: "Raj Kumar",
      },
      reason: "Inappropriate Language",
      severity: "high",
      status: "pending",
      reportDate: "2025-01-08",
      reportTime: "14:30",
      reportCount: 3,
      evidence: "Screenshot attached",
      category: "defamation",
      description:
        "User is using inappropriate language and making false accusations without evidence.",
    },
    {
      id: "report-002",
      type: "business_listing",
      content:
        "We offer the best services in town! Contact us for amazing deals and quick solutions.",
      reportedBy: {
        name: "Concerned Customer",
        email: "concerned@email.com",
        id: "user-789",
      },
      targetBusiness: {
        name: "Quick Fix Solutions",
        id: "business-789",
        owner: "Unknown",
      },
      reason: "Fake Business",
      severity: "medium",
      status: "under_review",
      reportDate: "2025-01-07",
      reportTime: "16:45",
      reportCount: 2,
      evidence: "No physical address provided",
      category: "fraud",
      description:
        "Business appears to be fake with no verifiable contact information or address.",
    },
    {
      id: "report-003",
      type: "user_profile",
      content:
        "Profile contains inappropriate images and offensive bio content.",
      reportedBy: {
        name: "Multiple Users",
        email: "system@platform.com",
        id: "system",
      },
      targetBusiness: null,
      targetUser: {
        name: "Problematic User",
        id: "user-666",
        email: "problem@user.com",
      },
      reason: "Inappropriate Content",
      severity: "high",
      status: "pending",
      reportDate: "2025-01-07",
      reportTime: "09:20",
      reportCount: 5,
      evidence: "Multiple user reports",
      category: "inappropriate",
      description:
        "User profile contains content that violates community guidelines.",
    },
    {
      id: "report-004",
      type: "comment",
      content:
        "Great service! Highly recommended for everyone in Gangtok. 5 stars!",
      reportedBy: {
        name: "Competitor Business",
        email: "competitor@business.com",
        id: "user-555",
      },
      targetBusiness: {
        name: "Tech Repair Hub",
        id: "business-555",
        owner: "Tech Owner",
      },
      reason: "Fake Review",
      severity: "low",
      status: "resolved",
      reportDate: "2025-01-06",
      reportTime: "11:15",
      reportCount: 1,
      evidence: "Suspicious review pattern",
      category: "fake_review",
      description:
        "Suspected fake positive review from competitor trying to manipulate ratings.",
      resolution: "Verified as legitimate review after investigation",
    },
    {
      id: "report-005",
      type: "business_photos",
      content:
        "Business uploaded misleading photos that don't represent actual services",
      reportedBy: {
        name: "Disappointed Customer",
        email: "disappointed@email.com",
        id: "user-321",
      },
      targetBusiness: {
        name: "Luxury Restaurant",
        id: "business-321",
        owner: "Restaurant Owner",
      },
      reason: "Misleading Information",
      severity: "medium",
      status: "pending",
      reportDate: "2025-01-06",
      reportTime: "08:30",
      reportCount: 4,
      evidence: "Comparison photos provided",
      category: "misleading",
      description:
        "Customer claims business photos don't match actual establishment quality.",
    },
  ];

  const moderationStats = {
    total: reportedContent.length,
    pending: reportedContent.filter((r) => r.status === "pending").length,
    underReview: reportedContent.filter((r) => r.status === "under_review")
      .length,
    resolved: reportedContent.filter((r) => r.status === "resolved").length,
    highSeverity: reportedContent.filter((r) => r.severity === "high").length,
  };

  const filteredReports = reportedContent.filter((report) => {
    const matchesFilter =
      selectedFilter === "all" || report.status === selectedFilter;
    const matchesCategory =
      selectedCategory === "all" || report.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.targetBusiness &&
        report.targetBusiness.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "review":
        return Star;
      case "business_listing":
        return Store;
      case "user_profile":
        return User;
      case "comment":
        return MessageSquare;
      case "business_photos":
        return Image;
      default:
        return Flag;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "dismissed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleModerationAction = (reportId, action) => {
    console.log(`Action: ${action} for report: ${reportId}`);

    switch (action) {
      case "approve":
        alert("Content has been approved and is now visible");
        break;
      case "remove":
        alert("Content has been removed and user has been notified");
        break;
      case "warn":
        alert("Warning message sent to user");
        break;
      case "ban":
        alert("User has been banned from the platform");
        break;
      case "dismiss":
        alert("Report has been dismissed as invalid");
        break;
      case "investigate":
        alert("Report marked for further investigation");
        break;
      default:
        alert(`${action} action completed`);
    }
  };

  const renderReportDetails = () => {
    if (!selectedReport) return null;

    const TypeIcon = getTypeIcon(selectedReport.type);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                ← Back to Reports
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Report Details
              </h1>
            </div>

            <div className="space-y-6">
              {/* Report Header */}
              <div className="border-l-4 border-red-500 pl-6 py-4 bg-red-50 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <TypeIcon className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {selectedReport.reason}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedReport.reportDate} at{" "}
                          {selectedReport.reportTime}
                        </span>
                        <span className="flex items-center">
                          <Flag className="w-4 h-4 mr-1" />
                          {selectedReport.reportCount} report
                          {selectedReport.reportCount > 1 ? "s" : ""}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                            selectedReport.severity
                          )}`}
                        >
                          {selectedReport.severity.charAt(0).toUpperCase() +
                            selectedReport.severity.slice(1)}{" "}
                          Severity
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      selectedReport.status
                    )}`}
                  >
                    {selectedReport.status
                      .replace("_", " ")
                      .charAt(0)
                      .toUpperCase() +
                      selectedReport.status.replace("_", " ").slice(1)}
                  </span>
                </div>
              </div>

              {/* Reported Content */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Reported Content
                </h4>
                <Card className="p-4 bg-gray-50 border border-gray-200">
                  <p className="text-gray-700 italic">
                    "{selectedReport.content}"
                  </p>
                </Card>
              </div>

              {/* Report Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Reporter Information
                  </h4>
                  <Card className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Name:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedReport.reportedBy.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedReport.reportedBy.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">User ID:</span>
                        <span className="text-sm font-mono text-gray-900">
                          {selectedReport.reportedBy.id}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Target Information
                  </h4>
                  <Card className="p-4">
                    {selectedReport.targetBusiness ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Store className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Business:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedReport.targetBusiness.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Owner:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedReport.targetBusiness.owner}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Business ID:
                          </span>
                          <span className="text-sm font-mono text-gray-900">
                            {selectedReport.targetBusiness.id}
                          </span>
                        </div>
                      </div>
                    ) : selectedReport.targetUser ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">User:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedReport.targetUser.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Email:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {selectedReport.targetUser.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            User ID:
                          </span>
                          <span className="text-sm font-mono text-gray-900">
                            {selectedReport.targetUser.id}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No target information available
                      </p>
                    )}
                  </Card>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Additional Information
                </h4>
                <Card className="p-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Description:
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedReport.description}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Evidence:
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedReport.evidence}
                      </p>
                    </div>
                    {selectedReport.resolution && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Resolution:
                        </span>
                        <p className="text-sm text-gray-700 mt-1">
                          {selectedReport.resolution}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              {selectedReport.status === "pending" && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Moderation Actions
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleModerationAction(selectedReport.id, "investigate")
                      }
                      icon={Eye}
                    >
                      Investigate Further
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleModerationAction(selectedReport.id, "remove")
                      }
                      icon={Trash2}
                    >
                      Remove Content
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleModerationAction(selectedReport.id, "warn")
                      }
                      icon={AlertTriangle}
                    >
                      Send Warning
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleModerationAction(selectedReport.id, "ban")
                      }
                      icon={Ban}
                    >
                      Ban User
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        handleModerationAction(selectedReport.id, "approve")
                      }
                      icon={CheckCircle}
                    >
                      Approve Content
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleModerationAction(selectedReport.id, "dismiss")
                      }
                      icon={XCircle}
                    >
                      Dismiss Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  if (selectedReport) {
    return renderReportDetails();
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
                Content Moderation
              </h1>
              <p className="text-gray-600 mt-1">
                Review and moderate reported content, manage user violations
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {moderationStats.total}
            </div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {moderationStats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {moderationStats.underReview}
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {moderationStats.resolved}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {moderationStats.highSeverity}
            </div>
            <div className="text-sm text-gray-600">High Severity</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex space-x-1">
                {[
                  { key: "all", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "under_review", label: "Under Review" },
                  { key: "resolved", label: "Resolved" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedFilter === filter.key
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => {
            const TypeIcon = getTypeIcon(report.type);

            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`p-3 rounded-lg ${
                        report.severity === "high"
                          ? "bg-red-100"
                          : report.severity === "medium"
                          ? "bg-yellow-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <TypeIcon
                        className={`w-5 h-5 ${
                          report.severity === "high"
                            ? "text-red-600"
                            : report.severity === "medium"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {report.reason}
                        </h3>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(
                            report.severity
                          )}`}
                        >
                          {report.severity}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {report.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {report.reportDate} at {report.reportTime}
                        </span>
                        <span className="flex items-center">
                          <Flag className="w-3 h-3 mr-1" />
                          {report.reportCount} report
                          {report.reportCount > 1 ? "s" : ""}
                        </span>
                        {report.targetBusiness && (
                          <span className="flex items-center">
                            <Store className="w-3 h-3 mr-1" />
                            {report.targetBusiness.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {report.type.replace("_", " ")}
                    </span>
                    <Button size="sm" variant="outline" icon={Eye}>
                      Review
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <Card className="p-12 text-center">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No content reports at this time. Platform is running smoothly!"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContentModerationPanel;
