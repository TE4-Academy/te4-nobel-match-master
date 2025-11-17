//Hämta infoknapp, wikipediascreen och startscreen
document.addEventListener("DOMContentLoaded", () => {
    const infoknappen = document.getElementById("InfoKnapp");
    const wikipediaScreen = document.getElementById("wikipediaScreen");
    const startScreen = document.getElementById("startScreen");

    infoknappen.addEventListener("click", () => {
        //Dölj startscreenen
        if (startScreen) startScreen.classList.add("hidden");

        //Visa wikipediaskärmen
        if (wikipediaScreen) wikipediaScreen.classList.remove("hidden");
    });
});

//-----------------------------------------------------------------------------------------------------------------//

     //LJUD
const gameSound = {
  flip: new Audio('./sounds/flip.mp3'),
  //LJUD FÖR NÄR MAN FLIPPAR
  match: new Audio('./sounds/match.mp3'),
  win: new Audio('./sounds/win.mp3')
};

//Ljudvolym
gameSound.flip.volume = 0.5;
gameSound.match.volume = 0.6;
gameSound.win.volume = 0.7;

//-----------------------------------------------------------------------------------------------------------------//

function setupDifficultyButtons() {
  document.querySelectorAll("[game-difficulty]").forEach(btn => {
    //HÄMTA ALLA KNAPPAR SOM HAR ATTRIBUTEN GAME-DIFFICULTY
    btn.addEventListener("click", () => {
      
      const difficulty = btn.getAttribute("game-difficulty");
      //LÄS OM DET ÄR EASY, MEDIUm, HARD

      const playerNameInput = document.getElementById("playerName");
      //HÄMTA PLAYERNAME

      const playerName = playerNameInput.value.trim() || "Anonym";
      //HÄMTA ANONYM OM INGEN NAMN
      
      document.getElementById("startScreen").classList.add("hidden");
      //GÖM STARTSCREEN
      document.getElementById("gameScreen").classList.remove("hidden");
      //VISA GAMESCREEN
      
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
  
  // Svårighetsgradsfilter
  document.querySelectorAll(".leaderboard-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      currentDifficulty = btn.getAttribute("data-difficulty");
      renderLeaderboard(currentDifficulty, currentSort);
    });
  });
  
  // SORTERA EFTER POÄNG
  document.getElementById("sortByScore").addEventListener("click", () => {
    currentSort = 'score';
    updateSortButtons('score');
    renderLeaderboard(currentDifficulty, currentSort);
  });
  
  //SORTERA EFTER TID
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
    //VISAR POÄNGSORTERING
    scoreBtn.className = "sort-btn bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 border-2 border-white";
    scoreBtn.innerHTML = "📊 Högst Poäng ✓";
    timeBtn.className = "sort-btn bg-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-600 border-2 border-transparent opacity-50";
    timeBtn.innerHTML = "⚡ Snabbast Tid";
  } else {
    //VISAR TIDSSORTERING
    scoreBtn.className = "sort-btn bg-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-600 border-2 border-transparent opacity-50";
    scoreBtn.innerHTML = "📊 Högst Poäng";
    timeBtn.className = "sort-btn bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 border-2 border-white";
    timeBtn.innerHTML = "⚡ Snabbast Tid ✓";
  }
}

//backToStart. Ifall man klickar på knappen göms leaderboardScreen och startScreen visas.
function setupBackToStartButton() {
  const btn = document.getElementById("backToStart");
  if (btn) {
    btn.addEventListener("click", () => {
      document.getElementById("leaderboardScreen").classList.add("hidden");
      //IFALL MAN KLICKAR = LEADERBOARDSCREEN GÖMS
      document.getElementById("startScreen").classList.remove("hidden");
      //IFALL MAN KLICKAR = STARTSCREEN VISAS
    });
  }
}

//DOMContentLoaded = kör det här när HTML är helt färdigladdad
window.addEventListener("DOMContentLoaded", () => {
  // Visa startskärmen
  document.getElementById("startScreen").classList.remove("hidden");
  
  // Sätt upp event listeners
  setupDifficultyButtons();
  setupLeaderboardButton();
  setupLeaderboardFilters();
  setupBackToStartButton();
});