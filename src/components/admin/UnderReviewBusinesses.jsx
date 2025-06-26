import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Search,
  CheckCircle,
  X,
  Eye,
  MapPin,
  Phone,
  ArrowLeft,
  Clock,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import { businesses } from "../../data/businesses";

const UnderReviewBusinesses = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Add status to businesses for demo - only show under review ones
  const businessesWithStatus = businesses.map((business, index) => ({
    ...business,
    status: index < 3 ? "pending" : index < 6 ? "under_review" : "approved",
    submittedDate: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    reviewStartDate: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    documents: [
      "Business License",
      "Tax Registration",
      "Identity Proof",
      "Address Proof",
    ],
  }));

  // Only show under review businesses
  const underReviewBusinesses = businessesWithStatus.filter(
    (business) => business.status === "under_review"
  );

  const filteredBusinesses = underReviewBusinesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAction = (businessId, action) => {
    console.log(`${action} business with ID: ${businessId}`);
    // In a real app, this would make an API call to update the business status
    // For demo purposes, we'll just log the action

    // Provide user feedback based on action
    let message = "";
    switch (action) {
      case "approve":
        message = "Business has been approved and is now live on the platform";
        break;
      case "reject":
        message = "Business application has been rejected";
        break;
      case "back_to_pending":
        message =
          "Business has been moved back to pending status for re-evaluation";
        break;
      default:
        message = "Action completed";
    }

    // In a real app, you would show a toast notification here
    alert(message);

    // After any action, the business would be moved to the appropriate section
    // and would no longer appear in the under review list
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (reviewStartDate) => {
    const daysSinceReview = Math.floor(
      (new Date() - new Date(reviewStartDate)) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceReview > 5) return "text-red-600";
    if (daysSinceReview > 2) return "text-yellow-600";
    return "text-blue-600";
  };

  if (selectedBusiness) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedBusiness(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Under Review Businesses
          </button>

          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Business Under Review
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  selectedBusiness.status
                )}`}
              >
                UNDER REVIEW
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Business Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Business Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Business Name
                      </label>
                      <p className="text-gray-900">{selectedBusiness.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Category
                      </label>
                      <p className="text-gray-900 capitalize">
                        {selectedBusiness.category} -{" "}
                        {selectedBusiness.subcategory}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Description
                      </label>
                      <p className="text-gray-900">
                        {selectedBusiness.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">
                        {selectedBusiness.address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">
                        {selectedBusiness.phone}
                      </span>
                    </div>
                    {selectedBusiness.email && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">
                          Email
                        </label>
                        <p className="text-gray-900">
                          {selectedBusiness.email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Services & Pricing
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Services Offered
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedBusiness.services?.map((service, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedBusiness.pricing && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">
                          Pricing Range
                        </label>
                        <p className="text-gray-900">
                          {selectedBusiness.pricing}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Review Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Review Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <label className="block text-sm font-medium text-gray-500">
                          Original Submission Date
                        </label>
                        <p className="text-gray-900">
                          {selectedBusiness.submittedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <label className="block text-sm font-medium text-gray-500">
                          Review Started Date
                        </label>
                        <p className="text-blue-900 font-medium">
                          {selectedBusiness.reviewStartDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Required Documents
                  </h3>
                  <div className="space-y-2">
                    {selectedBusiness.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{doc}</span>
                        </div>
                        <span className="text-green-600 text-sm">
                          ✓ Uploaded
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Business Images
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedBusiness.images
                      ?.slice(0, 4)
                      .map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Business ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                  </div>
                </div>

                {/* Review Notes Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Review Notes
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Currently Under Review
                        </p>
                        <p className="text-sm text-blue-800">
                          This business is being reviewed for document
                          verification and compliance with platform guidelines.
                          The review process typically takes 2-5 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <Button
                variant="outline"
                icon={ArrowLeft}
                onClick={() =>
                  handleAction(selectedBusiness.id, "back_to_pending")
                }
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Back to Pending
              </Button>
              <Button
                variant="outline"
                icon={X}
                onClick={() => handleAction(selectedBusiness.id, "reject")}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Reject
              </Button>
              <Button
                variant="primary"
                icon={CheckCircle}
                onClick={() => handleAction(selectedBusiness.id, "approve")}
              >
                Approve Business
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Under Review Businesses
            </h1>
            <p className="text-gray-600">
              Complete verification and finalize decisions for businesses under
              review
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  {underReviewBusinesses.length} businesses under review
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Info */}
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  Under Review Status
                </h3>
                <p className="text-sm text-blue-800">
                  These businesses are in the verification phase. You can{" "}
                  <span className="font-medium">Approve</span>,{" "}
                  <span className="font-medium">Reject</span>, or move{" "}
                  <span className="font-medium">Back to Pending</span> if more
                  information is needed.
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Priority is given to businesses that have been under review
                  for more than 5 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search businesses under review..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                {filteredBusinesses.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No businesses under review
                    </h3>
                    <p className="text-gray-500">
                      {searchQuery
                        ? "Try adjusting your search criteria"
                        : "All businesses have been processed"}
                    </p>
                  </div>
                ) : (
                  filteredBusinesses.map((business) => (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {business.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                business.status
                              )}`}
                            >
                              UNDER REVIEW
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {business.description}
                          </p>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {business.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                Submitted: {business.submittedDate}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span
                                className={`${getPriorityColor(
                                  business.reviewStartDate
                                )} font-medium`}
                              >
                                Review started: {business.reviewStartDate}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {business.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            icon={Eye}
                            onClick={() => setSelectedBusiness(business)}
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Review Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {underReviewBusinesses.length}
                  </div>
                  <div className="text-sm text-gray-500">Under Review</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {
                      underReviewBusinesses.filter((business) => {
                        const daysSinceReview = Math.floor(
                          (new Date() - new Date(business.reviewStartDate)) /
                            (1000 * 60 * 60 * 24)
                        );
                        return daysSinceReview > 5;
                      }).length
                    }
                  </div>
                  <div className="text-sm text-gray-500">Overdue (5+ days)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      underReviewBusinesses.filter((business) => {
                        const daysSinceReview = Math.floor(
                          (new Date() - new Date(business.reviewStartDate)) /
                            (1000 * 60 * 60 * 24)
                        );
                        return daysSinceReview <= 2;
                      }).length
                    }
                  </div>
                  <div className="text-sm text-gray-500">Recent (2 days)</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {[...new Set(underReviewBusinesses.map((b) => b.category))].map(
                  (category) => (
                    <div
                      key={category}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-600 capitalize">
                        {category}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {
                          underReviewBusinesses.filter(
                            (b) => b.category === category
                          ).length
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderReviewBusinesses;
