import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Save,
  Calendar,
  AlertCircle,
  Trash2,
  Plus,
  Edit,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const BusinessHoursManager = ({ onBack }) => {
  const [businessHours, setBusinessHours] = useState({
    monday: { open: "09:00", close: "21:00", closed: false },
    tuesday: { open: "09:00", close: "21:00", closed: false },
    wednesday: { open: "09:00", close: "21:00", closed: false },
    thursday: { open: "09:00", close: "21:00", closed: false },
    friday: { open: "09:00", close: "22:00", closed: false },
    saturday: { open: "09:00", close: "22:00", closed: false },
    sunday: { open: "10:00", close: "20:00", closed: false },
  });
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState("regular");
  const [expandedDay, setExpandedDay] = useState(null);

  const [specialHours, setSpecialHours] = useState([
    {
      id: 1,
      date: "2024-12-25",
      title: "Christmas Day",
      type: "closed",
      open: "",
      close: "",
      note: "Closed for Christmas celebration",
    },
    {
      id: 2,
      date: "2024-12-31",
      title: "New Year's Eve",
      type: "special",
      open: "09:00",
      close: "18:00",
      note: "Early closing for New Year celebration",
    },
    {
      id: 3,
      date: "2024-10-02",
      title: "Gandhi Jayanti",
      type: "closed",
      open: "",
      close: "",
      note: "National holiday",
    },
  ]);

  const [newSpecialHour, setNewSpecialHour] = useState({
    date: "",
    title: "",
    type: "closed",
    open: "",
    close: "",
    note: "",
  });

  const [showAddSpecialHour, setShowAddSpecialHour] = useState(false);

  const dayNames = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const handleHoursChange = (day, field, value) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSaveHours = () => {
    console.log("Saving business hours:", businessHours);
    alert("Business hours updated successfully!");
  };

  const handleAddSpecialHour = () => {
    if (newSpecialHour.date && newSpecialHour.title) {
      const newEntry = {
        ...newSpecialHour,
        id: Date.now(),
      };
      setSpecialHours((prev) =>
        [...prev, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      setNewSpecialHour({
        date: "",
        title: "",
        type: "closed",
        open: "",
        close: "",
        note: "",
      });
      setShowAddSpecialHour(false);
    }
  };

  const handleDeleteSpecialHour = (id) => {
    if (window.confirm("Are you sure you want to delete this special hour?")) {
      setSpecialHours((prev) => prev.filter((hour) => hour.id !== id));
    }
  };

  const getCurrentStatus = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysArray = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDayKey = daysArray[dayOfWeek];
    const currentTime = now.toTimeString().substring(0, 5);

    // Check for special hours first
    const today = now.toISOString().split("T")[0];
    const specialToday = specialHours.find((sh) => sh.date === today);
    if (specialToday) {
      if (specialToday.type === "closed") {
        return { status: "closed", reason: specialToday.title };
      }
    }

    const daySchedule = businessHours[currentDayKey];
    if (!daySchedule || daySchedule.closed) {
      return { status: "closed", reason: "Regular hours" };
    }

    if (currentTime >= daySchedule.open && currentTime <= daySchedule.close) {
      return { status: "open", reason: `Until ${daySchedule.close}` };
    } else {
      return { status: "closed", reason: `Opens at ${daySchedule.open}` };
    }
  };

  const currentStatus = getCurrentStatus();

  // Mobile detection useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDayStatus = (day, hours) => {
    if (hours.closed) return { text: "Closed", color: "text-red-600" };
    return { 
      text: `${hours.open} - ${hours.close}`, 
      color: "text-green-600" 
    };
  };

  const toggleDay = (day) => {
    if (isMobile) {
      setExpandedDay(expandedDay === day ? null : day);
    }
  };

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
              <h1 className="text-lg font-semibold text-gray-900">
                Business Hours
              </h1>
              <p className="text-sm text-gray-500">
                Currently Open
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveHours}
            icon={Save}
          >
            Save
          </Button>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="mt-4 flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("regular")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "regular"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Regular Hours
          </button>
          <button
            onClick={() => setActiveTab("special")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "special"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Special Hours
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Business Hours
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your regular and special business hours
                </p>
              </div>
            </div>

            <Button onClick={handleSaveHours} variant="primary" icon={Save}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden p-4">
        {/* Regular Hours Tab */}
        {activeTab === "regular" && (
          <div className="space-y-3">
            {Object.entries(businessHours).map(([day, hours]) => {
              const status = getDayStatus(day, hours);
              const isExpanded = expandedDay === day;

              return (
                <Card key={day} className="overflow-hidden">
                  <button
                    onClick={() => toggleDay(day)}
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">
                          {day}
                        </h3>
                        <p className={`text-sm ${status.color}`}>
                          {status.text}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Open
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!hours.closed}
                              onChange={(e) => handleHoursChange(day, 'closed', !e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        {!hours.closed && (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                Opening Time
                              </label>
                              <input
                                type="time"
                                value={hours.open}
                                onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                Closing Time
                              </label>
                              <input
                                type="time"
                                value={hours.close}
                                onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Special Hours Tab */}
        {activeTab === "special" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Special Hours</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAddSpecialHour(true)}
                icon={Plus}
              >
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {specialHours.map((special) => (
                <Card key={special.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{special.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{special.date}</p>
                      <p className="text-sm text-gray-500 mt-1">{special.note}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        special.type === 'closed' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {special.type === 'closed' ? 'Closed' : `${special.open} - ${special.close}`}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}

              {specialHours.length === 0 && (
                <Card className="p-8 text-center">
                  <div className="text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No special hours</h3>
                    <p className="text-sm">Add special hours for holidays or events</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Content */}
      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center py-8">
              <p className="text-gray-600">Desktop business hours interface would be here</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Currently{" "}
                  {currentStatus.status === "open" ? "Open" : "Closed"}
                </h3>
                <p className="text-gray-600">{currentStatus.reason}</p>
              </div>
            </div>
            <div
              className={`px-4 py-2 rounded-full font-medium ${
                currentStatus.status === "open"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {currentStatus.status === "open" ? "OPEN" : "CLOSED"}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Regular Hours */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Regular Business Hours
              </h2>
              <div className="space-y-4">
                {Object.entries(businessHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    {/* Mobile Layout */}
                    <div className="block lg:hidden space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 capitalize text-lg">
                          {dayNames[day]}
                        </span>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={!hours.closed}
                            onChange={(e) =>
                              handleHoursChange(
                                day,
                                "closed",
                                !e.target.checked
                              )
                            }
                            className="w-4 h-4 rounded focus:ring-primary-500 text-primary-600"
                          />
                          <span className="text-sm font-medium text-gray-600">
                            {!hours.closed ? "Open" : "Closed"}
                          </span>
                        </div>
                      </div>

                      {!hours.closed ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Open Time
                            </label>
                            <input
                              type="time"
                              value={hours.open}
                              onChange={(e) =>
                                handleHoursChange(day, "open", e.target.value)
                              }
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              Close Time
                            </label>
                            <input
                              type="time"
                              value={hours.close}
                              onChange={(e) =>
                                handleHoursChange(day, "close", e.target.value)
                              }
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <span className="text-gray-500 text-base font-medium">
                            All day closed
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Day Name */}
                        <div className="col-span-2">
                          <span className="font-semibold text-gray-900 capitalize text-base">
                            {dayNames[day]}
                          </span>
                        </div>

                        {/* Open/Closed Toggle */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={!hours.closed}
                              onChange={(e) =>
                                handleHoursChange(
                                  day,
                                  "closed",
                                  !e.target.checked
                                )
                              }
                              className="w-4 h-4 rounded focus:ring-primary-500 text-primary-600"
                            />
                            <span className="text-sm font-medium text-gray-600">
                              {!hours.closed ? "Open" : "Closed"}
                            </span>
                          </div>
                        </div>

                        {/* Time Inputs or Closed Message */}
                        <div className="col-span-8">
                          {!hours.closed ? (
                            <div className="flex items-center gap-3">
                              <div className="flex-1 max-w-[130px]">
                                <input
                                  type="time"
                                  value={hours.open}
                                  onChange={(e) =>
                                    handleHoursChange(
                                      day,
                                      "open",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-gray-500 text-sm font-medium">
                                  to
                                </span>
                              </div>
                              <div className="flex-1 max-w-[130px]">
                                <input
                                  type="time"
                                  value={hours.close}
                                  onChange={(e) =>
                                    handleHoursChange(
                                      day,
                                      "close",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500 text-sm font-medium">
                              All day closed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-4">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      const weekdayHours = {
                        open: "09:00",
                        close: "18:00",
                        closed: false,
                      };
                      [
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                      ].forEach((day) => {
                        setBusinessHours((prev) => ({
                          ...prev,
                          [day]: weekdayHours,
                        }));
                      });
                    }}
                    className="px-4 py-3 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    Set Weekdays 9-6
                  </button>
                  <button
                    onClick={() => {
                      const weekendHours = {
                        open: "10:00",
                        close: "20:00",
                        closed: false,
                      };
                      ["saturday", "sunday"].forEach((day) => {
                        setBusinessHours((prev) => ({
                          ...prev,
                          [day]: weekendHours,
                        }));
                      });
                    }}
                    className="px-4 py-3 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    Set Weekends 10-8
                  </button>
                  <button
                    onClick={() => {
                      setBusinessHours((prev) => ({
                        ...prev,
                        sunday: { ...prev.sunday, closed: true },
                      }));
                    }}
                    className="px-4 py-3 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    Close Sundays
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Special Hours */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Special Hours & Holidays
                </h2>
                <Button
                  onClick={() => setShowAddSpecialHour(true)}
                  variant="outline"
                  size="sm"
                  icon={Calendar}
                >
                  Add Special Hour
                </Button>
              </div>
              {/* Add Special Hour Form */}
              {showAddSpecialHour && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Add Special Hours
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={newSpecialHour.date}
                          onChange={(e) =>
                            setNewSpecialHour((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={newSpecialHour.title}
                          onChange={(e) =>
                            setNewSpecialHour((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="e.g., Christmas Day"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={newSpecialHour.type}
                        onChange={(e) =>
                          setNewSpecialHour((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="closed">Closed</option>
                        <option value="special">Special Hours</option>
                      </select>
                    </div>

                    {newSpecialHour.type === "special" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Open Time
                          </label>
                          <input
                            type="time"
                            value={newSpecialHour.open}
                            onChange={(e) =>
                              setNewSpecialHour((prev) => ({
                                ...prev,
                                open: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Close Time
                          </label>
                          <input
                            type="time"
                            value={newSpecialHour.close}
                            onChange={(e) =>
                              setNewSpecialHour((prev) => ({
                                ...prev,
                                close: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={newSpecialHour.note}
                        onChange={(e) =>
                          setNewSpecialHour((prev) => ({
                            ...prev,
                            note: e.target.value,
                          }))
                        }
                        placeholder="Additional information"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleAddSpecialHour}
                        variant="primary"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        Add Special Hour
                      </Button>
                      <Button
                        onClick={() => setShowAddSpecialHour(false)}
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {/* Special Hours List */}{" "}
              <div className="space-y-4">
                {specialHours.map((specialHour) => (
                  <div
                    key={specialHour.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">
                            {specialHour.title}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                              specialHour.type === "closed"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {specialHour.type === "closed"
                              ? "Closed"
                              : "Special Hours"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          📅{" "}
                          {new Date(specialHour.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        {specialHour.type === "special" && (
                          <p className="text-sm text-gray-600 mb-1">
                            🕒 {specialHour.open} - {specialHour.close}
                          </p>
                        )}
                        {specialHour.note && (
                          <p className="text-sm text-gray-500">
                            {specialHour.note}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteSpecialHour(specialHour.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded flex-shrink-0"
                        title="Delete special hour"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {specialHours.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No special hours set</p>
                    <p className="text-sm text-gray-500">
                      Add special hours for holidays and events
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6 mt-6 bg-yellow-50 border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Tips for Managing Hours
                  </h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Update hours in advance for holidays</li>
                    <li>• Special hours override regular hours</li>
                    <li>• Customers see current status on your profile</li>
                    <li>• Consider seasonal adjustments</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHoursManager;
