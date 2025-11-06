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
