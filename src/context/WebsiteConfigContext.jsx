import React, { createContext, useContext, useState } from "react";

// Initial website content configuration
const initialWebsiteConfig = {
  // Homepage configuration
  homepage: {
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
  },

  // About page configuration
  about: {
    hero: {
      title: "About Easy Life Gangtok",
      subtitle: "Connecting Communities, Empowering Businesses",
      description:
        "We are dedicated to bridging the gap between local businesses and customers in beautiful Gangtok, Sikkim.",
      backgroundImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    mission: {
      title: "Our Mission",
      description:
        "To empower local businesses in Gangtok by providing them with a digital platform that connects them directly with customers, fostering economic growth and community development.",
    },
    vision: {
      title: "Our Vision",
      description:
        "To become the most trusted and comprehensive local business directory in Sikkim, making it easier for residents and visitors to discover and connect with quality services.",
    },
    stats: [
      {
        label: "Local Businesses",
        value: "500+",
        description: "Verified partners",
      },
      {
        label: "Happy Customers",
        value: "10,000+",
        description: "Satisfied users",
      },
      {
        label: "Years of Service",
        value: "3+",
        description: "Proven experience",
      },
      {
        label: "Customer Satisfaction",
        value: "98%",
        description: "Rating score",
      },
    ],
    coreValues: [
      {
        title: "Trust & Reliability",
        description:
          "Every business on our platform is thoroughly verified to ensure quality and authenticity.",
      },
      {
        title: "Community First",
        description:
          "We prioritize local businesses and foster genuine connections within our community.",
      },
      {
        title: "Innovation",
        description:
          "Constantly improving our platform with cutting-edge technology for better user experience.",
      },
      {
        title: "Customer Success",
        description:
          "Our success is measured by how well we serve both businesses and customers.",
      },
    ],
    team: [
      {
        name: "Rajesh Sharma",
        role: "Founder & CEO",
        image:
          "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
        description:
          "Visionary leader with 10+ years in local business development and community building.",
        expertise: "Strategy & Leadership",
      },
      {
        name: "Priya Rai",
        role: "Head of Business Relations",
        image:
          "https://images.pexels.com/photos/3760811/pexels-photo-3760811.jpeg?auto=compress&cs=tinysrgb&w=300",
        description:
          "Expert in building lasting partnerships and helping businesses maximize their digital potential.",
        expertise: "Business Development",
      },
      {
        name: "Karma Bhutia",
        role: "Customer Success Manager",
        image:
          "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
        description:
          "Dedicated to ensuring exceptional customer experiences and community satisfaction.",
        expertise: "Customer Relations",
      },
    ],
  },

  // Contact page configuration
  contact: {
    hero: {
      title: "Get in Touch",
      subtitle: "We're Here to Help",
      description:
        "Have questions or need assistance? Our team is ready to help you with any inquiries about our platform or services.",
    },
    contactInfo: [
      {
        type: "phone",
        title: "Phone",
        value: "+91 98765 43210",
        description: "Mon-Sat 9AM-7PM",
        icon: "phone",
      },
      {
        type: "email",
        title: "Email",
        value: "hello@easylifegangtok.com",
        description: "We reply within 24 hours",
        icon: "mail",
      },
      {
        type: "address",
        title: "Office",
        value: "MG Road, Gangtok, Sikkim 737101",
        description: "Visit us during business hours",
        icon: "mapPin",
      },
      {
        type: "whatsapp",
        title: "WhatsApp",
        value: "+91 98765 43210",
        description: "Quick support",
        icon: "messageCircle",
      },
    ],
    businessHours: {
      title: "Business Hours",
      schedule: [
        { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
        { day: "Sunday", hours: "Closed" },
      ],
    },
    supportCategories: [
      {
        id: "general",
        title: "General Inquiry",
        description: "Questions about our services",
      },
      {
        id: "business",
        title: "Business Partnership",
        description: "List your business with us",
      },
      {
        id: "technical",
        title: "Technical Support",
        description: "Report issues or bugs",
      },
      {
        id: "feedback",
        title: "Feedback",
        description: "Share your suggestions",
      },
    ],
  },

  // Privacy Policy page configuration
  privacy: {
    hero: {
      title: "Privacy Policy",
      subtitle: "Your Privacy Matters",
      description:
        "Learn how we collect, use, and protect your personal information on Easy Life Gangtok.",
      lastUpdated: "Last updated: January 1, 2024",
    },
    sections: [
      {
        id: "information-collection",
        title: "Information We Collect",
        content: [
          "Personal Information: Name, email address, phone number, and location data when you register or use our services.",
          "Business Information: Business details, contact information, and service descriptions from business owners.",
          "Usage Data: Information about how you interact with our platform, including pages visited and features used.",
          "Device Information: Browser type, device type, IP address, and operating system for security and optimization.",
          "Location Data: GPS coordinates and location preferences to show nearby businesses and improve recommendations.",
        ],
      },
      {
        id: "information-use",
        title: "How We Use Your Information",
        content: [
          "Provide and improve our platform services and user experience.",
          "Facilitate connections between customers and local businesses.",
          "Send important notifications about bookings, updates, and platform changes.",
          "Personalize content and recommendations based on your preferences and location.",
          "Ensure platform security and prevent fraudulent activities.",
          "Analyze usage patterns to improve our services and develop new features.",
        ],
      },
      {
        id: "information-sharing",
        title: "Information Sharing",
        content: [
          "We do not sell, trade, or rent your personal information to third parties.",
          "Business contact information is shared with customers only for legitimate service purposes.",
          "Aggregated, non-personal data may be shared for analytics and research purposes.",
          "We may share information with service providers who help us operate our platform.",
          "Legal authorities may receive information when required by law or to protect our users.",
        ],
      },
      {
        id: "data-security",
        title: "Data Security",
        content: [
          "We use industry-standard encryption to protect your data in transit and at rest.",
          "Access to personal information is restricted to authorized personnel only.",
          "Regular security audits and monitoring help us maintain platform security.",
          "Secure servers and firewalls protect against unauthorized access and cyber threats.",
          "Two-factor authentication is available for enhanced account security.",
        ],
      },
      {
        id: "user-rights",
        title: "Your Rights and Choices",
        content: [
          "Access: You can request a copy of the personal information we hold about you.",
          "Correction: You can update or correct your personal information at any time.",
          "Deletion: You can request deletion of your account and associated data.",
          "Portability: You can request your data in a structured, machine-readable format.",
          "Opt-out: You can unsubscribe from marketing communications at any time.",
        ],
      },
    ],
    contact: {
      title: "Privacy Questions",
      description:
        "If you have questions about this Privacy Policy, please contact us:",
      email: "privacy@easylifegangtok.com",
      phone: "+91 98765 43210",
    },
  },

  // Terms of Service page configuration
  terms: {
    hero: {
      title: "Terms of Service",
      subtitle: "Service Agreement",
      description:
        "Please read these terms carefully before using Easy Life Gangtok platform.",
      lastUpdated: "Last updated: January 1, 2024",
    },
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: [
          "By accessing and using Easy Life Gangtok ('the Platform'), you accept and agree to be bound by the terms and provision of this agreement.",
          "If you do not agree to abide by the above, please do not use this service.",
          "These terms apply to all users of the platform, including customers, business owners, and visitors.",
        ],
      },
      {
        id: "definitions",
        title: "Definitions",
        content: [
          "'Platform' refers to the Easy Life Gangtok website, mobile application, and all related services.",
          "'User' means any person who accesses or uses the Platform.",
          "'Business' refers to service providers listed on the Platform.",
          "'Customer' refers to users seeking services through the Platform.",
          "'Content' includes all text, images, reviews, and other materials on the Platform.",
        ],
      },
      {
        id: "user-accounts",
        title: "User Accounts",
        content: [
          "You must provide accurate, current, and complete information during registration.",
          "You are responsible for maintaining the confidentiality of your account credentials.",
          "You must notify us immediately of any unauthorized use of your account.",
          "Each user may maintain only one active account unless explicitly permitted.",
          "We reserve the right to suspend or terminate accounts that violate these terms.",
        ],
      },
      {
        id: "platform-usage",
        title: "Platform Usage",
        content: [
          "You may use the Platform only for lawful purposes and in accordance with these Terms.",
          "You agree not to use the Platform to transmit harmful, threatening, or inappropriate content.",
          "Spam, fraudulent activities, and misrepresentation are strictly prohibited.",
          "You may not attempt to gain unauthorized access to any part of the Platform.",
          "Commercial use of user data or business information is not permitted without consent.",
        ],
      },
      {
        id: "business-listings",
        title: "Business Listings",
        content: [
          "Businesses must provide accurate and up-to-date information about their services.",
          "All business listings are subject to verification and approval by our team.",
          "Businesses are responsible for the accuracy of their contact information and service descriptions.",
          "Fake or misleading business listings will be removed immediately.",
          "Businesses must comply with all local laws and regulations in their operations.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of Liability",
        content: [
          "Easy Life Gangtok acts as a platform connecting customers with businesses.",
          "We are not responsible for the quality, safety, or legality of services provided by businesses.",
          "Users engage with businesses at their own risk and discretion.",
          "Our liability is limited to the maximum extent permitted by law.",
          "We encourage users to exercise due diligence when selecting services.",
        ],
      },
    ],
    contact: {
      title: "Terms Questions",
      description:
        "If you have questions about these Terms of Service, please contact us:",
      email: "legal@easylifegangtok.com",
      phone: "+91 98765 43210",
    },
  },

  // Support page configuration
  support: {
    hero: {
      title: "Support Center",
      subtitle: "We're Here to Help",
      description:
        "Find answers to your questions or get in touch with our support team for personalized assistance.",
    },
    categories: [
      {
        id: "general",
        title: "General Support",
        description: "Get help with basic questions and guidance",
        icon: "headphones",
        color: "bg-blue-100 text-blue-600",
      },
      {
        id: "business",
        title: "Business Support",
        description: "Assistance for business owners and listings",
        icon: "users",
        color: "bg-green-100 text-green-600",
      },
      {
        id: "technical",
        title: "Technical Issues",
        description: "Report bugs, errors, or technical problems",
        icon: "settings",
        color: "bg-red-100 text-red-600",
      },
      {
        id: "account",
        title: "Account Help",
        description: "Login issues, profile management, and settings",
        icon: "fileText",
        color: "bg-purple-100 text-purple-600",
      },
    ],
    contactMethods: [
      {
        type: "phone",
        title: "Phone Support",
        value: "+91 98765 43210",
        availability: "Mon-Sat 9AM-7PM",
        recommended: true,
        icon: "phone",
      },
      {
        type: "email",
        title: "Email Support",
        value: "support@easylifegangtok.com",
        availability: "24/7 - Response within 24hrs",
        recommended: false,
        icon: "mail",
      },
      {
        type: "whatsapp",
        title: "WhatsApp Chat",
        value: "+91 98765 43210",
        availability: "Mon-Sat 9AM-7PM",
        recommended: true,
        icon: "messageCircle",
      },
    ],
    faq: [
      {
        question: "How do I list my business?",
        answer:
          "Create an account as a business owner and submit your business details for verification. Our team will review and approve your listing within 24-48 hours.",
        category: "business",
      },
      {
        question: "Is the service free for customers?",
        answer:
          "Yes, browsing and searching for businesses is completely free for customers. You can view business details, ratings, and contact information at no cost.",
        category: "general",
      },
      {
        question: "How do you verify businesses?",
        answer:
          "We verify businesses through document verification, location verification, and quality checks to ensure authenticity and reliability.",
        category: "business",
      },
      {
        question: "Can I update my business information?",
        answer:
          "Yes, business owners can log into their dashboard and update their information, hours, services, and photos anytime.",
        category: "account",
      },
      {
        question: "What if I encounter a technical issue?",
        answer:
          "Please report technical issues through our support form or contact us directly. Include details about the issue and your browser/device information.",
        category: "technical",
      },
    ],
    resources: [
      {
        title: "Getting Started Guide",
        description: "Learn the basics of using our platform",
        type: "guide",
      },
      {
        title: "Business Owner Handbook",
        description: "Complete guide for business listings",
        type: "handbook",
      },
      {
        title: "API Documentation",
        description: "Technical documentation for developers",
        type: "technical",
      },
      {
        title: "Video Tutorials",
        description: "Step-by-step video guides",
        type: "video",
      },
    ],
  },
};

// Create context
const WebsiteConfigContext = createContext();

// Provider component
export const WebsiteConfigProvider = ({ children }) => {
  const [websiteConfig, setWebsiteConfig] = useState(initialWebsiteConfig);

  const updatePageConfig = (page, section, field, value) => {
    setWebsiteConfig((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: {
          ...prev[page][section],
          [field]: value,
        },
      },
    }));
  };

  const updatePageSection = (page, section, data) => {
    setWebsiteConfig((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: data,
      },
    }));
  };

  const updateFullPage = (page, data) => {
    setWebsiteConfig((prev) => ({
      ...prev,
      [page]: data,
    }));
  };

  const resetToDefaults = () => {
    setWebsiteConfig(initialWebsiteConfig);
  };

  const value = {
    websiteConfig,
    updatePageConfig,
    updatePageSection,
    updateFullPage,
    resetToDefaults,
  };

  return (
    <WebsiteConfigContext.Provider value={value}>
      {children}
    </WebsiteConfigContext.Provider>
  );
};

// Hook to use the context
export const useWebsiteConfig = () => {
  const context = useContext(WebsiteConfigContext);
  if (!context) {
    throw new Error(
      "useWebsiteConfig must be used within a WebsiteConfigProvider"
    );
  }
  return context;
};

export default WebsiteConfigContext;
