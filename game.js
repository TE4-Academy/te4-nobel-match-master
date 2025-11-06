const card_test = [
  { id: 1, name: "Marie Curie", achievement: "Radioaktivitet" },
  { id: 2, name: "Albert Einstein", achievement: "Fotoelektrisk effekt" },
  { id: 3, name: "Ernest Hemingway", achievement: "Den gamle och havet" }
];

const game = {
    cards:[],
    filppedCards:[],
    moves:0,
    matches:0,
    isFlipped:false,
    timer:0,
    timerintervall:null,
    difficulty:"easy",
    parisNeeded:3,



};



function createNobelCards(){
    const cards = [];
    let id =0;
    const selected = card_test.slice(0,3);
    selected.forEach( NobelWinner => {
        cards.push({
            id:id++,
            pariId:NobelWinner.id,
            type:'name', 
            displayText:NobelWinner.name,
            matched:false,
            flipped:false
        });
    cards.push({
            id:id++,
            pariId:NobelWinner.id,
            type:'name', 
            displayText:NobelWinner.achievement,
            matched:false,
            flipped:false

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
    checkWin();
  } else{
    console.log("ingen match");
    game.isFlipping = true;
    setTimeout(()=> {
        card1.flipped = false;
        card2.flipped = false;
        game.flippedCards = [];
        game.isFlipping = false;
        renderCards();
    }, 1000);
  }
}
 
function renderCards() {
    const container = document.getElementById("cards");
    container.className = "grid gap-4 grid-cols-3";
    container.innerHTML = "";

    game.cards.forEach(card => {
        const cardEl =document.createElement("div");
        cardEl.className = "bg-gary-700 h-32 rounded-lg flex items-center justify-center text-lg cursor-pointer p-4"
    
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
  
  document.getElementById("moves").textContent = game.moves;
  document.getElementById("matches").textContent = `${game.matches}/${game.pairsNeeded}`;
}

