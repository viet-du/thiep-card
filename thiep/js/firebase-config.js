// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC5ZzWwwTH11IbRJBbpxFZYvRFo5kIDAeQ",
  authDomain: "thiep-card.firebaseapp.com",
  databaseURL: "https://thiep-card-default-rtdb.firebaseio.com",
  projectId: "thiep-card",
  storageBucket: "thiep-card.firebasestorage.app",
  messagingSenderId: "655072809470",
  appId: "1:655072809470:web:7db28f026cfd09f33930af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export các hàm cần dùng
export { db, ref, push, set, onValue };