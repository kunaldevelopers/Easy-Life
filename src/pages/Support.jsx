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
  Send,
  MapPin,
  ExternalLink,
  BookOpen,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  LifeBuoy,
  ArrowRight,
  Download,
  Star,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
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
      icon: Users,
      title: "Business Support",
      description:
        "Get help with business listings, profile management, and growing your customer base",
      action: "business-support",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description:
        "Need help finding services or have questions? We're here to assist you",
      action: "customer-support",
    },
    {
      icon: Settings,
      title: "Technical Issues",
      description:
        "Report bugs, app problems, or technical difficulties with our platform",
      action: "technical-support",
    },
    {
      icon: FileText,
      title: "Account Help",
      description:
        "Login issues, password reset, profile settings, and account management",
      action: "account-support",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 98765 43210",
      description: "Mon-Sat 9AM-7PM",
      action: "tel:+919876543210",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@easylifegangtok.com",
      description: "Response within 4 hours",
      action: "mailto:support@easylifegangtok.com",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      details: "+91 98765 43210",
      description: "Quick chat support",
      action: "https://wa.me/919876543210",
    },
    {
      icon: LifeBuoy,
      title: "Live Chat",
      details: "Available on website",
      description: "Real-time assistance",
      action: "#",
    },
  ];

  const faqItems = [
    {
      question: "How do I list my business on Easy Life Gangtok?",
      answer:
        "Create a business account, verify your documents, and submit your business details. Our team will review and approve your listing within 24-48 hours.",
    },
    {
      question: "Is the service free for customers?",
      answer:
        "Yes, browsing and searching for businesses is completely free for customers. You can view business details, ratings, and contact information at no cost.",
    },
    {
      question: "How do you verify businesses?",
      answer:
        "We verify businesses through document verification, location checks, and quality assessments to ensure authenticity and reliability for our users.",
    },
    {
      question: "Can I update my business information?",
      answer:
        "Yes, business owners can log into their dashboard anytime to update information, business hours, services, photos, and contact details.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page and click 'Forgot Password'. Follow the instructions sent to your email. The reset link expires in 15 minutes for security.",
    },
    {
      question: "Why isn't my business showing up in search results?",
      answer:
        "New listings take 24-48 hours to appear after approval. Ensure your business category is correct and all required information is complete.",
    },
  ];

  const helpResources = [
    {
      icon: BookOpen,
      title: "User Guide",
      description:
        "Complete guide for customers using Easy Life Gangtok platform",
      link: "/help/user-guide",
      articles: "25+ Articles",
    },
    {
      icon: Users,
      title: "Business Owner Manual",
      description:
        "Everything you need to know about managing your business listing",
      link: "/help/business-guide",
      articles: "20+ Guides",
    },
    {
      icon: Download,
      title: "App Tutorial",
      description: "Step-by-step guides for using our mobile application",
      link: "/help/app-guide",
      articles: "15+ Tutorials",
    },
    {
      icon: HelpCircle,
      title: "FAQ Center",
      description: "Frequently asked questions and comprehensive answers",
      link: "/faq",
      articles: "50+ FAQs",
    },
  ];

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Thank You - Easy Life Gangtok Support</title>
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
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Support Request Sent!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for contacting our support team. We'll get back to you
                within 4 hours with a solution.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    category: "general",
                    priority: "medium",
                  });
                }}
                variant="primary"
              >
                Send Another Request
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
        <title>Support Center - Easy Life Gangtok</title>
        <meta
          name="description"
          content="Get help and support for Easy Life Gangtok. Contact our support team for assistance with your account, business listings, or technical issues."
        />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-600 to-primary-700 py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-black"></div>
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-8"
              >
                <LifeBuoy className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Support <span className="text-accent-400">Center</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
                Need assistance? Our dedicated support team is here to help you
                with any questions, technical issues, or guidance you need to
                make the most of Easy Life Gangtok.
              </p>

              {/* Quick Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              >
                <Button
                  onClick={() =>
                    window.open("https://wa.me/919876543210", "_blank")
                  }
                  variant="secondary"
                  size="lg"
                  icon={MessageCircle}
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Chat with Support
                </Button>
                <Button
                  onClick={() => window.open("tel:+919876543210", "_blank")}
                  variant="outline"
                  size="lg"
                  icon={Phone}
                  className="text-white border-white hover:bg-white hover:text-primary-600"
                >
                  Call Now
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-12"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4hrs</div>
                  <div className="text-sm text-primary-200">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-primary-200">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-sm text-primary-200">
                    Issue Resolution
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Can We Help You?
              </h2>
              <p className="text-lg text-gray-600">
                Choose the type of support you need to get started
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary-200 group h-full">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-6 group-hover:shadow-lg transition-shadow"
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Multiple Ways to Reach Us
              </h2>
              <p className="text-lg text-gray-600">
                Choose your preferred method of communication
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    className="text-center p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary-200 group"
                    onClick={() => window.open(info.action, "_blank")}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-6 group-hover:shadow-lg transition-shadow"
                    >
                      <info.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <p className="text-primary-600 font-semibold text-lg mb-2">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Form & FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Support Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <Card className="p-6 sm:p-8 lg:p-10 shadow-xl border-t-4 border-primary-500">
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Send className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Submit Support Request
                      </h2>
                      <p className="text-gray-600">
                        We'll respond within 4 hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Input
                          label="Full Name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          label="Email Address"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Input
                          label="Phone Number"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Support Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none hover:border-gray-300 hover:shadow-md transition-all duration-300 bg-white shadow-lg focus:shadow-lg"
                        >
                          <option value="general">General Support</option>
                          <option value="business">Business Support</option>
                          <option value="technical">Technical Issue</option>
                          <option value="account">Account Help</option>
                          <option value="billing">Billing & Payments</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Input
                        label="Subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none hover:border-gray-300 hover:shadow-md transition-all duration-300 bg-white shadow-lg focus:shadow-lg"
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
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none hover:border-gray-300 hover:shadow-md resize-none transition-all duration-300 placeholder:text-gray-400"
                        placeholder="Please provide as much detail as possible about your issue..."
                        required
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        icon={Send}
                        className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl"
                      >
                        Submit Support Request
                      </Button>
                    </motion.div>
                  </form>
                </Card>
              </motion.div>

              {/* FAQ Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 lg:space-y-8"
              >
                {/* Quick Facts */}
                <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary-600" />
                    Support Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Phone Support</span>
                      <span className="font-semibold text-green-600">
                        Mon-Sat 9AM-7PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email Support</span>
                      <span className="font-semibold text-primary-600">
                        24/7
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold text-primary-600">
                        Within 4 hours
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Emergency Contact */}
                <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                    Emergency Support
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    For critical issues affecting your business operations or
                    urgent technical problems.
                  </p>
                  <Button
                    onClick={() => window.open("tel:+919876543210", "_blank")}
                    variant="primary"
                    size="sm"
                    icon={Phone}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Call Emergency Line
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Find quick answers to common questions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-t-2 border-primary-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                onClick={() => (window.location.href = "/faq")}
                variant="outline"
                size="lg"
                icon={ArrowRight}
              >
                View All FAQs
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Help Resources
              </h2>
              <p className="text-lg text-gray-600">
                Self-service resources to help you get the most out of Easy Life
                Gangtok
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    className="text-center p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary-200 group h-full"
                    onClick={() => (window.location.href = resource.link)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl mb-6 group-hover:shadow-lg transition-shadow"
                    >
                      <resource.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <p className="text-sm text-primary-600 font-medium">
                      {resource.articles}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information Footer */}
        <section className="bg-gradient-to-br from-gray-50 to-primary-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Visit Our Support Center
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Need in-person assistance? Visit our support center located in
                  the heart of Gangtok
                </p>

                <Card className="p-8 shadow-xl">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Address
                      </h3>
                      <p className="text-gray-600">
                        Easy Life Gangtok Support Center
                        <br />
                        MG Road, Near Police Bazaar
                        <br />
                        Gangtok, Sikkim 737101
                        <br />
                        India
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Office Hours
                      </h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 7:00 PM
                        <br />
                        Saturday: 10:00 AM - 5:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button
                        onClick={() =>
                          window.open("https://maps.google.com", "_blank")
                        }
                        variant="primary"
                        icon={MapPin}
                        className="w-full"
                      >
                        Get Directions
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Contact Stats */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Support Excellence
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our commitment to providing exceptional support to our
                  community
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      99%
                    </div>
                    <div className="text-gray-600">Issue Resolution Rate</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      4.8/5
                    </div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      2hrs
                    </div>
                    <div className="text-gray-600">Average Response</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      24/7
                    </div>
                    <div className="text-gray-600">Email Support</div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Support;
