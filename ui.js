function renderCards() {
  const container = document.getElementById("cardGrid");
  if (!container) return;

  container.className = "grid gap-4 grid-cols-3";
  container.innerHTML = "";

  game.cards.forEach((card) => {
    const cardEl = document.createElement("div");

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

  document.getElementById("finalScore").textContent = finalScore;
  document.getElementById("time").textContent = timeFormatted;
  document.getElementById("finalAttempts").textContent = game.moves;

  
  document.getElementById("playAgain").onclick = () => {
    endScreen.classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    startGame();
  };
}