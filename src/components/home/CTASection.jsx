import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, Users, TrendingUp, Award } from "lucide-react";
import Button from "../common/Button";

const CTASection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Reach More Customers",
      description: "Connect with thousands of potential customers in Gangtok",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Increase your visibility and boost your sales",
    },
    {
      icon: Award,
      title: "Build Your Reputation",
      description: "Collect reviews and build trust with customers",
    },
    {
      icon: Store,
      title: "Easy Management",
      description: "Manage your listings and bookings from one dashboard",
    },
  ];

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
              Join hundreds of local businesses on Easy Life and start reaching
              more customers today
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-green-100">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button
              onClick={() => navigate("/auth?mode=signup&type=seller")}
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
            >
              List Your Business - FREE
            </Button>
            <Button
              onClick={() => navigate("/auth?mode=login")}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Login Now
            </Button>
          </div>
          <p className="text-green-100 text-sm mt-4">
            No setup fees • Quick approval • Start getting customers immediately
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
