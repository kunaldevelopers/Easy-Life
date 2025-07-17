import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Phone,
  ExternalLink,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Activity,
  MessageCircle,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const SavedBusinesses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Comprehensive saved businesses data
  const savedBusinesses = [
    {
      id: "saved-1",
      business: "Royal Enfield Service Center",
      category: "Automotive",
      location: "Tibet Road, Gangtok",
      phone: "+91 9876543210",
      rating: 4.8,
      reviewCount: 156,
      savedDate: "Dec 20, 2024",
      image:
        "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=300",
      speciality: "Bike Repair & Maintenance",
      description:
        "Authorized Royal Enfield service center with expert mechanics and genuine parts.",
      services: ["Bike Servicing", "Parts Replacement", "Customization"],
      isOpen: true,
      openTime: "9:00 AM - 6:00 PM",
    },
    {
      id: "saved-2",
      business: "Orchid Hotel & Restaurant",
      category: "Hotels & Dining",
      location: "MG Marg, Gangtok",
      phone: "+91 9876543211",
      rating: 4.6,
      reviewCount: 89,
      savedDate: "Dec 18, 2024",
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=300",
      speciality: "Fine Dining & Accommodation",
      description:
        "Premium hotel with authentic Sikkimese cuisine and modern amenities.",
      services: ["Accommodation", "Fine Dining", "Event Hosting"],
      isOpen: true,
      openTime: "24/7",
    },
    {
      id: "saved-3",
      business: "Tech Zone Computer Repair",
      category: "Electronics",
      location: "Lal Market, Gangtok",
      phone: "+91 9876543212",
      rating: 4.7,
      reviewCount: 203,
      savedDate: "Dec 15, 2024",
      image:
        "https://images.pexels.com/photos/2882509/pexels-photo-2882509.jpeg?auto=compress&cs=tinysrgb&w=300",
      speciality: "Laptop & Desktop Repair",
      description:
        "Professional computer repair services with quick turnaround time.",
      services: ["Laptop Repair", "Desktop Repair", "Data Recovery"],
      isOpen: false,
      openTime: "10:00 AM - 7:00 PM",
    },
    {
      id: "saved-4",
      business: "Mountain View Salon & Spa",
      category: "Beauty & Wellness",
      location: "Development Area, Gangtok",
      phone: "+91 9876543213",
      rating: 4.9,
      reviewCount: 127,
      savedDate: "Dec 12, 2024",
      image:
        "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=300",
      speciality: "Hair Care & Spa Services",
      description:
        "Luxury salon and spa offering premium beauty and wellness treatments.",
      services: ["Hair Styling", "Spa Treatments", "Facial Care"],
      isOpen: true,
      openTime: "9:00 AM - 8:00 PM",
    },
    {
      id: "saved-5",
      business: "Gangtok Dental Clinic",
      category: "Healthcare",
      location: "Tadong, Gangtok",
      phone: "+91 9876543214",
      rating: 4.8,
      reviewCount: 95,
      savedDate: "Dec 10, 2024",
      image:
        "https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300",
      speciality: "Dental Care & Treatment",
      description:
        "Modern dental clinic with experienced dentists and latest equipment.",
      services: ["General Dentistry", "Teeth Cleaning", "Root Canal"],
      isOpen: true,
      openTime: "9:00 AM - 5:00 PM",
    },
    {
      id: "saved-6",
      business: "Himalayan Plumbing Services",
      category: "Home Services",
      location: "Sichey, Gangtok",
      phone: "+91 9876543215",
      rating: 4.5,
      reviewCount: 78,
      savedDate: "Dec 8, 2024",
      image:
        "https://images.pexels.com/photos/8486921/pexels-photo-8486921.jpeg?auto=compress&cs=tinysrgb&w=300",
      speciality: "Plumbing & Pipe Repair",
      description: "Emergency plumbing services available 24/7 across Gangtok.",
      services: ["Pipe Repair", "Drain Cleaning", "Water Heater Service"],
      isOpen: true,
      openTime: "24/7 Emergency",
    },
  ];

  const categories = [
    { id: "all", label: "All Categories", count: savedBusinesses.length },
    {
      id: "Automotive",
      label: "Automotive",
      count: savedBusinesses.filter((b) => b.category === "Automotive").length,
    },
    {
      id: "Hotels & Dining",
      label: "Hotels & Dining",
      count: savedBusinesses.filter((b) => b.category === "Hotels & Dining")
        .length,
    },
    {
      id: "Electronics",
      label: "Electronics",
      count: savedBusinesses.filter((b) => b.category === "Electronics").length,
    },
    {
      id: "Beauty & Wellness",
      label: "Beauty & Wellness",
      count: savedBusinesses.filter((b) => b.category === "Beauty & Wellness")
        .length,
    },
    {
      id: "Healthcare",
      label: "Healthcare",
      count: savedBusinesses.filter((b) => b.category === "Healthcare").length,
    },
    {
      id: "Home Services",
      label: "Home Services",
      count: savedBusinesses.filter((b) => b.category === "Home Services")
        .length,
    },
  ];

  const filteredBusinesses = savedBusinesses.filter((business) => {
    const matchesCategory =
      selectedCategory === "all" || business.category === selectedCategory;
    const matchesSearch =
      business.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRemoveFromSaved = (businessId, e) => {
    e.stopPropagation();
    // In a real app, this would remove from saved list
    console.log("Removing business:", businessId);
  };

  const BusinessCard = ({ business, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div
          onClick={() =>
            navigate(
              `/business/${business.business
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/&/g, "and")}`
            )
          }
          className="flex items-start space-x-4"
        >
          {/* Business Image */}
          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={business.image}
              alt={business.business}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 items-center justify-center text-white font-bold text-lg hidden">
              {business.business.charAt(0)}
            </div>
          </div>

          {/* Business Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {business.business}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {business.speciality}
                </p>
              </div>
              <button
                onClick={(e) => handleRemoveFromSaved(business.id, e)}
                className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                title="Remove from saved"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Rating and Status */}
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  {business.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({business.reviewCount} reviews)
                </span>
              </div>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  business.isOpen
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {business.isOpen ? "Open" : "Closed"}
              </span>
            </div>

            {/* Location and Services */}
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {business.location}
              </div>
              <div className="flex flex-wrap gap-1">
                {business.services.slice(0, 2).map((service, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded"
                  >
                    {service}
                  </span>
                ))}
                {business.services.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{business.services.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-gray-500">
                Saved on {business.savedDate}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`tel:${business.phone}`);
                  }}
                  icon={Phone}
                  className="text-xs"
                >
                  Call
                </Button>
                <Button variant="primary" size="sm" className="text-xs">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Saved Businesses - Easy Life Gangtok</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Saved Businesses
                </h1>
                <p className="text-gray-600 text-sm">
                  {filteredBusinesses.length} saved businesses
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  icon={Search}
                  placeholder="Search saved businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary-100 text-primary-600 border border-primary-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business, index) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  index={index}
                />
              ))
            ) : (
              <Card className="p-8 text-center">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No saved businesses found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't saved any businesses yet"}
                </p>
                <Button onClick={() => navigate("/listings")} variant="primary">
                  Discover Businesses
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Always visible */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50 shadow-lg">
        <div className="grid grid-cols-4 gap-1 max-w-sm mx-auto">
          <button
            onClick={() => navigate("/customer-panel")}
            className="flex flex-col items-center py-2 px-1 min-w-0 text-gray-500"
          >
            <Activity className="w-5 h-5 mb-1 flex-shrink-0" />
            <span className="text-xs font-medium truncate">Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/customer-panel?view=bookings")}
            className="flex flex-col items-center py-2 px-1 min-w-0 text-gray-500"
          >
            <Calendar className="w-5 h-5 mb-1 flex-shrink-0" />
            <span className="text-xs font-medium truncate">Bookings</span>
          </button>
          <button
            onClick={() => navigate("/customer-panel?view=activity")}
            className="flex flex-col items-center py-2 px-1 min-w-0 text-gray-500"
          >
            <MessageCircle className="w-5 h-5 mb-1 flex-shrink-0" />
            <span className="text-xs font-medium truncate">Activity</span>
          </button>
          <button
            onClick={() => navigate("/saved-businesses")}
            className="flex flex-col items-center py-2 px-1 min-w-0 text-blue-600"
          >
            <Heart className="w-5 h-5 mb-1 flex-shrink-0" />
            <span className="text-xs font-medium truncate">Saved</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SavedBusinesses;
