"use client"
import getExchangeRates from "@/utils/api"
import { useEffect,useState } from "react"
export default function rates() {
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const[loading, setLoading]=useState (true);
    const topRates = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"];

    useEffect(() => {
        getExchangeRates().then((data) => {
          if (data) { 
            setRates(data);
            } 
            setLoading(false);});

        }, []);
 
 if(loading){
    return(
        <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Fetching Today's rates of top currencies against ETB...</p>
      </div>
    )
 }

return(
    
topRates.map((currency) => (
    <div key={currency} className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold text-gray-800">{currency}</h2>
      <p className="text-gray-600">1 {currency} = {rates ? (rates['ETB'] / rates[currency]).toFixed(2) : "N/A"} ETB</p>
    </div>
  ))
)
}