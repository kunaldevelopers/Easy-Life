import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Mail,
  Share2,
  Heart,
  Verified,
  ArrowLeft,
  Calendar,
  Tag,
  Users,
  Award,
} from "lucide-react";
import { businesses } from "../data/businesses";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  useEffect(() => {
    const foundBusiness = businesses.find((b) => b.id === parseInt(id));
    if (foundBusiness) {
      setBusiness(foundBusiness);
    } else {
      // Redirect to listings if business not found
      navigate("/listings");
    }
  }, [id, navigate]);

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading business details...</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const isOpen = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
    const todayHours = business.hours?.[currentDay];
    return todayHours && todayHours !== "Closed";
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: business.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleBookNow = () => {
    // Redirect to booking page or show booking modal
    // For now, we'll redirect to a booking page with business ID
    navigate(`/book/${business.id}`);
  };

  return (
    <>
      <Helmet>
        <title>{business.name} - Easy Life Gangtok</title>
        <meta name="description" content={business.description} />
      </Helmet>

      <div className="bg-white">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>

        {/* Image Gallery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <img
                  src={
                    business.images?.[selectedImageIndex] ||
                    business.images?.[0] ||
                    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"
                  }
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                {business.verified && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                      <Verified className="w-4 h-4 mr-1" />
                      Verified
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={handleShare}
                    className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors ${
                      isFavorite ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {business.images && business.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {business.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index
                          ? "border-primary-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${business.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Business Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {business.name}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {renderStars(business.rating)}
                        <span className="ml-2 text-lg font-medium">
                          {business.rating}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        ({business.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isOpen()
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isOpen() ? "Open Now" : "Closed"}
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {showFullDescription
                    ? business.description
                    : business.description.slice(0, 150)}
                  {business.description.length > 150 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-primary-600 ml-2 font-medium hover:text-primary-700"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  )}
                </p>
              </div>

              {/* Tags */}
              {business.tags && business.tags.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {business.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="w-full">
                <Button
                  onClick={handleBookNow}
                  variant="primary"
                  icon={Calendar}
                  className="w-full"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Services */}
              {business.services && business.services.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Services
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {business.services.map((service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Business Hours */}
              {business.hours && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Business Hours
                  </h2>
                  <div className="space-y-2">
                    {Object.entries(business.hours).map(([day, hours]) => (
                      <div
                        key={day}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-gray-700 font-medium">{day}</span>
                        <span
                          className={`${
                            hours === "Closed"
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Reviews Preview */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Customer Reviews
                </h2>
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Reviews coming soon!</p>
                  <p className="text-sm text-gray-500">
                    Be the first to leave a review for {business.name}
                  </p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {business.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{business.email}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {business.address || business.location}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Pricing */}
              {business.pricing && (
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {business.pricing}
                    </span>
                  </div>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={handleBookNow}
                    variant="primary"
                    icon={Calendar}
                    className="w-full justify-start"
                  >
                    Book Now
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    icon={Share2}
                    className="w-full justify-start"
                  >
                    Share Business
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BusinessDetail;
