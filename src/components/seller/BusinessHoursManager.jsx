import React, { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Save,
  Copy,
  Calendar,
  AlertCircle,
  Trash2,
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

  const handleCopyHours = (fromDay, toDay) => {
    const fromHours = businessHours[fromDay];
    setBusinessHours((prev) => ({
      ...prev,
      [toDay]: { ...fromHours },
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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

        {/* Current Status */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-lg ${
                  currentStatus.status === "open"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <Clock
                  className={`w-6 h-6 ${
                    currentStatus.status === "open"
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
                        <div className="flex items-center space-x-3">
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
                            Open
                          </span>
                        </div>
                      </div>

                      {!hours.closed ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                                  handleHoursChange(
                                    day,
                                    "close",
                                    e.target.value
                                  )
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="relative">
                              <button
                                onClick={() => {
                                  const dropdown = document.getElementById(
                                    `copy-${day}`
                                  );
                                  dropdown?.classList.toggle("hidden");
                                }}
                                className="px-4 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors rounded-md border border-gray-200"
                                title="Copy to other days"
                              >
                                <div className="flex items-center space-x-2">
                                  <Copy className="w-4 h-4" />
                                  <span className="text-sm font-medium">
                                    Copy
                                  </span>
                                </div>
                              </button>
                              <div
                                id={`copy-${day}`}
                                className="hidden absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-40"
                              >
                                <div className="p-3">
                                  <p className="text-xs text-gray-600 mb-3 font-medium">
                                    Copy to:
                                  </p>
                                  <div className="space-y-1">
                                    {Object.keys(businessHours)
                                      .filter((d) => d !== day)
                                      .map((otherDay) => (
                                        <button
                                          key={otherDay}
                                          onClick={() => {
                                            handleCopyHours(day, otherDay);
                                            document
                                              .getElementById(`copy-${day}`)
                                              ?.classList.add("hidden");
                                          }}
                                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded capitalize transition-colors"
                                        >
                                          {dayNames[otherDay]}
                                        </button>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <span className="text-gray-500 text-lg font-medium">
                            Closed
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                      <div className="grid grid-cols-12 gap-6 items-center">
                        {/* Day Name */}
                        <div className="col-span-2">
                          <span className="font-semibold text-gray-900 capitalize text-base">
                            {dayNames[day]}
                          </span>
                        </div>

                        {/* Open/Closed Toggle */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-3">
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
                              Open
                            </span>
                          </div>
                        </div>

                        {/* Time Inputs or Closed Message */}
                        <div className="col-span-6">
                          {!hours.closed ? (
                            <div className="grid grid-cols-5 gap-3 items-center">
                              <div className="col-span-2">
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                              </div>
                              <div className="col-span-1 text-center">
                                <span className="text-gray-500 text-sm font-medium">
                                  to
                                </span>
                              </div>
                              <div className="col-span-2">
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500 text-sm font-medium">
                              Closed
                            </span>
                          )}
                        </div>

                        {/* Copy Button */}
                        <div className="col-span-2">
                          {!hours.closed && (
                            <div className="relative">
                              <button
                                onClick={() => {
                                  const dropdown = document.getElementById(
                                    `copy-${day}`
                                  );
                                  dropdown?.classList.toggle("hidden");
                                }}
                                className="w-full px-3 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors rounded-md border border-gray-200"
                                title="Copy to other days"
                              >
                                <div className="flex items-center justify-center space-x-2">
                                  <Copy className="w-4 h-4" />
                                  <span className="text-xs font-medium">
                                    Copy
                                  </span>
                                </div>
                              </button>
                              <div
                                id={`copy-${day}`}
                                className="hidden absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-40"
                              >
                                <div className="p-3">
                                  <p className="text-xs text-gray-600 mb-3 font-medium">
                                    Copy to:
                                  </p>
                                  <div className="space-y-1">
                                    {Object.keys(businessHours)
                                      .filter((d) => d !== day)
                                      .map((otherDay) => (
                                        <button
                                          key={otherDay}
                                          onClick={() => {
                                            handleCopyHours(day, otherDay);
                                            document
                                              .getElementById(`copy-${day}`)
                                              ?.classList.add("hidden");
                                          }}
                                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded capitalize transition-colors"
                                        >
                                          {dayNames[otherDay]}
                                        </button>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
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
