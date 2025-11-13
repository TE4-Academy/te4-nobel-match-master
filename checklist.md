# ✅ Nobel Match Master – Utvecklingschecklista

> Projekt: *Team C – Nobel Quest, Fas 1*  
> Mål: Bygga ett memory-spel där spelaren matchar Nobelpristagare med deras upptäckter.

---

## 🧩 MVP – Grundfunktioner

### 🕹️ Spelmekanik
- [x] Startskärm med val av svårighetsgrad (Lätt, Medel, Svår)
- [x] `startGame()` startar korrekt baserat på vald svårighetsgrad
- [x] Kort hämtas från `nobel-data.json`
- [x] Slumpmässigt urval från alla 75 pristagare
- [x] Fisher-Yates shuffle fungerar korrekt
- [x] Kort visas i grid-layout med baksida upp
- [x] Två kort kan vändas samtidigt
- [x] Matchning kontrolleras (namn ↔ prestation)
- [x] Korten låses vid match
- [x] Korten vänds tillbaka vid felmatch
- [x] Antal försök räknas
- [x] Antal matchningar uppdateras
- [x] Prevent clicks under pågående flip/match
- [x] Spelet avslutas när alla par är hittade
- [x] Slutskärm visas med resultat

---

### ⏱️ Tid och poäng
- [x] Timer startar när spelet börjar
- [x] Timer pausas när spelet slutar
- [x] Tid visas i `mm:ss`-format i UI
- [x] Poäng räknas ut enligt tabellen i instruktionerna:
  -Maxpoäng per svårighetsgrad
  - -10p per försök över gräns
  - +bonus för snabb tid
  - +200p för perfekt game
- [x] Slutskärmen visar tid, försök och total poäng
- [x] Poäng visas löpande under spelet (valfritt)

---

### 🔁 Spelkontroller
- [x] “Spela igen”-knapp återställer spelet
- [x] Alla kort och räknare nollställs korrekt
- [x] Startskärmen visas igen efter avslutat spel
- [x] Inga buggar vid flera omstarter

---

## 🎨 Design & Användarupplevelse

### 💅 Layout och visuell feedback
- [x] Mobile-first design (Tailwind)
- [x] Grid-layout justeras efter svårighetsgrad:
  - Lätt: 3x4
  - Medel: 4x5
  - Svår: 4x6
- [x] Kort har tydlig framsida/baksida
- [x] Baksida visar t.ex. “?”-symbol
- [x] Matchade kort får grön highlight eller glow
- [ ] Flip-animation med 3D-rotation (`rotateY(180deg)`)
- [ ] Smidig övergång vid vändning (CSS transition)
- [ ] “Ingen match” ger kort skak-animation
- [x] Responsiv layout på mobil och desktop
- [x] Tailwind-klasser används konsekvent
- [x] Kategori-färgkodning (valfritt)
- [x] Pristagarnas bilder visas korrekt

---

### 🔊 Ljud och effekter (om tid finns)
- [x] Ljud vid flip
- [x] Ljud vid match
- [x] Ljud vid vinst
- [x] Konfetti-animation vid win
- [x] Partikeleffekt vid perfekt score

---

## 💾 Data & Logik

- [x] Hämta JSON-data via `fetch()`
- [x] Hantera fel vid laddning (t.ex. `try/catch`)
- [x] Strukturera data i två kort per pristagare (person + achievement)
- [x] Spara highscore i LocalStorage
- [x] Leaderboard visar top 10 per svårighetsgrad
- [x] Möjlighet att ange namn vid score submission
- [x] Leaderboard filtrerbar efter snabbast tid / högst poäng

---

## ⚙️ Extra funktioner (prioriterade features)

### 🧠 Spelmekanik
- [ ] Hint-system (visa ett par i 2 sekunder)
- [ ] Peek mode (visa alla kort i 5 sekunder vid start)
- [ ] Streak tracking (bonus för flera matcher i rad)
- [ ] Star rating (1–3 stjärnor beroende på prestation)
- [ ] Fakta-popup vid match (liten info-ruta)
- [ ] “Upptäck mer”–länk till Wikipedia

---

## 🧍‍♀️ Accessibility & UX
- [ ] Tangentbordsnavigering (Tab + Enter)
- [ ] Färgmarkörer + alternativ symboler (för färgblinda)
- [ ] Läsbar textkontrast (Tailwind neutrala färger)
- [ ] “Reduced motion” respekt (prefers-reduced-motion)
- [ ] Fokusmarkering för kort med keyboard

---

## 🧪 Testning

### 🧭 Funktionella tester
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

### 🧱 Felhantering
- [x] Visa felmeddelande om JSON-data inte laddas
- [x] Hantera klick under animationer
- [ ] Spelet kraschar inte vid reload
- [ ] Alla console.log tas bort inför release

---

## 🚀 Deployment

- [x] Projektet körs lokalt med `Live Server`
- [x] Testat att funka efter page reload
- [x] Netlify-konto skapat
- [x] Projektet deployat till Netlify
- [ ] `README.md` innehåller:
  - Hur man spelar
  - Hur man kör lokalt
  - Screenshots
  - Länk till live-version
- [ ] Ingen känslig data i koden
- [x] All kod validerad (HTML, CSS, JS)

---

## 🎤 Presentation (17/11)

### 🗓️ Förberedelse
- [ ] Live-demo fungerar stabilt
- [ ] Spelet fungerar på minst en laptop + mobil
- [ ] 7 min presentation + 3 min Q&A planerad
- [ ] Alla i teamet vet vad de ska säga
- [ ] Slides eller stödanteckningar redo (valfritt)

### 🧾 Innehåll
- [ ] Kort intro till spelet
- [ ] Visa gameplay live
- [ ] Förklara flip-animation (CSS eller JS)
- [ ] Visa poängberäkning (logik)
- [ ] Prata om utmaningar & lärdomar
- [ ] Reflektera över samarbete och kodprocess

---

## 🧹 Efterarbete
- [ ] Skriv `RETRO.md` (vad gick bra, vad kan förbättras)
- [ ] Lämna in slutversion
- [ ] Fira! 🎉

---

## 🧠 Bonusmål (om tid finns)
- [ ] Multiplayer mode (turordning)
- [ ] Time challenge mode
- [ ] Achievement system
- [ ] Statistik: svåraste kategorier
- [ ] Global leaderboard (via JSON/API)
- [ ] Offline-läge (service worker)

---

**Senast uppdaterad:** November 2025  
**Team:** C – Nobel Match Master  
**Projektledare:**  
**UI/UX:**  
**Game Logic:**  
**Data Integration:**  

---
