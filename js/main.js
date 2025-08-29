// Firebase ES Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firebase config
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Modal functions
window.showLogin = () => {
  document.getElementById('loginModal').classList.remove('hidden');
  document.getElementById('signupModal').classList.add('hidden');
}
window.showSignup = () => {
  document.getElementById('signupModal').classList.remove('hidden');
  document.getElementById('loginModal').classList.add('hidden');
}

// Signup function
window.signup = async () => {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    alert(`Welcome ${name}`);
    document.getElementById('signupModal').classList.add('hidden');
  } catch (err) {
    alert(err.message);
  }
}

// Login function
window.login = async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
}