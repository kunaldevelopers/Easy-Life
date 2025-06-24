import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const TermsOfService = () => {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing and using Easy Life Gangtok ('the Platform'), you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all users of the platform, including customers, business owners, and visitors."
      ]
    },
    {
      id: "definitions",
      title: "2. Definitions",
      icon: FileText,
      content: [
        "'Platform' refers to the Easy Life Gangtok website, mobile application, and all related services.",
        "'User' means any person who accesses or uses the Platform.",
        "'Business' refers to service providers listed on the Platform.",
        "'Customer' refers to users seeking services through the Platform.",
        "'Content' includes all text, images, reviews, and other materials on the Platform."
      ]
    },
    {
      id: "user-accounts",
      title: "3. User Accounts",
      icon: Shield,
      content: [
        "You must provide accurate, current, and complete information during registration.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must notify us immediately of any unauthorized use of your account.",
        "Each user may maintain only one active account unless explicitly permitted.",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      id: "platform-usage",
      title: "4. Platform Usage",
      icon: CheckCircle,
      content: [
        "You may use the Platform only for lawful purposes and in accordance with these Terms.",
        "You agree not to use the Platform to transmit harmful, threatening, or inappropriate content.",
        "Spam, fraudulent activities, and misrepresentation are strictly prohibited.",
        "You may not attempt to gain unauthorized access to any part of the Platform.",
        "Commercial use of user data or business information is not permitted without consent."
      ]
    },
    {
      id: "business-listings",
      title: "5. Business Listings",
      icon: FileText,
      content: [
        "Businesses must provide accurate and up-to-date information about their services.",
        "All business listings are subject to verification and approval by our team.",
        "Businesses are responsible for the accuracy of their contact information and service descriptions.",
        "Fake or misleading business listings will be removed immediately.",
        "Businesses must comply with all local laws and regulations in their operations."
      ]
    },
    {
      id: "reviews-ratings",
      title: "6. Reviews and Ratings",
      icon: CheckCircle,
      content: [
        "Reviews must be based on genuine experiences with the business or service.",
        "Fake, fraudulent, or misleading reviews are prohibited and will be removed.",
        "Businesses cannot incentivize positive reviews or penalize negative reviews.",
        "We reserve the right to moderate and remove inappropriate reviews.",
        "Users should provide constructive feedback that helps other customers make informed decisions."
      ]
    },
    {
      id: "payments",
      title: "7. Payments and Fees",
      icon: Shield,
      content: [
        "Payment processing is handled by secure third-party payment providers.",
        "All fees are clearly disclosed before completing any transaction.",
        "Refunds are subject to individual business policies and our platform guidelines.",
        "We may charge service fees for premium features and business subscriptions.",
        "Businesses are responsible for all applicable taxes on their transactions."
      ]
    },
    {
      id: "intellectual-property",
      title: "8. Intellectual Property",
      icon: FileText,
      content: [
        "The Platform and its content are protected by copyright, trademark, and other intellectual property laws.",
        "Users retain ownership of content they create, but grant us license to use it on the Platform.",
        "You may not copy, modify, or distribute Platform content without permission.",
        "Business logos and trademarks remain the property of their respective owners.",
        "We respect intellectual property rights and respond to valid DMCA notices."
      ]
    },
    {
      id: "privacy",
      title: "9. Privacy and Data Protection",
      icon: Shield,
      content: [
        "Your privacy is important to us. Please review our Privacy Policy for details on data collection and use.",
        "We implement appropriate security measures to protect your personal information.",
        "Personal information is only shared with businesses for legitimate service purposes.",
        "You have the right to access, update, and delete your personal information.",
        "We comply with applicable data protection laws and regulations."
      ]
    },
    {
      id: "liability",
      title: "10. Limitation of Liability",
      icon: AlertTriangle,
      content: [
        "Easy Life Gangtok acts as a platform connecting customers with businesses and is not liable for service quality.",
        "We are not responsible for disputes between customers and businesses.",
        "Our liability is limited to the maximum extent permitted by law.",
        "We do not guarantee the accuracy, completeness, or reliability of user-generated content.",
        "Users engage with businesses at their own risk and should exercise due diligence."
      ]
    },
    {
      id: "termination",
      title: "11. Termination",
      icon: AlertTriangle,
      content: [
        "We may terminate or suspend your account at any time for violation of these Terms.",
        "You may terminate your account at any time by contacting our support team.",
        "Upon termination, your right to use the Platform ceases immediately.",
        "Certain provisions of these Terms survive termination, including intellectual property and liability clauses.",
        "We will provide reasonable notice before termination unless immediate action is required."
      ]
    },
    {
      id: "changes",
      title: "12. Changes to Terms",
      icon: Calendar,
      content: [
        "We reserve the right to modify these Terms at any time.",
        "Changes will be posted on this page with an updated effective date.",
        "Continued use of the Platform after changes constitutes acceptance of new Terms.",
        "Significant changes will be communicated via email or platform notifications.",
        "Users are encouraged to review these Terms periodically."
      ]
    }
  ];

  const keyPoints = [
    {
      icon: Shield,
      title: "User Protection",
      description: "We prioritize user safety and data protection"
    },
    {
      icon: CheckCircle,
      title: "Fair Usage",
      description: "Clear guidelines ensure fair platform usage for all"
    },
    {
      icon: FileText,
      title: "Transparency",
      description: "All terms are clearly explained and regularly updated"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - Easy Life Gangtok</title>
        <meta
          name="description"
          content="Read the Terms of Service for Easy Life Gangtok. Understand your rights and responsibilities when using our platform."
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
            <FileText className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Please read these terms carefully before using Easy Life Gangtok. 
              These terms govern your use of our platform and services.
            </p>
            <div className="flex items-center justify-center space-x-4 text-primary-200">
              <Calendar className="w-5 h-5" />
              <span>Last updated: December 24, 2024</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Points Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Principles
            </h2>
            <p className="text-xl text-gray-600">
              Our terms are built on these fundamental principles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <point.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600">
                    {point.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Content */}
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
              Questions About These Terms?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              If you have any questions about these Terms of Service, please contact us.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="p-6 text-center">
                <Mail className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Get detailed answers via email</p>
                <Button variant="outline" className="w-full">
                  legal@easylife.com
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              <Card className="p-6 text-center">
                <Phone className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our legal team</p>
                <Button variant="outline" className="w-full">
                  +91 98765 43200
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                These Terms of Service are governed by the laws of India and the state of Sikkim. 
                Any disputes will be resolved in the courts of Gangtok, Sikkim.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
