import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  CheckCircle,
  Star,
  Users,
  Sparkles,
  Zap,
  Heart,
  Award,
  Globe,
  ChevronRight,
  Building,
  MapPin,
  FileText,
  Camera,
  CreditCard,
  Upload,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, loginWithOTP } = useAuth();
  const initialMode = searchParams.get("mode") || "login";
  const [mode, setMode] = useState(initialMode);
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  // Watch for URL parameter changes
  useEffect(() => {
    const urlMode = searchParams.get("mode") || "login";
    if (urlMode !== mode) {
      setMode(urlMode);
      setError(""); // Clear any errors when switching modes
      setShowOTP(false); // Reset OTP state
      setLoginMethod("email"); // Reset to email login method
    }
  }, [searchParams, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError("");
    setShowOTP(false);
    setLoginMethod("email"); // Reset to email login method
    // Update URL without causing a page reload
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("mode", newMode);
    navigate(`/auth?${newSearchParams.toString()}`, { replace: true });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "customer",
    otp: "",
    // Business-specific fields
    businessName: "",
    businessCategory: "",
    businessAddress: "",
    ownerIdProof: "",
    addressProof: "",
    businessProof: "",
    shopPhoto: "",
    bankDetails: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;

      if (loginMethod === "email") {
        result = await login(formData.email, formData.password);
      } else {
        if (!showOTP) {
          // First step: send OTP
          setShowOTP(true);
          setLoading(false);
          return;
        } else {
          // Second step: verify OTP
          result = await loginWithOTP(formData.phone, formData.otp);
        }
      }

      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.userType,
      });

      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // Dynamic content based on account type (for signup mode)
  const getFeatures = () => {
    if (mode === "signup" && formData.userType === "seller") {
      return [
        {
          icon: Building,
          title: "Join 500+ Verified Businesses",
          description:
            "Be part of Gangtok's largest trusted business network with verified credentials",
          color: "text-blue-600",
        },
        {
          icon: Users,
          title: "Reach Thousands of Customers",
          description:
            "Connect with local customers actively seeking your services daily",
          color: "text-green-600",
        },
        {
          icon: CreditCard,
          title: "Secure Payment Settlement",
          description:
            "T+4 automatic payment settlement with transparent 15% commission structure",
          color: "text-purple-600",
        },
        {
          icon: Star,
          title: "Build Your Digital Reputation",
          description:
            "Showcase your work with photos, customer reviews, and professional ratings",
          color: "text-yellow-600",
        },
        {
          icon: Shield,
          title: "Verified Business Badge",
          description:
            "Gain instant customer trust with our comprehensive verification system",
          color: "text-green-600",
        },
        {
          icon: MapPin,
          title: "Local Search Prominence",
          description:
            "Appear first in local searches for your service category and area",
          color: "text-red-600",
        },
        {
          icon: Camera,
          title: "Professional Photo Gallery",
          description:
            "Upload unlimited photos of your work to attract more customers",
          color: "text-indigo-600",
        },
        {
          icon: FileText,
          title: "Digital Document Management",
          description:
            "Store and manage all your business documents securely in the cloud",
          color: "text-teal-600",
        },
      ];
    } else {
      return [
        {
          icon: Shield,
          title: "Secure & Verified",
          description: "End-to-end encryption & verified businesses",
          color: "text-green-600",
        },
        {
          icon: Users,
          title: "500+ Businesses",
          description: "Largest network of trusted local services",
          color: "text-blue-600",
        },
        {
          icon: Star,
          title: "98% Satisfaction",
          description: "Highest rated platform in Gangtok",
          color: "text-yellow-600",
        },
      ];
    }
  };

  const getBenefits = () => {
    if (mode === "signup" && formData.userType === "seller") {
      return [
        { icon: Zap, text: "Instant booking notifications via SMS & email" },
        {
          icon: CreditCard,
          text: "Transparent payment system with detailed reports",
        },
        {
          icon: Award,
          text: "Performance analytics and business insights dashboard",
        },
        { icon: Globe, text: "24/7 dedicated business support and guidance" },
        {
          icon: Camera,
          text: "Professional listing photos and portfolio showcase",
        },
        {
          icon: FileText,
          text: "Digital document management and verification",
        },
        { icon: MapPin, text: "Enhanced local area search prominence" },
        { icon: Heart, text: "Customer review management and response tools" },
        { icon: Users, text: "Customer base insights and targeting" },
        { icon: Building, text: "Multi-location business management support" },
        { icon: Shield, text: "Business insurance and protection programs" },
        { icon: Star, text: "Featured listing opportunities and promotions" },
      ];
    } else {
      return [
        { icon: Zap, text: "Instant booking & confirmations" },
        { icon: Heart, text: "Personalized recommendations" },
        { icon: Award, text: "Exclusive member rewards" },
        { icon: Globe, text: "24/7 customer support" },
      ];
    }
  };

  const getWelcomeContent = () => {
    if (mode === "signup" && formData.userType === "seller") {
      return {
        title: "Grow Your Business with Easy Life",
        subtitle:
          "Gangtok's premier platform for local businesses to connect with customers, manage bookings, and grow their digital presence",
        whyChoose: "Why successful businesses choose Easy Life?",
        additionalInfo: {
          processTitle: "Simple Onboarding Process",
          processSteps: [
            "Submit your business documents and photos",
            "Get verified by our team within 24-48 hours",
            "Set up your service listings and pricing",
            "Start receiving customer bookings immediately",
            "Get paid automatically with T+4 settlement",
          ],
          statsTitle: "Business Success Stories",
          stats: [
            "Average 40% increase in customer bookings",
            "85% of businesses get first booking within 7 days",
            "Average monthly revenue growth of ₹25,000+",
            "99.2% customer satisfaction rate",
            "24/7 customer support response time < 2 hours",
          ],
        },
      };
    } else {
      return {
        title: "Welcome to Easy Life",
        subtitle:
          "Gangtok's premier platform for discovering and booking local services",
        whyChoose: "Why choose Easy Life?",
      };
    }
  };

  const features = getFeatures();
  const benefits = getBenefits();
  const welcomeContent = getWelcomeContent();
  const renderLoginForm = () => (
    <motion.form
      onSubmit={handleLogin}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Demo Credentials Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4"
      >
        <h4 className="text-sm font-semibold text-blue-800 mb-2">
          Demo Credentials
        </h4>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/70 p-2 rounded-lg">
            <p className="font-medium text-blue-700">Customer</p>
            <button
              type="button"
              onClick={() => handleDemoLogin("rajesh@example.com", "customer")}
              className="text-blue-600 hover:text-blue-800 underline block"
            >
              rajesh@example.com
            </button>
            <p className="text-blue-600">Any password</p>
          </div>
          <div className="bg-white/70 p-2 rounded-lg">
            <p className="font-medium text-green-700">Business Owner</p>
            <button
              type="button"
              onClick={() =>
                handleDemoLogin("electronics@example.com", "seller")
              }
              className="text-green-600 hover:text-green-800 underline block"
            >
              electronics@example.com
            </button>
            <p className="text-green-600">Any password</p>
          </div>
          <div className="bg-white/70 p-2 rounded-lg">
            <p className="font-medium text-purple-700">Admin</p>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin@easylife.com", "admin")}
              className="text-purple-600 hover:text-purple-800 underline block"
            >
              admin@easylife.com
            </button>
            <p className="text-purple-600">Any password</p>
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          💡 Use any of these emails with any password to test different account
          types
        </p>
        <p className="text-xs text-gray-500 mt-1">
          🔄 Click an email above to auto-fill the form, then click "Sign In"
        </p>
      </motion.div>
      {/* Login Method Toggle */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-1 rounded-2xl shadow-inner">
        {" "}
        <div className="flex relative">
          <div
            className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-out ${
              loginMethod === "phone" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          <button
            type="button"
            onClick={() => {
              setLoginMethod("email");
              setShowOTP(false);
              setFormData({ ...formData, otp: "" });
            }}
            className={`relative z-10 flex-1 py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
              loginMethod === "email"
                ? "text-primary-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email Login
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod("phone");
              setShowOTP(false);
              setFormData({ ...formData, otp: "" });
            }}
            className={`relative z-10 flex-1 py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
              loginMethod === "phone"
                ? "text-primary-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Phone className="w-4 h-4 inline mr-2" />
            Phone OTP
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {loginMethod === "email" ? (
          <motion.div
            key="email-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              icon={Mail}
              placeholder="john@example.com"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              icon={Lock}
              placeholder="Enter your password"
              required
              className="transform transition-all hover:scale-[1.02]"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot password?
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="phone-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Demo Phone Numbers */}
            {!showOTP && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-3"
              >
                <h4 className="text-sm font-semibold text-green-800 mb-2">
                  Demo Phone Numbers
                </h4>{" "}
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-white/70 p-2 rounded-lg">
                    {" "}
                    <button
                      type="button"
                      onClick={() => handleDemoPhoneLogin("+91 9876543201")}
                      className="font-medium text-green-700 hover:text-green-900 underline block"
                    >
                      Customer: +91 9876543201
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDemoPhoneLogin("+91 9876543210")}
                      className="font-medium text-blue-700 hover:text-blue-900 underline block"
                    >
                      Business: +91 9876543210
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDemoPhoneLogin("+91 9876543200")}
                      className="font-medium text-purple-700 hover:text-purple-900 underline block"
                    >
                      Admin: +91 9876543200
                    </button>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  📱 Use any of these numbers, then enter OTP: 123456
                </p>
              </motion.div>
            )}

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              icon={Phone}
              placeholder="+91 98765 43210"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
            {showOTP && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
              >
                <Input
                  label="Enter OTP"
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  placeholder="123456"
                  maxLength={6}
                  required
                  className="transform transition-all hover:scale-[1.02] text-center text-lg tracking-widest"
                />{" "}
                <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">📱 Demo OTP:</span> 123456
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    💡 Use any phone number from the user list above, then enter
                    123456
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    In production, this would be sent to your phone
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
          {error}
        </motion.div>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full relative overflow-hidden group"
      >
        <span className="relative z-10">
          {showOTP ? "Verify OTP" : "Sign In"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>{" "}
      <div className="text-center">
        <button
          type="button"
          onClick={() => handleModeChange("signup")}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium group"
        >
          Don't have an account?{" "}
          <span className="underline underline-offset-2 group-hover:underline-offset-4 transition-all">
            Sign up here
          </span>
          <ChevronRight className="w-4 h-4 inline ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.form>
  );

  const renderSignupForm = () => (
    <motion.form
      onSubmit={handleSignup}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <User className="w-4 h-4 inline mr-2" />
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`
              relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
              ${
                formData.userType === "customer"
                  ? "border-primary-500 bg-primary-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }
            `}
            >
              <input
                type="radio"
                name="userType"
                value="customer"
                checked={formData.userType === "customer"}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-600" />
                  <span className="font-medium text-gray-900">Customer</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Find and book services
                </p>
              </div>
              {formData.userType === "customer" && (
                <CheckCircle className="w-5 h-5 text-primary-600" />
              )}
            </label>

            <label
              className={`
              relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
              ${
                formData.userType === "seller"
                  ? "border-primary-500 bg-primary-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }
            `}
            >
              <input
                type="radio"
                name="userType"
                value="seller"
                checked={formData.userType === "seller"}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary-600" />
                  <span className="font-medium text-gray-900">Business</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">List your services</p>
              </div>
              {formData.userType === "seller" && (
                <CheckCircle className="w-5 h-5 text-primary-600" />
              )}
            </label>
          </div>
        </div>

        {/* Conditional Fields Based on Account Type */}
        {formData.userType === "customer" ? (
          // Customer Fields
          <>
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              icon={User}
              placeholder="John Doe"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              icon={Mail}
              placeholder="john@example.com"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              icon={Phone}
              placeholder="+91 98765 43210"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              icon={Lock}
              placeholder="Create a strong password"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              icon={Lock}
              placeholder="Confirm your password"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
          </>
        ) : (
          // Business Fields
          <>
            {/* Required Business Information Header */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />✅ Required
              </h3>
              <p className="text-xs text-green-700">
                Must provide all required information and documents
              </p>
            </div>

            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              icon={User}
              placeholder="Your full name"
              required
              className="transform transition-all hover:scale-[1.02]"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Camera className="w-4 h-4 inline mr-2" />
                Attach Photo *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload your photo</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="ownerPhoto"
                  required
                />
                <label
                  htmlFor="ownerPhoto"
                  className="mt-2 inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  Choose Photo
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Business Owner ID Proof (Shop photo attach or Udyam) *
              </label>
              <div className="space-y-3">
                <select
                  name="ownerIdProof"
                  value={formData.ownerIdProof}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select ID Proof Type</option>
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="pan">PAN Card</option>
                </select>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">
                    Attach Aadhaar Card / PAN
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    id="idProofFile"
                    required
                  />
                  <label
                    htmlFor="idProofFile"
                    className="mt-2 inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded cursor-pointer hover:bg-blue-100 transition-colors text-sm"
                  >
                    Attach File
                  </label>
                </div>
              </div>
            </div>

            <Input
              label="Active Mobile Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              icon={Phone}
              placeholder="+91 98765 43210"
              required
              className="transform transition-all hover:scale-[1.02]"
            />

            <Input
              label="Email ID"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              icon={Mail}
              placeholder="business@example.com"
              required
              className="transform transition-all hover:scale-[1.02]"
            />

            <Input
              label="Business Name"
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              icon={Building}
              placeholder="Your Business Name"
              required
              className="transform transition-all hover:scale-[1.02]"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Business Category *
              </label>
              <select
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your service category</option>
                <option value="electrician">Electrician Services</option>
                <option value="plumber">Plumbing Services</option>
                <option value="carpenter">Carpentry Services</option>
                <option value="cleaning">Cleaning Services</option>
                <option value="appliance">Appliance Repair</option>
                <option value="beauty">Beauty & Salon</option>
                <option value="automotive">Automotive Services</option>
                <option value="tutor">Tutoring & Education</option>
                <option value="catering">Catering & Food</option>
                <option value="photography">Photography</option>
                <option value="it">IT & Tech Support</option>
                <option value="other">Other Services</option>
              </select>
            </div>

            <Input
              label="Business Address"
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              icon={MapPin}
              placeholder="Complete business address with pincode"
              required
              className="transform transition-all hover:scale-[1.02]"
            />

            {/* Optional but Recommended Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                🟡 Optional
              </h3>
              <p className="text-xs text-yellow-700 mb-4">
                These help build trust and improve your listing visibility
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Address Proof of Business
                  </label>
                  <select
                    name="addressProof"
                    value={formData.addressProof}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                  >
                    <option value="">Select address proof (optional)</option>
                    <option value="electricity">Electricity Bill</option>
                    <option value="rent">Rent Agreement</option>
                  </select>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      Attach Electricity Bill / Rent Agreement
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      id="addressProofFile"
                    />
                    <label
                      htmlFor="addressProofFile"
                      className="mt-1 inline-block px-3 py-1 bg-yellow-50 text-yellow-600 rounded cursor-pointer hover:bg-yellow-100 transition-colors text-xs"
                    >
                      Attach File
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Business Proof
                  </label>
                  <select
                    name="businessProof"
                    value={formData.businessProof}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                  >
                    <option value="">Select business proof (optional)</option>
                    <option value="gst">GST Certificate</option>
                    <option value="shop">Shop License</option>
                    <option value="udyam">Udyam Registration</option>
                  </select>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      Attach GST Certificate / Shop License / Udyam
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      id="businessProofFile"
                    />
                    <label
                      htmlFor="businessProofFile"
                      className="mt-1 inline-block px-3 py-1 bg-yellow-50 text-yellow-600 rounded cursor-pointer hover:bg-yellow-100 transition-colors text-xs"
                    >
                      Attach File
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Camera className="w-4 h-4 inline mr-2" />
                    Photograph of Shop/Office
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-gray-400 transition-colors">
                    <Camera className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      Upload shop/office photo
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="shopPhoto"
                    />
                    <label
                      htmlFor="shopPhoto"
                      className="mt-1 inline-block px-3 py-1 bg-yellow-50 text-yellow-600 rounded cursor-pointer hover:bg-yellow-100 transition-colors text-xs"
                    >
                      Choose Photo
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Bank Details
                  </label>
                  <Input
                    type="text"
                    name="bankDetails"
                    value={formData.bankDetails}
                    onChange={handleInputChange}
                    icon={CreditCard}
                    placeholder="Bank account details for payment settlement"
                    className="transform transition-all hover:scale-[1.02]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional but necessary for payment settlement when customers
                    book your service and pay you
                  </p>
                </div>
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              icon={Lock}
              placeholder="Create a strong password"
              required
              className="transform transition-all hover:scale-[1.02]"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              icon={Lock}
              placeholder="Confirm your password"
              required
              className="transform transition-all hover:scale-[1.02]"
            />
          </>
        )}
      </div>
      {/* Terms and Privacy */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <label className="flex items-start">
          <input
            type="checkbox"
            required
            className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-3 text-sm text-gray-600">
            I agree to the{" "}
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Privacy Policy
            </button>
          </span>
        </label>
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
          {error}
        </motion.div>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full relative overflow-hidden group"
      >
        <span className="relative z-10">Create Account</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </Button>{" "}
      <div className="text-center">
        <button
          type="button"
          onClick={() => handleModeChange("login")}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium group"
        >
          Already have an account?{" "}
          <span className="underline underline-offset-2 group-hover:underline-offset-4 transition-all">
            Sign in here
          </span>
          <ChevronRight className="w-4 h-4 inline ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.form>
  );
  const handleDemoLogin = (email, userType) => {
    setFormData({
      ...formData,
      email: email,
      password: "demo123", // Any password will work
    });
    setLoginMethod("email");
  };

  const handleDemoPhoneLogin = (phone) => {
    setFormData({
      ...formData,
      phone: phone,
    });
    setLoginMethod("phone");
  };
  return (
    <>
      <Helmet>
        <title>
          {mode === "login" ? "Sign In" : "Sign Up"} - Easy Life Gangtok
        </title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-200 to-primary-100 opacity-20 blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-accent-200 to-accent-100 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-t from-primary-100 to-transparent opacity-30 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Left side - Features & Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white opacity-5"></div>
              <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-white opacity-5"></div>
              <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-white opacity-5"></div>
            </div>

            <div className="relative z-10 max-w-md text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-8">
                  <Sparkles className="w-12 h-12 mb-4 text-accent-300" />
                  <h1 className="text-4xl font-bold mb-4">
                    {welcomeContent.title}
                  </h1>
                  <p className="text-xl text-primary-100">
                    {welcomeContent.subtitle}
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`p-2 rounded-lg bg-white bg-opacity-10 ${feature.color}`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-primary-100 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-white border-opacity-20 pt-6">
                  <h4 className="font-semibold mb-3">
                    {welcomeContent.whyChoose}
                  </h4>
                  <div
                    className={`grid gap-3 ${
                      formData.userType === "seller" && mode === "signup"
                        ? "grid-cols-1"
                        : "grid-cols-2"
                    }`}
                  >
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.05,
                        }}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <benefit.icon className="w-4 h-4 text-accent-300" />
                        <span className="text-primary-100">{benefit.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Business Content */}
                {mode === "signup" &&
                  formData.userType === "seller" &&
                  welcomeContent.additionalInfo && (
                    <>
                      {/* Onboarding Process */}
                      <div className="border-t border-white border-opacity-20 pt-6">
                        <h4 className="font-semibold mb-3">
                          {welcomeContent.additionalInfo.processTitle}
                        </h4>
                        <div className="space-y-2">
                          {welcomeContent.additionalInfo.processSteps.map(
                            (step, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.5,
                                  delay: 1.0 + index * 0.1,
                                }}
                                className="flex items-start space-x-3 text-sm"
                              >
                                <div className="w-6 h-6 rounded-full bg-accent-400 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                                  {index + 1}
                                </div>
                                <span className="text-primary-100">{step}</span>
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Success Stats */}
                      <div className="border-t border-white border-opacity-20 pt-6">
                        <h4 className="font-semibold mb-3">
                          {welcomeContent.additionalInfo.statsTitle}
                        </h4>
                        <div className="space-y-2">
                          {welcomeContent.additionalInfo.stats.map(
                            (stat, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.5,
                                  delay: 1.5 + index * 0.1,
                                }}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <CheckCircle className="w-4 h-4 text-accent-300" />
                                <span className="text-primary-100">{stat}</span>
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="border-t border-white border-opacity-20 pt-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 2.0 }}
                          className="bg-white bg-opacity-10 rounded-lg p-4 text-center"
                        >
                          <h4 className="font-semibold mb-2">
                            Ready to Transform Your Business?
                          </h4>
                          <p className="text-sm text-primary-100 mb-3">
                            Join hundreds of successful businesses already
                            thriving on Easy Life Gangtok
                          </p>
                          <div className="flex items-center justify-center space-x-2 text-sm">
                            <Star className="w-4 h-4 text-accent-300" />
                            <span className="text-accent-300 font-semibold">
                              Start your digital journey today!
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </>
                  )}
              </motion.div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </button>

                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  >
                    {mode === "login" ? (
                      <Lock className="w-8 h-8 text-white" />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </motion.div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {mode === "login" ? "Welcome back!" : "Join Easy Life"}
                  </h2>
                  <p className="text-gray-600">
                    {mode === "login"
                      ? "Sign in to access your account and discover amazing services"
                      : "Create your account and start exploring local businesses"}
                  </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm bg-opacity-90">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {mode === "login"
                        ? renderLoginForm()
                        : renderSignupForm()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 text-center"
                >
                  <p className="text-xs text-gray-500 mb-4">
                    Trusted by 10,000+ users in Gangtok
                  </p>
                  <div className="flex items-center justify-center space-x-4 opacity-60">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600">SSL Secured</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-600">
                        Verified Platform
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
