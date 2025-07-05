import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Settings,
  Monitor,
  Database,
  Shield,
  Bell,
  Palette,
  FileText,
  Code,
  BarChart3,
  Users,
  Activity,
  Edit3,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  ChevronDown,
  Image as ImageIcon,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Lock,
  UserCheck,
  Share2,
  Eye,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Headphones,
  ExternalLink,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useWebsiteConfig } from "../../context/WebsiteConfigContext";
import Card from "../common/Card";
import Button from "../common/Button";

const WebsiteControlCenter = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("homepage");
  const { websiteConfig, updatePageConfig, updatePageSection } = useWebsiteConfig();

  // For backward compatibility, map context data to homepageData
  const homepageData = websiteConfig.homepage;
  const handleHomepageDataChange = (section, field, value) => {
    updatePageConfig('homepage', section, field, value);
  };

  const tabs = [
    { id: "homepage", name: "Homepage", icon: Monitor },
    { id: "about", name: "About", icon: FileText },
    { id: "contact", name: "Contact", icon: Users },
    { id: "privacy", name: "Privacy Policy", icon: Shield },
    { id: "terms", name: "Terms of Service", icon: Settings },
    { id: "support", name: "Support", icon: Activity },
  ];

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
              <p className="text-2xl font-bold">{websiteConfig.about.team.length}</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Core Values</p>
              <p className="text-2xl font-bold">{websiteConfig.about.coreValues.length}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Statistics</p>
              <p className="text-2xl font-bold">{websiteConfig.about.stats.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">🎯 About Page Management</h3>
          <p className="text-gray-600">Configure your about page content and company information</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={websiteConfig.about.hero.title}
              onChange={(e) => updatePageConfig('about', 'hero', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={websiteConfig.about.hero.subtitle}
              onChange={(e) => updatePageConfig('about', 'hero', 'subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              value={websiteConfig.about.hero.description}
              onChange={(e) => updatePageConfig('about', 'hero', 'description', e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Mission Title</label>
              <input
                type="text"
                value={websiteConfig.about.mission.title}
                onChange={(e) => updatePageConfig('about', 'mission', 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mission Description</label>
              <textarea
                rows={4}
                value={websiteConfig.about.mission.description}
                onChange={(e) => updatePageConfig('about', 'mission', 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vision Title</label>
              <input
                type="text"
                value={websiteConfig.about.vision.title}
                onChange={(e) => updatePageConfig('about', 'vision', 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vision Description</label>
              <textarea
                rows={4}
                value={websiteConfig.about.vision.description}
                onChange={(e) => updatePageConfig('about', 'vision', 'description', e.target.value)}
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
              <p className="text-2xl font-bold">{websiteConfig.contact.contactInfo.length}</p>
            </div>
            <Phone className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Support Categories</p>
              <p className="text-2xl font-bold">{websiteConfig.contact.supportCategories.length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Business Days</p>
              <p className="text-2xl font-bold">{websiteConfig.contact.businessHours.schedule.length}</p>
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
          <h3 className="text-lg font-semibold text-gray-900">📞 Contact Page Management</h3>
          <p className="text-gray-600">Configure contact information and support options</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={contact.title}
                    onChange={(e) => {
                      const newContactInfo = [...websiteConfig.contact.contactInfo];
                      newContactInfo[index] = { ...contact, title: e.target.value };
                      updatePageSection('contact', 'contactInfo', newContactInfo);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="text"
                    value={contact.value}
                    onChange={(e) => {
                      const newContactInfo = [...websiteConfig.contact.contactInfo];
                      newContactInfo[index] = { ...contact, value: e.target.value };
                      updatePageSection('contact', 'contactInfo', newContactInfo);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={contact.description}
                    onChange={(e) => {
                      const newContactInfo = [...websiteConfig.contact.contactInfo];
                      newContactInfo[index] = { ...contact, description: e.target.value };
                      updatePageSection('contact', 'contactInfo', newContactInfo);
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
              <p className="text-2xl font-bold">{websiteConfig.privacy.sections.length}</p>
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
          <h3 className="text-lg font-semibold text-gray-900">🛡️ Privacy Policy Management</h3>
          <p className="text-gray-600">Configure privacy policy content and data protection information</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={websiteConfig.privacy.hero.title}
              onChange={(e) => updatePageConfig('privacy', 'hero', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
            <input
              type="text"
              value={websiteConfig.privacy.hero.lastUpdated}
              onChange={(e) => updatePageConfig('privacy', 'hero', 'lastUpdated', e.target.value)}
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
                    updatePageSection('privacy', 'sections', newSections);
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
              <p className="text-2xl font-bold">{websiteConfig.terms.sections.length}</p>
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
          <h3 className="text-lg font-semibold text-gray-900">📋 Terms of Service Management</h3>
          <p className="text-gray-600">Configure terms of service and legal agreements</p>
        </div>
        <button
          onClick={() => alert("✅ Terms of Service changes saved successfully!")}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={websiteConfig.terms.hero.title}
              onChange={(e) => updatePageConfig('terms', 'hero', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
            <input
              type="text"
              value={websiteConfig.terms.hero.lastUpdated}
              onChange={(e) => updatePageConfig('terms', 'hero', 'lastUpdated', e.target.value)}
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
                    updatePageSection('terms', 'sections', newSections);
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
              <p className="text-2xl font-bold">{websiteConfig.support.categories.length}</p>
            </div>
            <Headphones className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Contact Methods</p>
              <p className="text-2xl font-bold">{websiteConfig.support.contactMethods.length}</p>
            </div>
            <Phone className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">FAQ Items</p>
              <p className="text-2xl font-bold">{websiteConfig.support.faq.length}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Resources</p>
              <p className="text-2xl font-bold">{websiteConfig.support.resources.length}</p>
            </div>
            <ExternalLink className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">🎧 Support Center Management</h3>
          <p className="text-gray-600">Configure support options and help resources</p>
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
                    newCategories[index] = { ...category, title: e.target.value };
                    updatePageSection('support', 'categories', newCategories);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-medium"
                  placeholder="Category Title"
                />
                <textarea
                  rows={2}
                  value={category.description}
                  onChange={(e) => {
                    const newCategories = [...websiteConfig.support.categories];
                    newCategories[index] = { ...category, description: e.target.value };
                    updatePageSection('support', 'categories', newCategories);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={method.title}
                    onChange={(e) => {
                      const newMethods = [...websiteConfig.support.contactMethods];
                      newMethods[index] = { ...method, title: e.target.value };
                      updatePageSection('support', 'contactMethods', newMethods);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="text"
                    value={method.value}
                    onChange={(e) => {
                      const newMethods = [...websiteConfig.support.contactMethods];
                      newMethods[index] = { ...method, value: e.target.value };
                      updatePageSection('support', 'contactMethods', newMethods);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <input
                    type="text"
                    value={method.availability}
                    onChange={(e) => {
                      const newMethods = [...websiteConfig.support.contactMethods];
                      newMethods[index] = { ...method, availability: e.target.value };
                      updatePageSection('support', 'contactMethods', newMethods);
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

  // Available categories for dropdowns
  const availableCategories = [
    { id: "all", name: "All Categories" },
    { id: "services", name: "Services" },
    { id: "food", name: "Food & Restaurant" },
    { id: "vehicles", name: "Vehicles" },
    { id: "property", name: "Property" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion & Beauty" },
    { id: "health", name: "Health & Medical" },
    { id: "education", name: "Education" },
    { id: "sports", name: "Sports & Fitness" },
  ];

  // Professional demo products for selection
  const sampleProducts = [
    {
      id: 1,
      title: "iPhone 15 Pro Max 256GB",
      category: "electronics",
      price: "₹1,34,900",
      originalPrice: "₹1,49,900",
      location: "Apple Store, MG Road",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      rating: 4.8,
      reviews: 156,
      seller: "iWorld Gangtok",
      discount: "10% OFF",
    },
    {
      id: 2,
      title: "Samsung Galaxy S24 Ultra",
      category: "electronics",
      price: "₹1,24,999",
      originalPrice: "₹1,34,999",
      location: "Samsung Store, Lal Bazaar",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      rating: 4.7,
      reviews: 89,
      seller: "Galaxy Electronics",
      discount: "7% OFF",
    },
    {
      id: 3,
      title: "Royal Enfield Himalayan 450",
      category: "vehicles",
      price: "₹2,85,000",
      originalPrice: "₹2,90,000",
      location: "RE Showroom, Tadong",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      rating: 4.6,
      reviews: 34,
      seller: "Royal Motors Sikkim",
      discount: "Special Price",
    },
    {
      id: 4,
      title: "Maruti Swift VXI 2024",
      category: "vehicles",
      price: "₹7,85,000",
      originalPrice: "₹8,20,000",
      location: "Maruti Showroom, Ranipool",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
      rating: 4.5,
      reviews: 67,
      seller: "Sikkim Motors",
      discount: "Festival Offer",
    },
    {
      id: 5,
      title: "Luxury 3BHK Apartment",
      category: "property",
      price: "₹25,000/month",
      originalPrice: "₹28,000/month",
      location: "Development Area, Near SNT",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      rating: 4.9,
      reviews: 23,
      seller: "Premium Properties",
      discount: "First Month 50% OFF",
    },
    {
      id: 6,
      title: "Professional Electrician Service",
      category: "services",
      price: "₹600/hour",
      originalPrice: "₹800/hour",
      location: "Available in MG Road Area",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
      rating: 4.8,
      reviews: 145,
      seller: "TechFix Solutions",
      discount: "25% OFF First Service",
    },
    {
      id: 7,
      title: "24/7 Plumbing Service",
      category: "services",
      price: "₹500/hour",
      originalPrice: "₹650/hour",
      location: "All Gangtok Areas",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
      rating: 4.7,
      reviews: 98,
      seller: "AquaFix Professionals",
      discount: "Emergency Discount",
    },
    {
      id: 8,
      title: "Premium Winter Jacket",
      category: "fashion",
      price: "₹3,499",
      originalPrice: "₹4,999",
      location: "Fashion Hub, MG Road",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      rating: 4.4,
      reviews: 76,
      seller: "Style Studio",
      discount: "30% OFF",
    },
    {
      id: 9,
      title: "Designer Kurti Collection",
      category: "fashion",
      price: "₹1,899",
      originalPrice: "₹2,499",
      location: "Women's Corner, Lal Bazaar",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      rating: 4.6,
      reviews: 54,
      seller: "Ethnic Wardrobe",
      discount: "24% OFF",
    },
    {
      id: 10,
      title: "Authentic Momo Restaurant",
      category: "food",
      price: "₹180/plate",
      originalPrice: "₹220/plate",
      location: "Traditional Kitchen, MG Road",
      image:
        "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400",
      rating: 4.9,
      reviews: 267,
      seller: "Himalayan Delights",
      discount: "Happy Hours 20% OFF",
    },
    {
      id: 11,
      title: "Hot Thukpa & Soup Corner",
      category: "food",
      price: "₹150/bowl",
      originalPrice: "₹180/bowl",
      location: "Cozy Cafe, Lal Bazaar",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
      rating: 4.7,
      reviews: 189,
      seller: "Mountain View Cafe",
      discount: "Combo Offer",
    },
    {
      id: 12,
      title: "General Health Checkup",
      category: "health",
      price: "₹1,200",
      originalPrice: "₹1,500",
      location: "Prime Hospital, Development Area",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      rating: 4.8,
      reviews: 112,
      seller: "HealthCare Plus",
      discount: "Preventive Care Package",
    },
    {
      id: 13,
      title: "Yoga & Fitness Classes",
      category: "sports",
      price: "₹1,500/month",
      originalPrice: "₹2,000/month",
      location: "Wellness Center, Tibet Road",
      image:
        "https://images.unsplash.com/photo-1506629905607-86e2d9dbd8a8?w=400",
      rating: 4.9,
      reviews: 78,
      seller: "ZenFit Studio",
      discount: "First Month Free Trial",
    },
    {
      id: 14,
      title: "Advanced Computer Course",
      category: "education",
      price: "₹8,000",
      originalPrice: "₹12,000",
      location: "Tech Institute, MG Road",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400",
      rating: 4.6,
      reviews: 91,
      seller: "Digital Academy",
      discount: "Limited Time 33% OFF",
    },
    {
      id: 15,
      title: "MacBook Pro Repair Service",
      category: "electronics",
      price: "₹2,500",
      originalPrice: "₹3,500",
      location: "Apple Care Center, MG Road",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.8,
      reviews: 67,
      seller: "MacRepair Specialists",
      discount: "Certified Technicians",
    },
    {
      id: 16,
      title: "Gaming Laptop - RTX 4060",
      category: "electronics",
      price: "₹89,999",
      originalPrice: "₹99,999",
      location: "Gaming Hub, Lal Bazaar",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
      rating: 4.7,
      reviews: 43,
      seller: "GameZone Electronics",
      discount: "Gamer's Special",
    },
    {
      id: 17,
      title: "Organic Vegetables Farm",
      category: "food",
      price: "₹400/kg",
      originalPrice: "₹500/kg",
      location: "Fresh Market, Development Area",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
      rating: 4.9,
      reviews: 134,
      seller: "Green Valley Farms",
      discount: "Farm Fresh 20% OFF",
    },
    {
      id: 18,
      title: "Home Cleaning Service",
      category: "services",
      price: "₹800/visit",
      originalPrice: "₹1,000/visit",
      location: "Residential Areas",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      rating: 4.6,
      reviews: 87,
      seller: "CleanPro Services",
      discount: "Weekly Package Deal",
    },
  ];

  const handleSaveHomepage = () => {
    console.log("Homepage configuration saved to context:", homepageData);
    // Changes are automatically persisted through context
    alert(
      "✅ Homepage configuration saved successfully! Changes are now live on the homepage."
    );
  };

  const tabs = [
    { id: "homepage", name: "Homepage", icon: Monitor },
    { id: "about", name: "About", icon: FileText },
    { id: "contact", name: "Contact", icon: Users },
    { id: "privacy", name: "Privacy Policy", icon: Shield },
    { id: "terms", name: "Terms of Service", icon: Settings },
    { id: "support", name: "Support", icon: Activity },
  ];

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
            <Edit3 className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Hot Deals</p>
              <p className="text-2xl font-bold">
                {homepageData.hotDeals.products.length}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Fresh Items</p>
              <p className="text-2xl font-bold">
                {homepageData.freshRecommendations.products.length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Categories</p>
              <p className="text-2xl font-bold">
                {homepageData.categoriesGrid.selectedCategories.length}
              </p>
            </div>
            <Database className="w-8 h-8 text-green-200" />
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
            Manage your homepage content and product recommendations
          </p>
        </div>
        <button
          onClick={handleSaveHomepage}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save All Changes
          <span className="ml-2 px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs">
            Ctrl+S
          </span>
        </button>
      </div>

      {/* Hero Section Management */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-blue-600" />
          Hero Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={homepageData.hero.title}
              onChange={(e) =>
                handleHomepageDataChange("hero", "title", e.target.value)
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
              value={homepageData.hero.subtitle}
              onChange={(e) =>
                handleHomepageDataChange("hero", "subtitle", e.target.value)
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
              value={homepageData.hero.description}
              onChange={(e) =>
                handleHomepageDataChange("hero", "description", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Categories Grid Management */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" />
          Categories Grid
          <span className="ml-auto text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {homepageData.categoriesGrid.selectedCategories.length} selected
          </span>
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={homepageData.categoriesGrid.title}
                onChange={(e) =>
                  handleHomepageDataChange(
                    "categoriesGrid",
                    "title",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Style
              </label>
              <select
                value={
                  homepageData.categoriesGrid.showViewAllButton
                    ? "with-button"
                    : "without-button"
                }
                onChange={(e) =>
                  handleHomepageDataChange(
                    "categoriesGrid",
                    "showViewAllButton",
                    e.target.value === "with-button"
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="with-button">With "View All" Button</option>
                <option value="without-button">Categories Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={homepageData.categoriesGrid.description}
              onChange={(e) =>
                handleHomepageDataChange(
                  "categoriesGrid",
                  "description",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Category Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-gray-900">
                📂 Select Categories for Homepage
              </label>
              <div className="text-sm text-gray-500">
                {homepageData.categoriesGrid.selectedCategories.length} of{" "}
                {availableCategories.filter((cat) => cat.id !== "all").length}{" "}
                categories selected
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {availableCategories
                  .filter((cat) => cat.id !== "all")
                  .map((category) => {
                    const isSelected =
                      homepageData.categoriesGrid.selectedCategories.includes(
                        category.id
                      );
                    const categoryIcons = {
                      services: "🔧",
                      food: "🍜",
                      vehicles: "🚗",
                      property: "🏠",
                      electronics: "📱",
                      fashion: "👕",
                      health: "🏥",
                      education: "📚",
                      sports: "⚽",
                    };

                    return (
                      <div
                        key={category.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-green-50 border-l-4 border-green-400"
                            : ""
                        }`}
                        onClick={() => {
                          const currentCategories =
                            homepageData.categoriesGrid.selectedCategories;
                          if (isSelected) {
                            // Remove category
                            const newCategories = currentCategories.filter(
                              (id) => id !== category.id
                            );
                            handleHomepageDataChange(
                              "categoriesGrid",
                              "selectedCategories",
                              newCategories
                            );
                          } else {
                            // Add category
                            const newCategories = [
                              ...currentCategories,
                              category.id,
                            ];
                            handleHomepageDataChange(
                              "categoriesGrid",
                              "selectedCategories",
                              newCategories
                            );
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            checked={isSelected}
                            onChange={() => {}} // Handled by parent div onClick
                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">
                                {categoryIcons[category.id] || "📦"}
                              </span>
                              <h4 className="font-semibold text-gray-900 text-sm">
                                {category.name}
                              </h4>
                            </div>
                            <p className="text-xs text-gray-500">
                              {category.id === "services" &&
                                "Professional services & repairs"}
                              {category.id === "food" &&
                                "Restaurants, cafes & food delivery"}
                              {category.id === "vehicles" &&
                                "Cars, bikes & transportation"}
                              {category.id === "property" &&
                                "Buy, sell & rent properties"}
                              {category.id === "electronics" &&
                                "Gadgets, phones & computers"}
                              {category.id === "fashion" &&
                                "Clothing, accessories & beauty"}
                              {category.id === "health" &&
                                "Medical services & wellness"}
                              {category.id === "education" &&
                                "Courses, training & tutoring"}
                              {category.id === "sports" &&
                                "Fitness, sports & recreation"}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Select categories that best represent
                your business offerings. Popular categories get more user
                engagement.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
            <button
              onClick={() => {
                const allCategoryIds = availableCategories
                  .filter((cat) => cat.id !== "all")
                  .map((cat) => cat.id);
                handleHomepageDataChange(
                  "categoriesGrid",
                  "selectedCategories",
                  allCategoryIds
                );
                alert(
                  "✅ All categories selected! Maximum variety for your users."
                );
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Select All Categories
              <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                {availableCategories.filter((cat) => cat.id !== "all").length}
              </span>
            </button>

            <button
              onClick={() => {
                handleHomepageDataChange(
                  "categoriesGrid",
                  "selectedCategories",
                  []
                );
                alert("🗑️ All categories cleared from grid.");
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>

            <button
              onClick={() => {
                const popularCategories = [
                  "services",
                  "food",
                  "electronics",
                  "vehicles",
                  "property",
                ];
                handleHomepageDataChange(
                  "categoriesGrid",
                  "selectedCategories",
                  popularCategories
                );
                alert(
                  "🎯 Popular categories selected! These are the most engaging categories."
                );
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <BarChart3 className="w-4 h-4" />
              Select Popular
              <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                5
              </span>
            </button>
          </div>

          {/* Categories Preview */}
          {homepageData.categoriesGrid.selectedCategories.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  📂 Categories Grid Preview (
                  {homepageData.categoriesGrid.selectedCategories.length}{" "}
                  categories)
                </h4>
                <span className="text-sm text-gray-500">
                  How it will appear on homepage
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {homepageData.categoriesGrid.selectedCategories.map(
                    (categoryId) => {
                      const category = availableCategories.find(
                        (cat) => cat.id === categoryId
                      );
                      const categoryIcons = {
                        services: "🔧",
                        food: "🍜",
                        vehicles: "🚗",
                        property: "🏠",
                        electronics: "📱",
                        fashion: "👕",
                        health: "🏥",
                        education: "📚",
                        sports: "⚽",
                      };

                      return (
                        <div
                          key={categoryId}
                          className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">
                              {categoryIcons[categoryId] || "📦"}
                            </div>
                            <h5 className="font-semibold text-sm text-gray-900 line-clamp-2">
                              {category?.name || categoryId}
                            </h5>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                {homepageData.categoriesGrid.showViewAllButton && (
                  <div className="mt-4 text-center">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View All Categories
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  📊 <strong>Preview:</strong> This is how your Categories Grid
                  will appear to customers on the homepage.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Hot Deals Management */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-red-600" />
          Hot Deals Section
          <span className="ml-auto text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
            {homepageData.hotDeals.products.length} selected
          </span>
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={homepageData.hotDeals.title}
                onChange={(e) =>
                  handleHomepageDataChange("hotDeals", "title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Items to Show
              </label>
              <input
                type="number"
                min="4"
                max="20"
                value={homepageData.hotDeals.maxItems}
                onChange={(e) =>
                  handleHomepageDataChange(
                    "hotDeals",
                    "maxItems",
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={homepageData.hotDeals.description}
              onChange={(e) =>
                handleHomepageDataChange(
                  "hotDeals",
                  "description",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Product Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-gray-900">
                🔥 Select Products for Hot Deals
              </label>
              <div className="text-sm text-gray-500">
                {homepageData.hotDeals.products.length} of{" "}
                {sampleProducts.length} products selected
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 min-w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="services">Services</option>
                  <option value="food">Food & Restaurant</option>
                  <option value="fashion">Fashion</option>
                  <option value="property">Property</option>
                </select>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  Filter
                </button>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                  {sampleProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        homepageData.hotDeals.products.some(
                          (p) => p.id === product.id
                        )
                          ? "bg-red-50 border-l-4 border-red-400"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          id={`hotdeal-${product.id}`}
                          checked={homepageData.hotDeals.products.some(
                            (p) => p.id === product.id
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (
                                !homepageData.hotDeals.products.some(
                                  (p) => p.id === product.id
                                )
                              ) {
                                const newProducts = [
                                  ...homepageData.hotDeals.products,
                                  product,
                                ];
                                handleHomepageDataChange(
                                  "hotDeals",
                                  "products",
                                  newProducts
                                );
                              }
                            } else {
                              const newProducts =
                                homepageData.hotDeals.products.filter(
                                  (p) => p.id !== product.id
                                );
                              handleHomepageDataChange(
                                "hotDeals",
                                "products",
                                newProducts
                              );
                            }
                          }}
                          className="mt-1.5 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />

                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=${product.category
                                .charAt(0)
                                .toUpperCase()}`;
                            }}
                          />
                        </div>

                        <label
                          htmlFor={`hotdeal-${product.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-base mb-1">
                                {product.title}
                              </h4>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                  {product.category}
                                </span>
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-400">★</span>
                                  <span className="text-sm text-gray-600">
                                    {product.rating}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({product.reviews})
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                {product.seller}
                              </p>
                              <p className="text-sm text-gray-500">
                                {product.location}
                              </p>
                            </div>

                            <div className="text-right ml-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg font-bold text-gray-900">
                                  {product.price}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {product.originalPrice}
                                  </span>
                                )}
                              </div>
                              {product.discount && (
                                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                                  {product.discount}
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Select high-quality products with good
                ratings to maximize user engagement and sales conversion.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
            <button
              onClick={() => {
                handleHomepageDataChange("hotDeals", "products", [
                  ...sampleProducts,
                ]);
                alert(
                  "✅ All products selected for Hot Deals! Your customers will love the variety."
                );
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Select All Products
              <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                {sampleProducts.length}
              </span>
            </button>

            <button
              onClick={() => {
                const randomProducts = [...sampleProducts]
                  .sort(() => 0.5 - Math.random())
                  .slice(
                    0,
                    Math.min(
                      homepageData.hotDeals.maxItems,
                      sampleProducts.length
                    )
                  );
                handleHomepageDataChange(
                  "hotDeals",
                  "products",
                  randomProducts
                );
                alert(
                  `🎲 Randomly selected ${randomProducts.length} high-quality products for Hot Deals!`
                );
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4" />
              Smart Random Selection
              <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                {homepageData.hotDeals.maxItems}
              </span>
            </button>

            <button
              onClick={() => {
                handleHomepageDataChange("hotDeals", "products", []);
                alert("🗑️ All products cleared from Hot Deals section.");
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>

            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <input
                type="checkbox"
                id="hotDealsRandomized"
                checked={homepageData.hotDeals.isRandomized}
                onChange={(e) =>
                  handleHomepageDataChange(
                    "hotDeals",
                    "isRandomized",
                    e.target.checked
                  )
                }
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label
                htmlFor="hotDealsRandomized"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                🔄 Auto-refresh daily
              </label>
            </div>
          </div>

          {/* Current Products Preview */}
          {homepageData.hotDeals.products.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  🔥 Hot Deals Preview ({homepageData.hotDeals.products.length}{" "}
                  products)
                </h4>
                <span className="text-sm text-gray-500">
                  How it will appear on homepage
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-80 overflow-y-auto p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                {homepageData.hotDeals.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/200x128/f3f4f6/9ca3af?text=${product.category
                            .charAt(0)
                            .toUpperCase()}`;
                        }}
                      />
                    </div>
                    <h5 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h5>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-xs text-gray-600">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded mb-2">
                        {product.discount}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 truncate">
                      {product.location}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-sm text-orange-800">
                  📊 <strong>Preview:</strong> This is how your Hot Deals
                  section will appear to customers on the homepage.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Fresh Recommendations Management */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          Fresh Recommendations
          <span className="ml-auto text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            {homepageData.freshRecommendations.products.length} selected
          </span>
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={homepageData.freshRecommendations.title}
                onChange={(e) =>
                  handleHomepageDataChange(
                    "freshRecommendations",
                    "title",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Items to Show
              </label>
              <input
                type="number"
                min="8"
                max="32"
                value={homepageData.freshRecommendations.maxItems}
                onChange={(e) =>
                  handleHomepageDataChange(
                    "freshRecommendations",
                    "maxItems",
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={homepageData.freshRecommendations.description}
              onChange={(e) =>
                handleHomepageDataChange(
                  "freshRecommendations",
                  "description",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Product Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-gray-900">
                ⭐ Select Products for Fresh Recommendations
              </label>
              <div className="text-sm text-gray-500">
                {homepageData.freshRecommendations.products.length} of{" "}
                {sampleProducts.length} products selected
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 min-w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="services">Services</option>
                  <option value="food">Food & Restaurant</option>
                  <option value="fashion">Fashion</option>
                  <option value="property">Property</option>
                </select>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  Filter
                </button>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                  {sampleProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        homepageData.freshRecommendations.products.some(
                          (p) => p.id === product.id
                        )
                          ? "bg-purple-50 border-l-4 border-purple-400"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          id={`fresh-${product.id}`}
                          checked={homepageData.freshRecommendations.products.some(
                            (p) => p.id === product.id
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (
                                !homepageData.freshRecommendations.products.some(
                                  (p) => p.id === product.id
                                )
                              ) {
                                const newProducts = [
                                  ...homepageData.freshRecommendations.products,
                                  product,
                                ];
                                handleHomepageDataChange(
                                  "freshRecommendations",
                                  "products",
                                  newProducts
                                );
                              }
                            } else {
                              const newProducts =
                                homepageData.freshRecommendations.products.filter(
                                  (p) => p.id !== product.id
                                );
                              handleHomepageDataChange(
                                "freshRecommendations",
                                "products",
                                newProducts
                              );
                            }
                          }}
                          className="mt-1.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />

                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=${product.category
                                .charAt(0)
                                .toUpperCase()}`;
                            }}
                          />
                        </div>

                        <label
                          htmlFor={`fresh-${product.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-base mb-1">
                                {product.title}
                              </h4>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                  {product.category}
                                </span>
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-400">★</span>
                                  <span className="text-sm text-gray-600">
                                    {product.rating}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({product.reviews})
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                {product.seller}
                              </p>
                              <p className="text-sm text-gray-500">
                                {product.location}
                              </p>
                            </div>

                            <div className="text-right ml-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg font-bold text-gray-900">
                                  {product.price}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {product.originalPrice}
                                  </span>
                                )}
                              </div>
                              {product.discount && (
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                  {product.discount}
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                💡 <strong>Tip:</strong> Choose newer products or services to
                keep the recommendations fresh and relevant for your users.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
            <button
              onClick={() => {
                handleHomepageDataChange("freshRecommendations", "products", [
                  ...sampleProducts,
                ]);
                alert(
                  "✅ All products selected for Fresh Recommendations! Maximum variety for your users."
                );
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Select All Products
              <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                {sampleProducts.length}
              </span>
            </button>

            <button
              onClick={() => {
                const randomProducts = [...sampleProducts]
                  .sort(() => 0.5 - Math.random())
                  .slice(
                    0,
                    Math.min(
                      homepageData.freshRecommendations.maxItems,
                      sampleProducts.length
                    )
                  );
                handleHomepageDataChange(
                  "freshRecommendations",
                  "products",
                  randomProducts
                );
                alert(
                  `🎲 Randomly selected ${randomProducts.length} fresh products for recommendations!`
                );
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4" />
              Smart Random Selection
              <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                {homepageData.freshRecommendations.maxItems}
              </span>
            </button>

            <button
              onClick={() => {
                handleHomepageDataChange(
                  "freshRecommendations",
                  "products",
                  []
                );
                alert(
                  "🗑️ All products cleared from Fresh Recommendations section."
                );
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>

            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <input
                type="checkbox"
                id="freshRandomized"
                checked={homepageData.freshRecommendations.isRandomized}
                onChange={(e) =>
                  handleHomepageDataChange(
                    "freshRecommendations",
                    "isRandomized",
                    e.target.checked
                  )
                }
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="freshRandomized"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                🔄 Auto-refresh daily
              </label>
            </div>
          </div>

          {/* Current Products Preview */}
          {homepageData.freshRecommendations.products.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  ⭐ Fresh Recommendations Preview (
                  {homepageData.freshRecommendations.products.length} products)
                </h4>
                <span className="text-sm text-gray-500">
                  How it will appear on homepage
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-80 overflow-y-auto p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                {homepageData.freshRecommendations.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/200x128/f3f4f6/9ca3af?text=${product.category
                            .charAt(0)
                            .toUpperCase()}`;
                        }}
                      />
                    </div>
                    <h5 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h5>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-xs text-gray-600">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">
                        {product.discount}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 truncate">
                      {product.location}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
                <p className="text-sm text-purple-800">
                  📊 <strong>Preview:</strong> This is how your Fresh
                  Recommendations section will appear to customers on the
                  homepage.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Professional Service Slider Management */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Service Slider Management
              </h3>
              <p className="text-sm text-gray-600">
                Configure your homepage service slider
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sliderEnabled"
                checked={homepageData.serviceSlider.enabled}
                onChange={(e) =>
                  handleHomepageDataChange(
                    "serviceSlider",
                    "enabled",
                    e.target.checked
                  )
                }
                className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <label htmlFor="sliderEnabled" className="text-sm text-gray-700">
                Enable Slider
              </label>
            </div>
            <div className="text-sm text-gray-500">
              {homepageData.serviceSlider.enabled ? "✅ Active" : "❌ Disabled"}
            </div>
          </div>
        </div>

        {homepageData.serviceSlider.enabled && (
          <div className="space-y-6">
            {/* Basic Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slider Title
                  </label>
                  <input
                    type="text"
                    value={homepageData.serviceSlider.title}
                    onChange={(e) =>
                      handleHomepageDataChange(
                        "serviceSlider",
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Best Electricians, Top Plumbers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed as the main heading
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category
                  </label>
                  <select
                    value={homepageData.serviceSlider.selectedCategory}
                    onChange={(e) =>
                      handleHomepageDataChange(
                        "serviceSlider",
                        "selectedCategory",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="electrician">⚡ Electrician</option>
                    <option value="plumber">🚰 Plumber</option>
                    <option value="carpenter">🔨 Carpenter</option>
                    <option value="painter">🎨 Painter</option>
                    <option value="cctv-services">🛡️ CCTV Services</option>
                    <option value="electronic-repair">
                      ⚙️ Electronic Repair
                    </option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose which service category to feature
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={homepageData.serviceSlider.description}
                    onChange={(e) =>
                      handleHomepageDataChange(
                        "serviceSlider",
                        "description",
                        e.target.value
                      )
                    }
                    rows="3"
                    placeholder="Brief description for the slider section"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Appears below the title
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Items
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="20"
                      value={homepageData.serviceSlider.maxItems}
                      onChange={(e) =>
                        handleHomepageDataChange(
                          "serviceSlider",
                          "maxItems",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="sliderRandomized"
                      checked={homepageData.serviceSlider.isRandomized}
                      onChange={(e) =>
                        handleHomepageDataChange(
                          "serviceSlider",
                          "isRandomized",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <label
                      htmlFor="sliderRandomized"
                      className="text-sm text-gray-700"
                    >
                      Randomize
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Live Preview
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Preview Active
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl mr-2">
                      {homepageData.serviceSlider.selectedCategory ===
                        "electrician" && "⚡"}
                      {homepageData.serviceSlider.selectedCategory ===
                        "plumber" && "🚰"}
                      {homepageData.serviceSlider.selectedCategory ===
                        "carpenter" && "🔨"}
                      {homepageData.serviceSlider.selectedCategory ===
                        "painter" && "🎨"}
                      {homepageData.serviceSlider.selectedCategory ===
                        "cctv-services" && "🛡️"}
                      {homepageData.serviceSlider.selectedCategory ===
                        "electronic-repair" && "⚙️"}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {homepageData.serviceSlider.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {homepageData.serviceSlider.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-4 shadow-sm border"
                    >
                      <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          Service Image
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, j) => (
                            <div
                              key={j}
                              className="w-3 h-3 bg-yellow-400 rounded-sm"
                            ></div>
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            4.8
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900">
                          Sample{" "}
                          {homepageData.serviceSlider.selectedCategory
                            .charAt(0)
                            .toUpperCase() +
                            homepageData.serviceSlider.selectedCategory.slice(
                              1
                            )}{" "}
                          {i + 1}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Professional service provider
                        </p>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-blue-600 text-white text-xs py-1 px-2 rounded">
                            View Details
                          </button>
                          <button className="bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded">
                            Call
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Advanced Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showOnHomepage"
                      checked={homepageData.serviceSlider.showOnHomepage}
                      onChange={(e) =>
                        handleHomepageDataChange(
                          "serviceSlider",
                          "showOnHomepage",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <label
                      htmlFor="showOnHomepage"
                      className="text-sm text-gray-700"
                    >
                      Display on Homepage
                    </label>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">
                      💡 Pro Tips
                    </h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Use engaging titles to attract visitors</li>
                      <li>• Randomization helps showcase different services</li>
                      <li>• 6-12 items work best for user engagement</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Slider Statistics
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Category:</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {homepageData.serviceSlider.selectedCategory.replace(
                            "-",
                            " "
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Items:</span>
                        <span className="font-medium text-gray-900">
                          {homepageData.serviceSlider.maxItems}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Randomized:</span>
                        <span
                          className={`font-medium ${
                            homepageData.serviceSlider.isRandomized
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {homepageData.serviceSlider.isRandomized
                            ? "Yes"
                            : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`font-medium ${
                            homepageData.serviceSlider.enabled
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {homepageData.serviceSlider.enabled
                            ? "Active"
                            : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!homepageData.serviceSlider.enabled && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Service Slider Disabled
            </h4>
            <p className="text-gray-600 mb-4">
              Enable the slider to start configuring your service showcase
            </p>
            <button
              onClick={() =>
                handleHomepageDataChange("serviceSlider", "enabled", true)
              }
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 transition-colors"
            >
              Enable Service Slider
            </button>
          </div>
        )}
      </Card>
    </div>
  );

  // About Page Management
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
                  <p className="text-2xl font-bold">{websiteConfig.about.team.length}</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Core Values</p>
                  <p className="text-2xl font-bold">{websiteConfig.about.coreValues.length}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Statistics</p>
                  <p className="text-2xl font-bold">{websiteConfig.about.stats.length}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">🎯 About Page Management</h3>
              <p className="text-gray-600">Configure your about page content and company information</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                <input
                  type="text"
                  value={websiteConfig.about.hero.title}
                  onChange={(e) => updatePageConfig('about', 'hero', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={websiteConfig.about.hero.subtitle}
                  onChange={(e) => updatePageConfig('about', 'hero', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={websiteConfig.about.hero.description}
                  onChange={(e) => updatePageConfig('about', 'hero', 'description', e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mission Title</label>
                  <input
                    type="text"
                    value={websiteConfig.about.mission.title}
                    onChange={(e) => updatePageConfig('about', 'mission', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mission Description</label>
                  <textarea
                    rows={4}
                    value={websiteConfig.about.mission.description}
                    onChange={(e) => updatePageConfig('about', 'mission', 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vision Title</label>
                  <input
                    type="text"
                    value={websiteConfig.about.vision.title}
                    onChange={(e) => updatePageConfig('about', 'vision', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vision Description</label>
                  <textarea
                    rows={4}
                    value={websiteConfig.about.vision.description}
                    onChange={(e) => updatePageConfig('about', 'vision', 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          </Card>
  );

  // Contact Page Management
  const renderContactManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Contact Methods</p>
              <p className="text-2xl font-bold">{websiteConfig.contact.contactInfo.length}</p>
            </div>
            <Phone className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Support Categories</p>
              <p className="text-2xl font-bold">{websiteConfig.contact.supportCategories.length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Business Days</p>
              <p className="text-2xl font-bold">{websiteConfig.contact.businessHours.schedule.length}</p>
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
          <h3 className="text-lg font-semibold text-gray-900">📞 Contact Page Management</h3>
          <p className="text-gray-600">Configure contact information and support options</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={contact.title}
                    onChange={(e) => {
                      const newContactInfo = [...websiteConfig.contact.contactInfo];
                      newContactInfo[index] = { ...contact, title: e.target.value };
                      updatePageSection('contact', 'contactInfo', newContactInfo);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="text"
                    value={contact.value}
                    onChange={(e) => {
                      const newContactInfo = [...websiteConfig.contact.contactInfo];
                      newContactInfo[index] = { ...contact, value: e.target.value };
                      updatePageSection('contact', 'contactInfo', newContactInfo);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={contact.description}
                    onChange={(e) => {
                      const newContactInfo = [...websiteConfig.contact.contactInfo];
                      newContactInfo[index] = { ...contact, description: e.target.value };
                      updatePageSection('contact', 'contactInfo', newContactInfo);
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

  // Privacy Policy Management
  const renderPrivacyManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Policy Sections</p>
              <p className="text-2xl font-bold">{websiteConfig.privacy.sections.length}</p>
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
          <h3 className="text-lg font-semibold text-gray-900">🛡️ Privacy Policy Management</h3>
          <p className="text-gray-600">Configure privacy policy content and data protection information</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={websiteConfig.privacy.hero.title}
              onChange={(e) => updatePageConfig('privacy', 'hero', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
            <input
              type="text"
              value={websiteConfig.privacy.hero.lastUpdated}
              onChange={(e) => updatePageConfig('privacy', 'hero', 'lastUpdated', e.target.value)}
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
                    updatePageSection('privacy', 'sections', newSections);
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

  // Terms of Service Management
  const renderTermsManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Terms Sections</p>
              <p className="text-2xl font-bold">{websiteConfig.terms.sections.length}</p>
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
          <h3 className="text-lg font-semibold text-gray-900">📋 Terms of Service Management</h3>
          <p className="text-gray-600">Configure terms of service and legal agreements</p>
        </div>
        <button
          onClick={() => alert("✅ Terms of Service changes saved successfully!")}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={websiteConfig.terms.hero.title}
              onChange={(e) => updatePageConfig('terms', 'hero', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
            <input
              type="text"
              value={websiteConfig.terms.hero.lastUpdated}
              onChange={(e) => updatePageConfig('terms', 'hero', 'lastUpdated', e.target.value)}
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
                    updatePageSection('terms', 'sections', newSections);
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

  // Support Page Management
  const renderSupportManagement = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Support Categories</p>
              <p className="text-2xl font-bold">{websiteConfig.support.categories.length}</p>
            </div>
            <Headphones className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Contact Methods</p>
              <p className="text-2xl font-bold">{websiteConfig.support.contactMethods.length}</p>
            </div>
            <Phone className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">FAQ Items</p>
              <p className="text-2xl font-bold">{websiteConfig.support.faq.length}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Resources</p>
              <p className="text-2xl font-bold">{websiteConfig.support.resources.length}</p>
            </div>
            <ExternalLink className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">🎧 Support Center Management</h3>
          <p className="text-gray-600">Configure support options and help resources</p>
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
                    newCategories[index] = { ...category, title: e.target.value };
                    updatePageSection('support', 'categories', newCategories);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-medium"
                  placeholder="Category Title"
                />
                <textarea
                  rows={2}
                  value={category.description}
                  onChange={(e) => {
                    const newCategories = [...websiteConfig.support.categories];
                    newCategories[index] = { ...category, description: e.target.value };
                    updatePageSection('support', 'categories', newCategories);
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={method.title}
                    onChange={(e) => {
                      const newMethods = [...websiteConfig.support.contactMethods];
                      newMethods[index] = { ...method, title: e.target.value };
                      updatePageSection('support', 'contactMethods', newMethods);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="text"
                    value={method.value}
                    onChange={(e) => {
                      const newMethods = [...websiteConfig.support.contactMethods];
                      newMethods[index] = { ...method, value: e.target.value };
                      updatePageSection('support', 'contactMethods', newMethods);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <input
                    type="text"
                    value={method.availability}
                    onChange={(e) => {
                      const newMethods = [...websiteConfig.support.contactMethods];
                      newMethods[index] = { ...method, availability: e.target.value };
                      updatePageSection('support', 'contactMethods', newMethods);
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
