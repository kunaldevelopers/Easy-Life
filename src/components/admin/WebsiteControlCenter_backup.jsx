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

const WebsiteControlCenter = ({ onBack }) => {
  const { websiteConfig, updatePageConfig, updatePageSection } =
    useWebsiteConfig();

  // For backward compatibility, map context data to homepageData
  const homepageData = websiteConfig.homepage;
  const handleHomepageDataChange = (section, field, value) => {
    updatePageConfig("homepage", section, field, value);
  };

  const handleSaveHomepage = () => {
    alert("✅ Homepage changes saved successfully!");
  };

  // Sample data for product selection
  const sampleProducts = [
    {
      id: 1,
      title: "Professional Electrician Services",
      category: "services",
      price: "₹500/hr",
      originalPrice: "₹600/hr",
      discount: "17% OFF",
      rating: 4.8,
      reviews: 125,
      seller: "Expert Electricians Co.",
      location: "Gangtok, Sikkim",
      image:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200&h=128&fit=crop",
    },
    {
      id: 2,
      title: "Fresh Organic Vegetables",
      category: "food",
      price: "₹200/kg",
      originalPrice: "₹250/kg",
      discount: "20% OFF",
      rating: 4.6,
      reviews: 89,
      seller: "Green Valley Farm",
      location: "MG Marg, Gangtok",
      image:
        "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=200&h=128&fit=crop",
    },
    {
      id: 3,
      title: "Smartphone Repair Service",
      category: "electronics",
      price: "₹800",
      rating: 4.9,
      reviews: 200,
      seller: "TechFix Solutions",
      location: "Tibet Road, Gangtok",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=128&fit=crop",
    },
    {
      id: 4,
      title: "Premium Car Wash",
      category: "vehicles",
      price: "₹300",
      originalPrice: "₹400",
      discount: "25% OFF",
      rating: 4.7,
      reviews: 156,
      seller: "AutoCare Services",
      location: "Tadong, Gangtok",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=128&fit=crop",
    },
    {
      id: 5,
      title: "Traditional Momos",
      category: "food",
      price: "₹120/plate",
      rating: 4.8,
      reviews: 340,
      seller: "Himalayan Kitchen",
      location: "MG Marg, Gangtok",
      image:
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=200&h=128&fit=crop",
    },
    {
      id: 6,
      title: "Designer Clothing",
      category: "fashion",
      price: "₹1,200",
      originalPrice: "₹1,500",
      discount: "20% OFF",
      rating: 4.5,
      reviews: 78,
      seller: "Fashion Hub",
      location: "Lal Bazaar, Gangtok",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=128&fit=crop",
    },
    {
      id: 7,
      title: "Mountain View Apartment",
      category: "property",
      price: "₹12,000/month",
      rating: 4.6,
      reviews: 45,
      seller: "Prime Properties",
      location: "Development Area, Gangtok",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=128&fit=crop",
    },
    {
      id: 8,
      title: "Laptop Repair & Service",
      category: "electronics",
      price: "₹1,000",
      rating: 4.7,
      reviews: 98,
      seller: "Computer Care Center",
      location: "Deorali, Gangtok",
      image:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=200&h=128&fit=crop",
    },
  ];

  // Available categories data
  const availableCategories = [
    { id: "all", name: "All Categories" },
    { id: "services", name: "Services" },
    { id: "food", name: "Food & Restaurant" },
    { id: "vehicles", name: "Vehicles" },
    { id: "property", name: "Property" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "health", name: "Health & Wellness" },
    { id: "education", name: "Education" },
    { id: "sports", name: "Sports & Recreation" },
  ];

  const tabs = [
    { id: "homepage", name: "Homepage", icon: Monitor },
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
                            const newCategories = currentCategories.filter(
                              (id) => id !== category.id
                            );
                            handleHomepageDataChange(
                              "categoriesGrid",
                              "selectedCategories",
                              newCategories
                            );
                          } else {
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
                            checked={isSelected}
                            onChange={() => {}}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border mt-4">
              <button
                onClick={() => {
                  handleHomepageDataChange("hotDeals", "products", [
                    ...sampleProducts,
                  ]);
                  alert("✅ All products selected for Hot Deals!");
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                Select All Products
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
                    `🎲 Randomly selected ${randomProducts.length} products for Hot Deals!`
                  );
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <RefreshCw className="w-4 h-4" />
                Smart Random Selection
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
            </div>

            {/* Hot Deals Preview */}
            {homepageData.hotDeals.products.length > 0 && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    🔥 Hot Deals Preview (
                    {homepageData.hotDeals.products.length} products)
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
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Service Slider Management */}
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
        <title>Homepage Management - Admin Panel</title>
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
              Homepage Management
            </h1>
            <p className="text-gray-600">
              Manage your homepage content, sections, and layout
            </p>
          </div>

          {/* Homepage Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderHomepageManagement()}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WebsiteControlCenter;
