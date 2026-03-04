"use client";
import { useState, useEffect } from "react";
import getExchangeRates from "@/utils/api";
import { historyItem } from "@/types";
export default function ConverterPage() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");
  const [loading, setLoading] = useState(true);
  const[history,setHistory]=useState<historyItem[]>([])
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

  const result = rates 
    ? (amount * (rates[toCurrency] / rates[fromCurrency])).toFixed(2) 
    : "0.00";

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Fetching latest rates...</p>
      </div>
    );
  }

  return (
    <main className=" bg-gray-50 py-12 px-4">
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

          {/* Result Display */}
          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide font-semibold mb-2">
              Converted Amount
            </p>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-4xl md:text-5xl font-black text-blue-600">
                {result}
              </span>
              <span className="text-2xl font-bold text-blue-400">{toCurrency}</span>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              1 {fromCurrency} = {(rates![toCurrency] / rates![fromCurrency]).toFixed(4)} {toCurrency}
            </p>
          </div>

        </div>

       
      </div>
    </main>
  );
}