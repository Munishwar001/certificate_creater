require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
const path = require('path');
const http = require('http');
const uploadLimiter = require('./middleware/rateLimit');
const { initSocket } = require('./socketHandling/connection');
const connectDB = require('./config/db');
const server = http.createServer(app);
initSocket(server);
app.use(express.json());

app.use(uploadLimiter);
app.use('/certificates', express.static(path.join(__dirname, 'output')));

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
connectDB();
app.use("/",routes);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})