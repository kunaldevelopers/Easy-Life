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
} from "lucide-react";
import Card from "../components/common/Card";

const About = () => {
  const stats = [
    { label: "Local Businesses", value: "500+", icon: Users },
    { label: "Happy Customers", value: "10,000+", icon: Heart },
    { label: "Years of Service", value: "3+", icon: Award },
    { label: "Customer Satisfaction", value: "98%", icon: Star },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Local Focus",
      description:
        "We exclusively serve Gangtok and surrounding areas, ensuring all listings are relevant to our community.",
    },
    {
      icon: CheckCircle,
      title: "Verified Businesses",
      description:
        "All businesses undergo verification to ensure authenticity and quality of services.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Business hours, availability, and offers are updated in real-time for accuracy.",
    },
    {
      icon: Heart,
      title: "Community Driven",
      description:
        "Built by locals, for locals. We understand the unique needs of our community.",
    },
  ];

  const team = [
    {
      name: "Rajesh Sharma",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Local entrepreneur passionate about connecting Gangtok businesses with customers.",
    },
    {
      name: "Priya Rai",
      role: "Business Relations",
      image:
        "https://images.pexels.com/photos/3760811/pexels-photo-3760811.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Helps local businesses grow their online presence and reach more customers.",
    },
    {
      name: "Karma Bhutia",
      role: "Customer Success",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
      description:
        "Ensures customers have the best experience finding services they need.",
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
                About <span className="gradient-text">Easy Life</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your trusted local directory connecting Gangtok's best
                businesses with customers who need them. We're building a
                stronger local economy, one connection at a time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  To make life easier for residents of Gangtok by providing a
                  comprehensive, reliable platform to discover and connect with
                  local businesses and services.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We believe in supporting our local economy and helping small
                  businesses thrive in the digital age while maintaining the
                  personal touch that makes our community special.
                </p>
                <div className="flex items-center space-x-4">
                  <Target className="w-8 h-8 text-primary-600" />
                  <span className="text-lg font-medium text-gray-900">
                    Connecting Communities, Empowering Businesses
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-10 lg:mt-0"
              >
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Gangtok local market"
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-gray-600">
                Numbers that reflect our commitment to the Gangtok community
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                What Makes Us Different
              </h2>
              <p className="text-lg text-gray-600">
                We're more than just a directory - we're your local community
                partner
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                      <feature.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
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
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                Local professionals dedicated to serving our community
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-purple-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Ready to Explore Gangtok?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Discover amazing local businesses and services in your
                neighborhood
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => (window.location.href = "/listings")}
                  className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Browse Businesses
                </button>
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
