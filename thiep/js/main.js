// main.js

// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase config của bạn
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

// Gửi thiệp
document.getElementById("send").addEventListener("click", () => {
  const content = document.getElementById("content").value.trim();

  if (!content) {
    alert("Bạn chưa nhập nội dung thiệp");
    return;
  }

  // Tạo node mới
  const newCardRef = push(ref(db, "thiep"));

  set(newCardRef, {
    content: content,
    createdAt: Date.now()
  })
    .then(() => {
      alert("Gửi thiệp thành công ❤️");
      document.getElementById("content").value = "";
    })
    .catch((error) => {
      console.error(error);
      alert("Có lỗi xảy ra");
    });
});
