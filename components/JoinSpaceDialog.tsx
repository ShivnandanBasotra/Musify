"use client"
import React, { useState } from 'react';
import { X, Link } from 'lucide-react';

interface JoinSpaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (spaceLink: string) => void;
}

export function JoinSpaceDialog({ isOpen, onClose, onSubmit }: JoinSpaceDialogProps) {
  const [spaceLink, setSpaceLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(spaceLink);
    setSpaceLink('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="dark:bg-gray-800 bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 border-gray-200">
          <div className="flex items-center space-x-2">
            <Link className="w-5 h-5 dark:text-purple-400 text-purple-600" />
            <h2 className="text-xl font-semibold dark:text-white text-gray-900">
              Join Music Space
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
          <div className="mb-6">
            <label htmlFor="spaceLink" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
              Space Link
            </label>
            <input
              type="text"
              id="spaceLink"
              value={spaceLink}
              onChange={(e) => setSpaceLink(e.target.value)}
              className="w-full px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste the space link here"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Join Space
          </button>
        </form>
      </div>
    </div>
  );
}