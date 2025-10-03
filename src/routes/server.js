const express = require("express");
const Log = require("../models/Log");
const Account = require("../models/Account");
const Destination = require("../models/Destination");
const limiter = require("../middleware/rateLimit");

const router = express.Router();

/**
 * @swagger
 * /server/incoming_data:
 *   post:
 *     summary: Receive incoming data
 *     description: External services send JSON data with secret token
 *     parameters:
 *       - in: header
 *         name: cl-x-token
 *         required: true
 *         schema:
 *           type: string
 *           example: your-account-token
 *       - in: header
 *         name: cl-x-event-id
 *         required: true
 *         schema:
 *           type: string
 *           example: event123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { key1: "value1", key2: "value2" }
 *     responses:
 *       200:
 *         description: Data received
 *       400:
 *         description: Missing headers
 *       401:
 *         description: Invalid token
 */


router.post("/incoming_data", limiter, async (req, res) => {
  try {
    const token = req.headers["cl-x-token"];
    const eventId = req.headers["cl-x-event-id"];
    if (!token || !eventId) return res.status(400).json({ success: false, message: "Missing headers" });

    const account = await Account.findOne({ app_secret_token: token });
    if (!account) return res.status(401).json({ success: false, message: "Invalid token" });

    const destinations = await Destination.find({ account_id: account._id });
    if (!destinations.length) return res.json({ success: true, message: "No destinations" });

    for (const dest of destinations) {
      await Log.create({
        event_id: eventId,
        account_id: account._id,
        destination_id: dest._id,
        received_data: req.body,
        status: "success"
      });
    }

    res.json({ success: true, message: "Data Received" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
