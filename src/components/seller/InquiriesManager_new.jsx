import React, { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Star,
  Send,
  Archive,
  Filter,
  Search,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Card from "../common/Card";
import Button from "../common/Button";

const InquiriesManager = ({ onBack }) => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [response, setResponse] = useState("");

  const inquiries = [
    {
      id: 1,
      customerName: "Priya Sharma",
      customerEmail: "priya.sharma@email.com",
      customerPhone: "+91 98765 43210",
      subject: "Wedding Catering for 200 Guests",
      message:
        "Hi, I'm planning my wedding for December 15th, 2024. We need catering services for approximately 200 guests. Can you provide a detailed quote including traditional Sikkimese dishes?",
      date: "2024-06-25",
      time: "14:30",
      status: "new",
      priority: "high",
      eventDate: "2024-12-15",
      guestCount: 200,
    },
    {
      id: 2,
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh.k@company.com",
      customerPhone: "+91 87654 32109",
      subject: "Corporate Event Catering",
      message:
        "We're organizing a corporate event on July 20th for 80 people. Need breakfast, lunch, and evening snacks. Please share your corporate packages.",
      date: "2024-06-24",
      time: "10:15",
      status: "responded",
      priority: "medium",
      eventDate: "2024-07-20",
      guestCount: 80,
    },
    {
      id: 3,
      customerName: "Anjali Thapa",
      customerEmail: "anjali.thapa@email.com",
      customerPhone: "+91 76543 21098",
      subject: "Birthday Party Arrangements",
      message:
        "Looking for catering and decoration services for my daughter's 5th birthday party. About 30 children and 20 adults. Theme is princess. Date: July 15th.",
      date: "2024-06-23",
      time: "16:45",
      status: "new",
      priority: "low",
      eventDate: "2024-07-15",
      guestCount: 50,
    },
    {
      id: 4,
      customerName: "Deepak Rai",
      customerEmail: "deepak.rai@email.com",
      customerPhone: "+91 65432 10987",
      subject: "Photography Services Inquiry",
      message:
        "I need professional photography services for a family gathering on August 1st. About 4 hours coverage needed. Can you provide portfolio and pricing?",
      date: "2024-06-22",
      time: "11:20",
      status: "archived",
      priority: "medium",
      eventDate: "2024-08-01",
      guestCount: 25,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "responded":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filterStatus === "all") return true;
    return inquiry.status === filterStatus;
  });

  const handleSendResponse = () => {
    if (response.trim()) {
      console.log("Sending response:", response);
      alert("Response sent successfully!");
      setResponse("");
      setSelectedInquiry(null);
    }
  };

  const handleStatusChange = (inquiryId, newStatus) => {
    console.log(`Changing status of inquiry ${inquiryId} to ${newStatus}`);
    // In real app, this would update the inquiry status
  };

  if (selectedInquiry) {
    return (
      <>
        <Helmet>
          <title>Inquiry Details - Easy Life Gangtok</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 mb-4 safe-area-top">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-lg bg-gray-100 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-bold text-gray-900 truncate">
                    Inquiry Details
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    {selectedInquiry.customerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    selectedInquiry.status
                  )}`}
                >
                  {selectedInquiry.status}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center mb-8">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Inquiries
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Inquiry Details
                </h1>
                <p className="text-gray-600">
                  Respond to {selectedInquiry.customerName}'s inquiry
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="lg:hidden px-4 pb-24 max-w-md mx-auto">
            {/* Customer Info Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {selectedInquiry.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">
                    {selectedInquiry.customerName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {selectedInquiry.customerEmail}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      selectedInquiry.priority
                    )}`}
                  >
                    {selectedInquiry.priority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Phone className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">
                    Call
                  </span>
                </button>
                <button className="flex items-center justify-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <Mail className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-900">
                    Email
                  </span>
                </button>
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                {selectedInquiry.subject}
              </h3>

              {/* Event Details */}
              {selectedInquiry.eventDate && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-blue-900 font-medium">Event Date</p>
                        <p className="text-blue-700">
                          {selectedInquiry.eventDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-blue-900 font-medium">Guests</p>
                        <p className="text-blue-700">
                          {selectedInquiry.guestCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Message
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedInquiry.message}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                  <span>Received {selectedInquiry.date}</span>
                  <span>{selectedInquiry.time}</span>
                </div>
              </div>
            </div>

            {/* Response Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Your Response
              </h3>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
              />

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() =>
                    handleStatusChange(selectedInquiry.id, "archived")
                  }
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                >
                  Archive
                </button>
                <button
                  onClick={handleSendResponse}
                  disabled={!response.trim()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                    response.trim()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Content */}
          <div className="hidden lg:block max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {selectedInquiry.subject}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          {selectedInquiry.date} at {selectedInquiry.time}
                        </span>
                        {selectedInquiry.eventDate && (
                          <>
                            <span>•</span>
                            <span>Event: {selectedInquiry.eventDate}</span>
                            <span>•</span>
                            <span>{selectedInquiry.guestCount} guests</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedInquiry.status
                        )}`}
                      >
                        {selectedInquiry.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                          selectedInquiry.priority
                        )}`}
                      >
                        {selectedInquiry.priority}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Customer Message
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedInquiry.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Your Response
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Type your response here..."
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() =>
                            handleStatusChange(selectedInquiry.id, "archived")
                          }
                          variant="outline"
                          size="sm"
                          icon={Archive}
                        >
                          Archive
                        </Button>
                      </div>
                      <Button
                        onClick={handleSendResponse}
                        variant="primary"
                        icon={Send}
                        disabled={!response.trim()}
                      >
                        Send Response
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Customer Info Sidebar */}
              <div>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Customer Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {selectedInquiry.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {selectedInquiry.customerName}
                          </p>
                          <p className="text-sm text-gray-500">Customer</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {selectedInquiry.customerEmail}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {selectedInquiry.customerPhone}
                        </span>
                      </div>
                      {selectedInquiry.eventDate && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Event: {selectedInquiry.eventDate}
                          </span>
                        </div>
                      )}
                      {selectedInquiry.guestCount && (
                        <div className="flex items-center space-x-3">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {selectedInquiry.guestCount} guests
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        icon={Phone}
                      >
                        Call Customer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        icon={Mail}
                      >
                        Send Email
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Inquiries - Easy Life Gangtok</title>
      </Helmet>
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
                  Inquiries
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  Manage customer inquiries
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs px-2 py-1 border rounded bg-white"
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="responded">Responded</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  Customer Inquiries
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage and respond to customer inquiries
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Inquiries</option>
                <option value="new">New</option>
                <option value="responded">Responded</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="lg:hidden px-4 pb-24 max-w-md mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="text-lg font-bold text-blue-600">
                {inquiries.filter((i) => i.status === "new").length}
              </div>
              <div className="text-xs text-gray-600">New</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="text-lg font-bold text-green-600">
                {inquiries.filter((i) => i.status === "responded").length}
              </div>
              <div className="text-xs text-gray-600">Responded</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="text-lg font-bold text-purple-600">85%</div>
              <div className="text-xs text-gray-600">Response Rate</div>
            </div>
          </div>

          {/* Inquiries List */}
          <div className="space-y-3">
            {filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                onClick={() => setSelectedInquiry(inquiry)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {inquiry.subject}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {inquiry.customerName}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {inquiry.message}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        inquiry.priority
                      )}`}
                    >
                      {inquiry.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {inquiry.date} at {inquiry.time}
                  </span>
                  {inquiry.eventDate && (
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{inquiry.eventDate}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden lg:block max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    New Inquiries
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {inquiries.filter((i) => i.status === "new").length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Responded</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {inquiries.filter((i) => i.status === "responded").length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100">
                  <Archive className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Response Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg Response
                  </p>
                  <p className="text-2xl font-bold text-gray-900">2.4h</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Inquiries List */}
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Inquiries
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {inquiry.subject}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            inquiry.status
                          )}`}
                        >
                          {inquiry.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            inquiry.priority
                          )}`}
                        >
                          {inquiry.priority}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 mb-3">
                        <span className="font-medium text-gray-900">
                          {inquiry.customerName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {inquiry.customerEmail}
                        </span>
                        <span className="text-sm text-gray-500">
                          {inquiry.date} at {inquiry.time}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {inquiry.message}
                      </p>

                      {inquiry.eventDate && (
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📅 Event: {inquiry.eventDate}</span>
                          <span>👥 Guests: {inquiry.guestCount}</span>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default InquiriesManager;
