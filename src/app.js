const express = require('express'); // Import the express module
const app = express(); // Create an instance of an express application

// Middleware that runs on every request
app.use("/test",(req, res, next) => {
    res.send(`${req.method} request called`)
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

