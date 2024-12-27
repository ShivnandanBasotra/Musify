"use client"
import React, { useState } from 'react';
import { X, Music } from 'lucide-react';

interface CreateSpaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

export function CreateSpaceDialog({ isOpen, onClose, onSubmit }: CreateSpaceDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, description);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="dark:bg-gray-800 bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 border-gray-200">
          <div className="flex items-center space-x-2">
            <Music className="w-5 h-5 dark:text-purple-400 text-purple-600" />
            <h2 className="text-xl font-semibold dark:text-white text-gray-900">
              Create Music Space
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="dark:text-gray-400 text-gray-500 dark:hover:text-gray-300 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
              Space Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Space
          </button>
        </form>
      </div>
    </div>
  );
}