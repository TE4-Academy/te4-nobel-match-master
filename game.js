let nobelData = [];

const game = {
  cards: [],
  flippedCards: [],
  moves: 0,
  matches: 0,
  isFlipping: false,
  timer: 0,
  timerInterval: null,
  difficulty: "easy",
  pairsNeeded: 3,
  score: 0,
};

async function loadNobelData() {
  const response = await fetch("./nobel-data.json");
  const data = await response.json();
  nobelData = data.laureates;
  return nobelData;
}
function shuffleCard(cards) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function createNobelCards() {
  if (!nobelData || nobelData.length === 0) {
    console.error("nobelData är tom eller undefined!");
    return [];
  }

  const cards = [];
  let id = 0;
  const selected = shuffleCard(nobelData).slice(0, game.pairsNeeded);

  selected.forEach((laureate) => {
    cards.push({
      id: id++,
      pairId: laureate.id,
      type: "person",
      name: laureate.name,
      country: laureate.country,
      imageUrl: laureate.imageUrl,
      matched: false,
      flipped: false,
    });

    cards.push({
      id: id++,
      pairId: laureate.id,
      type: "achievement",
      category: laureate.category,
      achievement: laureate.achievement,
      year: laureate.year,
      matched: false,
      flipped: false,
    });
  });

  return shuffleCard(cards);
}

function checkMatch() {
  const [id1, id2] = game.flippedCards;
  const card1 = game.cards.find((c) => c.id === id1);
  const card2 = game.cards.find((c) => c.id === id2);

  game.moves++;

  if (card1.pairId === card2.pairId) {
    console.log("MATCH");
    card1.matched = true;
    card2.matched = true;
    game.matches++;
    game.score += 100;
    game.flippedCards = [];

    renderCards();
    document.getElementById("score").textContent = game.score;

    if (game.matches === game.pairsNeeded) {
      clearInterval(game.timerInterval);
      const finalScore = finalizeScore();
      const minutes = Math.floor(game.timer / 60);
      const seconds = game.timer % 60;
      const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      setTimeout(() => {
        alert(`🎉 Du vann!\nFörsök: ${game.moves}\nTid: ${timeFormatted}\nPoäng: ${finalScore}`);
      }, 500);
    }

  } else {
    
    game.score -= 10; 
    if (game.score < 0) game.score = 0; 
    document.getElementById("score").textContent = game.score;

    game.isFlipping = true;
    setTimeout(() => {
      card1.flipped = false;
      card2.flipped = false;
      game.flippedCards = [];
      game.isFlipping = false;
      renderCards();
    }, 1000);
  }
}
function finalizeScore() {
  let bonus = 0;

  
  if (game.timer < 60) bonus += 100;
  else if (game.timer < 120) bonus += 50;
  else if (game.timer < 180) bonus += 25;

  
  if (game.moves === game.pairsNeeded) bonus += 200;

  
  let maxBase = 0;
  switch (game.difficulty) {
    case "easy": maxBase = 600; break;
    case "medium": maxBase = 900; break;
    case "hard": maxBase = 1200; break;
  }

  
  const final = Math.min(game.score + bonus, maxBase + 300);
  return final;
}


function flipCard(cardId) {
  const card = game.cards.find((c) => c.id === cardId);

  if (!card) {
    console.log("kortet finns inte");
    return;
  }

  if (card.flipped) {
    console.log("kortet är redan vänt");
    return;
  }

  if (card.matched) {
    console.log("kortet är redan matchat");
    return;
  }
  if (game.flippedCards.length >= 2) {
    console.log("kortet inte vända");
    return;
  }

  if (game.isFlipping) {
    console.log("Väntar på kort ska vändas tillbaka");
    return;
  }

  card.flipped = true;
  game.flippedCards.push(cardId);

  if (game.flippedCards.length === 2) {
    renderCards();
    checkMatch();
  } else {
    renderCards();
  }
}

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

async function startGame() {
  console.log("🎮 Startar spel...");

  if (nobelData.length === 0) {
    console.log("📥 Laddar data först...");
    await loadNobelData();
    console.log("✅ Data laddad! nobelData.length:", nobelData.length);
  }

  game.cards = createNobelCards();

  if (game.cards.length === 0) {
    console.error("❌ Inga kort skapades!");
    return;
  }
  game.flippedCards = [];
  game.moves = 0;
  game.matches = 0;
  game.isFlipping = false;
  game.score = 0;
  document.getElementById("score").textContent = 0;
  



  renderCards();

  console.log("✅ Spelet är klart!");
}
