import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Upload,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const BusinessProfileEditor = ({ onBack }) => {
  const [businessData, setBusinessData] = useState({
    businessName: "Himalayan Delights Catering",
    category: "Food & Catering",
    description:
      "Professional catering services for all occasions. We specialize in traditional Himalayan cuisine and modern fusion dishes.",
    address: "MG Road, Near Mall, Gangtok, Sikkim 737101",
    phone: "+91 98765 43210",
    email: "info@himalayandelights.com",
    website: "www.himalayandelights.com",
    businessHours: {
      monday: { open: "09:00", close: "21:00", closed: false },
      tuesday: { open: "09:00", close: "21:00", closed: false },
      wednesday: { open: "09:00", close: "21:00", closed: false },
      thursday: { open: "09:00", close: "21:00", closed: false },
      friday: { open: "09:00", close: "22:00", closed: false },
      saturday: { open: "09:00", close: "22:00", closed: false },
      sunday: { open: "10:00", close: "20:00", closed: false },
    },
    services: [
      "Wedding Catering",
      "Corporate Events",
      "Private Parties",
      "Home Delivery",
    ],
    specialties: [
      "Momo",
      "Thukpa",
      "Gundruk",
      "Sel Roti",
      "Traditional Sweets",
    ],
  });

  const [activeTab, setActiveTab] = useState("basic");

  const handleInputChange = (field, value) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setBusinessData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving business data:", businessData);
    // In real app, this would make API call
    alert("Business profile updated successfully!");
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "contact", label: "Contact & Location" },
    { id: "hours", label: "Business Hours" },
    { id: "services", label: "Services & Specialties" },
    { id: "photos", label: "Photos & Media" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Business Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Update your business information and settings
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="mb-6">
          <Button
            onClick={handleSave}
            variant="primary"
            icon={Save}
            className="ml-auto"
          >
            Save Changes
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Business Name"
                  value={businessData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  placeholder="Enter business name"
                />
                <Input
                  label="Category"
                  value={businessData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  placeholder="Select category"
                />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={businessData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe your business..."
                />
              </div>
            </Card>
          )}

          {/* Contact & Location Tab */}
          {activeTab === "contact" && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Contact & Location
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={businessData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <Input
                      label="Phone Number"
                      value={businessData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <Input
                      label="Email Address"
                      type="email"
                      value={businessData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="business@example.com"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <Input
                    label="Website URL (Optional)"
                    value={businessData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="www.yourbusiness.com"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Business Hours Tab */}
          {activeTab === "hours" && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Business Hours
              </h3>
              <div className="space-y-4">
                {Object.entries(businessData.businessHours).map(
                  ([day, hours]) => (
                    <div
                      key={day}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-24 capitalize font-medium text-gray-700">
                        {day}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={!hours.closed}
                          onChange={(e) =>
                            handleHoursChange(day, "closed", !e.target.checked)
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">Open</span>
                      </div>
                      {!hours.closed && (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) =>
                              handleHoursChange(day, "open", e.target.value)
                            }
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) =>
                              handleHoursChange(day, "close", e.target.value)
                            }
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </>
                      )}
                      {hours.closed && (
                        <span className="text-gray-500 text-sm">Closed</span>
                      )}
                    </div>
                  )
                )}
              </div>
            </Card>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Services & Specialties
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Services Offered
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {businessData.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                      >
                        <span className="text-sm text-blue-800">{service}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
                      + Add Service
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialties
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {businessData.specialties.map((specialty, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                      >
                        <span className="text-sm text-green-800">
                          {specialty}
                        </span>
                        <button className="text-green-600 hover:text-green-800 text-xs">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-300 hover:text-green-600 transition-colors">
                      + Add Specialty
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Photos Tab */}
          {activeTab === "photos" && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Photos & Media
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Business Photos
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Existing Photos */}
                    {[1, 2, 3, 4, 5].map((photo) => (
                      <div
                        key={photo}
                        className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            Photo {photo}
                          </span>
                        </div>
                        <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                          ×
                        </button>
                      </div>
                    ))}

                    {/* Upload New Photo */}
                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Photo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Photo Guidelines
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Upload high-quality images (min. 800x600px)</li>
                    <li>• Include photos of your products/services</li>
                    <li>• Show your business location and ambiance</li>
                    <li>• Maximum 20 photos allowed</li>
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileEditor;
