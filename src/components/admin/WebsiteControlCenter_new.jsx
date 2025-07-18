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
      title: "Home Cleaning Service",
      category: "services",
      price: "₹1200",
      rating: 4.7,
      reviews: 156,
      seller: "Clean Pro Services",
      location: "Ranipool, Gangtok",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=128&fit=crop",
    },
    {
      id: 5,
      title: "Local Handicrafts",
      category: "fashion",
      price: "₹2500",
      originalPrice: "₹3000",
      discount: "17% OFF",
      rating: 4.5,
      reviews: 67,
      seller: "Sikkim Arts & Crafts",
      location: "Lal Bazaar, Gangtok",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=128&fit=crop",
    },
    {
      id: 6,
      title: "Used Car - Maruti Swift",
      category: "vehicles",
      price: "₹4,50,000",
      rating: 4.3,
      reviews: 23,
      seller: "Auto Hub Sikkim",
      location: "31A National Highway, Gangtok",
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=200&h=128&fit=crop",
    },
  ];

  // Available categories for selection
  const availableCategories = [
    { id: "all", name: "All Categories" },
    { id: "services", name: "Services" },
    { id: "food", name: "Food & Dining" },
    { id: "vehicles", name: "Vehicles" },
    { id: "property", name: "Property" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion & Beauty" },
    { id: "health", name: "Health & Wellness" },
    { id: "education", name: "Education" },
    { id: "sports", name: "Sports & Recreation" },
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
    </div>
  );

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
