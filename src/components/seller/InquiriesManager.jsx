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
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const InquiriesManager = ({ onBack }) => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

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
      customerEmail: "anjali.thapa@gmail.com",
      customerPhone: "+91 76543 21098",
      subject: "Birthday Party Catering",
      message:
        "My daughter's 16th birthday is coming up. We need catering for about 50 people. Do you have any special birthday packages?",
      date: "2024-06-23",
      time: "16:45",
      status: "new",
      priority: "low",
      eventDate: "2024-07-05",
      guestCount: 50,
    },
    {
      id: 4,
      customerName: "Deepak Rai",
      customerEmail: "deepak.rai@email.com",
      customerPhone: "+91 65432 10987",
      subject: "Home Delivery Service",
      message:
        "Do you provide regular home delivery services? I'm interested in weekly meal plans for a family of 4.",
      date: "2024-06-22",
      time: "12:20",
      status: "archived",
      priority: "medium",
      eventDate: null,
      guestCount: 4,
    },
    {
      id: 5,
      customerName: "Sunita Gurung",
      customerEmail: "sunita.gurung@email.com",
      customerPhone: "+91 54321 09876",
      subject: "Festival Catering Inquiry",
      message:
        "We're organizing a community festival and need catering services for 500+ people. Can you handle such a large event?",
      date: "2024-06-21",
      time: "09:30",
      status: "responded",
      priority: "high",
      eventDate: "2024-08-15",
      guestCount: 500,
    },
  ];

  const [response, setResponse] = useState("");

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Inquiries
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Inquiry Details
              </h1>
              <p className="text-gray-600 mt-1">Respond to customer inquiry</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Inquiry Details */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedInquiry.subject}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          selectedInquiry.status
                        )}`}
                      >
                        {selectedInquiry.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          selectedInquiry.priority
                        )}`}
                      >
                        {selectedInquiry.priority} priority
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{selectedInquiry.date}</p>
                    <p>{selectedInquiry.time}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Response Section */}
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
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
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
                  </div>
                </div>

                {/* Event Details */}
                {selectedInquiry.eventDate && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Event Details
                    </h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <p>Date: {selectedInquiry.eventDate}</p>
                      <p>Guests: {selectedInquiry.guestCount} people</p>
                      <p>Type: {selectedInquiry.subject}</p>
                    </div>
                  </div>
                )}

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
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Customer Inquiries
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and respond to customer inquiries
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Inquiries
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New</p>
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
  );
};

export default InquiriesManager;
