import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Globe,
  Bell,
  Shield,
  Database,
  Mail,
  Server,
  Users,
  Save,
  ArrowLeft,
  Palette,
  Code,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const SystemSettings = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Easy Life Gangtok",
    siteDescription: "Your trusted local business directory",
    contactEmail: "admin@easylifegangtok.com",
    supportPhone: "+91 98765 43210",
    address: "MG Road, Gangtok, Sikkim 737101",

    // Email Settings
    emailProvider: "gmail",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "notifications@easylifegangtok.com",
    smtpPassword: "••••••••",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: "strong",
    ipWhitelist: "",

    // Business Settings
    autoApproval: false,
    verificationRequired: true,
    businessLimit: 100,
    reviewModeration: true,

    // Appearance
    primaryColor: "#059669",
    theme: "light",
    logo: "",
    favicon: "",
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    setUnsavedChanges(false);
    // In real app, this would make API calls
  };

  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "email", name: "Email", icon: Mail },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "business", name: "Business", icon: Users },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "advanced", name: "Advanced", icon: Code },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Site Name"
          value={settings.siteName}
          onChange={(e) => handleSettingChange("siteName", e.target.value)}
        />
        <Input
          label="Contact Email"
          type="email"
          value={settings.contactEmail}
          onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
        />
        <Input
          label="Support Phone"
          value={settings.supportPhone}
          onChange={(e) => handleSettingChange("supportPhone", e.target.value)}
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) =>
              handleSettingChange("siteDescription", e.target.value)
            }
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <Input
            label="Business Address"
            value={settings.address}
            onChange={(e) => handleSettingChange("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Provider
          </label>
          <select
            value={settings.emailProvider}
            onChange={(e) =>
              handleSettingChange("emailProvider", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="gmail">Gmail</option>
            <option value="outlook">Outlook</option>
            <option value="custom">Custom SMTP</option>
          </select>
        </div>
        <Input
          label="SMTP Host"
          value={settings.smtpHost}
          onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
        />
        <Input
          label="SMTP Port"
          value={settings.smtpPort}
          onChange={(e) => handleSettingChange("smtpPort", e.target.value)}
        />
        <Input
          label="SMTP Username"
          value={settings.smtpUsername}
          onChange={(e) => handleSettingChange("smtpUsername", e.target.value)}
        />
        <Input
          label="SMTP Password"
          type="password"
          value={settings.smtpPassword}
          onChange={(e) => handleSettingChange("smtpPassword", e.target.value)}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {[
        {
          key: "emailNotifications",
          label: "Email Notifications",
          description: "Send notifications via email",
        },
        {
          key: "smsNotifications",
          label: "SMS Notifications",
          description: "Send notifications via SMS",
        },
        {
          key: "pushNotifications",
          label: "Push Notifications",
          description: "Send browser push notifications",
        },
        {
          key: "weeklyReports",
          label: "Weekly Reports",
          description: "Send weekly analytics reports",
        },
      ].map(({ key, label, description }) => (
        <div
          key={key}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h4 className="text-sm font-medium text-gray-900">{label}</h4>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <button
            onClick={() => handleSettingChange(key, !settings[key])}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings[key] ? "bg-primary-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings[key] ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            Two-Factor Authentication
          </h4>
          <p className="text-sm text-gray-500">
            Require 2FA for admin accounts
          </p>
        </div>
        <button
          onClick={() =>
            handleSettingChange("twoFactorAuth", !settings.twoFactorAuth)
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.twoFactorAuth ? "bg-primary-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <select
            value={settings.sessionTimeout}
            onChange={(e) =>
              handleSettingChange("sessionTimeout", parseInt(e.target.value))
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Policy
          </label>
          <select
            value={settings.passwordPolicy}
            onChange={(e) =>
              handleSettingChange("passwordPolicy", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="basic">Basic (6+ characters)</option>
            <option value="medium">Medium (8+ chars, numbers)</option>
            <option value="strong">Strong (8+ chars, numbers, symbols)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            Auto-approve Businesses
          </h4>
          <p className="text-sm text-gray-500">
            Automatically approve new business listings
          </p>
        </div>
        <button
          onClick={() =>
            handleSettingChange("autoApproval", !settings.autoApproval)
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.autoApproval ? "bg-primary-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.autoApproval ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            Verification Required
          </h4>
          <p className="text-sm text-gray-500">
            Require document verification for businesses
          </p>
        </div>
        <button
          onClick={() =>
            handleSettingChange(
              "verificationRequired",
              !settings.verificationRequired
            )
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.verificationRequired ? "bg-primary-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.verificationRequired ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Business Listing Limit"
          type="number"
          value={settings.businessLimit}
          onChange={(e) =>
            handleSettingChange("businessLimit", parseInt(e.target.value))
          }
        />
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) =>
                handleSettingChange("primaryColor", e.target.value)
              }
              className="w-12 h-12 border border-gray-200 rounded-lg"
            />
            <Input
              value={settings.primaryColor}
              onChange={(e) =>
                handleSettingChange("primaryColor", e.target.value)
              }
              placeholder="#059669"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange("theme", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <Card className="p-6 border-yellow-200 bg-yellow-50">
        <div className="flex items-center space-x-3">
          <Server className="w-6 h-6 text-yellow-600" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900">
              System Information
            </h3>
            <p className="text-sm text-yellow-700">
              Current system status and configuration
            </p>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="text-sm">
            <span className="text-yellow-700">Database:</span>
            <span className="ml-2 font-medium text-yellow-900">
              MongoDB 5.0
            </span>
          </div>
          <div className="text-sm">
            <span className="text-yellow-700">Server:</span>
            <span className="ml-2 font-medium text-yellow-900">
              Node.js 18.x
            </span>
          </div>
          <div className="text-sm">
            <span className="text-yellow-700">Cache:</span>
            <span className="ml-2 font-medium text-yellow-900">Redis 6.2</span>
          </div>
          <div className="text-sm">
            <span className="text-yellow-700">Storage:</span>
            <span className="ml-2 font-medium text-yellow-900">45% Used</span>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Button variant="outline" className="h-12 justify-center">
          <Database className="w-5 h-5 mr-2" />
          Backup Database
        </Button>
        <Button variant="outline" className="h-12 justify-center">
          <Server className="w-5 h-5 mr-2" />
          Clear Cache
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "email":
        return renderEmailSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "business":
        return renderBusinessSettings();
      case "appearance":
        return renderAppearanceSettings();
      case "advanced":
        return renderAdvancedSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="ghost" size="sm" icon={ArrowLeft}>
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              System Settings
            </h2>
            <p className="text-gray-600">
              Configure platform settings and preferences
            </p>
          </div>
        </div>
        {unsavedChanges && (
          <Button variant="primary" onClick={handleSave} icon={Save}>
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {tabs.find((tab) => tab.id === activeTab)?.name} Settings
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Configure your{" "}
                {tabs.find((tab) => tab.id === activeTab)?.name.toLowerCase()}{" "}
                preferences
              </p>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
