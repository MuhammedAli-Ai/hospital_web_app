      const menuBtn = document.getElementById("menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional


 const firebaseConfig = {
  apiKey: "AIzaSyCEjf8Dw8Fa953ymGas9rjJECouc815G0o",
  authDomain: "application-26362.firebaseapp.com",
  projectId: "application-26362",
  storageBucket: "application-26362.appspot.com", 
  messagingSenderId: "99882695697",
  appId: "1:99882695697:web:3a5783e3133e4683f105b0",
  measurementId: "G-30Z1GHCGS4"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app)
  const auth = getAuth(app);

  // getting ids

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const signupbtn = document.getElementById('signupbtn');

  signupbtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const obj = {
      name: name.value,
      email: email.value,
      password: password.value
    }

// signup function and error handling and console obj
   
  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((userCredential) => {
      console.log("User created:", userCredential.user);
      window.location.href = "../interfaceui/index.html";
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

