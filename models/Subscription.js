/**
 * Subscription Model
 * Defines the schema for user subscriptions
 *
 * @property {ObjectId} userId - Reference to the User model
 * @property {String} service - Name of the subscription service
 * @property {Date} endDate - Subscription expiry date
 * @property {Date} createdAt - Timestamp when the subscription was created
 */

const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: String,
    required: true,
    trim: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
