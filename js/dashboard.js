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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Redirect if not logged in
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadUserData(user.uid);
  }
});

// Load user investment data from Firestore
function loadUserData(uid) {
  db.collection("users").doc(uid).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      animatePlanLive(document.getElementById("beginnerAmount"), document.querySelector(".bronze"), document.getElementById("beginnerPercent"), data.beginner || 100, 100);
      animatePlanLive(document.getElementById("amateurAmount"), document.querySelector(".silver"), document.getElementById("amateurPercent"), data.amateur || 200, 200);
      animatePlanLive(document.getElementById("professionalAmount"), document.querySelector(".gold"), document.getElementById("professionalPercent"), data.professional || 1500, 1500);
      animatePlanLive(document.getElementById("executiveAmount"), document.querySelector(".gold"), document.getElementById("executivePercent"), data.executive || 5000, 5000);
      animateBalanceLive(data.totalBalance || 25000);
    }
  });
}

// Animate Plans
function animatePlanLive(amountEl, barEl, percentEl, target, max) {
  let current = 0;

  function count() {
    current = 0;
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
        setTimeout(() => fluctuate(), 1000);
      } else {
        current += Math.ceil(target / 100);
        updateElements(current);
      }
    }, 30);
  }

  function fluctuate() {
    setInterval(() => {
      let randomDelta = Math.floor(target * (Math.random() * 0.06 - 0.03));
      let displayValue = Math.max(0, current + randomDelta);
      updateElements(displayValue);
    }, 1000);
  }

  function updateElements(value) {
    amountEl.textContent = "$" + value.toLocaleString();
    let percent = Math.min((value / max) * 100, 100);
    barEl.style.width = percent + "%";
    percentEl.textContent = percent.toFixed(0) + "%";
  }

  count();
}

// Animate Total Balance
function animateBalanceLive(base = 25000) {
  const balanceEl = document.getElementById("totalBalance");
  setInterval(() => {
    let delta = Math.floor(base * (Math.random() * 0.04 - 0.02));
    balanceEl.textContent = "$" + (base + delta).toLocaleString();
  }, 1000);
}