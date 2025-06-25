import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Headphones,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+91 98765 43210",
      description: "Mon-Sat 9AM-7PM",
      action: "tel:+919876543210",
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@easylifegangtok.com",
      description: "We reply within 24 hours",
      action: "mailto:hello@easylifegangtok.com",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "MG Road, Gangtok",
      description: "Sikkim 737101",
      action: "https://maps.google.com",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+91 98765 43210",
      description: "Quick support",
      action: "https://wa.me/919876543210",
    },
  ];

  const faqItems = [
    {
      question: "How do I list my business?",
      answer:
        "Create an account as a business owner and submit your business details for verification. Our team will review and approve your listing within 24-48 hours.",
    },
    {
      question: "Is the service free for customers?",
      answer:
        "Yes, browsing and searching for businesses is completely free for customers. You can view business details, ratings, and contact information at no cost.",
    },
    {
      question: "How do you verify businesses?",
      answer:
        "We verify businesses through document verification, location verification, and quality checks to ensure authenticity and reliability.",
    },
    {
      question: "Can I update my business information?",
      answer:
        "Yes, business owners can log into their dashboard and update their information, hours, services, and photos anytime.",
    },
  ];

  const supportOptions = [
    {
      icon: Users,
      title: "For Businesses",
      description:
        "Get help with listing your business, managing your profile, and growing your customer base.",
      action: "business-support",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description:
        "Need help finding services or have questions about a business? We're here to help.",
      action: "customer-support",
    },
    {
      icon: MessageCircle,
      title: "Technical Issues",
      description:
        "Experiencing technical problems with the website or app? Report issues here.",
      action: "technical-support",
    },
  ];

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Thank You - Easy Life Gangtok</title>
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
                Message Sent!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for contacting us. We'll get back to you within 24
                hours.
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
                  });
                }}
                variant="primary"
              >
                Send Another Message
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
        <title>Contact Us - Easy Life Gangtok</title>
        <meta
          name="description"
          content="Get in touch with Easy Life Gangtok. We're here to help with any questions about our services."
        />
      </Helmet>

      <div className="bg-white">
        {" "}
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
                <MessageCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get in <span className="text-accent-400">Touch</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
                We're here to help! Whether you're a customer looking for
                services or a business owner wanting to join our platform, we'd
                love to hear from you.
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-12"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24hrs</div>{" "}
                  <div className="text-sm text-primary-200">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-primary-200">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-primary-200">
                    Satisfaction Rate
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>{" "}
        {/* Contact Info Cards */}
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
        </section>{" "}
        {/* Contact Form & Support Options */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Form */}
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
                        Send us a Message
                      </h2>
                      <p className="text-gray-600">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>{" "}
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
                    </div>{" "}
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
                          Inquiry Type
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none hover:border-gray-300 hover:shadow-md transition-all duration-300 bg-white shadow-lg focus:shadow-lg"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="business">Business Support</option>
                          <option value="technical">Technical Issue</option>
                          <option value="partnership">Partnership</option>
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
                    </div>{" "}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none hover:border-gray-300 hover:shadow-md resize-none transition-all duration-300 placeholder:text-gray-400"
                        placeholder="Tell us how we can help you..."
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
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </Card>
              </motion.div>

              {/* Support Options & FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 lg:space-y-8"
              >
                {/* Support Options */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Headphones className="w-6 h-6 mr-3 text-primary-600" />
                    How can we help?
                  </h2>
                  <div className="space-y-4">
                    {supportOptions.map((option, index) => (
                      <motion.div
                        key={option.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-primary-500 hover:border-primary-600">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                                <option.icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 mb-2">
                                {option.title}
                              </h3>
                              <p className="text-gray-600">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Facts */}
                <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary-600" />
                    Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Average Response Time
                      </span>
                      <span className="font-semibold text-primary-600">
                        2-4 hours
                      </span>
                    </div>
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
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-20 bg-white">
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
          </div>
        </section>{" "}
        {/* Office Hours & Map */}
        <section className="bg-gradient-to-br from-gray-50 to-primary-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Office Hours
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're available during these hours to assist you with any
                  inquiries
                </p>

                <Card className="p-8 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">
                        Monday - Friday
                      </span>
                      <span className="font-bold text-primary-600">
                        9:00 AM - 7:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">
                        Saturday
                      </span>
                      <span className="font-bold text-primary-600">
                        10:00 AM - 5:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700 font-medium">Sunday</span>
                      <span className="font-bold text-red-500">Closed</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-700">
                      <strong>Need urgent help?</strong> WhatsApp us anytime at
                      <span className="font-semibold"> +91 98765 43210</span>
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Location Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Visit Our Office
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Located in the heart of Gangtok, easily accessible from
                  anywhere in the city
                </p>

                <Card className="p-8 shadow-xl">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Address
                      </h3>
                      <p className="text-gray-600">
                        Easy Life Gangtok
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
                        Landmarks
                      </h3>
                      <p className="text-gray-600">
                        • 5 minutes walk from MG Marg
                        <br />
                        • Opposite to State Bank of Sikkim
                        <br />• Near Lal Bazaar taxi stand
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
