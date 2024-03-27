// Import required modules
const express = require('express');
const connectDB = require('./Db/mongo');
const { positalCode } = require('./Model/code');
const cors = require('cors');

// Create an instance of Express
const app = express();
connectDB();
app.use(express.json());
app.use(cors("*"));
// Define a route
app.get('/api/data', async (req, res) => {
    const posital = req.body;
    try {
        const response = await positalCode.findOne({
            postal_code: posital.zipCode
        });
        if (response) {
            res.send({ message: "Authentication Successful", statusCode: 200, data: response })
        } else {
            res.send({ message: "Authentication Failed", statusCode: 401 })
        }
    } catch (error) {
        console.error("Error occured when logging in", error);
        throw error;
    }
});
app.get('/', async (req, res) => {
    try {
        res.send({ message: "Authentication Successful", statusCode: 200 })
    } catch (error) {
        console.error("Error occured when logging in", error);
        throw error;
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
