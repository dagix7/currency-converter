"use client";
import { useState, useEffect } from "react";
import getExchangeRates from "@/utils/api";
import { historyItem } from "@/types";
import HistoryList from "@/components/historyList";
export default function ConverterPage() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");
  const [loading, setLoading] = useState(true);
  const[history,setHistory]=useState<historyItem[]>([])
  const[result,setResult]=useState<number|null>(null)
  useEffect(() => {
    getExchangeRates().then((data) => {
      if (data) {
        setRates(data);
      }
      setLoading(false);
    });

const savedHistory=localStorage.getItem('conversation_history')
  if(savedHistory){
    try{setHistory(JSON.parse(savedHistory))}
  
     catch(erorr){
    console.error(erorr,"failed to parse the error..")
   }
  }
  
  }, []);

  const saveToHistory=(newItem:historyItem)=>{
const updatedHistory=[newItem,...history].slice(0,10);
setHistory(updatedHistory);
localStorage.setItem('conversation_history',JSON.stringify(updatedHistory))

  }


const handleConvert = () => {
  if (!rates) return;

  const calculated = (amount * (rates[toCurrency] / rates[fromCurrency])).toFixed(2);
  
  // 1. Update the result state (this makes it visible)
  setResult(Number(calculated));

  // 2. Save to history
  const newItem = {
    id: Date.now(),
    from: fromCurrency,
    to: toCurrency,
    amount,
    convertedAmount: Number(calculated),
    date: new Date().toLocaleTimeString()
  };
  saveToHistory(newItem);
};

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Fetching latest rates...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-row bg-gray-50 py-2 px-4 h-[calc(100vh-104px)]">
      <div className="leftside flex-2/3 w-2/3 overflow-y-auto px-4"> 
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Currency Converter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-600">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                placeholder="0.00"
              />
            </div>

            {/* From Currency */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-600">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              >
                {rates && Object.keys(rates).map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>

            {/* To Currency */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-600">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              >
                {rates && Object.keys(rates).map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Only show this entire section IF result exists */}
{result && (
  <div className="mt-4 p-2 bg-blue-50 rounded-xl border border-blue-100 text-center animate-in fade-in zoom-in duration-300">
    <p className="text-gray-600 text-sm font-semibold mb-2">RESULT</p>
    <div className="flex items-center justify-center space-x-3">
      <span className="text-4xl font-black text-blue-600">{result}</span>
      <span className="text-2xl font-bold text-blue-400">{toCurrency}</span>
    </div>
  </div>
)}

{/* The Button is always visible */}
<div className="mt-4 flex justify-center">
  <button 
    onClick={handleConvert}
    className="px-8 py-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg active:scale-95 transition-all"
  >
    Convert 
  </button>
</div>

        </div>

       
      </div>
      </div>


      <div className=" flex w-1/3 overflow-y-auto p-4 right-side border-l border-black px-8 ml-5"> 
        <HistoryList history={history}/>
      </div>
      
    </main>
  );
}