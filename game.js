

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
  playerName: "",
};



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
    gameSound.match.currentTime = 0;
  gameSound.match.play().catch(e => console.log('Ljud blockerat'));
    card1.matched = true;
    card2.matched = true;
    game.matches++;
    game.score += 100;
    game.flippedCards = [];

    renderCards();
    document.getElementById("score").textContent = game.score;

    if (game.matches === game.pairsNeeded) {
      stopTimer();
      clearInterval(game.timerInterval);
      const finalScore = finalizeScore();
        gameSound.win.currentTime = 0;
    gameSound.win.play().catch(e => console.log('Ljud blockerat'));
      const minutes = Math.floor(game.timer / 60);
      const seconds = game.timer % 60;
      const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      setTimeout(() => showEndScreen(), 800);
    }

  } else {
    
    game.score -= 10; 
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


 if (game.moves === 0 && game.flippedCards.length === 0) {
    startTimer();
  }

gameSound.flip.currentTime = 0;
gameSound.flip.play().catch(e => console.log('Ljud blockerat'));

  card.flipped = true;
  game.flippedCards.push(cardId);

  if (game.flippedCards.length === 2) {
    renderCards();
    checkMatch();
  } else {
    renderCards();
  }
}



function startTimer() {
  game.timer = 0;
  clearInterval(game.timerInterval);
  game.timerInterval = setInterval(() => {
    game.timer++;
    const mins = Math.floor(game.timer / 60 );
    const secs = game.timer % 60;
    document.getElementById("timer").textContent = `${mins}:${secs.toString().padStart(2, '0')}`;  }, 1000);
}

function stopTimer() {
  clearInterval(game.timerInterval);
}

async function startGame(difficulty, playerName) {
  console.log("🎮 Startar spel...");

  if (nobelData.length === 0) {
    console.log("📥 Laddar data först...");
    await loadNobelData();
   console.log("✅ Data laddad! nobelData.length:", nobelData.length);
  }

  game.difficulty = difficulty || "easy";
  game.playerName = playerName || "Anonym";
 
  if (difficulty === "easy") game.pairsNeeded = 6;
  else if (difficulty === "medium") game.pairsNeeded = 9;
  else if (difficulty === "hard") game.pairsNeeded = 12;
 

  game.cards = createNobelCards();

  if (game.cards.length === 0) {
    console.error("❌ Inga kort skapades!");
    return;
  }
  game.flippedCards = [];
  game.moves = 0;
  game.matches = 0;
  game.isFlipping = false;
  game.timer = 0;
  game.score = 0;
  document.getElementById("score").textContent = 0;
 document.getElementById("timer").textContent = "0:00";


  renderCards();
  
}
