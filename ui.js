function renderCards() {
  const container = document.getElementById("cardGrid");
  if (!container) return;

  // Responsiv grid baserat på svårighetsgrad
  if (game.pairsNeeded === 6) {
    // Easy: 6 par = 12 kort
    container.className = "grid gap-2 sm:gap-4 grid-cols-3 sm:grid-cols-4";
  } else if (game.pairsNeeded === 9) {
    // Medium: 9 par = 18 kort
    container.className = "grid gap-2 sm:gap-4 grid-cols-3 sm:grid-cols-6";
  } else {
    // Hard: 12 par = 24 kort
    container.className = "grid gap-2 sm:gap-4 grid-cols-4 sm:grid-cols-6";
  }
  
  container.innerHTML = "";
  
//här behvöer vi skapa 3 lager: Lager 1 – Yttre skalet Detta är ramen runt allt. Lager 2 – Det roterande lagret, Lager 3 – Sidorna (2 element)
  game.cards.forEach((card) => {  //Vi går igenom alla kort-objekt som finns i game.cards
    const cardEl = document.createElement("div"); // skapar vi ett tomt div-element som är själva kortets yttre skal
    cardEl.classList.add("game-card"); //CSS-klass som heter game-card. 
    cardEl.setAttribute("data-card-id", card.id); 
    
    const innerEl = document.createElement("div");
    innerEl.classList.add("game-card-inner");  //game-card-inner är lagret som roterar när kortet vänds.

    const frontEl = document.createElement("div"); //Det här skapar framsidan av kortet
    frontEl.classList.add("game-card-front");
    frontEl.textContent = "?";

    const backEl = document.createElement("div"); //Det här skapar baksidan av kortet.
    backEl.classList.add("game-card-back");


    if (card.matched){  //Här kollar vi först vilket läge kortet är i, då lägger vi till klassen matched på baksidan.
      backEl.classList.add("matched"); 
    } else if (card.flipped){
      backEl.classList.add("flipped");
    }

    if (card.type === "person"){  //Fyll baksidan med rätt innehåll beroende på korttyp
      backEl.innerHTML = `
       <div class="flex flex-col items-center gap-1 text-center text-white">
       ${card.imageUrl ? `<img src="${card.imageUrl}" class="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-contain bg-white p-1" alt="${card.name}">` : ""}
      <div class="font-bold text-xs sm:text-sm">${card.name}</div>
      <div class="text-xs hidden sm:block">${card.country}</div>
      </div>
       `;
        } else if (card.type === "achievement"){  //Om korttypen är achievement, alltså själva priset
      backEl.innerHTML = `
       <div class="flex flex-col items-center gap-1 text-center text-white p-1">
      <div class="font-bold text-xs">${card.category}</div>
      <div class="text-xs line-clamp-3">${card.achievement}</div>
      <div class="text-xs text-white">${card.year}</div>
      </div>
       `;
    }

   innerEl.appendChild(frontEl);  //Nu sätter vi fast framsidan och baksidan på det roterande lagret, innerEl.Det är de här två sidorna som flippar när kortet vänds."
   innerEl.appendChild(backEl);
    cardEl.appendChild(innerEl); // Sätt fast inner-lagret på själva kortet
       cardEl.onclick = () => flipCard(card.id); //Klick-event för att vända kortet
       container.appendChild(cardEl); // Lägg in kortet i grid-layouten


       if (card.matched) { //Om kortet är matchat  håll det alltid uppvänt
        cardEl.classList.add("flipped"); 
       } else if  (card.flipped && !cardEl.classList.contains("flipped")) { //För att flippen ska synas måste den: först ritas som ovänd efteråt få klassen "flipped" då startar CSS-transitionen = flippen
        setTimeout(() => {
          cardEl.classList.add("flipped");
        
       }, 10);
       }
      });

  document.getElementById("attempts").textContent = game.moves; //Uppdatera statistiken i HUD
  document.getElementById("matches").textContent = `${game.matches}/${game.pairsNeeded}`;
}
function showEndScreen() {
  const finalScore = finalizeScore();
  const minutes = Math.floor(game.timer / 60);
  const seconds = game.timer % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  document.getElementById("gameScreen").classList.add("hidden");

  const endScreen = document.getElementById("endScreen");
  endScreen.classList.remove("hidden");

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  if (game.moves === game.pairsNeeded) {
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.4 },
      });
    }, 500);
  }

  document.getElementById("finalScore").textContent = finalScore;
  document.getElementById("time").textContent = timeFormatted;
  document.getElementById("finalAttempts").textContent = game.moves;

  // Spara till leaderboard och visa placering
  const rank = saveHighScore(
    game.playerName,
    finalScore,
    game.timer,
    game.moves,
    game.difficulty
  );

  if (rank > 0) {
    document.getElementById("leaderboardRank").textContent = `#${rank}`;
  } else {
    document.getElementById("leaderboardRank").textContent = "-";
  }

  document.getElementById("playAgain").onclick = () => {
    endScreen.classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
  };
}
// Visar leaderboard-skärmen
function showLeaderboard(difficulty = "easy", sortBy = "score") {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("leaderboardScreen").classList.remove("hidden");

  renderLeaderboard(difficulty, sortBy);
}

// Renderar leaderboard-listan
function renderLeaderboard(difficulty, sortBy = "score") {
  let scores;

  // Hämta scores baserat på sortering
  if (sortBy === "time") {
    scores = getHighScoresByDifficultyAndTime(difficulty);
  } else {
    scores = getHighScoresByDifficulty(difficulty);
  }

  const container = document.getElementById("leaderboardList");

  if (scores.length === 0) {
    container.innerHTML = '<p class="text-gray-400">Inga scores ännu!</p>';
    return;
  }

  let html = '<div class="space-y-3">';

  scores.forEach((score, index) => {
    const rank = index + 1;
    const medalEmoji =
      rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";
    const minutes = Math.floor(score.time / 60);
    const seconds = score.time % 60;
    const timeStr = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    html += `
      <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
        <div class="flex items-center gap-4">
          <span class="text-2xl font-bold text-gray-400">${
            medalEmoji || rank
          }</span>
          <div class="text-left">
            <div class="font-bold text-white">${score.name}</div>
            <div class="text-sm text-gray-400">${timeStr} • ${
      score.moves
    } försök</div>
          </div>
        </div>
        <div class="text-2xl font-bold text-yellow-400">${score.score}</div>
      </div>
    `;
  });

  html += "</div>";
  container.innerHTML = html;
}
