// === Mobile Menu Toggle ===
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// === Firebase SDK Imports ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// === Firebase Config ===
const firebaseConfig = {
  apiKey: "AIzaSyCEjf8Dw8Fa953ymGas9rjJECouc815G0o",
  authDomain: "application-26362.firebaseapp.com",
  databaseURL: "https://application-26362-default-rtdb.firebaseio.com",
  projectId: "application-26362",
  storageBucket: "application-26362.appspot.com",
  messagingSenderId: "99882695697",
  appId: "1:99882695697:web:3a5783e3133e4683f105b0",
  measurementId: "G-30Z1GHCGS4",
};

// === Initialize Firebase ===
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// === Get Elements ===
const nameInput = document.getElementById("name");
const doctorInput = document.getElementById("doctor");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const submitBtn = document.getElementById("submitbtn");

const bookingCard = document.getElementById("bookingDetails");
const emailDisplay = document.getElementById("userEmail");
const nameDisplay = document.getElementById("userName");
const doctorDisplay = document.getElementById("userDoctor");
const dateDisplay = document.getElementById("userDate");
const timeDisplay = document.getElementById("userTime");

// === Auth State Listener ===
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(" Logged in as:", user.email);

    const userBookingsRef = ref(db, "bookings/" + user.uid);

    // Realtime listener to update UI instantly
    onValue(userBookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const bookings = snapshot.val();
        const keys = Object.keys(bookings);
        const lastBooking = bookings[keys[keys.length - 1]]; // latest booking

        // Show latest booking
        emailDisplay.textContent = lastBooking.email;
        nameDisplay.textContent = lastBooking.name;
        doctorDisplay.textContent = lastBooking.doctor;
        dateDisplay.textContent = lastBooking.date;
        timeDisplay.textContent = lastBooking.time;
        bookingCard.classList.remove("hidden");
      } else {
        bookingCard.classList.add("hidden");
      }
    });

    // === Save new booking ===
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const newBookingRef = push(userBookingsRef);
      set(newBookingRef, {
        email: user.email,
        name: nameInput.value,
        doctor: doctorInput.value,
        date: dateInput.value,
        time: timeInput.value,
      })
        .then(() => {
          alert(" Appointment booked successfully!");
          // Clear form fields
          nameInput.value = "";
          doctorInput.value = "Select a doctor";
          dateInput.value = "";
          timeInput.value = "Select a time";
        })
        .catch((error) => {
          console.error(" Error saving appointment:", error);
        });
    });
  } else {
    console.warn(" No user logged in.");
  }
});
