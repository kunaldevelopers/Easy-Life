import React, { createContext, useContext, useState } from "react";

// Initial homepage configuration
const initialHomepageConfig = {
  hero: {
    title: "Find the Best Local Businesses in Gangtok",
    subtitle:
      "Your trusted directory for everything you need in Sikkim's capital",
    searchPlaceholder: "Search for businesses, services, or products...",
    backgroundImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    enabled: true,
  },
  categoriesGrid: {
    title: "Product Categories",
    description: "Browse by category to find exactly what you're looking for",
    showViewAllButton: true,
    selectedCategories: [
      "services",
      "food",
      "vehicles",
      "property",
      "electronics",
      "fashion",
    ],
  },
  hotDeals: {
    title: "Hot Deals & Offers",
    description: "Limited time offers from top businesses",
    products: [],
    isRandomized: true,
    maxItems: 12,
    enabled: true,
  },
  freshRecommendations: {
    title: "Fresh Recommendations",
    description: "Latest additions to our marketplace",
    products: [],
    isRandomized: true,
    maxItems: 16,
    enabled: true,
  },
};

// Create context
const HomepageConfigContext = createContext();

// Provider component
export const HomepageConfigProvider = ({ children }) => {
  const [homepageConfig, setHomepageConfig] = useState(initialHomepageConfig);

  const updateHomepageConfig = (section, field, value) => {
    setHomepageConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateFullSection = (section, data) => {
    setHomepageConfig((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const resetToDefaults = () => {
    setHomepageConfig(initialHomepageConfig);
  };

  const value = {
    homepageConfig,
    updateHomepageConfig,
    updateFullSection,
    resetToDefaults,
  };

  return (
    <HomepageConfigContext.Provider value={value}>
      {children}
    </HomepageConfigContext.Provider>
  );
};

// Hook to use the context
export const useHomepageConfig = () => {
  const context = useContext(HomepageConfigContext);
  if (!context) {
    throw new Error(
      "useHomepageConfig must be used within a HomepageConfigProvider"
    );
  }
  return context;
};

export default HomepageConfigContext;
