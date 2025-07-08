import React, { useState } from "react";
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
    <div className="min-h-screen bg-gray-50 py-8">
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
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(-1)}
                      icon={ChevronLeft}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(1)}
                      icon={ChevronRight}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {["month", "week", "day"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1 text-sm rounded ${
                        viewMode === mode
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-24"></div>;
                  }

                  const dayStatus = getDayStatus(date);
                  const dayBookings = getBookingsForDate(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  const isSelected =
                    selectedDate &&
                    date.toDateString() === selectedDate.toDateString();

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`h-24 p-2 border cursor-pointer hover:bg-gray-50 transition-colors ${
                        isToday ? "border-blue-500" : "border-gray-200"
                      } ${isSelected ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-sm font-medium ${
                            isToday ? "text-blue-600" : "text-gray-900"
                          }`}
                        >
                          {date.getDate()}
                        </span>
                        {dayStatus && (
                          <span
                            className={`w-2 h-2 rounded-full ${
                              dayStatus.color.split(" ")[0]
                            }`}
                          ></span>
                        )}
                      </div>

                      <div className="space-y-1">
                        {dayBookings.slice(0, 2).map((booking, idx) => (
                          <div
                            key={idx}
                            className={`text-xs p-1 rounded truncate ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {booking.startTime} {booking.customerName}
                          </div>
                        ))}
                        {dayBookings.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayBookings.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Legend
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-100 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                    <span>Partially Booked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-100 rounded"></div>
                    <span>Fully Booked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-100 rounded"></div>
                    <span>Conflicts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-100 rounded"></div>
                    <span>Holiday</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-100 rounded"></div>
                    <span>Unavailable</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Details */}
            {selectedDate && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>

                <div className="space-y-4">
                  {getBookingsForDate(selectedDate).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {booking.customerName}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{booking.location}</span>
                        </div>
                        <div>₹{booking.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}

                  {getBookingsForDate(selectedDate).length === 0 && (
                    <p className="text-gray-500 text-sm">
                      No bookings for this date
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-medium">{bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmed</span>
                  <span className="font-medium text-green-600">
                    {bookings.filter((b) => b.status === "confirmed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-medium text-yellow-600">
                    {bookings.filter((b) => b.status === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-medium">
                    ₹
                    {bookings
                      .reduce((sum, b) => sum + b.amount, 0)
                      .toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Upcoming Bookings */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Upcoming Bookings
              </h3>
              <div className="space-y-3">
                {bookings
                  .filter((booking) => new Date(booking.date) >= new Date())
                  .slice(0, 3)
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center space-x-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          booking.priority === "high"
                            ? "bg-red-500"
                            : booking.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.date} at {booking.startTime}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarManager;
