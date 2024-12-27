"use client"
import { useState } from 'react';
import { Plus, Link } from 'lucide-react';
import { SpaceCard } from '@/components/SpaceCard';
import { CreateSpaceDialog } from '@/components/CreateSpaceDialog';
import { JoinSpaceDialog } from '@/components/JoinSpaceDialog';


const mockSpaces = [
  {
    id: 1,
    name: 'Chill Lounge',
    description: 'Relaxing beats and ambient music for focused work and unwinding.',
    creatorName: 'Sarah Johnson'
  },
  {
    id: 2,
    name: 'Rock Classics',
    description: 'The best rock hits from the 70s, 80s, and 90s. Join fellow rock enthusiasts!',
    creatorName: 'Mike Chen'
  },
  {
    id: 3,
    name: 'Jazz Club',
    description: 'Smooth jazz and classic performances. Perfect for jazz lovers and newcomers alike.',
    creatorName: 'Emily Rodriguez'
  }
];

export default function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCreateSpace = (name: string, description: string) => {
    console.log('Creating space:', { name, description });
  };

  const handleJoinSpace = (spaceLink: string) => {
    console.log('Joining space with link:', spaceLink);
  };

  return (
    <div className="min-h-screen pt-16 dark:bg-gray-900 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">
            My Spaces
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="inline-flex items-center px-4 py-2 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            >
              <Link className="w-4 h-4 mr-2" />
              Join Space
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Space
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSpaces.map((space) => (
            <SpaceCard
              key={space.id}
              name={space.name}
              description={space.description}
              creatorName={space.creatorName}
            />
          ))}
        </div>

        <CreateSpaceDialog
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateSpace}
        />

        <JoinSpaceDialog
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          onSubmit={handleJoinSpace}
        />
      </div>
    </div>
  );
}