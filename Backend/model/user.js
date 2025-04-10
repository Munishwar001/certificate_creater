const mongoose = require('mongoose');
const uploads = require('../middleware/uploads');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    uploads: {
        type: Array,
        default: [],
    }
});
const user = mongoose.model('User', userSchema);