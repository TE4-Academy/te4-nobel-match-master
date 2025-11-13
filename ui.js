function renderCards() {
  const container = document.getElementById("cardGrid");
  if (!container) return;

  container.className = "grid gap-4 grid-cols-3";
  container.innerHTML = "";

  game.cards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.setAttribute("data-card-id", card.id);
    if (card.flipped || card.matched) {
      if (card.type === "person") {
        cardEl.innerHTML = `
          <div class="flex flex-col items-center gap-2 text-center">
            ${
              card.imageUrl
                ? `<img src="${card.imageUrl}" class="w-16 h-16 rounded-full object-cover" alt="${card.name}">`
                : ""
            }
            <div class="font-bold text-sm">${card.name}</div>
            <div class="text-xs">${card.country}</div>
          </div>
        `;
      } else {
        cardEl.innerHTML = `
          <div class="flex flex-col items-center gap-1 text-center">
            <div class="text-xs font-bold text-yellow-300">${card.category}</div>
            <div class="text-sm">${card.achievement}</div>
            <div class="text-xs text-gray-300">${card.year}</div>
          </div>
        `;
      }

      cardEl.className = card.matched
        ? "bg-green-600 h-40 rounded-lg flex items-center justify-center p-4 text-white"
        : "bg-blue-600 h-40 rounded-lg flex items-center justify-center p-4 text-white";
    } else {
      cardEl.textContent = "?";
      cardEl.className =
        "bg-gray-700 h-40 rounded-lg flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-600";
    }

    cardEl.onclick = () => flipCard(card.id);
    container.appendChild(cardEl);
  });

  document.getElementById("attempts").textContent = game.moves;
  document.getElementById(
    "matches"
  ).textContent = `${game.matches}/${game.pairsNeeded}`;
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
