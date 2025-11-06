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


 