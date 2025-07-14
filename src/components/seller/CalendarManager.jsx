import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Settings,
  Repeat,
  ArrowLeft,
  Search,
  Filter,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const CalendarManager = ({ onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  const [showAddAvailability, setShowAddAvailability] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock availability and booking data
  const [availabilitySlots, setAvailabilitySlots] = useState([
    {
      id: "av-001",
      date: "2025-01-15",
      startTime: "09:00",
      endTime: "17:00",
      isRecurring: true,
      recurringPattern: "weekly",
      maxBookings: 3,
      currentBookings: 2,
      bufferTime: 30, // minutes between bookings
      serviceTypes: ["electrical-repair", "installation"],
    },
    {
      id: "av-002",
      date: "2025-01-16",
      startTime: "10:00",
      endTime: "16:00",
      isRecurring: false,
      maxBookings: 2,
      currentBookings: 1,
      bufferTime: 30,
      serviceTypes: ["consultation"],
    },
  ]);

  const [bookings, setBookings] = useState([
    {
      id: "book-001",
      date: "2025-01-15",
      startTime: "10:00",
      endTime: "14:00",
      customerName: "Rajesh Sharma",
      service: "Home Electrical Repair",
      status: "confirmed",
      amount: 1500,
      phone: "+91 9841234567",
      location: "MG Road, Gangtok",
      priority: "high",
    },
    {
      id: "book-002",
      date: "2025-01-15",
      startTime: "15:00",
      endTime: "17:00",
      customerName: "Priya Devi",
      service: "Electrical Installation",
      status: "pending",
      amount: 2500,
      phone: "+91 9812345678",
      location: "Tadong, Gangtok",
      priority: "medium",
    },
    {
      id: "book-003",
      date: "2025-01-16",
      startTime: "11:00",
      endTime: "13:00",
      customerName: "Sita Gurung",
      service: "Consultation",
      status: "confirmed",
      amount: 500,
      phone: "+91 9823456789",
      location: "Virtual Meeting",
      priority: "low",
    },
  ]);

  const [businessSettings, setBusinessSettings] = useState({
    defaultAvailability: {
      monday: { start: "09:00", end: "17:00", enabled: true },
      tuesday: { start: "09:00", end: "17:00", enabled: true },
      wednesday: { start: "09:00", end: "17:00", enabled: true },
      thursday: { start: "09:00", end: "17:00", enabled: true },
      friday: { start: "09:00", end: "17:00", enabled: true },
      saturday: { start: "10:00", end: "14:00", enabled: true },
      sunday: { start: "", end: "", enabled: false },
    },
    defaultBufferTime: 30,
    maxDailyBookings: 6,
    advanceBookingDays: 30,
    holidays: ["2025-01-26", "2025-03-08", "2025-08-15"],
  });

  // Calendar utility functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getBookingsForDate = (date) => {
    const dateString = formatDate(date);
    return bookings.filter((booking) => booking.date === dateString);
  };

  const getAvailabilityForDate = (date) => {
    const dateString = formatDate(date);
    return availabilitySlots.find((slot) => slot.date === dateString);
  };

  const isDateAvailable = (date) => {
    const availability = getAvailabilityForDate(date);
    const dayBookings = getBookingsForDate(date);

    if (!availability) return false;
    return dayBookings.length < availability.maxBookings;
  };

  const hasConflicts = (date) => {
    const dayBookings = getBookingsForDate(date);
    // Simple conflict detection - can be enhanced
    return dayBookings.some((booking) => booking.status === "pending");
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDayStatus = (date) => {
    if (!date) return null;

    const isHoliday = businessSettings.holidays.includes(formatDate(date));
    const hasBookings = getBookingsForDate(date).length > 0;
    const available = isDateAvailable(date);
    const conflicts = hasConflicts(date);

    if (isHoliday) return { type: "holiday", color: "bg-red-100 text-red-800" };
    if (conflicts)
      return { type: "conflict", color: "bg-orange-100 text-orange-800" };
    if (hasBookings && available)
      return { type: "partial", color: "bg-yellow-100 text-yellow-800" };
    if (hasBookings && !available)
      return { type: "booked", color: "bg-blue-100 text-blue-800" };
    if (available)
      return { type: "available", color: "bg-green-100 text-green-800" };
    return { type: "unavailable", color: "bg-gray-100 text-gray-600" };
  };

  // Mobile detection useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile Booking Detail View
  if (isMobile && selectedBooking) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Booking Details
                </h1>
                <p className="text-sm text-gray-500">
                  {selectedBooking.date} • {selectedBooking.time}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Booking Content */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedBooking.customer}
                </h2>
                <p className="text-gray-600">{selectedBooking.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 text-sm">Date</span>
                  <p className="font-medium">{selectedBooking.date}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Time</span>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Duration</span>
                  <p className="font-medium">{selectedBooking.duration}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Status</span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedBooking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : selectedBooking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedBooking.status.charAt(0).toUpperCase() +
                      selectedBooking.status.slice(1)}
                  </span>
                </div>
              </div>

              {selectedBooking.location && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">Location</span>
                  </div>
                  <p className="text-gray-900">{selectedBooking.location}</p>
                </div>
              )}

              {selectedBooking.notes && (
                <div>
                  <span className="text-gray-600 text-sm">Notes</span>
                  <p className="text-gray-900 mt-1">{selectedBooking.notes}</p>
                </div>
              )}
            </div>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
            <Button variant="primary" className="flex-1">
              Contact Customer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                ← Back to Calendar
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Calendar Settings
              </h1>
            </div>

            <div className="space-y-8">
              {/* Default Availability */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Default Weekly Availability
                </h3>
                <div className="space-y-4">
                  {Object.entries(businessSettings.defaultAvailability).map(
                    ([day, settings]) => (
                      <div
                        key={day}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                        <div className="w-20">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings.enabled}
                              onChange={(e) =>
                                setBusinessSettings((prev) => ({
                                  ...prev,
                                  defaultAvailability: {
                                    ...prev.defaultAvailability,
                                    [day]: {
                                      ...settings,
                                      enabled: e.target.checked,
                                    },
                                  },
                                }))
                              }
                              className="mr-2"
                            />
                            <span className="capitalize font-medium">
                              {day}
                            </span>
                          </label>
                        </div>

                        {settings.enabled && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={settings.start}
                              onChange={(e) =>
                                setBusinessSettings((prev) => ({
                                  ...prev,
                                  defaultAvailability: {
                                    ...prev.defaultAvailability,
                                    [day]: {
                                      ...settings,
                                      start: e.target.value,
                                    },
                                  },
                                }))
                              }
                              className="w-32"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              value={settings.end}
                              onChange={(e) =>
                                setBusinessSettings((prev) => ({
                                  ...prev,
                                  defaultAvailability: {
                                    ...prev.defaultAvailability,
                                    [day]: { ...settings, end: e.target.value },
                                  },
                                }))
                              }
                              className="w-32"
                            />
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Business Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Booking Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Buffer Time (minutes)
                    </label>
                    <Input
                      type="number"
                      value={businessSettings.defaultBufferTime}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({
                          ...prev,
                          defaultBufferTime: parseInt(e.target.value),
                        }))
                      }
                      min="0"
                      max="120"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Daily Bookings
                    </label>
                    <Input
                      type="number"
                      value={businessSettings.maxDailyBookings}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({
                          ...prev,
                          maxDailyBookings: parseInt(e.target.value),
                        }))
                      }
                      min="1"
                      max="20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advance Booking Days
                    </label>
                    <Input
                      type="number"
                      value={businessSettings.advanceBookingDays}
                      onChange={(e) =>
                        setBusinessSettings((prev) => ({
                          ...prev,
                          advanceBookingDays: parseInt(e.target.value),
                        }))
                      }
                      min="1"
                      max="365"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button variant="primary" className="w-full">
                  Save Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Calendar</h1>
              <p className="text-sm text-gray-500">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAddAvailability(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile View Mode Toggle */}
        <div className="mt-4 flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {["month", "week", "day"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                viewMode === mode
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
              ← Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Calendar & Availability
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your schedule and booking availability
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddAvailability(true)}
                  icon={Plus}
                >
                  Add Availability
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  icon={Settings}
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Calendar */}
      <div className="lg:hidden p-4">
        {/* Mobile Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <Card className="p-4 mb-4">
          {/* Mobile Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center py-2 text-xs font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((date, index) => {
              if (!date) {
                return <div key={index} className="p-2"></div>;
              }

              const status = getDayStatus(date);
              const isToday = formatDate(date) === formatDate(new Date());
              const isSelected =
                selectedDate && formatDate(date) === formatDate(selectedDate);
              const dayBookings = getBookingsForDate(date);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`relative p-2 text-sm rounded-lg transition-colors ${
                    isSelected
                      ? "bg-blue-100 border-2 border-blue-500"
                      : isToday
                      ? "bg-blue-50 border border-blue-300"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      isToday ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {date.getDate()}
                  </span>
                  {dayBookings.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          status?.type === "booked"
                            ? "bg-blue-500"
                            : status?.type === "partial"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Mobile Selected Date Bookings */}
        {selectedDate && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>

            <div className="space-y-3">
              {getBookingsForDate(selectedDate).map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.customer}
                      </p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.time}</p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {getBookingsForDate(selectedDate).length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No bookings for this date</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Mobile Legend */}
        <Card className="p-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Legend</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Partial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Holiday</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Desktop Calendar */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {currentDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h2>
                    <div className="flex space-x-1">
                      {["month", "week", "day"].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setViewMode(mode)}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            viewMode === mode
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Desktop Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <div
                      key={day}
                      className="text-center py-3 text-sm font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((date, index) => {
                    if (!date) {
                      return <div key={index} className="p-3"></div>;
                    }

                    const status = getDayStatus(date);
                    const isToday = formatDate(date) === formatDate(new Date());
                    const isSelected =
                      selectedDate &&
                      formatDate(date) === formatDate(selectedDate);
                    const dayBookings = getBookingsForDate(date);

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`relative p-3 text-sm rounded-lg transition-colors min-h-[60px] ${
                          isSelected
                            ? "bg-blue-100 border-2 border-blue-500"
                            : isToday
                            ? "bg-blue-50 border border-blue-300"
                            : status
                            ? `${status.color} hover:opacity-80`
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            isToday ? "text-blue-600" : "text-gray-900"
                          }`}
                        >
                          {date.getDate()}
                        </span>
                        {dayBookings.length > 0 && (
                          <div className="absolute bottom-1 right-1">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                              {dayBookings.length}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Desktop Sidebar */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Today's Schedule
                </h3>
                <div className="space-y-3">
                  {getBookingsForDate(new Date())
                    .slice(0, 3)
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.customer}
                            </p>
                            <p className="text-sm text-gray-600">
                              {booking.service}
                            </p>
                          </div>
                          <span className="text-sm font-medium">
                            {booking.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  {getBookingsForDate(new Date()).length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No bookings today
                    </p>
                  )}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-medium">
                      {bookings.length} bookings
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Slots</span>
                    <span className="font-medium text-green-600">
                      {availabilitySlots.reduce(
                        (acc, slot) =>
                          acc + (slot.maxBookings - slot.currentBookings),
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium text-yellow-600">
                      {bookings.filter((b) => b.status === "pending").length}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Legend */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Legend
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                    <span>Partially Booked</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                    <span>Fully Booked</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                    <span>Holiday/Unavailable</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarManager;
