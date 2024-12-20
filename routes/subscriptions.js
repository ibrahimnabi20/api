/**
 * Subscription Routes
 * Handles CRUD operations for user subscriptions
 */

const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const User = require("../models/User");

// POST: Add a subscription
router.post("/", async (req, res) => {
  const { userId, service, endDate } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newSubscription = new Subscription({ userId, service, endDate });
    await newSubscription.save();

    res.status(201).json({ message: `Subscription for ${service} created successfully!` });
  } catch (error) {
    console.error("Error adding subscription:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET: Fetch subscriptions by userId
router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    const subscriptions = await Subscription.find({ userId });
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// PUT: Update subscription's end date (Renew)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { endDate } = req.body;

  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      { endDate },
      { new: true }
    );
    if (!updatedSubscription) return res.status(404).json({ message: "Subscription not found" });

    res.status(200).json({ message: "Subscription renewed successfully" });
  } catch (error) {
    console.error("Error renewing subscription:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE: Delete a subscription
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) return res.status(404).json({ message: "Subscription not found" });

    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET: Fetch subscriptions expiring in 3 days
router.get("/notifications", async (req, res) => {
  try {
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);

    const expiringSubscriptions = await Subscription.find({
      endDate: { $gte: today, $lt: threeDaysFromNow },
    });

    res.status(200).json(expiringSubscriptions);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
