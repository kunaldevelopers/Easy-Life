import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Search,
  Filter,
  CheckCircle,
  X,
  Eye,
  MapPin,
  Phone,
  ArrowLeft,
  AlertTriangle,
  Ban,
  Clock,
  FileText,
  Calendar,
  Shield,
  ShieldOff,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import { businesses } from "../../data/businesses";

const ListedBusinesses = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Add status to businesses for demo - only show approved/listed businesses
  const businessesWithStatus = businesses.map((business, index) => ({
    ...business,
    status: index < 3 ? "pending" : index < 6 ? "under_review" : "approved",
    listingStatus:
      index % 4 === 0 ? "banned" : index % 5 === 0 ? "temp_banned" : "active", // Demo listing status
    submittedDate: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    approvedDate: new Date(
      Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    banReason:
      index % 4 === 0
        ? "Policy violation reported"
        : index % 5 === 0
        ? "Temporary suspension for verification"
        : null,
    documents: [
      "Business License",
      "Tax Registration",
      "Identity Proof",
      "Address Proof",
    ],
  }));

  // Only show approved/listed businesses (exclude pending and under review)
  const listedBusinesses = businessesWithStatus.filter(
    (business) => business.status === "approved"
  );

  const filteredBusinesses = listedBusinesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || business.listingStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleBusinessAction = (businessId, action, reason = "") => {
    console.log(
      `${action} business with ID: ${businessId}`,
      reason ? `Reason: ${reason}` : ""
    );
    // In a real app, this would make an API call to update the business listing status

    let message = "";
    switch (action) {
      case "ban":
        message = "Business has been banned and removed from listings";
        break;
      case "temp_ban":
        message = "Business has been temporarily banned for review";
        break;
      case "unban":
        message = "Business has been unbanned and restored to listings";
        break;
      default:
        message = "Action completed";
    }

    alert(message);
    // In real app, this would update the business status and refresh the list
  };

  const getListingStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "banned":
        return "bg-red-100 text-red-800";
      case "temp_banned":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getListingStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "banned":
        return <Ban className="w-4 h-4" />;
      case "temp_banned":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getListingStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "banned":
        return "Banned";
      case "temp_banned":
        return "Temporary Ban";
      default:
        return status;
    }
  };

  if (selectedBusiness) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <button
                onClick={() => setSelectedBusiness(null)}
                className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-gray-900 truncate">
                  Business Details
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  {selectedBusiness.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getListingStatusColor(
                  selectedBusiness.listingStatus
                )}`}
              >
                {getListingStatusIcon(selectedBusiness.listingStatus)}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedBusiness(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listed Businesses
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8">
          <Card className="p-4 lg:p-8">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Business Details & Management
              </h1>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getListingStatusColor(
                    selectedBusiness.listingStatus
                  )}`}
                >
                  {getListingStatusIcon(selectedBusiness.listingStatus)}
                  <span className="ml-1">
                    {getListingStatusText(selectedBusiness.listingStatus)}
                  </span>
                </span>
              </div>
            </div>

            {/* Mobile Status Card */}
            <div className="lg:hidden mb-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Status</h3>
                    <p className="text-sm text-gray-500">
                      Current listing status
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getListingStatusColor(
                      selectedBusiness.listingStatus
                    )}`}
                  >
                    {getListingStatusIcon(selectedBusiness.listingStatus)}
                    <span className="ml-1">
                      {getListingStatusText(selectedBusiness.listingStatus)}
                    </span>
                  </span>
                </div>
                {selectedBusiness.banReason && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-900 mb-1">
                      Ban Reason:
                    </p>
                    <p className="text-sm text-red-800">
                      {selectedBusiness.banReason}
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Business Info */}
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                <Card className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Business Information
                  </h3>
                  <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name
                      </label>
                      <p className="text-gray-900">{selectedBusiness.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <p className="text-gray-900 capitalize">
                        {selectedBusiness.category} -{" "}
                        {selectedBusiness.subcategory}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <p className="text-gray-900">{selectedBusiness.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp
                      </label>
                      <p className="text-gray-900">
                        {selectedBusiness.whatsapp || "Not provided"}
                      </p>
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <p className="text-gray-900">
                        {selectedBusiness.address}
                      </p>
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <p className="text-gray-900">
                        {selectedBusiness.description}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Services & Pricing */}
                <Card className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Services & Pricing
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Services Offered
                      </label>
                      <div className="flex flex-wrap gap-2">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pricing Range
                        </label>
                        <p className="text-gray-900">
                          {selectedBusiness.pricing}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Business Hours */}
                <Card className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Business Hours
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                    {Object.entries(selectedBusiness.hours || {}).map(
                      ([day, hours]) => (
                        <div key={day} className="flex justify-between py-1">
                          <span className="text-gray-700">{day}</span>
                          <span className="text-gray-900 font-medium">
                            {hours}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </Card>

                {/* Performance & Reviews */}
                <Card className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
                    <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                        {selectedBusiness.rating}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500">
                        Average Rating
                      </div>
                    </div>
                    <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                        {selectedBusiness.reviewCount}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500">
                        Total Reviews
                      </div>
                    </div>
                    <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                        {selectedBusiness.verified ? "✓" : "⚠"}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500">
                        Verification Status
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Mobile Admin Actions */}
                <div className="lg:hidden">
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedBusiness.listingStatus === "active" && (
                        <>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-orange-600 border-orange-300 hover:bg-orange-50"
                            icon={Clock}
                            onClick={() => {
                              const reason = prompt(
                                "Reason for temporary ban:"
                              );
                              if (reason)
                                handleBusinessAction(
                                  selectedBusiness.id,
                                  "temp_ban",
                                  reason
                                );
                            }}
                          >
                            Temporary Ban
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
                            icon={Ban}
                            onClick={() => {
                              const reason = prompt("Reason for ban:");
                              if (reason)
                                handleBusinessAction(
                                  selectedBusiness.id,
                                  "ban",
                                  reason
                                );
                            }}
                          >
                            Ban Business
                          </Button>
                        </>
                      )}

                      {(selectedBusiness.listingStatus === "banned" ||
                        selectedBusiness.listingStatus === "temp_banned") && (
                        <Button
                          variant="primary"
                          className="w-full justify-start"
                          icon={Shield}
                          onClick={() =>
                            handleBusinessAction(selectedBusiness.id, "unban")
                          }
                        >
                          Unban Business
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Mobile Documents & Images */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Documents */}
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Documents
                    </h3>
                    <div className="space-y-2">
                      {selectedBusiness.documents
                        .slice(0, 3)
                        .map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-900 text-sm truncate">
                                {doc}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-blue-600"
                            >
                              View
                            </Button>
                          </div>
                        ))}
                      {selectedBusiness.documents.length > 3 && (
                        <p className="text-xs text-gray-500 text-center">
                          +{selectedBusiness.documents.length - 3} more
                          documents
                        </p>
                      )}
                    </div>
                  </Card>

                  {/* Images */}
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Images
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedBusiness.images
                        ?.slice(0, 4)
                        .map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Business ${index + 1}`}
                            className="w-full h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => window.open(image, "_blank")}
                          />
                        ))}
                    </div>
                  </Card>
                </div>
              </div>

              {/* Desktop Sidebar - Admin Actions & Info */}
              <div className="hidden lg:block lg:col-span-1 space-y-6">
                {/* Current Status */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Listing Status
                  </h3>
                  <div className="space-y-4">
                    <div
                      className={`flex items-center px-3 py-2 rounded-lg ${getListingStatusColor(
                        selectedBusiness.listingStatus
                      )}`}
                    >
                      {getListingStatusIcon(selectedBusiness.listingStatus)}
                      <span className="ml-2 font-medium">
                        {getListingStatusText(selectedBusiness.listingStatus)}
                      </span>
                    </div>

                    {selectedBusiness.banReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-red-900 mb-1">
                          Ban Reason:
                        </p>
                        <p className="text-sm text-red-800">
                          {selectedBusiness.banReason}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Approved Date:</span>
                        <span className="text-gray-900">
                          {selectedBusiness.approvedDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Original Submission:
                        </span>
                        <span className="text-gray-900">
                          {selectedBusiness.submittedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Admin Actions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Admin Actions
                  </h3>
                  <div className="space-y-3">
                    {selectedBusiness.listingStatus === "active" && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-orange-600 border-orange-300 hover:bg-orange-50"
                          icon={Clock}
                          onClick={() => {
                            const reason = prompt("Reason for temporary ban:");
                            if (reason)
                              handleBusinessAction(
                                selectedBusiness.id,
                                "temp_ban",
                                reason
                              );
                          }}
                        >
                          Temporary Ban
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
                          icon={Ban}
                          onClick={() => {
                            const reason = prompt("Reason for ban:");
                            if (reason)
                              handleBusinessAction(
                                selectedBusiness.id,
                                "ban",
                                reason
                              );
                          }}
                        >
                          Ban Business
                        </Button>
                      </>
                    )}

                    {(selectedBusiness.listingStatus === "banned" ||
                      selectedBusiness.listingStatus === "temp_banned") && (
                      <Button
                        variant="primary"
                        className="w-full justify-start"
                        icon={Shield}
                        onClick={() =>
                          handleBusinessAction(selectedBusiness.id, "unban")
                        }
                      >
                        Unban Business
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Documents */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Submitted Documents
                  </h3>
                  <div className="space-y-2">
                    {selectedBusiness.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 text-sm">{doc}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600"
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Business Images */}
                <Card className="p-6">
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
                          className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => window.open(image, "_blank")}
                        />
                      ))}
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold text-gray-900 truncate">
                Listed Businesses
              </h1>
              <p className="text-xs text-gray-500 truncate">
                {
                  listedBusinesses.filter((b) => b.listingStatus === "active")
                    .length
                }{" "}
                active listings
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-green-50 border border-green-200 rounded-lg px-2 py-1">
              <span className="text-green-800 font-medium text-xs">
                {
                  listedBusinesses.filter((b) => b.listingStatus === "active")
                    .length
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block py-8">
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
                Listed Businesses
              </h1>
              <p className="text-gray-600">
                Manage approved businesses and their listing status
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Store className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    {
                      listedBusinesses.filter(
                        (b) => b.listingStatus === "active"
                      ).length
                    }{" "}
                    active listings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8">
        {/* Mobile Search */}
        <div className="lg:hidden mb-4">
          <Card className="p-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="temp_banned">Temporary Ban</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Mobile Quick Stats */}
        <div className="lg:hidden mb-4">
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">
                {
                  listedBusinesses.filter((b) => b.listingStatus === "active")
                    .length
                }
              </div>
              <div className="text-xs text-gray-500">Active</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-orange-600">
                {
                  listedBusinesses.filter(
                    (b) => b.listingStatus === "temp_banned"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-500">Temp Ban</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-lg font-bold text-red-600">
                {
                  listedBusinesses.filter((b) => b.listingStatus === "banned")
                    .length
                }
              </div>
              <div className="text-xs text-gray-500">Banned</div>
            </Card>
          </div>
        </div>

        {/* Mobile Business List */}
        <div className="lg:hidden space-y-4">
          {filteredBusinesses.length === 0 ? (
            <Card className="p-6">
              <div className="text-center py-8">
                <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No businesses found
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "No approved businesses available"}
                </p>
              </div>
            </Card>
          ) : (
            filteredBusinesses.map((business) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {business.category} - {business.subcategory}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getListingStatusColor(
                      business.listingStatus
                    )}`}
                  >
                    {getListingStatusIcon(business.listingStatus)}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 truncate">
                      {business.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">{business.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">
                        {business.rating} ({business.reviewCount})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={Eye}
                      onClick={() => setSelectedBusiness(business)}
                      className="flex-shrink-0"
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search listed businesses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="temp_banned">Temporary Ban</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  {filteredBusinesses.length === 0 ? (
                    <div className="text-center py-12">
                      <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No businesses found
                      </h3>
                      <p className="text-gray-500">
                        {searchQuery
                          ? "Try adjusting your search criteria"
                          : "No approved businesses available"}
                      </p>
                    </div>
                  ) : (
                    filteredBusinesses.map((business) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {business.name}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getListingStatusColor(
                                  business.listingStatus
                                )}`}
                              >
                                {getListingStatusIcon(business.listingStatus)}
                                <span className="ml-1">
                                  {getListingStatusText(business.listingStatus)}
                                </span>
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
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">
                                  {business.phone}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">
                                  Rating: {business.rating} (
                                  {business.reviewCount} reviews)
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">
                                  Approved: {business.approvedDate}
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
                              Manage
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
                <h3 className="font-semibold text-gray-900 mb-4">
                  Listing Stats
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {
                        listedBusinesses.filter(
                          (b) => b.listingStatus === "active"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-500">Active Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {
                        listedBusinesses.filter(
                          (b) => b.listingStatus === "temp_banned"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-500">Temporary Bans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {
                        listedBusinesses.filter(
                          (b) => b.listingStatus === "banned"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-500">Banned</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {[...new Set(listedBusinesses.map((b) => b.category))].map(
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
                            listedBusinesses.filter(
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
    </div>
  );
};

export default ListedBusinesses;
