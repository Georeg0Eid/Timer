let timerInterval;
let remainingTime = 0;

function startTimer() {
  const input = document.getElementById("timeInput").value;
  if (!timerInterval) {
    if (input && remainingTime === 0) {
      const [minutes, seconds] = input.split(':').map(Number);
      // Ensure both minutes and seconds are valid numbers
      if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
        remainingTime = minutes * 60 + seconds;
      } else {
        alert("Please enter a valid time in MM:SS format.");
        return;
      }
    }
    
    if (remainingTime > 0) {
      timerInterval = setInterval(updateTimer, 1000);
    }
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = 0;
  document.getElementById("timerDisplay").textContent = "00:00";
  document.getElementById("timerDisplay").classList.remove("red");
  document.getElementById("timeInput").value = "";
}

function updateTimer() {
  if (remainingTime > 0) {
    remainingTime--;
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    const timerDisplay = document.getElementById("timerDisplay");

    // Update timer display and apply red color if below 10 seconds
    timerDisplay.textContent = `${minutes}:${seconds}`;
    if (remainingTime < 10) {
      timerDisplay.classList.add("red");
    } else {
      timerDisplay.classList.remove("red");
    }
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    alert("Time's up!");
  }
}