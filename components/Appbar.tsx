"use client"
import React, { useEffect, useState } from 'react'
import { Moon, Sun, Github} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { signIn, signOut, useSession } from 'next-auth/react'

function Appbar() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const session = useSession();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 
   return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">YourSpace</div>
            <div className="flex items-center space-x-4">
              {session.data?.user ? <Button onClick={()=>{signOut()}} variant="outline" size="sm">Logout</Button>: <Button onClick={()=>{signIn()}} variant="outline" size="sm">Login</Button>}
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <button
                onClick={() => setTheme(prev=>prev==="dark"?"light":"dark")}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {theme==="dark"? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </button>
            </div>
          </div>
        </nav>
      </header>
  )
}

export default Appbar

