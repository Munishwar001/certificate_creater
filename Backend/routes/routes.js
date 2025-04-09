const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controller/routesController');
const upload = require('../middleware/uploads');
const uploadLimiter = require('../middleware/rateLimit');
router.use('/upload', uploadLimiter);
router.post('/upload', upload, controller.handleUploads);

module.exports = router;