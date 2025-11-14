# SPELINSTRUKTIONER
1. Välj namn (frivilligt, väljer man inget namn står det anonym i leaderboarden)
2. Välj svårighetsgrad (enkel, medel eller svår)
3. Matcha nobelpristagaren med varför de vann nobelpriset så fort som möjligt. (klicka på ge upp ifall du vill avsluta spelet.)
4. Klicka på leaderboardknappen för att se din placering (frivilligt, visas även efter man vunnit)

# POÄNGSYSTEM
Gissar man fel får man -10 poäng. Gissar man rätt får man +100 poäng. Gör man klart spelet på under 60 sekunder får mna +100 bonuspoäng. Vinner man spelet på under 120 sekunder får man +50 bonuspoäng. Vinner man spelet på under 25 sekunder får man +25 bonuspoäng. Ifall man får alla rätt direkt får man +200 bonuspoäng. Vinst i spelet resulterar i att skärmen täcks med konfetti. När man vunnit spelet visas en lista som innehåller leaderboardplacering, poäng, tid och försök samt en knapp för att komma tillbaks till menyn för att starta om spelet och se den fullständiga leaderboarden. I leaderboarden kan man sortera efter antingen tid eller poäng.

# TEKNISKT/ÖVRIGT
Spelet har localstorage och all data sparas efter man refreshar eller lämnar sidan. Pga localstorage kan man inte se andra spelares resultat. Man kan spela lokalt genom att turas om (i framtiden skulle globalstorage kunna läggas till så man kan se andra personers resultat). Spelet är anpassat för chrome fast är testat och fungerar felfritt på safari, opera, duckduckgo, firefox, samsung internet, brave och edge. Spelet är anpassat för både mobiltelefon och dator. Gissar man fel skakar korten.

# SCREENSHOTS
Finns i Readme mappen

# LÄNK TILL SPELET
https://nobel-memory.netlify.app/

# -----------------------------------------------------------------------------------------------------------------#

# te4-nobel-match-master
### Team C: Match Master
**Speltyp:** Memory/matching game

**Spelmekanik:**
- Matcha namn med achievement (eller bild)
- 6/9/12 par beroende på svårighetsgrad
- Card flip animations
- Försöks-räkning
- Leaderboard baserat på minst antal försök

Team C
# Nobel Match Master

## Syfte

Utveckla ett minnesbaserat matchningsspel där användare kopplar ihop Nobelpristagare med deras upptäckter eller verk. Spelet ska träna minne, vara visuellt engagerande och belöna strategiskt tänkande.

## Spelmekanik

### Grundflöde
1. Användare väljer svårighetsgrad (lätt: 6 par, medel: 9 par, svår: 12 par)
2. Kort blandas och visas med baksidan upp
3. Användare klickar för att vända två kort
4. Om match: korten förblir synliga och låses
5. Om inte match: korten vänds tillbaka efter 1 sekund
6. Spelet fortsätter tills alla par är matchade
7. Poäng baserat på antal försök och tid
8. Möjlighet att spara score till leaderboard

### Korttyper
**Typ A:** Pristagarens namn + bild  
**Typ B:** Upptäckt/verk + kategori-ikon

**Exempel par:**
- "Marie Curie" ↔ "Upptäckt av radioaktivitet"
- "Ernest Hemingway" ↔ "Den gamle och havet"
- "Albert Einstein" ↔ "Fotoelektrisk effekt"

### Poängsystem
```
Svårighetsgrad  | Max poäng | Försök påverkan
Lätt (6 par)    | 600       | -10p per försök över 12
Medel (9 par)   | 900       | -10p per försök över 18
Svår (12 par)   | 1200      | -10p per försök över 24

Tidsbonus:
< 1 min: +100p
< 2 min: +50p
< 3 min: +25p

Perfect game (minimalt försök): +200p
```

## Grundkrav (MVP)

### Funktionalitet
- [ ] Svårighetsval (3 nivåer)
- [ ] Card flip-animationer
- [ ] Match-validering
- [ ] Räknare för försök
- [ ] Timer (visar spelad tid)
- [ ] Poängberäkning
- [ ] Slutskärm med resultat
- [ ] "Spela igen"-funktionalitet

### Teknisk
- [ ] Hämta data från `nobel-data.json`
- [ ] Shuffle-algoritm (Fisher-Yates)
- [ ] Card flip CSS animations
- [ ] Match-logik och state management
- [ ] Prevent clicks under flip/match
- [ ] Local storage för bästa tid/poäng

