const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configure MySQL connection
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'your_database_name'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
        res.status(400).send({ status: 400, message: 'Invalid email format. Use firstname_lastname@student.uml.edu' });
        return;
    }

    // Implement sign in logic
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const user = result[0];
            res.status(200).send({ status: 200, user: { name: user.name } });
        } else {
            res.status(401).send({ status: 401, message: 'Invalid email or password' });
        }
    });
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
        res.status(400).send({ status: 400, message: 'Invalid email format. Use firstname_lastname@student.uml.edu' });
        return;
    }

    if (!validatePassword(password)) {
        res.status(400).send({ status: 400, message: 'Invalid password format. Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character' });
        return;
    }

    // Implement sign up logic
    db.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, password, 'New User'], (err, result) => {
        if (err) throw err;

        const user = { name: 'New User' }; // Change this to get the actual user details after signup

        res.status(201).send({ status: 201, user: user });
    });
});

app.post('/guestlogin', (req, res) => {
    // Implement guest login logic
    const user = { name: 'Guest' }; // Change this to get the actual guest user details
    res.status(200).send({ status: 200, user: user });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function validateEmail(email) {
    // Check if the email matches the format firstname_lastname@student.uml.edu
    const emailRegex = /^[a-zA-Z]+_[a-zA-Z]+@student.uml.edu$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Check if the password meets security constraints
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
