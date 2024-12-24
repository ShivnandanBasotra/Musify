'use client'

import { useState, useEffect } from 'react'
import { Music, Users, Globe, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Create Your Own Space
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Connect, share, and listen to music with friends in your personalized space.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Play className="mr-2 h-5 w-5" /> Stream Now
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-12 mb-20">
          <FeatureCard
            icon={<Users className="h-12 w-12 text-purple-600 dark:text-purple-400" />}
            title="Invite Friends"
            description="Bring your friends into your space and enjoy music together."
          />
          <FeatureCard
            icon={<Globe className="h-12 w-12 text-purple-600 dark:text-purple-400" />}
            title="Join Public Spaces"
            description="Discover and join public spaces to meet new people and explore music."
          />
          <FeatureCard
            icon={<Music className="h-12 w-12 text-purple-600 dark:text-purple-400" />}
            title="Listen Together"
            description="Synchronize your listening experience and enjoy music in real-time with others."
          />
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Ready to Start Your Journey?
          </h2>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            Create Your Space
          </Button>
        </section>
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 py-6 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
          © 2023 YourSpace. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }:{icon: React.ReactNode,title:string, description:string}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

