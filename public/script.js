const firebaseConfig = {
  apiKey: "AIzaSyADJk_U0vAs0wdUomwHc7ZfwPhKuYvTcek",
  authDomain: "nxololbut.firebaseapp.com",
  projectId: "nxololbut",
  storageBucket: "nxololbut.appspot.com",
  messagingSenderId: "387208256496",
  appId: "1:387208256496:web:0b07e97acc23666732db35",
  measurementId: "G-PBRYTM8BB7"
};
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
