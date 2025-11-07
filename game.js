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
};

async function loadNobelData() {
  const response = await fetch('./nobel-data.json');
  const data = await response.json();
  nobelData = data.laureates;
  return nobelData;
}

function createNobelCards() {
  if (!nobelData || nobelData.length === 0) {
    console.error("nobelData är tom eller undefined!");
    return [];
  }

  const cards = [];
  let id = 0;
  const selected = nobelData.slice(0, game.pairsNeeded);

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
  return cards;
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
    game.flippedCards = [];
    // checkWin();
  } else {
    console.log("ingen match");
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
  renderCards();
  if (game.flippedCards.length === 2) {
    checkMatch();
  }
}

function renderCards() {
  const container = document.getElementById("cardGrid");
  container.className = "grid gap-4 grid-cols-3";
  container.innerHTML = "";

  game.cards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className =
      "bg-gray-700 h-32 rounded-lg flex items-center justify-center text-lg cursor-pointer p-4";

    if (card.flipped || card.matched) {
      cardEl.textContent = card.displayText;
      cardEl.className = card.matched
        ? "bg-green-600 h-32 rounded-lg flex items-center justify-center text-lg p-4"
        : "bg-blue-600 h-32 rounded-lg flex items-center justify-center text-lg p-4";
    } else {
      cardEl.textContent = "?";
    }

    cardEl.onclick = () => {
      flipCard(card.id);
      renderCards();
    };

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

  renderCards();

  console.log("✅ Spelet är klart!");
}
