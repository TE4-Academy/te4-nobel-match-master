// main.js - Initiering av spelet

function setupDifficultyButtons() {
  document.querySelectorAll("[game-difficulty]").forEach(btn => {
    btn.addEventListener("click", () => {
      const difficulty = btn.getAttribute("game-difficulty");
      const playerNameInput = document.getElementById("playerName");
      const playerName = playerNameInput.value.trim() || "Anonym";
      
      // Göm startskärmen och visa spelet
      document.getElementById("startScreen").classList.add("hidden");
      document.getElementById("gameScreen").classList.remove("hidden");
      
      startGame(difficulty, playerName);
    });
  });
}

function setupLeaderboardButton() {
  const btn = document.getElementById("showLeaderboardBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      showLeaderboard("easy");
    });
  }
}

function setupLeaderboardFilters() {
  document.querySelectorAll(".leaderboard-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      const difficulty = btn.getAttribute("data-difficulty");
      renderLeaderboard(difficulty);
    });
  });
}

function setupBackToStartButton() {
  const btn = document.getElementById("backToStart");
  if (btn) {
    btn.addEventListener("click", () => {
      document.getElementById("leaderboardScreen").classList.add("hidden");
      document.getElementById("startScreen").classList.remove("hidden");
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Visa startskärmen
  document.getElementById("startScreen").classList.remove("hidden");
  
  // Sätt upp event listeners
  setupDifficultyButtons();
  setupLeaderboardButton();
  setupLeaderboardFilters();
  setupBackToStartButton();
});