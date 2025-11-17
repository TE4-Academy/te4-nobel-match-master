//-----------------------------------------------------------------------------------------------------------------//

//States och globala variabler
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

//-----------------------------------------------------------------------------------------------------------------//

function createNobelCards() {
  //Error ifall nobeldata inte är lika med 0 eller nobelData.length är lika med 0 
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
      //Ändrar matched till false
      flipped: false,//
      //Ändrar flipped till false
    });

    cards.push({
      id: id++,
      pairId: laureate.id,
      type: "achievement",
      category: laureate.category,
      achievement: laureate.achievement,
      year: laureate.year,
      matched: false,
      //Ändrar matched till false
      flipped: false,
      //Ändrar flipped till false

    });
  });
  return shuffleCard(cards);
}

//Kollar ifall korten är matchade
function checkMatch() {
  const [id1, id2] = game.flippedCards;
  //HÄMTA KORTEN SOM ÄR VÄNDA
  const card1 = game.cards.find((c) => c.id === id1);
  //FÖRSTA KORTET
  const card2 = game.cards.find((c) => c.id === id2);
  //ANDRA KORTET

  game.moves++;
  //ÖKA ANTALET FÖRSÖK MED 1

  if (card1.pairId === card2.pairId) {
    //Om pair.Id ÄR SAMMA = MATCH
    gameSound.match.currentTime = 0;
    //nollställ match ljudet
    gameSound.match.play().catch((e) => console.log("Ljud blockerat"));
    //SPELA MATCHLJUD
    card1.matched = true;
    //MARKERA KORT 1 SOM MATCHAT
    card2.matched = true;
    //MARKERA KORT 2 SOM MATCHAT
    game.matches++;
    //ÖKA ANTALET MATCHNINGAR MED 1 
    game.score += 100;
    //ÖKAR ANTALET POÄNG MED 100
    game.flippedCards = [];
    //TÖM LISTA MED VÄNDA KORT

    renderCards();
    document.getElementById("score").textContent = game.score;
    //VISA NYA POÄNGEN OM MAN FÅTT RÄTT

    if (game.matches === game.pairsNeeded) {
      //IFALL ANTAL MATCHINGAR = SAMMA SOM ANTAL PAR
      stopTimer();
      clearInterval(game.timerInterval);
      const finalScore = finalizeScore();
      // KÖR FUNKtiONEN finalizeScore
      gameSound.win.currentTime = 0;
      //nollställer timern efter man vunnit
      gameSound.win.play().catch((e) => console.log("Ljud blockerat"));
      //spelar win ljudet
      const minutes = Math.floor(game.timer / 60);
      //minuter
      const seconds = game.timer % 60;
      //sekunder över
      const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      //formatet
      setTimeout(() => showEndScreen(), 800);
      //VISA ENDSCREEN EFTER 0,8 SEKUNDERS DELAY
    }
  } else {
    //IFALL ANTAL MATCHNINGAR = INTE SAMMA ANTAL PAR
    game.score -= 10;
    //MINSKA POÄNGEN MED -10
    document.getElementById("score").textContent = game.score;
    //VISA NYA POÄNGEN NÄR MAN FÅTT FEL

    game.isFlipping = true;
    const card1Element = document.querySelector(`[data-card-id="${id1}"]`);
    const card2Element = document.querySelector(`[data-card-id="${id2}"]`);
    //LÅSER SÅ ATT MAN INTE KAN KLICKA NYA KORT INNAN DET ÄR KLART
    if (card1Element) card1Element.classList.add("shake");
    //Skaka kort 1
    if (card2Element) card2Element.classList.add("shake");
    //Skaka kort 2
    setTimeout(() => {
      //efter 1 sekund
      if (card1Element) card1Element.classList.remove("shake");
      //SLUTA SKAKA KORT 1 
      if (card2Element) card2Element.classList.remove("shake");
      //SLUTA SKAKA KORT 2 
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
  //deklarerar bonusvariabelgrej och sätter den till 0

  if (game.timer < 60) bonus += 100;
  //Ifall man klarar spelet på under 60 sekunder = +100 poäng
  else if (game.timer < 120) bonus += 50;
  //Ifall man klarar spelet på under 120 sekunder = +50 poäng
  else if (game.timer < 180) bonus += 25;
  //Ifall man klarar spelet på under 180 sekunder = +25 poäng

  if (game.moves === game.pairsNeeded) bonus += 200;
  //Ifall man klarar spelet utan några fel = +200 poäng

  let maxBase = 0;
  switch (game.difficulty) {
    case "easy":
      maxBase = 600;
      //Maxpoäng för easy
      break;
    case "medium":
      maxBase = 900;
      //Maxpoäng för medium
      break;
    case "hard":
      maxBase = 1200;
      //Maxpoäng för hard
      break;
  }

  const final = Math.min(game.score + bonus, maxBase + 300);
  //Maxgräns för poäng inkl extrapoäng (?)
  return final;
}

//-----------------------------------------------------------------------------------------------------------------//

function flipCard(cardId) {
// Hitta kortet i spelets kort-array med det givna ID:t
  const card = game.cards.find((c) => c.id === cardId);
  // .find() letar igenom game.cards och returnerar det första kortet där c.id === cardId

  if (!card) {
    return;
    //Ifall kort inte hittas = gör ingenting
  }

  if (card.flipped) {
    return;
    //Ifall kort redan är vända = gör ingenting
  }

  if (card.matched) {
    return;
    //Ifall kort redan är matchade = gör ingenting
  }

  if (game.flippedCards.length >= 2) {
    return;
    //Ifall längden på korten är större eller lika med 2 = gör ingenting
  }

  if (game.isFlipping) {
    return;
    //Ifall korten håller på att flippa = gör ingenting
  }

  if (game.moves === 0 && game.flippedCards.length === 0) {
    startTimer();
    //Om man vänder kort första gången = kör funktionen startTimer()
  }

  gameSound.flip.currentTime = 0;
  gameSound.flip.play().catch((e) => console.log("Ljud blockerat"));
  //Nollställer ljudet och spelar upp ljudeffekt

  card.flipped = true;
  //Deklarerar att kortet är vänt

  game.flippedCards.push(cardId);
  //Lägger till kortet som vänts i listan av använda kort

  if (game.flippedCards.length === 2) {
    renderCards();
    checkMatch();
    //Om man vänt 2 kort = jämför korten med varandra
  } else {
    renderCards();
    //Om man vänt 1 kort = rendera om 
  }
}

//startTimer
function startTimer() {
  game.timer = 0;
  //NOLLSTÄLLER TIMER VARJE GÅNG ETT NYTT SPEL STARTAS
  clearInterval(game.timerInterval);
  //STOPPAR TIMER SOM REDAN KÖRS (OM DET FINNS EN)
  game.timerInterval = setInterval(() => {
    //INTERVALL SOM KÖR KODEN EN GÅNG VARJE SEKUND
    game.timer++;
    //ÖKAR TIMERN MED 1 SEKUND VARJE SEKUND
    const mins = Math.floor(game.timer / 60);
    //BERÄKNAR ANTALET MINUTER
    const secs = game.timer % 60;
    //BERÄKNAR ANTALET SEKUNDER ÖVER
    document.getElementById("timer").textContent = `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
      //FIXAR FORMATET (00:00)
  }, 1000); 
  //1000 ms = 1 sekund
}

//stopTimer
function stopTimer() {
  clearInterval(game.timerInterval);
}

//-----------------------------------------------------------------------------------------------------------------//

//startGame
async function startGame(difficulty, playerName) {
  //kör funktionen startGame innan man laddat klart allting

  document.getElementById("startScreen").classList.add("hidden");
  //när spelet startats = startScreen i HTML göms 
  document.getElementById("gameScreen").classList.remove("hidden");
  //när spelet startats = gameScreen i HTML göms

  if (nobelData.length === 0) {
    await loadNobelData();
  }

  game.difficulty = difficulty || "easy";
  //game.difficulty (spelets svårighetsgrad) = blir svårighetsgraden man valt eller easy 
  game.playerName = playerName || "Anonym";
  //game.playerName = blir namnet man skrivit in eller anonym ifall man inte matat in ett namn

  if (difficulty === "easy") game.pairsNeeded = 6;
  //Ifall man valt easy = game.pairsNeeded blir 6 par (12 kort totalt)
  else if (difficulty === "medium") game.pairsNeeded = 9;
  //Ifall man valt medium = game.pairsNeeded blir 9 par (18 kort totalt)
  else if (difficulty === "hard") game.pairsNeeded = 12;
  //Ifall man valt hard = game.pairsNeeded blir 12 par (24 kort totalt)

  game.cards = createNobelCards();
  if (game.cards.length === 0) {
    console.error("❌ Inga kort skapades!");
    return;
    //Ifall game.cards.length är noll skapas inte kort
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

//giveUpBtn
 document.getElementById("giveUpBtn").addEventListener("click", () => {
  if (confirm("Är du säker på att du vill ge upp? Dina poäng sparas inte.")) {
    // Stoppa timer och återställ spel manuellt — utan att kalla endGame()
    clearInterval(game.timerInterval);
    game.timerInterval = null;

    // Nollställ spelets data
    game.cards = [];
    game.flippedCards = [];
    game.moves = 0;
    game.matches = 0;
    game.timer = 0;
    game.score = 0;

    //Visa rätt sida i HTML
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("leaderboardScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");

    // Rensa korten
    const cardGrid = document.getElementById("cardGrid");
    if (cardGrid) cardGrid.innerHTML = "";
  }
});