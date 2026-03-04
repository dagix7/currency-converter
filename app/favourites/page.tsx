"use client"
import {useState, useEffect} from 'react'
import {historyItem} from '@/types'

export default function Favourites() {
     const[favourites,setFavourites]=useState<historyItem[]>([])

    useEffect(()=>{
        const favourites=localStorage.getItem('favourites')
        if(favourites){
          try{setFavourites(JSON.parse(favourites))}
              catch(erorr){
            console.error(erorr,"failed to parse the error..")
              }
        }
    },[])

    const saveToFavourites=(item:historyItem)=>{
    const updatedFavourites=[item,...favourites]
    setFavourites(updatedFavourites);
    localStorage.removeItem('favourites', )
  }



return(
    

<h1>favourites</h1>)
}