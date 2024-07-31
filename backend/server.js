const express = require('express');
const connectDB = require('./config/dbConnection');

const port = process.env.PORT || 3002;

const app = express();
app.use(express.json());

// Database connection
connectDB();

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "Welcome to Doctor Patient Appointment Booking Server"
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
