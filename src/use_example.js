const express = require('express');
const app = express();

// Middleware 1: Logs request and passes control
app.use((req, res, next) => {
    console.log('Middleware 1: Request received');
    next(); // Moves to the next middleware
});

// Middleware 2: Another log statement, still no response
app.use((req, res, next) => {
    console.log('Middleware 2: Processing');
    next(); // Moves to the next middleware
});

// Middleware 3: Infinite loop
app.use((req, res, next) => {
    console.log('Middleware 3: Infinite loop middleware');
    next(); // Calls next() without sending a response
});

// Route handler for GET /
app.get('/', (req, res) => {
    res.send('Hello! This is the response from the root route.');
});

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
