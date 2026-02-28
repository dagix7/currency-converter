import Link from "next/link";
import { FaLinkedin,FaTelegram,FaGithub } from 'react-icons/fa';
export default function (){


    return(

        <footer className="flex  items-center pr-2 bg-purple-200 min-w-fit justify-between p-4 text-green-900">
           <div className="ml-6">  &copy;{new Date().getFullYear()}</div>
           <div className="socials flex gap-4 mr-6">
              <Link href=" https://www.linkedin.com/in/dagim-asnake/" target="_blank" rel="noopener noreferrer"> <FaLinkedin className="h-6 w-6" /></Link>
              <Link href="https://t.me/dagi_as"target="_blank" rel="noopener noreferrer"> <FaTelegram className="h-6 w-6" /></Link>
              <Link href="https://github.com/dagix7"target="_blank" rel="noopener noreferrer"> <FaGithub className="h-6 w-6" /></Link>
           </div>

        </footer>
    )
}