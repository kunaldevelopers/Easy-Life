import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MessageCircle,
  User,
  Calendar,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const ReviewsManager = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [selectedReview, setSelectedReview] = useState(null);

  const reviews = [
    {
      id: 1,
      customerName: "Rajesh Kumar",
      rating: 5,
      date: "2 hours ago",
      timestamp: "Dec 15, 2024 2:30 PM",
      comment:
        "Excellent service and very professional staff! The food quality was outstanding and delivery was on time. Highly recommended for any event.",
      verified: true,
      helpful: 12,
      replied: false,
      photos: [],
    },
    {
      id: 2,
      customerName: "Sunita Gurung",
      rating: 4,
      date: "2 days ago",
      timestamp: "Dec 13, 2024 10:15 AM",
      comment:
        "Good food quality and timely delivery. The presentation could be improved a bit, but overall satisfied with the service.",
      verified: true,
      helpful: 8,
      replied: true,
      replyText:
        "Thank you for your feedback! We'll work on improving our presentation.",
      photos: ["food1.jpg", "setup1.jpg"],
    },
    {
      id: 3,
      customerName: "Amit Sharma",
      rating: 5,
      date: "1 week ago",
      timestamp: "Dec 8, 2024 4:45 PM",
      comment:
        "Amazing experience! The team was very responsive and accommodating. Will definitely use their services again.",
      verified: false,
      helpful: 15,
      replied: true,
      replyText:
        "We're thrilled you had a great experience! Looking forward to serving you again.",
      photos: [],
    },
    {
      id: 4,
      customerName: "Deepika Rai",
      rating: 4,
      date: "2 weeks ago",
      timestamp: "Dec 1, 2024 6:20 PM",
      comment:
        "Professional service with good attention to detail. Pricing is reasonable and staff is friendly.",
      verified: true,
      helpful: 6,
      replied: false,
      photos: ["event1.jpg"],
    },
    {
      id: 5,
      customerName: "Priya Thapa",
      rating: 3,
      date: "3 weeks ago",
      timestamp: "Nov 24, 2024 1:10 PM",
      comment:
        "Service was okay but the food could have been better. The staff was polite and the venue setup was nice.",
      verified: true,
      helpful: 4,
      replied: true,
      replyText:
        "Thank you for your honest feedback. We've taken note and are working to improve our food quality.",
      photos: [],
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }));

  const handleReply = (reviewId, replyText) => {
    // Handle reply logic here
    console.log(`Replying to review ${reviewId}:`, replyText);
    setSelectedReview(null);
  };

  if (selectedReview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedReview(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reviews
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedReview.customerName}
                    </h3>
                    {selectedReview.verified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(selectedReview.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                      {[...Array(5 - selectedReview.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedReview.timestamp}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {selectedReview.helpful} people found this helpful
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-800 leading-relaxed">
                {selectedReview.comment}
              </p>
            </div>

            {selectedReview.photos.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Customer Photos
                </h4>
                <div className="flex space-x-2">
                  {selectedReview.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 bg-gray-200 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {selectedReview.replied ? (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-900">
                      Your Reply
                    </h4>
                    <p className="text-sm text-blue-800 mt-1">
                      {selectedReview.replyText}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <ReplyForm reviewId={selectedReview.id} onReply={handleReply} />
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600 mt-1">
            Manage and respond to customer reviews
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Overview Stats */}
          <Card className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center mt-1">
                {[...Array(Math.round(averageRating))].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Based on {totalReviews} reviews
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {reviews.filter((r) => r.replied).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Responses Sent</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {reviews.filter((r) => !r.replied).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Pending Responses
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {reviews.filter((r) => r.verified).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Verified Reviews</div>
            </div>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Rating Distribution
          </h3>
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-gray-600">{rating}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={Search}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">
                        {review.customerName}
                      </h4>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {review.replied ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Replied
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {review.comment}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {review.helpful} people found this helpful
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedReview(review)}
                  >
                    View Details
                  </Button>
                  {!review.replied && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedReview(review)}
                    >
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reviews found
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterRating !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Customer reviews will appear here once they start reviewing your business."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

const ReplyForm = ({ reviewId, onReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(reviewId, replyText);
      setReplyText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t pt-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Reply to this review
      </h4>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write a thoughtful response to this customer..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        rows={4}
        required
      />
      <div className="flex justify-end space-x-2 mt-3">
        <Button type="button" variant="outline" size="sm">
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          Send Reply
        </Button>
      </div>
    </form>
  );
};

export default ReviewsManager;
