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
  let currentDifficulty = 'easy';
  let currentSort = 'score';
  
  // Svårighetsgrads-filter
  document.querySelectorAll(".leaderboard-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      currentDifficulty = btn.getAttribute("data-difficulty");
      renderLeaderboard(currentDifficulty, currentSort);
    });
  });
  
  // Sorterings-knappar
  document.getElementById("sortByScore").addEventListener("click", () => {
    currentSort = 'score';
    updateSortButtons('score');
    renderLeaderboard(currentDifficulty, currentSort);
  });
  
  document.getElementById("sortByTime").addEventListener("click", () => {
    currentSort = 'time';
    updateSortButtons('time');
    renderLeaderboard(currentDifficulty, currentSort);
  });
}

// Uppdaterar visuell feedback för sorterings-knappar
function updateSortButtons(activeSort) {
  const scoreBtn = document.getElementById("sortByScore");
  const timeBtn = document.getElementById("sortByTime");
  
  if (activeSort === 'score') {
    scoreBtn.className = "sort-btn bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 border-2 border-white";
    scoreBtn.innerHTML = "📊 Högst Poäng ✓";
    timeBtn.className = "sort-btn bg-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-600 border-2 border-transparent opacity-50";
    timeBtn.innerHTML = "⚡ Snabbast Tid";
  } else {
    scoreBtn.className = "sort-btn bg-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-600 border-2 border-transparent opacity-50";
    scoreBtn.innerHTML = "📊 Högst Poäng";
    timeBtn.className = "sort-btn bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 border-2 border-white";
    timeBtn.innerHTML = "⚡ Snabbast Tid ✓";
  }
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