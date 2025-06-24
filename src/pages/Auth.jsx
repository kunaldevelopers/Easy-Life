import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "customer",
    otp: "",
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

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Login Method Toggle */}
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => {
            setLoginMethod("email");
            setShowOTP(false);
            setFormData({ ...formData, otp: "" });
          }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            loginMethod === "email"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginMethod("phone");
            setShowOTP(false);
            setFormData({ ...formData, otp: "" });
          }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            loginMethod === "phone"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Phone
        </button>
      </div>

      {loginMethod === "email" ? (
        <>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            icon={Mail}
            required
          />
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              icon={Lock}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            icon={Phone}
            placeholder="+91 98765 43210"
            required
          />
          {showOTP && (
            <div>
              <Input
                label="Enter OTP"
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="123456"
                maxLength={6}
                required
              />
              <p className="text-sm text-gray-600 mt-1">Demo OTP: 123456</p>
            </div>
          )}
        </>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
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
          onClick={() => setMode("signup")}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignup} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        icon={User}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        icon={Mail}
        required
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
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          icon={Lock}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        icon={Lock}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Type
        </label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="customer">Customer</option>
          <option value="seller">Business Owner</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full"
      >
        Create Account
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode("login")}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );

  return (
    <>
      <Helmet>
        <title>
          {mode === "login" ? "Sign In" : "Sign Up"} - Easy Life Gangtok
        </title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {mode === "login"
                ? "Sign in to your Easy Life account"
                : "Join the Easy Life community today"}
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-6">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mode === "login" ? renderLoginForm() : renderSignupForm()}
            </motion.div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
