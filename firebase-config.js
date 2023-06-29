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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Save the user's score
function saveScore(score) {
  const userId = "user1"; // You can use a unique identifier for each user
  const timestamp = firebase.database.ServerValue.TIMESTAMP;

  // Save the score and timestamp under the user's ID in the 'scores' node
  database.ref("scores/" + userId).set({ score, timestamp });
}

// Retrieve and display the best score
function displayBestScore() {
  const userId = "user1"; // Same unique identifier as used in saveScore()

  // Retrieve the best score for the user from the 'scores' node, ordered by score in descending order
  database
    .ref("scores/" + userId)
    .orderByChild("score")
    .limitToLast(1)
    .once("value")
    .then((snapshot) => {
      const bestScoreSnapshot = snapshot.val();

      if (bestScoreSnapshot) {
        const bestScore = Object.values(bestScoreSnapshot)[0].score;
        const timestamp = Object.values(bestScoreSnapshot)[0].timestamp;

        const bestScoreContainer = document.getElementById("best-score-container");
        bestScoreContainer.textContent = "Best Score: " + bestScore + " (Timestamp: " + timestamp + ")";
      } else {
        const bestScoreContainer = document.getElementById("best-score-container");
        bestScoreContainer.textContent = "No best score yet";
      }
    });
}

// Submit button click event handler
document.getElementById("quiz-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Calculate the user's score
  const question1Answer = document.querySelector('input[name="question1"]:checked').value;
  const question2Answer = document.querySelector('input[name="question2"]:checked').value;

  let score = 0;

  // Increment the score based on correct answers
  if (question1Answer === "Paris") {
    score += 1;
  }

  if (question2Answer === "option1") {
    score += 1;
  }

  // Save the user's score
  saveScore(score);

  // Display the best score
  displayBestScore();
});

// Display the best score on page load
window.addEventListener("load", function () {
  displayBestScore();
});