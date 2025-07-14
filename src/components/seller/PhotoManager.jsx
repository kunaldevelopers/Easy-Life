import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Upload,
  Trash2,
  Star,
  Edit,
  Move,
  Eye,
  Grid,
  List,
  Camera,
  Plus,
  X,
  Heart,
  Share2,
  Download,
  Filter,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const PhotoManager = ({ onBack }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

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

  const filteredPhotos =
    filterCategory === "all"
      ? photos
      : photos.filter(
          (photo) =>
            photo.category.toLowerCase() === filterCategory.toLowerCase()
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
      console.log("Deleting photos:", selectedPhotos);
      setSelectedPhotos([]);
    }
  };

  const handleSetMainPhoto = (photoId) => {
    console.log("Setting main photo:", photoId);
  };

  const handleUpload = () => {
    console.log("Opening file upload dialog");
    // In real app, this would open file upload
    alert("File upload functionality would open here");
  };

  // Mobile detection useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile Photo Detail View
  if (isMobile && selectedPhoto) {
    return (
      <div className="min-h-screen bg-black">
        {/* Mobile Photo Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex space-x-3">
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Photo Display */}
        <div className="flex items-center justify-center min-h-screen">
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Photo Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h2 className="text-lg font-semibold mb-2">{selectedPhoto.title}</h2>
          <p className="text-gray-300 text-sm mb-3">
            {selectedPhoto.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{selectedPhoto.views}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{selectedPhoto.likes}</span>
              </span>
            </div>
            <span className="text-gray-300">{selectedPhoto.uploadDate}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Photos</h1>
              <p className="text-sm text-gray-500">
                {filteredPhotos.length} photos
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {viewMode === "grid" ? (
                <List className="w-5 h-5" />
              ) : (
                <Grid className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => {
                /* Handle upload */
              }}
              className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Filter */}
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {["all", "food", "interior", "events", "kitchen"].map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                filterCategory === category
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block py-8">
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

            <Button
              onClick={() => {
                /* Handle upload */
              }}
              variant="primary"
              icon={Upload}
            >
              Upload Photos
            </Button>
          </div>

          {/* Desktop Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Camera className="w-6 h-6 text-blue-600" />
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
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {photos.reduce((sum, photo) => sum + photo.views, 0)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-red-100">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Likes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {photos.reduce((sum, photo) => sum + photo.likes, 0)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Main Photo
                  </p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Photos Grid */}
      <div className="lg:hidden p-4">
        {selectedPhotos.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedPhotos.length} photo(s) selected
            </span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedPhotos([])}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                  selectedPhotos.includes(photo.id)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="aspect-square bg-gray-200">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  {photo.isMain && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="w-3 h-3 mr-1" />
                        Main
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPhoto(photo.id);
                      }}
                      className={`w-6 h-6 rounded-full border-2 border-white ${
                        selectedPhotos.includes(photo.id)
                          ? "bg-blue-500"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    >
                      {selectedPhotos.includes(photo.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate">
                      {photo.title}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/80 mt-1">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{photo.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{photo.likes}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPhotos.map((photo) => (
              <Card
                key={photo.id}
                className={`p-4 cursor-pointer ${
                  selectedPhotos.includes(photo.id)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {photo.title}
                      </h3>
                      {photo.isMain && (
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate mb-2">
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{photo.uploadDate}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{photo.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{photo.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPhoto(photo.id);
                    }}
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 ${
                      selectedPhotos.includes(photo.id)
                        ? "bg-blue-500 border-blue-500"
                        : "hover:border-gray-400"
                    }`}
                  >
                    {selectedPhotos.includes(photo.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No photos found</h3>
              <p className="text-sm">
                {filterCategory !== "all"
                  ? `No photos in ${filterCategory} category`
                  : "Upload your first photo to get started"}
              </p>
            </div>
          </Card>
        )}

        {/* Mobile Upload Button */}
        <div className="fixed bottom-20 right-4">
          <button
            onClick={() => {
              /* Handle upload */
            }}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center py-8">
              <p className="text-gray-600">
                Desktop photo grid would be here with advanced features
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager;
