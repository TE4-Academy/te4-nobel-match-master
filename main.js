async function init() {
  
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    
    
    console.log("⏳ Initialiserar spel...");
    await startGame();  
  }
  
 
  window.addEventListener('DOMContentLoaded', init);
