document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById('darkModeToggle');
  darkBtn.addEventListener('click', () => document.body.classList.toggle('dark'));
const firebaseConfig = {
  apiKey: "AIzaSyAPehIc6Mus46Fjjk9VlYvYuP07uJvztZA",
  authDomain: "fidelity-invest-51fcd.firebaseapp.com",
  projectId: "fidelity-invest-51fcd",
  storageBucket: "fidelity-invest-51fcd.firebasestorage.app",
  messagingSenderId: "522138838627",
  appId: "1:522138838627:web:6668d6b327e9d59cceba56",
  measurementId: "G-E3J0WNV1J5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Signup
function signup() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Signup successful!");
    })
    .catch(err => alert(err.message));
}

// Login
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
}