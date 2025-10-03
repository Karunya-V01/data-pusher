const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5, // 5 requests per second
  message: { success: false, message: "Too many requests, try again later." }
});

module.exports = limiter;
