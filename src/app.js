const express = require('express'); // Import the express module
const app = express(); // Create an instance of an express application

// In-memory array to store users for the purpose of this example
let users = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 }
];

// Middleware to parse incoming JSON data
app.use(express.json());

// 1. GET all users
app.get('/users', (req, res) => {
    res.json(users);  // Return the entire users array as JSON
});

// 2. GET a specific user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// 3. POST (Create a new user)
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,  // Simple ID generation (incremental)
        name: req.body.name,
        age: req.body.age
    };
    users.push(newUser);
    res.status(201).json(newUser);  // Return the new user with status 201 (Created)
});

// 4. PUT (Update an existing user by replacing all fields)
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        // Update all fields
        user.name = req.body.name;
        user.age = req.body.age;
        res.json(user);  // Return the updated user
    } else {
        res.status(404).send('User not found');
    }
});

// 5. PATCH (Partially update user fields)
app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        // Only update fields that are provided in the request body
        if (req.body.name !== undefined) {
            user.name = req.body.name;
        }
        if (req.body.age !== undefined) {
            user.age = req.body.age;
        }
        res.json(user);  // Return the partially updated user
    } else {
        res.status(404).send('User not found');
    }
});

// 5. DELETE (Remove a user by ID)
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);  // Remove the user from the array
        res.json(deletedUser[0]);  // Return the deleted user
    } else {
        res.status(404).send('User not found');
    }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

