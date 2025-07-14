import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  MoreVertical,
} from "lucide-react";
import Button from "../common/Button";
import Card from "../common/Card";
import Modal from "../common/Modal";

const BusinessHoursManager = ({ onBack }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedDay, setExpandedDay] = useState(null);
  const [isBulkEditMode, setIsBulkEditMode] = useState(false);
  const [isAddingSpecialHour, setIsAddingSpecialHour] = useState(false);
  const [editingSpecialHour, setEditingSpecialHour] = useState(null);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [businessHours, setBusinessHours] = useState([
    {
      day: "Monday",
      isOpen: true,
      openTime: "09:00",
      closeTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Tuesday",
      isOpen: true,
      openTime: "09:00",
      closeTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Wednesday",
      isOpen: true,
      openTime: "09:00",
      closeTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Thursday",
      isOpen: true,
      openTime: "09:00",
      closeTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Friday",
      isOpen: true,
      openTime: "09:00",
      closeTime: "17:00",
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Saturday",
      isOpen: true,
      openTime: "10:00",
      closeTime: "16:00",
      breakStart: "",
      breakEnd: "",
    },
    {
      day: "Sunday",
      isOpen: false,
      openTime: "10:00",
      closeTime: "16:00",
      breakStart: "",
      breakEnd: "",
    },
  ]);

  const [specialHours, setSpecialHours] = useState([
    {
      id: "special-1",
      date: "2025-01-26",
      reason: "Republic Day",
      isClosed: true,
      openTime: "",
      closeTime: "",
    },
    {
      id: "special-2",
      date: "2025-02-14",
      reason: "Valentine's Day - Extended Hours",
      isClosed: false,
      openTime: "08:00",
      closeTime: "20:00",
    },
  ]);

  const [newSpecialHour, setNewSpecialHour] = useState({
    date: "",
    reason: "",
    isClosed: false,
    openTime: "09:00",
    closeTime: "17:00",
  });

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
    const currentTime = now.toTimeString().slice(0, 5);

    const todayHours = businessHours.find((h) => h.day === currentDay);

    if (!todayHours || !todayHours.isOpen) {
      return { status: "closed", reason: "Closed today" };
    }

    if (
      currentTime >= todayHours.openTime &&
      currentTime <= todayHours.closeTime
    ) {
      if (
        todayHours.breakStart &&
        currentTime >= todayHours.breakStart &&
        currentTime <= todayHours.breakEnd
      ) {
        return { status: "closed", reason: "On break" };
      }
      return { status: "open", reason: `Open until ${todayHours.closeTime}` };
    }

    return { status: "closed", reason: `Opens at ${todayHours.openTime}` };
  };

  const currentStatus = getCurrentStatus();

  const updateDay = (day, field, value) => {
    setBusinessHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, [field]: value } : h))
    );
  };

  const addSpecialHour = () => {
    const id = Date.now().toString();
    setSpecialHours((prev) => [...prev, { ...newSpecialHour, id }]);
    setNewSpecialHour({
      date: "",
      reason: "",
      isClosed: false,
      openTime: "09:00",
      closeTime: "17:00",
    });
    setIsAddingSpecialHour(false);
  };

  const updateSpecialHour = () => {
    setSpecialHours((prev) =>
      prev.map((h) => (h.id === editingSpecialHour.id ? editingSpecialHour : h))
    );
    setEditingSpecialHour(null);
  };

  const removeSpecialHour = (id) => {
    setSpecialHours((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                Business Hours
              </h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div
        className={`max-w-4xl mx-auto ${
          isMobile ? "" : "px-4 sm:px-6 lg:px-8 py-8"
        }`}
      >
        {/* Desktop Header */}
        {!isMobile && (
          <div className="mb-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
              ← Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Business Hours
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your regular hours and special schedules
              </p>
            </div>
          </div>
        )}

        {/* Current Status */}
        <Card className={`${isMobile ? "mx-4 mb-4" : "mb-8"} p-4 lg:p-6`}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Clock
                className={`w-8 h-8 ${
                  currentStatus.status === "open"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              />
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
              {currentStatus.status === "open" ? "Open" : "Closed"}
            </div>
          </div>
        </Card>

        {/* Business Hours */}
        <Card className={`${isMobile ? "mx-4 mb-4" : "mb-8"} p-4 lg:p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Regular Business Hours
            </h2>
            {!isMobile && (
              <Button
                variant="outline"
                icon={Plus}
                onClick={() => setIsBulkEditMode(!isBulkEditMode)}
              >
                {isBulkEditMode ? "Cancel" : "Bulk Edit"}
              </Button>
            )}
          </div>

          <div className="space-y-3 lg:space-y-4">
            {businessHours.map((dayHours) => (
              <div
                key={dayHours.day}
                className={`border rounded-lg transition-all ${
                  isMobile && expandedDay === dayHours.day
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div
                  className="p-4 cursor-pointer lg:cursor-default"
                  onClick={() =>
                    isMobile &&
                    setExpandedDay(
                      expandedDay === dayHours.day ? null : dayHours.day
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium text-gray-900 min-w-[80px]">
                        {dayHours.day}
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={dayHours.isOpen}
                            onChange={(e) =>
                              updateDay(
                                dayHours.day,
                                "isOpen",
                                e.target.checked
                              )
                            }
                          />
                          <div
                            className={`w-11 h-6 rounded-full transition-colors ${
                              dayHours.isOpen ? "bg-blue-600" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                                dayHours.isOpen
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              } mt-0.5 ml-0.5`}
                            />
                          </div>
                        </label>
                        {dayHours.isOpen ? (
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-600">
                              {dayHours.openTime} - {dayHours.closeTime}
                            </span>
                            {dayHours.breakStart && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 bg-yellow-100 text-yellow-800">
                                Break: {dayHours.breakStart} -{" "}
                                {dayHours.breakEnd}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Closed</span>
                        )}
                      </div>
                    </div>
                    {isMobile && (
                      <div className="text-gray-400">
                        {expandedDay === dayHours.day ? "▲" : "▼"}
                      </div>
                    )}
                  </div>

                  {/* Mobile Expanded Content */}
                  {isMobile &&
                    expandedDay === dayHours.day &&
                    dayHours.isOpen && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Open Time
                            </label>
                            <input
                              type="time"
                              value={dayHours.openTime}
                              onChange={(e) =>
                                updateDay(
                                  dayHours.day,
                                  "openTime",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Close Time
                            </label>
                            <input
                              type="time"
                              value={dayHours.closeTime}
                              onChange={(e) =>
                                updateDay(
                                  dayHours.day,
                                  "closeTime",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`break-${dayHours.day}`}
                            checked={!!dayHours.breakStart}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateDay(dayHours.day, "breakStart", "12:00");
                                updateDay(dayHours.day, "breakEnd", "13:00");
                              } else {
                                updateDay(dayHours.day, "breakStart", "");
                                updateDay(dayHours.day, "breakEnd", "");
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`break-${dayHours.day}`}
                            className="text-sm text-gray-700"
                          >
                            Add break time
                          </label>
                        </div>

                        {dayHours.breakStart && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Break Start
                              </label>
                              <input
                                type="time"
                                value={dayHours.breakStart}
                                onChange={(e) =>
                                  updateDay(
                                    dayHours.day,
                                    "breakStart",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Break End
                              </label>
                              <input
                                type="time"
                                value={dayHours.breakEnd}
                                onChange={(e) =>
                                  updateDay(
                                    dayHours.day,
                                    "breakEnd",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>

                {/* Desktop Time Controls */}
                {!isMobile && dayHours.isOpen && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Open Time
                        </label>
                        <input
                          type="time"
                          value={dayHours.openTime}
                          onChange={(e) =>
                            updateDay(dayHours.day, "openTime", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Close Time
                        </label>
                        <input
                          type="time"
                          value={dayHours.closeTime}
                          onChange={(e) =>
                            updateDay(dayHours.day, "closeTime", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Break Start
                        </label>
                        <input
                          type="time"
                          value={dayHours.breakStart || ""}
                          onChange={(e) =>
                            updateDay(
                              dayHours.day,
                              "breakStart",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Break End
                        </label>
                        <input
                          type="time"
                          value={dayHours.breakEnd || ""}
                          onChange={(e) =>
                            updateDay(dayHours.day, "breakEnd", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Special Hours */}
        <Card className={`${isMobile ? "mx-4" : ""} p-4 lg:p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Special Hours & Holidays
            </h2>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => setIsAddingSpecialHour(true)}
            >
              Add Special Hour
            </Button>
          </div>

          <div className="space-y-3">
            {specialHours.map((special) => (
              <div
                key={special.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {special.date}
                    </div>
                    <div className="text-sm text-gray-600">
                      {special.reason}
                    </div>
                    <div className="text-sm">
                      {special.isClosed ? (
                        <span className="text-red-600">Closed</span>
                      ) : (
                        <span className="text-green-600">
                          {special.openTime} - {special.closeTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit}
                      onClick={() => setEditingSpecialHour(special)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Trash2}
                      onClick={() => removeSpecialHour(special.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {specialHours.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No special hours or holidays set</p>
              </div>
            )}
          </div>
        </Card>

        {/* Add Special Hour Modal */}
        {isAddingSpecialHour && (
          <Modal
            isOpen={isAddingSpecialHour}
            onClose={() => setIsAddingSpecialHour(false)}
            title="Add Special Hour"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newSpecialHour.date}
                  onChange={(e) =>
                    setNewSpecialHour({
                      ...newSpecialHour,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <input
                  type="text"
                  value={newSpecialHour.reason}
                  onChange={(e) =>
                    setNewSpecialHour({
                      ...newSpecialHour,
                      reason: e.target.value,
                    })
                  }
                  placeholder="e.g., Public Holiday, Maintenance"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is-closed"
                  checked={newSpecialHour.isClosed}
                  onChange={(e) =>
                    setNewSpecialHour({
                      ...newSpecialHour,
                      isClosed: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is-closed" className="text-sm text-gray-700">
                  Closed all day
                </label>
              </div>
              {!newSpecialHour.isClosed && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Open Time
                    </label>
                    <input
                      type="time"
                      value={newSpecialHour.openTime}
                      onChange={(e) =>
                        setNewSpecialHour({
                          ...newSpecialHour,
                          openTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Close Time
                    </label>
                    <input
                      type="time"
                      value={newSpecialHour.closeTime}
                      onChange={(e) =>
                        setNewSpecialHour({
                          ...newSpecialHour,
                          closeTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingSpecialHour(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={addSpecialHour}
                  className="flex-1"
                >
                  Add Special Hour
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Special Hour Modal */}
        {editingSpecialHour && (
          <Modal
            isOpen={!!editingSpecialHour}
            onClose={() => setEditingSpecialHour(null)}
            title="Edit Special Hour"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={editingSpecialHour.date}
                  onChange={(e) =>
                    setEditingSpecialHour({
                      ...editingSpecialHour,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <input
                  type="text"
                  value={editingSpecialHour.reason}
                  onChange={(e) =>
                    setEditingSpecialHour({
                      ...editingSpecialHour,
                      reason: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-is-closed"
                  checked={editingSpecialHour.isClosed}
                  onChange={(e) =>
                    setEditingSpecialHour({
                      ...editingSpecialHour,
                      isClosed: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="edit-is-closed"
                  className="text-sm text-gray-700"
                >
                  Closed all day
                </label>
              </div>
              {!editingSpecialHour.isClosed && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Open Time
                    </label>
                    <input
                      type="time"
                      value={editingSpecialHour.openTime}
                      onChange={(e) =>
                        setEditingSpecialHour({
                          ...editingSpecialHour,
                          openTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Close Time
                    </label>
                    <input
                      type="time"
                      value={editingSpecialHour.closeTime}
                      onChange={(e) =>
                        setEditingSpecialHour({
                          ...editingSpecialHour,
                          closeTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setEditingSpecialHour(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={updateSpecialHour}
                  className="flex-1"
                >
                  Update Special Hour
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BusinessHoursManager;
