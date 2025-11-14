# ✅ Nobel Match Master – Komplett Utvecklingschecklista

> Projekt: *Team C – Nobel Quest, Fas 1*  
> Mål: Bygga ett memory-spel där spelaren matchar Nobelpristagare med deras upptäckter.  
> **Deadline: Måndag 17 november 2025**

---

## 🧩 MVP – Grundfunktioner (OBLIGATORISKT)

### 🕹️ Spelmekanik
- [x] Startskärm med val av svårighetsgrad (Lätt, Medel, Svår)
  - Lätt: 6 par (12 kort)
  - Medel: 9 par (18 kort)
  - Svår: 12 par (24 kort)
- [x] `startGame()` startar korrekt baserat på vald svårighetsgrad
- [x] Kort hämtas från `nobel-data.json` via `fetch()`
- [x] Hantera fel vid laddning med `try/catch`
- [x] Slumpmässigt urval från alla 75 pristagare
- [x] Fisher-Yates shuffle fungerar korrekt
- [x] Strukturera data i två kort per pristagare (person + achievement)
- [x] Kort visas i grid-layout med baksida upp
- [x] Två kort kan vändas samtidigt
- [x] Matchning kontrolleras (namn ↔ prestation)
- [x] Korten låses vid match
- [x] Korten vänds tillbaka vid felmatch (efter 1 sekund)
- [x] Antal försök räknas
- [x] Antal matchningar uppdateras (X av Y par matchade)
- [x] Prevent clicks under pågående flip/match
- [x] Prevent clicks på redan matchade kort
- [x] Spelet avslutas när alla par är hittade
- [x] Slutskärm visas med resultat

---

### ⏱️ Tid och Poäng
- [x] Timer startar när spelet börjar
- [x] Timer pausas när spelet slutar
- [x] Tid visas i `mm:ss`-format i UI
- [x] Poäng räknas ut enligt tabellen:
  - **Lätt (6 par):** Max 600p, -10p per försök över 12
  - **Medel (9 par):** Max 900p, -10p per försök över 18
  - **Svår (12 par):** Max 1200p, -10p per försök över 24
- [x] Tidsbonus:
  - < 1 min: +100p
  - < 2 min: +50p
  - < 3 min: +25p
- [x] Perfect game bonus: +200p (minimalt antal försök)
- [x] Slutskärmen visar tid, försök och total poäng
- [x] Poäng visas löpande under spelet (valfritt men rekommenderat)

---

### 🔁 Spelkontroller
- [x] "Spela igen"-knapp återställer spelet
- [x] Alla kort och räknare nollställs korrekt
- [x] Startskärmen visas igen efter avslutat spel
- [x] Inga buggar vid flera omstarter
- [x] Spelet kraschar inte vid reload

---

## 🎨 Design & Användarupplevelse (OBLIGATORISKT)

### 💅 Layout och Visuell Feedback
- [x] Mobile-first design (Tailwind CSS)
- [x] Responsiv layout på mobil och desktop
- [x] Grid-layout justeras efter svårighetsgrad:
  - **Lätt:** 3x4 (grid-cols-3 sm:grid-cols-4)
  - **Medel:** 3x6 eller 4x5
  - **Svår:** 4x6 (grid-cols-4 sm:grid-cols-6)
- [x] Smooth card layouts med Grid och gap
- [x] Kort har tydlig framsida/baksida design
- [x] Baksida visar "?"-symbol eller liknande
- [x] Matchade kort får visuell feedback (grön border/highlight/glow)
- [ ] **Flip-animation med 3D-rotation (`rotateY(180deg)`)**
  - `transform-style: preserve-3d`
  - `transition: transform 0.6s`
  - `backface-visibility: hidden`
- [ ] Smidig övergång vid vändning (CSS transition)
- [x] "Ingen match" ger kort skak-animation
- [x] Tailwind-klasser används konsekvent från starter kit
- [x] Kategori-färgkodning (valfritt)
- [x] Pristagarnas bilder visas korrekt på framsida
- [x] Gradient backgrounds per kategori (valfritt)

---

### 📦 Korttyper
**Typ A:** Pristagarens namn + bild  
**Typ B:** Upptäckt/verk + kategori-ikon

**Exempel par:**
- "Marie Curie" ↔ "Upptäckt av radioaktivitet"
- "Ernest Hemingway" ↔ "Den gamle och havet"
- "Albert Einstein" ↔ "Fotoelektrisk effekt"

---

### 🔊 Ljud och Effekter (PRIORITERAT)
- [x] Ljud vid flip (tillåtet: howler.js)
- [x] Ljud vid match
- [x] Ljud vid vinst
- [x] Konfetti-animation vid win (tillåtet: confetti.js)
- [x] Partikeleffekt vid perfekt score
- [ ] Success animation vid match (scale, glow)
- [ ] Particle effects vid match (tillåtet: anime.js)

