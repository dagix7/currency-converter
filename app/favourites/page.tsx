"use client"
import {useState, useEffect} from 'react'
import {historyItem} from '@/types'

export default function Favourites() {
     const[favourites,setFavourites]=useState<string[]>([])

    useEffect(()=>{
        const favourites=localStorage.getItem('favourites')
        if(favourites){
          try{setFavourites(JSON.parse(favourites))}
              catch(erorr){
            console.error(erorr,"failed to parse the error..")
              }
        }
    },[])

    



return(
    

    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Favourites</h1>
        {favourites.length === 0 ? (
            <p>No favourites yet. Click the heart icon on a conversion to add it here!</p>
        ) : (
            <ul className="space-y-2">
                {favourites.map((item, index) => (
                    <li key={index} className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                        {item}
                    </li>
                ))}
            </ul>
        )}
    </div>
        )
}