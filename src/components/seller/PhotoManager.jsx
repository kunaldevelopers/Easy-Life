import React, { useState } from "react";
import { ArrowLeft, Upload, Trash2, Star, Edit, Move, Eye } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const PhotoManager = ({ onBack }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const photos = [
    {
      id: 1,
      url: "/api/placeholder/400/300",
      title: "Delicious Momos",
      description: "Fresh steamed momos with traditional dipping sauce",
      category: "Food",
      isMain: true,
      uploadDate: "2024-06-20",
      views: 245,
      likes: 18,
    },
    {
      id: 2,
      url: "/api/placeholder/400/300",
      title: "Restaurant Interior",
      description: "Cozy dining area with traditional Himalayan decor",
      category: "Interior",
      isMain: false,
      uploadDate: "2024-06-18",
      views: 189,
      likes: 12,
    },
    {
      id: 3,
      url: "/api/placeholder/400/300",
      title: "Traditional Thukpa",
      description: "Hot and spicy noodle soup perfect for cold weather",
      category: "Food",
      isMain: false,
      uploadDate: "2024-06-15",
      views: 156,
      likes: 24,
    },
    {
      id: 4,
      url: "/api/placeholder/400/300",
      title: "Kitchen Setup",
      description: "Clean and modern kitchen with professional equipment",
      category: "Kitchen",
      isMain: false,
      uploadDate: "2024-06-12",
      views: 98,
      likes: 8,
    },
    {
      id: 5,
      url: "/api/placeholder/400/300",
      title: "Wedding Catering Setup",
      description: "Beautiful buffet arrangement for wedding celebration",
      category: "Events",
      isMain: false,
      uploadDate: "2024-06-10",
      views: 312,
      likes: 45,
    },
    {
      id: 6,
      url: "/api/placeholder/400/300",
      title: "Fresh Ingredients",
      description: "Locally sourced fresh vegetables and spices",
      category: "Ingredients",
      isMain: false,
      uploadDate: "2024-06-08",
      views: 123,
      likes: 15,
    },
  ];

  const categories = [
    "All",
    "Food",
    "Interior",
    "Kitchen",
    "Events",
    "Ingredients",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPhotos = photos.filter(
    (photo) => selectedCategory === "All" || photo.category === selectedCategory
  );

  const handlePhotoSelect = (photoId) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPhotos.length === filteredPhotos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(filteredPhotos.map((photo) => photo.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedPhotos.length > 0) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${selectedPhotos.length} photo(s)?`
      );
      if (confirmDelete) {
        console.log("Deleting photos:", selectedPhotos);
        setSelectedPhotos([]);
        alert("Photos deleted successfully!");
      }
    }
  };

  const handleSetMain = (photoId) => {
    console.log("Setting photo as main:", photoId);
    alert("Main photo updated successfully!");
  };

  const handleUpload = () => {
    console.log("Opening file upload dialog");
    // In real app, this would open file upload
    alert("File upload functionality would open here");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Photo Manager
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your business photos and gallery
              </p>
            </div>
          </div>

          <Button onClick={handleUpload} variant="primary" icon={Upload}>
            Upload Photos
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Photos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {photos.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {photos.reduce((sum, photo) => sum + photo.views, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {photos.reduce((sum, photo) => sum + photo.likes, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Main Photo</p>
                <p className="text-2xl font-bold text-gray-900">Set</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Category:
              </span>
              <div className="flex space-x-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Selection Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSelectAll}
                className="text-sm text-primary-600 hover:text-primary-800 font-medium"
              >
                {selectedPhotos.length === filteredPhotos.length
                  ? "Deselect All"
                  : "Select All"}
              </button>

              {selectedPhotos.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {selectedPhotos.length} selected
                  </span>
                  <Button
                    onClick={handleDeleteSelected}
                    variant="outline"
                    size="sm"
                    icon={Trash2}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                {/* Photo */}
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    Photo {photo.id}
                  </span>
                </div>

                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedPhotos.includes(photo.id)}
                    onChange={() => handlePhotoSelect(photo.id)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                </div>

                {/* Main Photo Badge */}
                {photo.isMain && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Main
                    </span>
                  </div>
                )}

                {/* Stats Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black bg-opacity-60 rounded px-2 py-1 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-3 h-3" />
                      <span>{photo.views}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-3 h-3" />
                      <span>{photo.likes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {photo.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {photo.category}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {photo.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Uploaded: {photo.uploadDate}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {!photo.isMain && (
                    <Button
                      onClick={() => handleSetMain(photo.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      icon={Star}
                    >
                      Set Main
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    icon={Edit}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Upload New Photo Card */}
          <Card className="overflow-hidden border-2 border-dashed border-gray-300 hover:border-primary-300 transition-colors cursor-pointer">
            <div
              onClick={handleUpload}
              className="aspect-square flex flex-col items-center justify-center text-gray-500 hover:text-primary-600 transition-colors p-6"
            >
              <Upload className="w-12 h-12 mb-4" />
              <h3 className="font-medium text-lg mb-2">Upload New Photos</h3>
              <p className="text-sm text-center">
                Add high-quality images to showcase your business
              </p>
            </div>
          </Card>
        </div>

        {/* Upload Guidelines */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4">
            Photo Upload Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Technical Requirements:</h4>
              <ul className="space-y-1">
                <li>• Minimum resolution: 800x600 pixels</li>
                <li>• Maximum file size: 5MB per photo</li>
                <li>• Supported formats: JPG, PNG, WebP</li>
                <li>• Maximum 20 photos per business</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Use high-quality, well-lit photos</li>
                <li>• Show your products and services clearly</li>
                <li>• Include interior and exterior shots</li>
                <li>• Update photos regularly to keep content fresh</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PhotoManager;
