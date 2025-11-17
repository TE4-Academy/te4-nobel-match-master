function shuffleCard(cards) {
  const shuffled = [...cards];
  //SKAPAR EN KOPIA AV GRIDEN SÅ ATT DET RIKTIGA INTE ÄNDRAS
  for (let i = shuffled.length - 1; i > 0; i--) {
    //VÄLJ ETT SLUMPMÄSSIGT INDEX MELLAN 1 OCH 2 
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    //BYTER PLATS PÅ KORT 1 OCH KORT 2 
  }

  return shuffled;
  //RETURNERA SHUFFLADE/BLANDADE KORT
}

//det sorteras med hjälp av fisher yates metoden