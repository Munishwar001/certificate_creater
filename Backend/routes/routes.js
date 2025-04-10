const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controller/routesController');
const upload = require('../middleware/uploads');

router.post('/verify', controller.handleVerification);
router.post('/upload', upload, controller.handleUploads);

module.exports = router;