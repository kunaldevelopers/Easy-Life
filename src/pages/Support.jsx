import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Users,
  Headphones,
  FileText,
  Settings,
  Search,
  Send,
  MapPin,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const supportCategories = [
    {
      id: "general",
      icon: Headphones,
      title: "General Support",
      description: "Get help with basic questions and guidance",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "business",
      icon: Users,
      title: "Business Support",
      description: "Assistance for business owners and listings",
      color: "bg-green-100 text-green-600",
    },
    {
      id: "technical",
      icon: Settings,
      title: "Technical Issues",
      description: "Report bugs, errors, or technical problems",
      color: "bg-red-100 text-red-600",
    },
    {
      id: "account",
      icon: FileText,
      title: "Account Help",
      description: "Login issues, profile management, and settings",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 98765 43210",
      availability: "Mon-Sat 9AM-7PM",
      action: "tel:+919876543210",
      recommended: true,
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@easylifegangtok.com",
      availability: "24/7 - Response within 24hrs",
      action: "mailto:support@easylifegangtok.com",
      recommended: false,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      details: "+91 98765 43210",
      availability: "Mon-Sat 9AM-9PM",
      action: "https://wa.me/919876543210",
      recommended: true,
    },
  ];

  const quickHelp = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page and click 'Forgot Password'. Follow the instructions sent to your email.",
    },
    {
      question: "How do I list my business?",
      answer:
        "Sign up as a business owner, verify your account, and submit your business details for approval.",
    },
    {
      question: "Why isn't my business showing up?",
      answer:
        "New listings take 24-48 hours to appear after approval. Check your email for verification steps.",
    },
    {
      question: "How do I update my business hours?",
      answer:
        "Log into your business dashboard and navigate to 'Business Information' to update your hours.",
    },
  ];

  const helpResources = [
    {
      title: "User Guide",
      description: "Complete guide for customers using Easy Life Gangtok",
      icon: FileText,
      link: "/help/user-guide",
    },
    {
      title: "Business Owner Manual",
      description:
        "Everything you need to know about managing your business listing",
      icon: Users,
      link: "/help/business-guide",
    },
    {
      title: "FAQ",
      description: "Frequently asked questions and quick answers",
      icon: Search,
      link: "/faq",
    },
  ];

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Support Request Submitted - Easy Life Gangtok</title>
        </Helmet>

        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full"
          >
            <Card className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Support Request Sent!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for contacting our support team. We'll get back to you
                within 24 hours with a solution.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="primary"
                className="w-full"
              >
                Submit Another Request
              </Button>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Support - Easy Life Gangtok</title>
        <meta
          name="description"
          content="Get help and support for Easy Life Gangtok. Contact our support team for assistance with your account, business listings, or technical issues."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How Can We Help You?
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Our support team is here to assist you with any questions or
                issues you may have. Choose how you'd like to get help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={MessageCircle}
                  onClick={() => window.open("https://wa.me/919876543210")}
                >
                  Chat with Us
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={Phone}
                  onClick={() => window.open("tel:+919876543210")}
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Call Support
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                What do you need help with?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card
                      className={`p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedCategory === category.id
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div
                        className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                      >
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                Get in Touch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card
                      className={`p-6 text-center h-full relative ${
                        method.recommended ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      {method.recommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                            Recommended
                          </span>
                        </div>
                      )}
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <method.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {method.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {method.details}
                      </p>
                      <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        {method.availability}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(method.action)}
                        className="w-full"
                      >
                        Contact Now
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Help & Support Form */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Quick Help */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Quick Help</h3>
                  <div className="space-y-4">
                    {quickHelp.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">
                          {item.question}
                        </h4>
                        <p className="text-sm text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full"
                      icon={ChevronRight}
                      onClick={() => (window.location.href = "/faq")}
                    >
                      View All FAQs
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Support Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Submit a Support Request
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief description of your issue"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Standard issue</option>
                        <option value="high">High - Urgent issue</option>
                        <option value="critical">
                          Critical - Service down
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe Your Issue
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Please provide as much detail as possible about your issue..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={Send}
                      loading={loading}
                      className="w-full"
                    >
                      Submit Support Request
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                Help Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {helpResources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow duration-300">
                      <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <resource.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {resource.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={ExternalLink}
                        onClick={() => (window.location.href = resource.link)}
                        className="w-full"
                      >
                        Learn More
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-red-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="p-8 border-l-4 border-red-500">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Emergency Support
                    </h3>
                    <p className="text-gray-600 mb-4">
                      If you're experiencing a critical issue that affects your
                      business operations or need immediate assistance, please
                      call our emergency support line.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="primary"
                        icon={Phone}
                        onClick={() => window.open("tel:+919876543210")}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Call Emergency Line
                      </Button>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Available 24/7 for critical issues
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Support;
