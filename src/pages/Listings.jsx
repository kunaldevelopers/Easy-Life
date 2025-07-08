import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { businesses } from "../data/businesses";
import { categories } from "../data/categories";
import BusinessCard from "../components/listings/BusinessCard";
import Filters from "../components/listings/Filters";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: searchParams.get("category")
      ? [searchParams.get("category")]
      : [],
    locations: searchParams.get("location")
      ? [searchParams.get("location")]
      : [],
    minRating: null,
    openNow: false,
    verified: false,
    hasOffers: false,
  });

  const itemsPerPage = 12;

  // Watch for URL parameter changes and update filters
  useEffect(() => {
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const query = searchParams.get("q") || "";

    // Update search query if different
    setSearchQuery(query);

    // Update filters when URL parameters change
    setFilters((prevFilters) => {
      const newCategories = category ? [category] : [];
      const newLocations = location ? [location] : [];

      // Only update if actually different to prevent loops
      if (
        JSON.stringify(prevFilters.categories) !==
          JSON.stringify(newCategories) ||
        JSON.stringify(prevFilters.locations) !== JSON.stringify(newLocations)
      ) {
        return {
          ...prevFilters,
          categories: newCategories,
          locations: newLocations,
        };
      }
      return prevFilters;
    });
  }, [searchParams]);

  // Update search params when filters change (but not from URL changes)
  useEffect(() => {
    const currentCategory = searchParams.get("category");
    const currentLocation = searchParams.get("location");
    const currentQuery = searchParams.get("q") || "";

    const newCategory =
      filters.categories.length > 0 ? filters.categories[0] : null;
    const newLocation =
      filters.locations.length > 0 ? filters.locations[0] : null;

    // Only update URL if the values are actually different
    if (
      currentCategory !== newCategory ||
      currentLocation !== newLocation ||
      currentQuery !== searchQuery
    ) {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (newCategory) params.set("category", newCategory);
      if (newLocation) params.set("location", newLocation);
      setSearchParams(params, { replace: true });
    }
  }, [searchQuery, filters.categories, filters.locations]);

  // Filter and sort businesses
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses.filter((business) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          business.name.toLowerCase().includes(query) ||
          business.description.toLowerCase().includes(query) ||
          business.subcategory.toLowerCase().includes(query) ||
          business.services?.some((service) =>
            service.toLowerCase().includes(query)
          ) ||
          business.tags?.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(business.subcategory)) return false;
      }

      // Location filter
      if (filters.locations.length > 0) {
        if (!filters.locations.includes(business.location)) return false;
      }

      // Rating filter
      if (filters.minRating) {
        if (business.rating < filters.minRating) return false;
      }

      // Verified filter
      if (filters.verified && !business.verified) return false;

      // Open now filter (simplified)
      if (filters.openNow) {
        const currentDay = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });
        const todayHours = business.hours?.[currentDay];
        if (todayHours === "Closed") return false;
      }

      return true;
    });

    // Sort businesses
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        // Mock sorting by newest (would use actual date in real app)
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [businesses, searchQuery, filters, sortBy]);

  // Paginated businesses
  const paginatedBusinesses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBusinesses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBusinesses, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      locations: [],
      minRating: null,
      openNow: false,
      verified: false,
      hasOffers: false,
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const getPageTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (filters.categories.length > 0) {
      const categoryName = categories
        .flatMap((cat) => cat.subcategories)
        .find((sub) => sub.id === filters.categories[0])?.name;
      return `${categoryName} in Gangtok`;
    }
    return "All Business Listings in Gangtok";
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()} - Easy Life Gangtok</title>
        <meta
          name="description"
          content={`Find the best local businesses and services in Gangtok. Browse ${filteredBusinesses.length} verified listings.`}
        />
        <meta
          name="keywords"
          content="Gangtok businesses, local services, business directory Sikkim"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {getPageTitle()}
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredBusinesses.length} business
                  {filteredBusinesses.length !== 1 ? "es" : ""} found
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search businesses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-card p-6 h-fit sticky top-24">
                <Filters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  isOpen={true}
                  onToggle={() => {}}
                  isMobile={false}
                />
              </div>
            </div>

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div className="lg:hidden">
                <Filters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  isOpen={showFilters}
                  onToggle={() => setShowFilters(!showFilters)}
                  isMobile={true}
                />
              </div>
            )}

            {/* Main Content */}
            <div className="w-full lg:flex-1 min-w-0">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowFilters(true)}
                    variant="outline"
                    size="sm"
                    icon={Filter}
                    className="lg:hidden"
                  >
                    Filters
                  </Button>

                  <div className="hidden sm:flex items-center space-x-2">
                    <Button
                      onClick={() => setViewMode("grid")}
                      variant={viewMode === "grid" ? "primary" : "ghost"}
                      size="sm"
                      icon={Grid}
                    />
                    <Button
                      onClick={() => setViewMode("list")}
                      variant={viewMode === "list" ? "primary" : "ghost"}
                      size="sm"
                      icon={List}
                    />
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 hidden sm:block">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              {filteredBusinesses.length > 0 ? (
                <>
                  <div
                    className={`grid gap-6 ${
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {paginatedBusinesses.map((business, index) => (
                      <div key={business.id} className="h-full">
                        <BusinessCard business={business} index={index} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-12">
                      <Button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                      >
                        Previous
                      </Button>

                      <div className="flex space-x-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const page = i + 1;
                            return (
                              <Button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                variant={
                                  currentPage === page ? "primary" : "ghost"
                                }
                                size="sm"
                                className="w-10 h-10"
                              >
                                {page}
                              </Button>
                            );
                          }
                        )}
                      </div>

                      <Button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No businesses found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={handleClearFilters} variant="primary">
                    Clear All Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listings;
