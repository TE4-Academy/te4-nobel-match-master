let nobelData = [];

async function loadNobelData() {
  try {
    const response = await fetch("./nobel-data.json");
    //HÄMTA JSONFILEN
    if (!response.ok) {
      throw new Error("Kunde inte ladda Nobel-data");
    }
    const data = await response.json();
    //KONVERTERA JSONFILEN TILL JAVASCRIPT 
    nobelData = data.laureates;
    return nobelData;
  } catch (error) {
    console.error("Fel vid laddning av data:", error);
    throw error;
    //OM NÅGOT GÅR FEL = SKRIV ERROR
  }
}