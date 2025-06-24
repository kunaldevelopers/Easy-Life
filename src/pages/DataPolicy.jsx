import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Share2,
  UserCheck,
  Settings,
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      icon: Database,
      content: [
        "Personal Information: Name, email address, phone number, and location data when you register or use our services.",
        "Business Information: Business details, contact information, and service descriptions from business owners.",
        "Usage Data: Information about how you interact with our platform, including pages visited and features used.",
        "Device Information: Browser type, device type, IP address, and operating system for security and optimization.",
        "Location Data: GPS coordinates and location preferences to show nearby businesses and improve recommendations."
      ]
    },
    {
      id: "information-use",
      title: "2. How We Use Your Information",
      icon: Settings,
      content: [
        "Provide and improve our platform services and user experience.",
        "Facilitate connections between customers and local businesses.",
        "Send important notifications about bookings, updates, and platform changes.",
        "Personalize content and recommendations based on your preferences and location.",
        "Ensure platform security and prevent fraudulent activities.",
        "Analyze usage patterns to improve our services and develop new features.",
        "Comply with legal obligations and respond to law enforcement requests when required."
      ]
    },
    {
      id: "information-sharing",
      title: "3. Information Sharing",
      icon: Share2,
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "Business contact information is shared with customers only for legitimate service purposes.",
        "Aggregated, non-personal data may be shared for analytics and research purposes.",
        "We may share information with service providers who help us operate our platform.",
        "Legal authorities may receive information when required by law or to protect our users.",
        "Business partners may receive limited data for integration purposes with proper safeguards."
      ]
    },
    {
      id: "data-security",
      title: "4. Data Security",
      icon: Lock,
      content: [
        "We use industry-standard encryption to protect your data in transit and at rest.",
        "Access to personal information is restricted to authorized personnel only.",
        "Regular security audits and monitoring help us maintain platform security.",
        "Secure servers and firewalls protect against unauthorized access and cyber threats.",
        "Two-factor authentication is available for enhanced account security.",
        "We have incident response procedures in place for any potential data breaches."
      ]
    },
    {
      id: "cookies-tracking",
      title: "5. Cookies and Tracking",
      icon: Eye,
      content: [
        "We use cookies to enhance your browsing experience and remember your preferences.",
        "Essential cookies are necessary for platform functionality and cannot be disabled.",
        "Analytics cookies help us understand user behavior and improve our services.",
        "Marketing cookies may be used to show relevant advertisements and promotions.",
        "You can control cookie settings through your browser preferences.",
        "Third-party services may use their own cookies subject to their privacy policies."
      ]
    },
    {
      id: "user-rights",
      title: "6. Your Rights and Choices",
      icon: UserCheck,
      content: [
        "Access: You can request a copy of the personal information we hold about you.",
        "Correction: You can update or correct your personal information at any time.",
        "Deletion: You can request deletion of your account and associated data.",
        "Portability: You can request your data in a structured, machine-readable format.",
        "Opt-out: You can unsubscribe from marketing communications at any time.",
        "Complaint: You can file complaints with relevant data protection authorities."
      ]
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      icon: Database,
      content: [
        "Account information is retained as long as your account remains active.",
        "Business listings and reviews are kept to maintain platform integrity and usefulness.",
        "Inactive accounts may be deleted after 2 years of inactivity with prior notice.",
        "Transaction and booking data is retained for 7 years for legal and tax purposes.",
        "Analytics data is retained in aggregated form for up to 3 years.",
        "Deleted data is securely purged from our systems within 30 days of deletion request."
      ]
    },
    {
      id: "third-party-services",
      title: "8. Third-Party Services",
      icon: Share2,
      content: [
        "Payment processing is handled by secure third-party providers (Razorpay, Stripe).",
        "Map services are provided by Google Maps and subject to Google's privacy policy.",
        "Social media login options are subject to respective platform privacy policies.",
        "Analytics services (Google Analytics) help us understand user behavior.",
        "Customer support tools may be used to provide better assistance.",
        "We carefully vet all third-party services to ensure they meet our privacy standards."
      ]
    },
    {
      id: "children-privacy",
      title: "9. Children's Privacy",
      icon: Shield,
      content: [
        "Our platform is not intended for children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If we learn that we have collected information from a child under 13, we will delete it promptly.",
        "Parents or guardians can contact us to request deletion of their child's information.",
        "We encourage parents to monitor their children's online activities."
      ]
    },
    {
      id: "international-transfers",
      title: "10. International Data Transfers",
      icon: Share2,
      content: [
        "Your data is primarily stored on servers located in India.",
        "Some third-party services may transfer data internationally with appropriate safeguards.",
        "We ensure adequate protection levels for any international data transfers.",
        "Data transfers comply with applicable data protection laws and regulations.",
        "We use standard contractual clauses and other legal mechanisms for protection."
      ]
    },
    {
      id: "policy-changes",
      title: "11. Policy Changes",
      icon: Calendar,
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices.",
        "Material changes will be communicated via email or platform notifications.",
        "The updated policy will be posted on this page with a new effective date.",
        "Continued use of our platform after changes constitutes acceptance of the updated policy.",
        "We encourage users to review this policy periodically for any updates."
      ]
    }
  ];

  const privacyFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your data is encrypted at all times"
    },
    {
      icon: UserCheck,
      title: "User Control",
      description: "You control what information you share"
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "We follow international privacy standards"
    },
    {
      icon: Eye,
      title: "Transparent Practices",
      description: "Clear information about data usage"
    }
  ];

  const dataTypes = [
    { type: "Account Information", purpose: "Platform access and personalization", retention: "Active account duration" },
    { type: "Business Listings", purpose: "Service discovery and bookings", retention: "Business account duration" },
    { type: "Reviews & Ratings", purpose: "Community trust and quality", retention: "Permanent (anonymized)" },
    { type: "Transaction Data", purpose: "Payment processing and records", retention: "7 years" },
    { type: "Usage Analytics", purpose: "Platform improvement", retention: "3 years (aggregated)" },
    { type: "Support Communications", purpose: "Customer assistance", retention: "2 years" }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Easy Life Gangtok</title>
        <meta
          name="description"
          content="Learn how Easy Life Gangtok protects your privacy and handles your personal information. Read our comprehensive Privacy Policy."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information on Easy Life Gangtok.
            </p>
            <div className="flex items-center justify-center space-x-4 text-primary-200">
              <Calendar className="w-5 h-5" />
              <span>Last updated: December 24, 2024</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Privacy Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Privacy, Our Priority
            </h2>
            <p className="text-xl text-gray-600">
              We've built privacy protection into every aspect of our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Data Usage Table */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Data Usage Overview</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-gray-900 font-semibold">Data Type</th>
                    <th className="pb-3 text-gray-900 font-semibold">Purpose</th>
                    <th className="pb-3 text-gray-900 font-semibold">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTypes.map((data, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 font-medium text-gray-900">{data.type}</td>
                      <td className="py-3 text-gray-600">{data.purpose}</td>
                      <td className="py-3 text-gray-600">{data.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Policy Content */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <section.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h3>
                      <div className="space-y-3">
                        {section.content.map((paragraph, idx) => (
                          <p key={idx} className="text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Privacy Questions or Concerns?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact our Data Protection Officer for any privacy-related inquiries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="p-6 text-center">
                <Mail className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Data protection inquiries</p>
                <Button variant="outline" className="w-full">
                  privacy@easylife.com
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              <Card className="p-6 text-center">
                <Settings className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Settings</h3>
                <p className="text-gray-600 mb-4">Manage your data preferences</p>
                <Button variant="outline" className="w-full">
                  Account Settings
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">ISO 27001 Certified</span>
              </div>
              <p className="text-gray-600">
                Easy Life Gangtok is committed to maintaining the highest standards of data protection and privacy. 
                We regularly audit our practices to ensure compliance with international privacy laws.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
