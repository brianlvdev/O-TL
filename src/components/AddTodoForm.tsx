import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Theme } from '../types/todo';

interface AddTodoFormProps {
  theme: Theme;
  onAdd: (text: string) => void;
}

const themeGradients = {
  purple: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
  blue: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
  green: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
  pink: 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
};

export function AddTodoForm({ theme, onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicione uma nova tarefa..."
        className="flex-1 bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400 px-4 py-3 rounded-2xl border border-gray-700/50 focus:border-gray-600 focus:outline-none transition-all duration-200 tracking-wide"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className={`px-6 py-3 bg-gradient-to-r ${themeGradients[theme]} text-white rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg`}
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
}