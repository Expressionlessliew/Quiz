// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Z5lSW6fsbZ05gtT50Bys82DtzkbGcFY",
  authDomain: "quiz-9cb1b.firebaseapp.com",
  databaseURL:
    "https://quiz-9cb1b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-9cb1b",
  storageBucket: "quiz-9cb1b.appspot.com",
  messagingSenderId: "191075542859",
  appId: "1:191075542859:web:c53269feeb0792ac332ace",
  measurementId: "G-VVRCLQCYXM",
};


firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Handle form submission
const form = document.getElementById("quiz-form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  const formData = new FormData(form);

  // Convert form data to an object
  const quizData = Object.fromEntries(formData.entries());

  // Save the quiz data to Firebase Realtime Database
  database.ref("quizzes").push(quizData)
    .then(() => {
      alert("Quiz data saved successfully!");
      form.reset(); // Reset the form
    })
    .catch((error) => {
      console.error("Error saving quiz data: ", error);
    });
});