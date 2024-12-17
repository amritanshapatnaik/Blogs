import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD29UuUQ1ctXFVBClVe3CNQyjv16EwIWrg",
    authDomain: "blog-c9f7d.firebaseapp.com",
    projectId: "blog-c9f7d",
    storageBucket: "blog-c9f7d.firebasestorage.app",
    messagingSenderId: "826313380303",
    appId: "1:826313380303:web:340d5e240b92124d43c2ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Login Successful!');
                window.location.href = '/'; // Redirect to the homepage
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    });
}

// Sign Up function
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Password strength check (minimum 6 characters)
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Sign Up Successful!');
                window.location.href = '/login'; // Redirect to login page
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    });
}
