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
    document.getElementById('userName').innerText = user.displayName || 'User';
    loadInvestments();
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut().then(() => window.location.href = "index.html");
});

// Profit calculation & investment save
function calculateProfit() {
  const plan = document.getElementById('planSelect').value;
  const amount = parseFloat(document.getElementById('investmentAmount').value);
  let profit = 0;

  switch(plan){
    case 'beginner': profit = amount * 0.10; break;
    case 'amateur': profit = amount * 0.15; break;
    case 'professional': profit = amount * 0.25; break;
    case 'executive': profit = amount * 0.50; break;
  }

  document.getElementById('profitResult').innerText = profit.toFixed(2);

  const user = auth.currentUser;
  if(user) {
    db.collection("users").doc(user.uid).collection("investments").add({
      plan: plan.charAt(0).toUpperCase() + plan.slice(1),
      amount,
      profit: profit.toFixed(2),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => loadInvestments());
  }
}

// Load user investments
function loadInvestments() {
  const user = auth.currentUser;
  if(!user) return;

  const list = document.getElementById('userInvestments');
  list.innerHTML = "";

  db.collection("users").doc(user.uid).collection("investments")
    .orderBy("timestamp","desc").get()
    .then(snapshot => {
      if(snapshot.empty){
        list.innerHTML = "<li>No investments yet</li>";
      } else {
        snapshot.forEach(doc => {
          const d = doc.data();
          const li = document.createElement('li');
          li.textContent = `${d.plan} Plan: $${d.amount} → Profit $${d.profit}`;
          list.appendChild(li);
        });
      }
    });
}