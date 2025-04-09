
const rateLimit = require('express-rate-limit');

const uploadLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5, 
  message: "You've reached the upload limit. Try again later.",
});

module.exports = uploadLimiter;