---

## 💾 Data & Persistens (OBLIGATORISKT)

- [x] Hämta JSON-data via `fetch()` från `nobel-data.json`
- [x] Hantera fel vid laddning (t.ex. `try/catch`)
- [x] Visa felmeddelande om JSON-data inte laddas
- [x] Strukturera data i två kort per pristagare (person + achievement)
- [x] Spara highscore i LocalStorage
- [x] LocalStorage för bästa tid/poäng per svårighetsgrad
- [x] Leaderboard visar top 10 per svårighetsgrad
- [x] Möjlighet att ange namn vid score submission (användarnamn)
- [x] Leaderboard filtrerbar efter snabbast tid / högst poäng
- [x] Visa försök + tid för varje entry i leaderboard
- [x] Leaderboard-data sparas mellan sessioner

---

## ⚙️ Extra Funktioner (PRIORITERADE FEATURES)

### 🧠 Spelmekanik
- [ ] Hint-system (visa ett par i 2 sekunder)
- [ ] Peek mode (visa alla kort i 5 sekunder vid start)
- [ ] Streak tracking (bonus för flera matcher i rad)
- [ ] Star rating (1–3 stjärnor beroende på prestation)
- [ ] Fakta-popup vid match (liten info-ruta om pristagaren)
- [ ] "Upptäck mer"–länk till Wikipedia

---

## 🧍‍♀️ Accessibility & UX (NICE-TO-HAVE)

- [ ] Tangentbordsnavigering (Tab + Enter)
- [ ] Färgmarkörer + alternativ symboler (för färgblinda)
- [ ] Läsbar textkontrast (Tailwind neutrala färger)
- [ ] "Reduced motion" respekt (`prefers-reduced-motion`)
- [ ] Fokusmarkering för kort med keyboard
- [ ] Screen reader-support
- [ ] Alternativ visuella markörer (inte bara färg för match)

---

## 🧪 Testning (OBLIGATORISKT)

### 🧭 Funktionella Tester
- [x] Testa spelet på Chrome
- [x] Testa spelet på Firefox
- [x] Testa spelet på Safari
- [x] Testa på mobil (Chrome/Android)
- [x] Testa på iPhone (Safari)
- [x] Alla svårighetsnivåer fungerar
- [x] Timer nollställs korrekt varje gång
- [x] Poängräkning fungerar enligt tabell
- [ ] Flip-animation fungerar i alla browsers
- [x] Leaderboard-data sparas mellan sessioner
- [x] State management fungerar korrekt
- [x] Match-validering fungerar

### 🧱 Felhantering
- [x] Visa felmeddelande om JSON-data inte laddas
- [x] Hantera klick under animationer (isProcessing flag)
- [x] Hantera klick på redan matchade kort
- [x] Spelet kraschar inte vid reload
- [x] Alla `console.log` tas bort inför release

---

## 🚀 Deployment (OBLIGATORISKT)

- [x] Projektet körs lokalt med `Live Server`
- [x] Testat att funka efter page reload
- [x] Netlify-konto skapat
- [x] Projektet deployat till Netlify
- [x] Fungerande spel deployat och tillgängligt online
- [x] **README.md innehåller:**
  - [x] Hur man spelar
  - [x] Hur man kör lokalt
  - [x] Screenshots
  - [x] Länk till live-version
- [x] Ingen känslig data i koden
- [x] All kod validerad (HTML, CSS, JS)
- [x] Minst 5 commits med tydliga meddelanden

---

## 🎤 Presentation (17/11) – OBLIGATORISKT

### 🗓️ Förberedelse
- [ ] Live-demo fungerar stabilt
- [ ] Spelet fungerar på minst en laptop + mobil
- [ ] 10 min presentation planerad (7 min demo + 3 min Q&A)
- [ ] Alla i teamet vet vad de ska säga
- [ ] Slides eller stödanteckningar redo (valfritt)

### 🧾 Innehåll (Total: 10 minuter)
- [ ] **Live demo (5 minuter)**
  - Visa gameplay
  - Visa alla svårighetsnivåer
  - Visa poängsystem i praktiken
- [ ] **Kod-walkthrough av flip animation (3 minuter)**
  - Förklara CSS/JS implementation
  - Visa kod exempel
- [ ] **Diskussion: Utmaningar och lärdomar (2 minuter)**
  - Tekniska utmaningar
  - Vad vi lärt oss
  - Reflektera över samarbete och kodprocess

---

## 🧹 Efterarbete

- [ ] Skriv `RETRO.md` (vad gick bra, vad kan förbättras)
- [ ] Lämna in slutversion
- [ ] Fira! 🎉

---