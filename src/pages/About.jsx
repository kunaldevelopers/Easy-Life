import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Heart,
  Award,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Handshake,
  Eye,
  Quote,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const About = () => {
  const stats = [
    {
      label: "Local Businesses",
      value: "500+",
      icon: Users,
      description: "Verified partners",
    },
    {
      label: "Happy Customers",
      value: "10,000+",
      icon: Heart,
      description: "Satisfied users",
    },
    {
      label: "Years of Service",
      value: "3+",
      icon: Award,
      description: "Proven experience",
    },
    {
      label: "Customer Satisfaction",
      value: "98%",
      icon: Star,
      description: "Rating score",
    },
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Trust & Reliability",
      description:
        "Every business on our platform is thoroughly verified to ensure quality and authenticity.",
    },
    {
      icon: Handshake,
      title: "Community First",
      description:
        "We prioritize local businesses and foster genuine connections within our community.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Constantly improving our platform with cutting-edge technology for better user experience.",
    },
    {
      icon: Heart,
      title: "Customer Success",
      description:
        "Our success is measured by how well we serve both businesses and customers.",
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Hyperlocal Focus",
      description:
        "Exclusively serving Gangtok with deep local knowledge and community understanding.",
      highlight: "Local Expertise",
    },
    {
      icon: CheckCircle,
      title: "Verified Quality",
      description:
        "Rigorous verification process ensuring all businesses meet our quality standards.",
      highlight: "100% Verified",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Live information on business hours, availability, and special offers for accuracy.",
      highlight: "Always Current",
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description:
        "Helping local businesses grow through digital presence and customer connections.",
      highlight: "Business Growth",
    },
  ];
  const team = [
    {
      name: "Rajesh Sharma",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Visionary leader with 10+ years in local business development and community building.",
      expertise: "Strategy & Leadership",
      linkedin: "#",
    },
    {
      name: "Priya Rai",
      role: "Head of Business Relations",
      image:
        "https://images.pexels.com/photos/3760811/pexels-photo-3760811.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Expert in building lasting partnerships and helping businesses maximize their digital potential.",
      expertise: "Business Development",
      linkedin: "#",
    },
    {
      name: "Karma Bhutia",
      role: "Customer Success Manager",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Dedicated to ensuring exceptional customer experiences and community satisfaction.",
      expertise: "Customer Relations",
      linkedin: "#",
    },
  ];

  const testimonials = [
    {
      quote:
        "Easy Life Gangtok has transformed how we connect with customers. Our business visibility increased by 300%!",
      author: "Tenzin Norbu",
      business: "Mountain View Restaurant",
      rating: 5,
    },
    {
      quote:
        "As a customer, finding reliable services in Gangtok has never been easier. Highly recommended!",
      author: "Sarah Williams",
      business: "Local Resident",
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Easy Life Gangtok</title>
        <meta
          name="description"
          content="Learn about Easy Life Gangtok - connecting local businesses with customers in Gangtok, Sikkim."
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
                  id="hero-grid"
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
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
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
                <Heart className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                About <span className="text-accent-400">Easy Life</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-8">
                Gangtok's premier local business directory, connecting our
                community with trusted services and empowering local
                entrepreneurs to thrive in the digital age.
              </p>

              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-8 py-4"
              >
                <Target className="w-6 h-6 text-accent-400 mr-3" />
                <span className="text-lg font-medium text-white">
                  Building Stronger Communities Through Connection
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>{" "}
        {/* Mission & Vision Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To become Sikkim's most trusted digital marketplace, where
                    every local business can thrive and every resident can
                    easily access the services they need, fostering a vibrant
                    and connected community.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    To bridge the gap between local businesses and customers
                    through innovative technology, verified quality assurance,
                    and genuine community support, making life easier for
                    everyone in Gangtok.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center text-primary-600">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span className="font-medium">
                        Empowering local entrepreneurs
                      </span>
                    </div>
                    <div className="flex items-center text-primary-600">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span className="font-medium">
                        Simplifying service discovery
                      </span>
                    </div>
                    <div className="flex items-center text-primary-600">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span className="font-medium">
                        Building community connections
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 lg:mt-0"
              >
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Gangtok community"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm">Businesses</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>{" "}
        {/* Stats Section */}
        <section className="bg-gradient-to-br from-gray-50 to-primary-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Impact in Numbers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These numbers represent our commitment to building a stronger,
                more connected Gangtok community
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-primary-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-6">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-gray-800 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.description}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>{" "}
        {/* Core Values Section */}
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
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at Easy Life Gangtok
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="text-center p-8 h-full hover:shadow-xl transition-all duration-300 group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-6 group-hover:bg-primary-200 transition-colors">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Features Section */}
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
                What Makes Us Different
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're more than just a directory - we're your trusted local
                community partner
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 border-l-4 border-primary-500">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {feature.title}
                          </h3>
                          <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                            {feature.highlight}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>{" "}
        {/* Testimonials Section */}
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
                What Our Community Says
              </h2>
              <p className="text-lg text-gray-600">
                Real feedback from businesses and customers who trust Easy Life
                Gangtok
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start mb-4">
                      <Quote className="w-8 h-8 text-primary-600 mr-4 flex-shrink-0" />
                      <div className="flex text-accent-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-primary-600">
                        {testimonial.business}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Team Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Passionate local professionals dedicated to serving our Gangtok
                community with excellence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 group">
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-100 group-hover:border-primary-300 transition-colors"
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                        {member.expertise}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>{" "}
        {/* CTA Section */}
        <section className="relative bg-gradient-to-br from-primary-600 to-primary-700 py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="cta-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-8">
                <Globe className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Explore{" "}
                <span className="text-accent-400">Gangtok</span>?
              </h2>
              <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover amazing local
                businesses and services in your neighborhood today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => (window.location.href = "/listings")}
                    variant="primary"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-4 shadow-lg hover:shadow-xl"
                  >
                    Browse Businesses
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => (window.location.href = "/contact")}
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4"
                  >
                    Partner With Us
                  </Button>
                </motion.div>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-sm text-primary-200">For Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-primary-200">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-primary-200">Verified</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
