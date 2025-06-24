import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Minus,
  HelpCircle,
  Users,
  Building,
  CreditCard,
  Shield,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState(new Set());

  const categories = [
    { id: "general", label: "General", icon: HelpCircle },
    { id: "customers", label: "For Customers", icon: Users },
    { id: "businesses", label: "For Businesses", icon: Building },
    { id: "payments", label: "Payments & Billing", icon: CreditCard },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
  ];

  const faqs = {
    general: [
      {
        id: 1,
        question: "What is Easy Life Gangtok?",
        answer:
          "Easy Life Gangtok is a comprehensive local business directory platform that connects customers with trusted service providers in Gangtok, Sikkim. We help you discover, compare, and book local services ranging from electricians and plumbers to restaurants and hotels.",
      },
      {
        id: 2,
        question: "How do I find services on Easy Life Gangtok?",
        answer:
          "You can search for services using our search bar, browse by categories, filter by location, or use our map feature. You can also check ratings, reviews, and business hours to make informed decisions.",
      },
      {
        id: 3,
        question: "Is Easy Life Gangtok free to use?",
        answer:
          "Yes, Easy Life Gangtok is completely free for customers. You can search, browse, and contact businesses without any charges. Our platform is funded through business partnerships and premium listings.",
      },
      {
        id: 4,
        question: "How are businesses verified on your platform?",
        answer:
          "We have a comprehensive verification process that includes document verification, business license checks, customer feedback monitoring, and regular quality assessments to ensure all listed businesses meet our standards.",
      },
      {
        id: 5,
        question: "Can I book services directly through the platform?",
        answer:
          "Yes, many businesses offer direct booking through our platform. You can check availability, book appointments, and receive confirmation messages. For businesses without online booking, we provide contact information for direct communication.",
      },
    ],
    customers: [
      {
        id: 6,
        question: "How do I create a customer account?",
        answer:
          "Click on 'Sign Up' in the top navigation, choose 'Customer' as your account type, fill in your details, and verify your email or phone number. You can also sign up using Google or Facebook for faster registration.",
      },
      {
        id: 7,
        question: "How do I leave reviews for businesses?",
        answer:
          "After using a service, log into your account, find the business you visited, and click 'Write a Review'. Rate your experience from 1-5 stars and share your feedback to help other customers make informed decisions.",
      },
      {
        id: 8,
        question: "Can I save my favorite businesses?",
        answer:
          "Yes, you can save businesses to your favorites list by clicking the heart icon. Access your saved businesses anytime from your customer dashboard for quick reference and easy rebooking.",
      },
      {
        id: 9,
        question: "How do I report inappropriate content or businesses?",
        answer:
          "If you encounter any inappropriate content, fake reviews, or problematic businesses, use the 'Report' button on the business profile or contact our support team. We take all reports seriously and investigate promptly.",
      },
      {
        id: 10,
        question: "Do I get notifications for my bookings?",
        answer:
          "Yes, we send SMS and email notifications for booking confirmations, reminders, cancellations, and important updates. You can manage your notification preferences in your account settings.",
      },
    ],
    businesses: [
      {
        id: 11,
        question: "How do I list my business on Easy Life Gangtok?",
        answer:
          "Click 'Sign Up' and choose 'Business Owner' as your account type. Complete the registration with your business details, upload verification documents, and wait for our approval process which typically takes 24-48 hours.",
      },
      {
        id: 12,
        question:
          "What information do I need to provide for my business listing?",
        answer:
          "You'll need basic business information (name, address, phone), business license, category/services offered, operating hours, photos of your business, and bank details for payment processing if applicable.",
      },
      {
        id: 13,
        question: "How much does it cost to list my business?",
        answer:
          "Basic business listings are free and include essential information and customer reviews. We offer premium plans starting from ₹999/month with features like priority placement, advanced analytics, and promotional tools.",
      },
      {
        id: 14,
        question: "How do I manage my business profile and bookings?",
        answer:
          "Log into your business dashboard to update your profile, manage bookings, respond to reviews, view analytics, and communicate with customers. You can also upload new photos and update your services.",
      },
      {
        id: 15,
        question: "How do I handle customer complaints or negative reviews?",
        answer:
          "Respond professionally to all reviews through your dashboard. For legitimate complaints, reach out to resolve issues directly. For fake or inappropriate reviews, you can report them to our moderation team for review.",
      },
    ],
    payments: [
      {
        id: 16,
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit/debit cards, UPI payments, net banking, and digital wallets. For business subscriptions, we also accept bank transfers and provide invoicing options.",
      },
      {
        id: 17,
        question: "How do payment processing fees work?",
        answer:
          "For businesses using our payment gateway, we charge a standard processing fee of 2.5% + GST per transaction. This covers payment processing, fraud protection, and transaction support.",
      },
      {
        id: 18,
        question: "When do businesses receive their payments?",
        answer:
          "Payments are typically settled within 2-3 business days after successful completion of services. Premium business accounts can opt for next-day settlement for faster cash flow.",
      },
      {
        id: 19,
        question: "What if I need a refund?",
        answer:
          "Refund policies vary by business and service type. Generally, cancellations made 24 hours before appointments are eligible for full refunds. Contact the business directly or our support team for assistance.",
      },
      {
        id: 20,
        question: "How do I access my payment history and invoices?",
        answer:
          "All payment history, invoices, and transaction details are available in your account dashboard under the 'Billing' section. You can download invoices for accounting purposes and track all payments.",
      },
    ],
    privacy: [
      {
        id: 21,
        question: "How do you protect my personal information?",
        answer:
          "We use industry-standard encryption, secure servers, and strict data access controls. Your personal information is never shared with third parties without consent, and we comply with data protection regulations.",
      },
      {
        id: 22,
        question: "Can I delete my account and data?",
        answer:
          "Yes, you can permanently delete your account and all associated data from your account settings. This action is irreversible, and we'll remove all your information within 30 days as per our data retention policy.",
      },
      {
        id: 23,
        question: "Who can see my reviews and ratings?",
        answer:
          "Your reviews are publicly visible with your display name (not full name) to help other customers. Your contact information and booking history remain private and are only visible to you and relevant businesses.",
      },
      {
        id: 24,
        question: "How do you handle data breaches?",
        answer:
          "We have robust security measures and monitoring systems in place. In the unlikely event of a data breach, we'll notify affected users within 72 hours and take immediate steps to secure the platform and protect user data.",
      },
      {
        id: 25,
        question: "Do you track my location?",
        answer:
          "We only access your location when you explicitly allow it to show nearby businesses and improve search results. You can disable location tracking anytime in your browser or app settings without affecting core functionality.",
      },
    ],
  };

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqs[activeCategory].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions via email",
      action: "Send Email",
      color: "bg-green-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      action: "Call Now",
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Easy Life Gangtok</title>
        <meta
          name="description"
          content="Find answers to common questions about Easy Life Gangtok. Get help with accounts, bookings, payments, and more."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Find quick answers to common questions about Easy Life Gangtok.
              Can't find what you're looking for? Our support team is here to
              help.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                className="bg-white text-gray-900"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categories
                </h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? "bg-primary-100 text-primary-700 border-l-4 border-primary-500"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <category.icon className="w-5 h-5 mr-3" />
                      {category.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {categories.find((cat) => cat.id === activeCategory)?.label}
                  </h2>
                  <p className="text-gray-600">
                    {filteredFAQs.length} question
                    {filteredFAQs.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <Card key={faq.id} className="overflow-hidden">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {openItems.has(faq.id) ? (
                          <Minus className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {openItems.has(faq.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 border-t border-gray-100">
                              <p className="text-gray-600 pt-4 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <Card className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No matching questions found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or browse different categories.
                    </p>
                    <Button
                      onClick={() => setSearchQuery("")}
                      variant="outline"
                    >
                      Clear Search
                    </Button>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Our support team is available 24/7 to assist you with any
              questions or concerns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div
                      className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                    >
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <Button variant="outline" className="w-full">
                      {option.action}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                For urgent technical issues, please email us at{" "}
                <a
                  href="mailto:support@easylife.com"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  support@easylife.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+919876543200"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  +91 98765 43200
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
