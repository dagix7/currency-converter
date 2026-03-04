export default async function getExchangeRates() {
  try {
    const response = await fetch("https://v6.exchangerate-api.com/v6/5190eb55b93805518ac82952/latest/USD");
    const data = await response.json();
    
    return data.conversion_rates; 
    
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
  
}