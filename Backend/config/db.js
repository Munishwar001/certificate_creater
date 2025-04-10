const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URL)
            .then(() => console.log("mongoDB connected"))
            .catch((err)=> console.log("Error",err))       
    } catch (err) {
        console.log("error while connecting to database ",err);
    }
}
module.exports = connectDB;