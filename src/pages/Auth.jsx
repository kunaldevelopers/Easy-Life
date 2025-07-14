import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
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
  ShoppingBag,
  Wrench,
  Bike,
  Car,
  Package,
  Clock,
  Settings,
  DollarSign,
  Truck,
  Calendar,
  Tag,
  MessageCircle,
  Phone,
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
  const [loginMethod, setLoginMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  // Watch for URL parameter changes
  useEffect(() => {
    const urlMode = searchParams.get("mode") || "login";
    if (urlMode !== mode) {
      setMode(urlMode);
      setError("");
      setShowOTP(false);
      setLoginMethod("email");
    }
  }, [searchParams, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError("");
    setShowOTP(false);
    setLoginMethod("email");
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
    businessType: "",
    otp: "",
    // Business-specific fields
    businessName: "",
    businessCategory: "",
    businessAddress: "",
    ownerIdProof: "",
    aadhaarNumber: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
    accountHolderName: "",
    // Product specific fields
    productCategories: [],
    deliveryOptions: [],
    minimumOrder: "",
    deliveryFee: "",
    // Service specific fields
    serviceTypes: [],
    serviceAreas: [],
    hourlyRate: "",
    experience: "",
    // Bike rider specific fields
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    vehicleModel: "",
    vehicleYear: "",
    workingHours: "",
    deliveryRadius: "",
    // Taxi service specific fields
    fleetSize: "",
    vehicleTypes: [],
    operatingAreas: [],
    driverLicenseNumber: "",
    commercialPermit: "",
    fareStructure: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleDemoLogin = async (email, userType) => {
    setFormData((prev) => ({ ...prev, email, userType }));
    setLoading(true);
    try {
      const result = await login(email, "demo123");
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoWhatsAppLogin = async (phone) => {
    setFormData((prev) => ({ ...prev, phone }));
    setLoginMethod("phone");
    setShowOTP(true);
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
          setShowOTP(true);
          setLoading(false);
          return;
        } else {
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
        businessType: formData.businessType,
        ...formData,
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

  const getFeatures = () => {
    if (mode === "signup" && formData.userType === "seller") {
      return [
        {
          icon: Building,
          title: "Join 500+ Verified Businesses",
          description: "Be part of Gangtok's largest trusted business network",
          color: "text-blue-600",
        },
        {
          icon: Users,
          title: "Reach Thousands of Customers",
          description: "Connect with local customers seeking your services",
          color: "text-green-600",
        },
        {
          icon: CreditCard,
          title: "Secure Payment Settlement",
          description: "T+4 automatic payment with transparent commission",
          color: "text-purple-600",
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
        { icon: Zap, text: "Instant booking notifications" },
        { icon: CreditCard, text: "Transparent payment system" },
        { icon: Award, text: "Performance analytics dashboard" },
        { icon: Globe, text: "24/7 business support" },
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
        subtitle: "Gangtok's premier platform for local businesses",
        whyChoose: "Why successful businesses choose Easy Life?",
      };
    } else {
      return {
        title: "Welcome to Easy Life",
        subtitle: "Your trusted local service marketplace",
        whyChoose: "Why choose Easy Life?",
      };
    }
  };

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
        </h4>
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
            <p className="font-medium text-green-700">Business Partner</p>
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

      <div className="space-y-5">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 text-center py-2 px-4 rounded-md transition-all ${
              loginMethod === "email"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 text-center py-2 px-4 rounded-md transition-all ${
              loginMethod === "phone"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            WhatsApp
          </button>
        </div>

        <AnimatePresence mode="wait">
          {loginMethod === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                icon={Mail}
                placeholder="Enter your email"
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
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Demo WhatsApp Numbers */}
              {!showOTP && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-3"
                >
                  <h4 className="text-sm font-semibold text-green-800 mb-2">
                    Demo WhatsApp Numbers
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="bg-white/70 p-2 rounded-lg">
                      <button
                        type="button"
                        onClick={() =>
                          handleDemoWhatsAppLogin("+91 9876543201")
                        }
                        className="font-medium text-green-700 hover:text-green-900 underline block"
                      >
                        Customer: +91 9876543201
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleDemoWhatsAppLogin("+91 9876543210")
                        }
                        className="font-medium text-blue-700 hover:text-blue-900 underline block"
                      >
                        Business Partner: +91 9876543210
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleDemoWhatsAppLogin("+91 9876543200")
                        }
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
                label="WhatsApp Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                icon={MessageCircle}
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
                  />
                  <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">📱 Demo OTP:</span> 123456
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      💡 Use any WhatsApp number from the list above, then enter
                      123456
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      In production, this would be sent to your WhatsApp
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
        className="w-full"
      >
        {showOTP ? "Verify OTP" : "Sign In"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleModeChange("signup")}
          className="text-sm text-gray-600 hover:text-gray-900 group"
        >
          Don't have an account?{" "}
          <span className="text-primary-600 font-medium group-hover:text-primary-700">
            Sign up here
          </span>
        </button>
      </div>
    </motion.form>
  );

  const renderSignupForm = () => (
    <motion.form
      onSubmit={handleSignup}
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="space-y-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            <User className="w-4 h-4 inline mr-2" />
            Account Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`
              relative flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap sm:flex-nowrap">
                  <Users className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    Customer
                  </span>
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
              relative flex items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap sm:flex-nowrap">
                  <Shield className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    Business Partner
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">List your services</p>
              </div>
              {formData.userType === "seller" && (
                <CheckCircle className="w-5 h-5 text-primary-600" />
              )}
            </label>
          </div>
        </div>

        {/* Business Type Selection */}
        {formData.userType === "seller" && !formData.businessType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 pt-4"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Choose Your Business Type
              </h3>
              <p className="text-sm text-gray-600">
                Select the type of business you want to register
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, businessType: "product" }))
                }
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center"
              >
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold text-gray-900 mb-1">Product</h4>
                <p className="text-xs text-gray-600">Sell physical products</p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, businessType: "service" }))
                }
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-center"
              >
                <Wrench className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-semibold text-gray-900 mb-1">Service</h4>
                <p className="text-xs text-gray-600">Provide services</p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    businessType: "bike-rider",
                  }))
                }
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-center"
              >
                <Bike className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-semibold text-gray-900 mb-1">Bike Rider</h4>
                <p className="text-xs text-gray-600">Delivery & transport</p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    businessType: "taxi-service",
                  }))
                }
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 text-center"
              >
                <Car className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <h4 className="font-semibold text-gray-900 mb-1">
                  Taxi Service
                </h4>
                <p className="text-xs text-gray-600">Passenger transport</p>
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: "customer" }))
                }
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to User Type
              </Button>
            </div>
          </motion.div>
        )}

        {/* Customer Form */}
        {formData.userType === "customer" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 pt-4"
          >
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
          </motion.div>
        )}

        {/* Product Business Form */}
        {formData.userType === "seller" &&
          formData.businessType === "product" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Product Business Registration
                </h3>
                <p className="text-xs text-blue-700">
                  Register your product-based business
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

              <Input
                label="Email Address"
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
                label="Business Address"
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                icon={MapPin}
                placeholder="Complete business address"
                required
                className="transform transition-all hover:scale-[1.02]"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Product Categories
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Electronics",
                    "Clothing",
                    "Home & Garden",
                    "Books",
                    "Sports",
                    "Food & Beverages",
                  ].map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.productCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              productCategories: [
                                ...prev.productCategories,
                                category,
                              ],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              productCategories: prev.productCategories.filter(
                                (c) => c !== category
                              ),
                            }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
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

              <div className="flex justify-center mt-6">
                <Button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, businessType: "" }))
                  }
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Business Type
                </Button>
              </div>
            </motion.div>
          )}

        {/* Service Business Form */}
        {formData.userType === "seller" &&
          formData.businessType === "service" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
                  <Wrench className="w-4 h-4 mr-2" />
                  Service Business Registration
                </h3>
                <p className="text-xs text-green-700">
                  Register your service-based business
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

              <Input
                label="Email Address"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Wrench className="w-4 h-4 inline mr-2" />
                  Service Types
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Plumbing",
                    "Electrical",
                    "Cleaning",
                    "Repair",
                    "Maintenance",
                    "Consultation",
                  ].map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.serviceTypes.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              serviceTypes: [...prev.serviceTypes, service],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              serviceTypes: prev.serviceTypes.filter(
                                (s) => s !== service
                              ),
                            }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label="Service Area"
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                icon={MapPin}
                placeholder="Areas you serve"
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

              <div className="flex justify-center mt-6">
                <Button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, businessType: "" }))
                  }
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Business Type
                </Button>
              </div>
            </motion.div>
          )}

        {/* Bike Rider Form */}
        {formData.userType === "seller" &&
          formData.businessType === "bike-rider" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-purple-800 mb-2 flex items-center">
                  <Bike className="w-4 h-4 mr-2" />
                  Bike Rider Registration
                </h3>
                <p className="text-xs text-purple-700">
                  Register as a delivery rider
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

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                icon={Mail}
                placeholder="rider@example.com"
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
                label="Driver's License Number"
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                icon={CreditCard}
                placeholder="DL123456789"
                required
                className="transform transition-all hover:scale-[1.02]"
              />

              <Input
                label="Vehicle Type"
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                icon={Bike}
                placeholder="Motorcycle/Scooter"
                required
                className="transform transition-all hover:scale-[1.02]"
              />

              <Input
                label="Vehicle Number"
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                icon={Tag}
                placeholder="SK01XX1234"
                required
                className="transform transition-all hover:scale-[1.02]"
              />

              <Input
                label="Service Area"
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                icon={MapPin}
                placeholder="Areas you serve"
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

              <div className="flex justify-center mt-6">
                <Button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, businessType: "" }))
                  }
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Business Type
                </Button>
              </div>
            </motion.div>
          )}

        {/* Taxi Service Form */}
        {formData.userType === "seller" &&
          formData.businessType === "taxi-service" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-orange-800 mb-2 flex items-center">
                  <Car className="w-4 h-4 mr-2" />
                  Taxi Service Registration
                </h3>
                <p className="text-xs text-orange-700">
                  Register your taxi service business
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

              <Input
                label="Business Name"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                icon={Building}
                placeholder="Your Taxi Service Name"
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
                placeholder="taxi@example.com"
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
                label="Driver's License Number"
                type="text"
                name="driverLicenseNumber"
                value={formData.driverLicenseNumber}
                onChange={handleInputChange}
                icon={CreditCard}
                placeholder="DL123456789"
                required
                className="transform transition-all hover:scale-[1.02]"
              />

              <Input
                label="Commercial Permit Number"
                type="text"
                name="commercialPermit"
                value={formData.commercialPermit}
                onChange={handleInputChange}
                icon={FileText}
                placeholder="CP123456789"
                required
                className="transform transition-all hover:scale-[1.02]"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="w-4 h-4 inline mr-2" />
                  Vehicle Types
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Sedan",
                    "SUV",
                    "Hatchback",
                    "Luxury",
                    "Mini Van",
                    "Tempo Traveller",
                  ].map((vehicle) => (
                    <label
                      key={vehicle}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.vehicleTypes.includes(vehicle)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              vehicleTypes: [...prev.vehicleTypes, vehicle],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              vehicleTypes: prev.vehicleTypes.filter(
                                (v) => v !== vehicle
                              ),
                            }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{vehicle}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label="Operating Areas"
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                icon={MapPin}
                placeholder="Areas you serve"
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

              <div className="flex justify-center mt-6">
                <Button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, businessType: "" }))
                  }
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Business Type
                </Button>
              </div>
            </motion.div>
          )}
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

      {/* Show submit button only when form is ready */}
      {(formData.userType === "customer" ||
        (formData.userType === "seller" && formData.businessType)) && (
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          Create Account
        </Button>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleModeChange("login")}
          className="text-sm text-gray-600 hover:text-gray-900 group"
        >
          Already have an account?{" "}
          <span className="text-primary-600 font-medium group-hover:text-primary-700">
            Sign in here
          </span>
        </button>
      </div>
    </motion.form>
  );

  const features = getFeatures();
  const benefits = getBenefits();
  const welcomeContent = getWelcomeContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>
          {mode === "login" ? "Sign In" : "Sign Up"} - Easy Life Gangtok
        </title>
        <meta
          name="description"
          content="Join Easy Life Gangtok - Your trusted local service marketplace"
        />
      </Helmet>

      <div className="flex min-h-screen">
        {/* Left Panel - Welcome Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-white max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                {welcomeContent.title}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {welcomeContent.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">
                {welcomeContent.whyChoose}
              </h2>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-blue-100 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 pt-8 border-t border-white/20"
            >
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <benefit.icon className="w-4 h-4 text-blue-200" />
                    <span className="text-sm text-blue-100">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md sm:max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 sm:p-8 shadow-xl">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {mode === "login" ? "Welcome Back!" : "Join Easy Life"}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {mode === "login"
                      ? "Sign in to your account"
                      : "Create your account today"}
                  </p>
                </div>

                {mode === "login" ? renderLoginForm() : renderSignupForm()}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
