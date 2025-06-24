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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to help! Whether you're a customer looking for
                services or a business owner wanting to join our platform, we'd
                love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => window.open(info.action, "_blank")}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                      <info.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-primary-600 font-medium mb-1">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Support Options */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="business">Business Support</option>
                          <option value="technical">Technical Issue</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                    </div>

                    <Input
                      label="Subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                        placeholder="Tell us how we can help..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      icon={Send}
                      className="w-full"
                    >
                      Send Message
                    </Button>
                  </form>
                </Card>
              </motion.div>

              {/* Support Options & FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-12 lg:mt-0"
              >
                {/* Support Options */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    How can we help?
                  </h2>
                  <div className="space-y-4">
                    {supportOptions.map((option, index) => (
                      <Card
                        key={option.title}
                        className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                              <option.icon className="w-5 h-5 text-primary-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {option.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                      <Card key={index} className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Office Hours */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Office Hours
              </h2>
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">10:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
