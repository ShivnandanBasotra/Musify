import React from 'react';
import { User, Music } from 'lucide-react';

interface SpaceCardProps {
  name: string;
  description: string;
  creatorName: string;
}

export function SpaceCard({ name, description, creatorName }: SpaceCardProps) {
  return (
    <div className="dark:bg-gray-800 bg-white dark:hover:bg-gray-750 hover:bg-gray-50 rounded-lg shadow-lg p-6 transition-all duration-200 transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold dark:text-white text-gray-900">
          {name}
        </h3>
        <Music className="w-5 h-5 dark:text-purple-400 text-purple-600" />
      </div>
      <p className="dark:text-gray-300 text-gray-600 mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center text-sm dark:text-gray-400 text-gray-500">
        <User className="w-4 h-4 mr-2" />
        <span>Created by {creatorName}</span>
      </div>
    </div>
  );
}