import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Settings,
  Monitor,
  FileText,
  Users,
  Activity,
  Save,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Lock,
  UserCheck,
  Shield,
  Eye,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Headphones,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useWebsiteConfig } from "../../context/WebsiteConfigContext";
import Card from "../common/Card";

const WebsiteControlCenter = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("homepage");
  const { websiteConfig, updatePageConfig, updatePageSection } =
    useWebsiteConfig();

  const tabs = [
    { id: "homepage", name: "Homepage", icon: Monitor },
    { id: "about", name: "About", icon: FileText },
    { id: "contact", name: "Contact", icon: Users },
    { id: "privacy", name: "Privacy Policy", icon: Shield },
    { id: "terms", name: "Terms of Service", icon: Settings },
    { id: "support", name: "Support", icon: Activity },
  ];

  // Homepage Management Component
  const renderHomepageManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Hero Section</p>
              <p className="text-2xl font-bold">Active</p>
            </div>
            <Globe className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Categories</p>
              <p className="text-2xl font-bold">
                {
                  websiteConfig.homepage.categoriesGrid.selectedCategories
                    .length
                }
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Hot Deals</p>
              <p className="text-2xl font-bold">
                {websiteConfig.homepage.hotDeals.products.length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Fresh Items</p>
              <p className="text-2xl font-bold">
                {websiteConfig.homepage.freshRecommendations.products.length}
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            🎯 Homepage Configuration
          </h3>
          <p className="text-gray-600">
            Manage your homepage content and layout
          </p>
        </div>
        <button
          onClick={() => alert("✅ Homepage changes saved successfully!")}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Hero Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Hero Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Title
            </label>
            <input
              type="text"
              value={websiteConfig.homepage.hero.title}
              onChange={(e) =>
                updatePageConfig("homepage", "hero", "title", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={websiteConfig.homepage.hero.subtitle}
              onChange={(e) =>
                updatePageConfig("homepage", "hero", "subtitle", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Placeholder
            </label>
            <input
              type="text"
              value={websiteConfig.homepage.hero.searchPlaceholder}
              onChange={(e) =>
                updatePageConfig(
                  "homepage",
                  "hero",
                  "searchPlaceholder",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Service Slider Management */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-yellow-600" />
          Service Slider
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sliderEnabled"
              checked={websiteConfig.homepage.serviceSlider.enabled}
              onChange={(e) =>
                updatePageConfig(
                  "homepage",
                  "serviceSlider",
                  "enabled",
                  e.target.checked
                )
              }
              className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            />
            <label htmlFor="sliderEnabled" className="text-sm text-gray-700">
              Enable Service Slider
            </label>
          </div>

          {websiteConfig.homepage.serviceSlider.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slider Title
                </label>
                <input
                  type="text"
                  value={websiteConfig.homepage.serviceSlider.title}
                  onChange={(e) =>
                    updatePageConfig(
                      "homepage",
                      "serviceSlider",
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={websiteConfig.homepage.serviceSlider.description}
                  onChange={(e) =>
                    updatePageConfig(
                      "homepage",
                      "serviceSlider",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  // About Page Management Component
  const renderAboutManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Hero Section</p>
              <p className="text-2xl font-bold">Active</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Team Members</p>
              <p className="text-2xl font-bold">
                {websiteConfig.about.team.length}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Core Values</p>
              <p className="text-2xl font-bold">
                {websiteConfig.about.coreValues.length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Statistics</p>
              <p className="text-2xl font-bold">
                {websiteConfig.about.stats.length}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            🎯 About Page Management
          </h3>
          <p className="text-gray-600">
            Configure your about page content and company information
          </p>
        </div>
        <button
          onClick={() => alert("✅ About page changes saved successfully!")}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Hero Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Hero Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={websiteConfig.about.hero.title}
              onChange={(e) =>
                updatePageConfig("about", "hero", "title", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={websiteConfig.about.hero.subtitle}
              onChange={(e) =>
                updatePageConfig("about", "hero", "subtitle", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={websiteConfig.about.hero.description}
              onChange={(e) =>
                updatePageConfig("about", "hero", "description", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Mission & Vision */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-green-600" />
          Mission & Vision
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Title
              </label>
              <input
                type="text"
                value={websiteConfig.about.mission.title}
                onChange={(e) =>
                  updatePageConfig("about", "mission", "title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Description
              </label>
              <textarea
                rows={4}
                value={websiteConfig.about.mission.description}
                onChange={(e) =>
                  updatePageConfig(
                    "about",
                    "mission",
                    "description",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision Title
              </label>
              <input
                type="text"
                value={websiteConfig.about.vision.title}
                onChange={(e) =>
                  updatePageConfig("about", "vision", "title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision Description
              </label>
              <textarea
                rows={4}
                value={websiteConfig.about.vision.description}
                onChange={(e) =>
                  updatePageConfig(
                    "about",
                    "vision",
                    "description",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  // Contact Page Management Component
  const renderContactManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Contact Methods</p>
              <p className="text-2xl font-bold">
                {websiteConfig.contact.contactInfo.length}
              </p>
            </div>
            <Phone className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Support Categories</p>
              <p className="text-2xl font-bold">
                {websiteConfig.contact.supportCategories.length}
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Business Days</p>
              <p className="text-2xl font-bold">
                {websiteConfig.contact.businessHours.schedule.length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Office Location</p>
              <p className="text-2xl font-bold">Active</p>
            </div>
            <MapPin className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            📞 Contact Page Management
          </h3>
          <p className="text-gray-600">
            Configure contact information and support options
          </p>
        </div>
        <button
          onClick={() => alert("✅ Contact page changes saved successfully!")}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Contact Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-blue-600" />
          Contact Information
        </h3>
        <div className="space-y-6">
          {websiteConfig.contact.contactInfo.map((contact, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={contact.title}
                    onChange={(e) => {
                      const newContactInfo = [
                        ...websiteConfig.contact.contactInfo,
                      ];
                      newContactInfo[index] = {
                        ...contact,
                        title: e.target.value,
                      };
                      updatePageSection(
                        "contact",
                        "contactInfo",
                        newContactInfo
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={contact.value}
                    onChange={(e) => {
                      const newContactInfo = [
                        ...websiteConfig.contact.contactInfo,
                      ];
                      newContactInfo[index] = {
                        ...contact,
                        value: e.target.value,
                      };
                      updatePageSection(
                        "contact",
                        "contactInfo",
                        newContactInfo
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={contact.description}
                    onChange={(e) => {
                      const newContactInfo = [
                        ...websiteConfig.contact.contactInfo,
                      ];
                      newContactInfo[index] = {
                        ...contact,
                        description: e.target.value,
                      };
                      updatePageSection(
                        "contact",
                        "contactInfo",
                        newContactInfo
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // Privacy Policy Management Component
  const renderPrivacyManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Policy Sections</p>
              <p className="text-2xl font-bold">
                {websiteConfig.privacy.sections.length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Last Updated</p>
              <p className="text-lg font-bold">Jan 2024</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Data Security</p>
              <p className="text-2xl font-bold">Active</p>
            </div>
            <Lock className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">User Rights</p>
              <p className="text-2xl font-bold">Protected</p>
            </div>
            <UserCheck className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            🛡️ Privacy Policy Management
          </h3>
          <p className="text-gray-600">
            Configure privacy policy content and data protection information
          </p>
        </div>
        <button
          onClick={() => alert("✅ Privacy policy changes saved successfully!")}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Hero Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Privacy Policy Header
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={websiteConfig.privacy.hero.title}
              onChange={(e) =>
                updatePageConfig("privacy", "hero", "title", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={websiteConfig.privacy.hero.subtitle}
              onChange={(e) =>
                updatePageConfig("privacy", "hero", "subtitle", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Updated
            </label>
            <input
              type="text"
              value={websiteConfig.privacy.hero.lastUpdated}
              onChange={(e) =>
                updatePageConfig(
                  "privacy",
                  "hero",
                  "lastUpdated",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Privacy Sections */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-600" />
          Policy Sections
          <span className="ml-auto text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {websiteConfig.privacy.sections.length} sections
          </span>
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {websiteConfig.privacy.sections.map((section, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    const newSections = [...websiteConfig.privacy.sections];
                    newSections[index] = { ...section, title: e.target.value };
                    updatePageSection("privacy", "sections", newSections);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 font-medium"
                  placeholder="Section Title"
                />
                <div className="text-sm text-gray-600">
                  {section.content.length} content items
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // Terms of Service Management Component
  const renderTermsManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Terms Sections</p>
              <p className="text-2xl font-bold">
                {websiteConfig.terms.sections.length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Last Updated</p>
              <p className="text-lg font-bold">Jan 2024</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">User Agreement</p>
              <p className="text-2xl font-bold">Active</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Compliance</p>
              <p className="text-2xl font-bold">Legal</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            📋 Terms of Service Management
          </h3>
          <p className="text-gray-600">
            Configure terms of service and legal agreements
          </p>
        </div>
        <button
          onClick={() =>
            alert("✅ Terms of Service changes saved successfully!")
          }
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Terms Header */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Terms of Service Header
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={websiteConfig.terms.hero.title}
              onChange={(e) =>
                updatePageConfig("terms", "hero", "title", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={websiteConfig.terms.hero.subtitle}
              onChange={(e) =>
                updatePageConfig("terms", "hero", "subtitle", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Updated
            </label>
            <input
              type="text"
              value={websiteConfig.terms.hero.lastUpdated}
              onChange={(e) =>
                updatePageConfig("terms", "hero", "lastUpdated", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Terms Sections */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-600" />
          Terms Sections
          <span className="ml-auto text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {websiteConfig.terms.sections.length} sections
          </span>
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {websiteConfig.terms.sections.map((section, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    const newSections = [...websiteConfig.terms.sections];
                    newSections[index] = { ...section, title: e.target.value };
                    updatePageSection("terms", "sections", newSections);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 font-medium"
                  placeholder="Section Title"
                />
                <div className="text-sm text-gray-600">
                  {section.content.length} content items
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // Support Page Management Component
  const renderSupportManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Support Categories</p>
              <p className="text-2xl font-bold">
                {websiteConfig.support.categories.length}
              </p>
            </div>
            <Headphones className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Contact Methods</p>
              <p className="text-2xl font-bold">
                {websiteConfig.support.contactMethods.length}
              </p>
            </div>
            <Phone className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">FAQ Items</p>
              <p className="text-2xl font-bold">
                {websiteConfig.support.faq.length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Resources</p>
              <p className="text-2xl font-bold">
                {websiteConfig.support.resources.length}
              </p>
            </div>
            <ExternalLink className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            🎧 Support Center Management
          </h3>
          <p className="text-gray-600">
            Configure support options and help resources
          </p>
        </div>
        <button
          onClick={() => alert("✅ Support center changes saved successfully!")}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Support Categories */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-blue-600" />
          Support Categories
          <span className="ml-auto text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {websiteConfig.support.categories.length} categories
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {websiteConfig.support.categories.map((category, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <input
                  type="text"
                  value={category.title}
                  onChange={(e) => {
                    const newCategories = [...websiteConfig.support.categories];
                    newCategories[index] = {
                      ...category,
                      title: e.target.value,
                    };
                    updatePageSection("support", "categories", newCategories);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-medium"
                  placeholder="Category Title"
                />
                <textarea
                  rows={2}
                  value={category.description}
                  onChange={(e) => {
                    const newCategories = [...websiteConfig.support.categories];
                    newCategories[index] = {
                      ...category,
                      description: e.target.value,
                    };
                    updatePageSection("support", "categories", newCategories);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Category Description"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Contact Methods */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-600" />
          Contact Methods
        </h3>
        <div className="space-y-4">
          {websiteConfig.support.contactMethods.map((method, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={method.title}
                    onChange={(e) => {
                      const newMethods = [
                        ...websiteConfig.support.contactMethods,
                      ];
                      newMethods[index] = { ...method, title: e.target.value };
                      updatePageSection(
                        "support",
                        "contactMethods",
                        newMethods
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={method.value}
                    onChange={(e) => {
                      const newMethods = [
                        ...websiteConfig.support.contactMethods,
                      ];
                      newMethods[index] = { ...method, value: e.target.value };
                      updatePageSection(
                        "support",
                        "contactMethods",
                        newMethods
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <input
                    type="text"
                    value={method.availability}
                    onChange={(e) => {
                      const newMethods = [
                        ...websiteConfig.support.contactMethods,
                      ];
                      newMethods[index] = {
                        ...method,
                        availability: e.target.value,
                      };
                      updatePageSection(
                        "support",
                        "contactMethods",
                        newMethods
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // Tab Content Renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case "homepage":
        return renderHomepageManagement();
      case "about":
        return renderAboutManagement();
      case "contact":
        return renderContactManagement();
      case "privacy":
        return renderPrivacyManagement();
      case "terms":
        return renderTermsManagement();
      case "support":
        return renderSupportManagement();
      default:
        return renderHomepageManagement();
    }
  };

  return (
    <>
      <Helmet>
        <title>Website Control Center - Admin Panel</title>
      </Helmet>

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-600" />
              Website Control Center
            </h1>
            <p className="text-gray-600">
              Manage and monitor your website's performance, settings, and
              content
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WebsiteControlCenter;
