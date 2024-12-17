const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { saveUser } = require('./firebase'); // Import the saveUser function
const admin = require('firebase-admin');

dotenv.config();

const app = express();

// Middleware for serving static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Firebase Admin SDK Initialization
const serviceAccount = require('./firebase-admin-sdk.json'); // Firebase Admin SDK JSON file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://blog-c9f7d.firebaseio.com/', // Replace with your Firebase Realtime Database URL
});
const auth = admin.auth();

// Route for saving user to Firebase Realtime Database
app.post('/save-user', async (req, res) => {
    const { email } = req.body;
    try {
        await saveUser(email);
        res.status(200).send('User saved successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});

// Routes for serving HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Handle Login POST request
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simulate backend login with Firebase Admin SDK
    auth.getUserByEmail(email)
        .then((userRecord) => {
            // User email exists; simulate successful login
            console.log(`User found: ${userRecord.email}`);
            
            // Redirect to homepage after successful email verification
            res.redirect('/');
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
            res.redirect('/login?error=Invalid%20credentials'); // Redirect back to login with error message
        });
});

// Handle Sign-Up POST request
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    auth.createUser({
        email: email,
        password: password,
    })
    .then((userRecord) => {
        // User successfully created
        console.log('New user created:', userRecord.email);
        res.redirect('/login'); // Redirect to login page after successful sign up
    })
    .catch((error) => {
        console.error('Error creating new user:', error);
        res.redirect('/signup?error=Could%20not%20create%20user'); // Redirect back to signup with error message
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
