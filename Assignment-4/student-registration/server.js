const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/api/students', studentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
