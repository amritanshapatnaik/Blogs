const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, push } = require('firebase/database');
require('dotenv').config(); // Ensure environment variables are loaded

// Initialize Firebase App
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};

// Ensure all required environment variables are available
if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL || !firebaseConfig.projectId) {
    console.error('Firebase configuration is missing. Check your .env file.');
    process.exit(1); // Exit the application
}

// Initialize Firebase App and Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Save user to the database
async function saveUser(email) {
    try {
        const userId = push(ref(database, 'users')).key; // Generate a unique ID
        await set(ref(database, `users/${userId}`), {
            email: email,
            timestamp: Date.now(),
        });
        console.log('User saved to database.');
    } catch (error) {
        console.error('Error saving user: ', error);
        throw error;
    }
}

module.exports = { saveUser };
