import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Upload,
  Database,
  Calendar,
  FileText,
  Archive,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Users,
  Store,
  Activity,
  Trash2,
  Filter,
  Search,
  ExternalLink,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const DataManagement = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("export");
  const [exportProgress, setExportProgress] = useState(0);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Mock data for exports and backups
  const exportHistory = [
    {
      id: 1,
      type: "users",
      name: "User Data Export",
      date: "2025-01-07",
      time: "14:30",
      size: "2.4 MB",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: 2,
      type: "businesses",
      name: "Business Listings Export",
      date: "2025-01-06",
      time: "09:15",
      size: "8.7 MB",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: 3,
      type: "bookings",
      name: "Service Bookings Export",
      date: "2025-01-05",
      time: "16:45",
      size: "5.2 MB",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: 4,
      type: "financial",
      name: "Financial Data Export",
      date: "2025-01-04",
      time: "11:20",
      size: "1.8 MB",
      status: "failed",
      downloadUrl: null,
    },
    {
      id: 5,
      type: "analytics",
      name: "Analytics Report",
      date: "2025-01-03",
      time: "13:10",
      size: "3.1 MB",
      status: "completed",
      downloadUrl: "#",
    },
  ];

  const backupHistory = [
    {
      id: 1,
      name: "Full System Backup",
      date: "2025-01-07",
      time: "02:00",
      size: "245 MB",
      type: "full",
      status: "completed",
      retention: "30 days",
    },
    {
      id: 2,
      name: "Incremental Backup",
      date: "2025-01-06",
      time: "02:00",
      size: "45 MB",
      type: "incremental",
      status: "completed",
      retention: "7 days",
    },
    {
      id: 3,
      name: "Database Backup",
      date: "2025-01-05",
      time: "02:00",
      size: "156 MB",
      type: "database",
      status: "completed",
      retention: "14 days",
    },
    {
      id: 4,
      name: "Full System Backup",
      date: "2025-01-04",
      time: "02:00",
      size: "238 MB",
      type: "full",
      status: "failed",
      retention: "30 days",
    },
  ];

  const storageStats = [
    {
      label: "Total Storage Used",
      value: "2.4 GB",
      icon: HardDrive,
      colorClass: "bg-blue-100 text-blue-600",
      percentage: 65,
    },
    {
      label: "Database Size",
      value: "890 MB",
      icon: Database,
      colorClass: "bg-green-100 text-green-600",
      percentage: 45,
    },
    {
      label: "Media Files",
      value: "1.2 GB",
      icon: FileText,
      colorClass: "bg-purple-100 text-purple-600",
      percentage: 80,
    },
    {
      label: "Backup Storage",
      value: "456 MB",
      icon: Archive,
      colorClass: "bg-orange-100 text-orange-600",
      percentage: 25,
    },
  ];

  const exportOptions = [
    {
      id: "users",
      name: "User Data",
      description: "Export all user information and profiles",
      icon: Users,
      estimatedSize: "~2.5 MB",
    },
    {
      id: "businesses",
      name: "Business Listings",
      description: "Export all business profiles and details",
      icon: Store,
      estimatedSize: "~8.0 MB",
    },
    {
      id: "bookings",
      name: "Service Bookings",
      description: "Export booking history and transactions",
      icon: Calendar,
      estimatedSize: "~5.0 MB",
    },
    {
      id: "analytics",
      name: "Analytics Data",
      description: "Export platform analytics and metrics",
      icon: Activity,
      estimatedSize: "~3.0 MB",
    },
    {
      id: "financial",
      name: "Financial Records",
      description: "Export payment and commission data",
      icon: FileText,
      estimatedSize: "~1.8 MB",
    },
  ];

  // Handle export functionality
  const handleExport = async (type) => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          // In real app, trigger download
          alert(`${type} data exported successfully!`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Handle backup functionality
  const handleBackup = async (type) => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          alert(`${type} backup created successfully!`);
          return 100;
        }
        return prev + 8;
      });
    }, 300);
  };

  // Filter export history
  const filteredExports = exportHistory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "failed":
        return "text-red-600 bg-red-100";
      case "in_progress":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "failed":
        return AlertTriangle;
      case "in_progress":
        return Clock;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              icon={ArrowLeft}
              onClick={onBack}
              className="shrink-0"
            >
              Back to Admin
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Data Management
              </h1>
              <p className="text-gray-600 mt-1">
                Export data, manage backups, and monitor storage
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              icon={Archive}
              onClick={() => handleBackup("full")}
              disabled={isBackingUp}
            >
              {isBackingUp ? "Creating Backup..." : "Create Backup"}
            </Button>
          </div>
        </div>

        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {storageStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.colorClass}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{stat.label}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${stat.colorClass
                      .replace("text-", "bg-")
                      .replace("100", "600")}`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {stat.percentage}% used
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
          <button
            onClick={() => setActiveTab("export")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "export"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Data Export
          </button>
          <button
            onClick={() => setActiveTab("backup")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "backup"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Backup Management
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "maintenance"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Data Maintenance
          </button>
        </div>

        {/* Export Tab */}
        {activeTab === "export" && (
          <div className="space-y-6">
            {/* Export Options */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" />
                Export Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exportOptions.map((option) => (
                  <div
                    key={option.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <option.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-gray-500">
                        {option.estimatedSize}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {option.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {option.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      icon={Download}
                      onClick={() => handleExport(option.name)}
                      disabled={isExporting}
                    >
                      {isExporting
                        ? `Exporting... ${exportProgress}%`
                        : "Export"}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Export History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Export History
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search exports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="users">Users</option>
                    <option value="businesses">Businesses</option>
                    <option value="bookings">Bookings</option>
                    <option value="financial">Financial</option>
                    <option value="analytics">Analytics</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Export Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Date & Time
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Size
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExports.map((item) => {
                      const StatusIcon = getStatusIcon(item.status);
                      return (
                        <tr
                          key={item.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">
                              {item.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            <div>{item.date}</div>
                            <div className="text-sm text-gray-500">
                              {item.time}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {item.size}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                item.status
                              )}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {item.downloadUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  icon={Download}
                                  onClick={() =>
                                    window.open(item.downloadUrl, "_blank")
                                  }
                                >
                                  Download
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                icon={Trash2}
                                onClick={() => {
                                  if (
                                    confirm(
                                      "Are you sure you want to delete this export?"
                                    )
                                  ) {
                                    alert("Export deleted successfully!");
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Backup Tab */}
        {activeTab === "backup" && (
          <div className="space-y-6">
            {/* Backup Options */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Archive className="w-5 h-5 text-green-600" />
                Create Backup
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg w-fit mb-3">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Full Backup
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete system backup including database, files, and
                    configurations
                  </p>
                  <Button
                    variant="primary"
                    className="w-full"
                    icon={Archive}
                    onClick={() => handleBackup("Full System")}
                    disabled={isBackingUp}
                  >
                    Create Full Backup
                  </Button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg w-fit mb-3">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Database Only
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Backup only the database with all user and business data
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    icon={Database}
                    onClick={() => handleBackup("Database")}
                    disabled={isBackingUp}
                  >
                    Backup Database
                  </Button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg w-fit mb-3">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Incremental
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Backup only changes since the last backup (faster)
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    icon={RefreshCw}
                    onClick={() => handleBackup("Incremental")}
                    disabled={isBackingUp}
                  >
                    Incremental Backup
                  </Button>
                </div>
              </div>
              {isBackingUp && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">
                      Creating backup...
                    </span>
                    <span className="text-sm text-blue-600">
                      {backupProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${backupProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Backup History */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Backup History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Backup Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Date & Time
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Size
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Retention
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {backupHistory.map((backup) => {
                      const StatusIcon = getStatusIcon(backup.status);
                      return (
                        <tr
                          key={backup.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">
                              {backup.name}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                backup.type === "full"
                                  ? "bg-green-100 text-green-800"
                                  : backup.type === "incremental"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {backup.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            <div>{backup.date}</div>
                            <div className="text-sm text-gray-500">
                              {backup.time}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {backup.size}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                backup.status
                              )}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {backup.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {backup.retention}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {backup.status === "completed" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    icon={Download}
                                    onClick={() =>
                                      alert("Backup restore initiated!")
                                    }
                                  >
                                    Restore
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    icon={Trash2}
                                    onClick={() => {
                                      if (
                                        confirm(
                                          "Are you sure you want to delete this backup?"
                                        )
                                      ) {
                                        alert("Backup deleted successfully!");
                                      }
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === "maintenance" && (
          <div className="space-y-6">
            {/* Database Maintenance */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Database Maintenance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">
                    Optimization Tools
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      icon={RefreshCw}
                      onClick={() => alert("Database optimization started!")}
                    >
                      Optimize Database Tables
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      icon={Trash2}
                      onClick={() => alert("Cache cleared successfully!")}
                    >
                      Clear System Cache
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      icon={Archive}
                      onClick={() => alert("Old logs archived!")}
                    >
                      Archive Old Logs
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Data Cleanup</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      icon={Trash2}
                      onClick={() => alert("Temporary files cleaned!")}
                    >
                      Clean Temporary Files
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      icon={Database}
                      onClick={() => alert("Orphaned records removed!")}
                    >
                      Remove Orphaned Records
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      icon={RefreshCw}
                      onClick={() => alert("Index rebuild started!")}
                    >
                      Rebuild Search Indexes
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* System Health */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                System Health Check
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      Healthy
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">
                    Database Connection
                  </h3>
                  <p className="text-sm text-gray-600">
                    All connections active
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      Normal
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">Storage Usage</h3>
                  <p className="text-sm text-gray-600">65% of total capacity</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-600">
                      Warning
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">Memory Usage</h3>
                  <p className="text-sm text-gray-600">85% of available RAM</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManagement;
