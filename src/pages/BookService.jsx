import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { businesses } from "../data/businesses";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const foundBusiness = businesses.find((b) => b.id === parseInt(id));
    if (foundBusiness) {
      setBusiness(foundBusiness);
    } else {
      navigate("/listings");
    }
  }, [id, navigate]);

  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 2000);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  };

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-6">
              Your booking request has been sent to {business.name}. They will
              contact you shortly to confirm the appointment.
            </p>
            <div className="space-y-2 mb-6">
              <p>
                <strong>Service:</strong> {selectedService}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
            </div>
            <Button onClick={() => navigate("/")} variant="primary">
              Back to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Service - {business.name} - Easy Life Gangtok</title>
        <meta
          name="description"
          content={`Book a service with ${business.name} on Easy Life Gangtok`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <Card className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Book Service with {business.name}
              </h1>
              <p className="text-gray-600">
                Fill out the form below to book a service. We'll contact you to
                confirm your appointment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service *
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Choose a service</option>
                  {business.services?.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Choose a time</option>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email (optional)"
              />

              {/* Additional Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  value={customerInfo.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={3}
                  placeholder="Any specific requirements or additional information..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Book Service"}
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-600">
              <p>
                * By booking this service, you agree to our{" "}
                <a href="/terms" className="text-primary-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BookService;