### Design
- [ ] Mobile-first responsive grid
- [ ] Smooth flip animations (CSS)
- [ ] Tydlig card-design (fram/baksida)
- [ ] Visual match feedback (grön border)
- [ ] Progress: X av Y par matchade
- [ ] Använd Tailwind-klasser från starter kit

## Prioriterade features

### Spelmekanik
- [ ] Hint-system (visa ett par i 2 sekunder)
- [ ] Peek mode (visa alla kort i 5 sek vid start)
- [ ] Streak tracking (flera match i rad)
- [ ] Star rating baserat på prestanda (1-3 stjärnor)

### UX-förbättringar
- [ ] Card shake animation vid no-match
- [ ] Success animation vid match (scale, glow)
- [ ] Sound effects (flip, match, win)
- [ ] Konfetti vid perfekt score
- [ ] Smooth card layouts (Grid med gap)

### Leaderboard
- [ ] Top 10 per svårighetsgrad
- [ ] Filtrera: bästa poäng / snabbaste tid
- [ ] Användarnamn vid submission
- [ ] Visa försök + tid för varje entry

### Visuell polish
- [ ] Kategori-färgkodning på kort
- [ ] Pristagarbild på framsida
- [ ] Gradient backgrounds per kategori
- [ ] Particle effects vid match

## Nice-to-have

### Avancerade features
- [ ] Multiplayer mode (turas om)
- [ ] "Memory master" mode (20+ par)
- [ ] Tidsutmaning (match alla innan timer)
- [ ] Achievement system (första match, alla rätt, etc)

### Educational
- [ ] Fakta-popup vid match (mer info om pristagaren)
- [ ] "Upptäck mer"-länk till Wikipedia
- [ ] Quiz mode efter 5 matchningar
- [ ] Statistik: vilka kategorier är svårast

### Accessibility
- [ ] Tangentbordsnavigering (tab + enter)
- [ ] Screen reader-support
- [ ] Alternativ färgmarkörer (inte bara färg för match)
- [ ] Reducera animationer (prefers-reduced-motion)

## Tekniska constraints

### Obligatoriskt
- Använd `nobel-data.json` som datakälla
- Implementera med vanilla JavaScript (ES6+)
- CSS animations för card flip
- Använd Tailwind CSS från starter kit
- Mobile-first responsive design
- Fungera i Chrome, Firefox, Safari

### Tillåtet
- Libraries: anime.js, howler.js, confetti.js
- LocalStorage för persistence
- CSS Grid för card layout
- Transform3D för flip effect

### Förbjudet
- Ingen backend (allt client-side)
- Inga stora frameworks

## Leverans (Måndag 17/11)

### Kod
- Fungerande spel deployat på Netlify
- Ren, kommenterad kod
- README med instruktioner
- Minst 5 commits med tydliga meddelanden

### Presentation
- Live demo (5 minuter)
- Kod-walkthrough av flip animation (3 minuter)
- Diskussion: Utmaningar och lärdomar (2 minuter)

## Tips

### Card Flip Animation
```css
.card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

### Shuffle Algorithm
```javascript
// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```

### Match Validation
```javascript
// State management
let flippedCards = [];
let matchedPairs = 0;

function checkMatch(card1, card2) {
  if (card1.dataset.pairId === card2.dataset.pairId) {
    // Match found!
    matchedPairs++;
    lockCards(card1, card2);
  } else {
    // No match
    setTimeout(() => flipBack(card1, card2), 1000);
  }
}
```

### Prevent Rapid Clicks
```javascript
let isProcessing = false;

card.addEventListener('click', () => {
  if (isProcessing || card.classList.contains('matched')) return;
  isProcessing = true;
  flipCard(card);
  // ... match logic
  setTimeout(() => isProcessing = false, 1000);
});
```

### Grid Layout
```html
<!-- För 6 par (12 kort) -->
<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
  <!-- Cards here -->
</div>

<!-- För 12 par (24 kort) -->
<div class="grid grid-cols-4 sm:grid-cols-6 gap-3">
  <!-- Cards here -->
</div>
```

## Resurser

- Nobel data: `../starter-kit/nobel-data.json`
- Tailwind config: `../starter-kit/tailwind.config.js`
- Styles: `../starter-kit/styles.css`
- Workflow: `../methodology/workflow.md`
- CSS Tricks Flip Card: https://css-tricks.com/almanac/properties/b/backface-visibility/

**Lycka till, Team C!**
