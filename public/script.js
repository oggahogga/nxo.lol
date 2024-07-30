// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');

    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');

    const closeLogin = document.getElementById('close-login');
    const closeSignup = document.getElementById('close-signup');

    loginLink.onclick = function() {
        loginModal.classList.add('show');
    }

    signupLink.onclick = function() {
        signupModal.classList.add('show');
    }

    closeLogin.onclick = function() {
        loginModal.classList.remove('show');
    }

    closeSignup.onclick = function() {
        signupModal.classList.remove('show');
    }

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.classList.remove('show');
        }
        if (event.target == signupModal) {
            signupModal.classList.remove('show');
        }
    }

    // Handle form submissions
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                alert('Login successful');
                loginModal.classList.remove('show');
            })
            .catch(error => {
                alert(error.message);
            });
    });

    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                alert('Signup successful');
                signupModal.classList.remove('show');
            })
            .catch(error => {
                alert(error.message);
            });
    });
});
