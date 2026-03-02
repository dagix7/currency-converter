import Link from "next/link";

export default function Navbar(){

return(
<div className="flex justify-between items-center p-4 bg-gray-700 text-white">
    <div className="flex 1  "> <h2>currency converter by dagi</h2> </div>
    <div className="flex 1  space-x-4 mr-8"> 
        <Link href="/"> home</Link>
        <Link href="/rates"> rates</Link> 
        <Link href="/favourites"> favourites</Link> 
       
    </div>
</div>

);

}