import React, { useState } from 'react';
import { Check, Edit2, Trash2, X } from 'lucide-react';
import { Todo, Theme } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  theme: Theme;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const themeColors = {
  purple: 'border-purple-500 bg-purple-500',
  blue: 'border-blue-500 bg-blue-500',
  green: 'border-green-500 bg-green-500',
  pink: 'border-pink-500 bg-pink-500'
};

export function TodoItem({ todo, theme, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 transition-all duration-300 hover:bg-gray-800/70 hover:border-gray-600/50 ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
            todo.completed
              ? `${themeColors[theme]} text-white`
              : 'border-gray-500 hover:border-gray-400'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 m-auto" />}
        </button>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-gray-500 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="p-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <>
            <span className={`flex-1 transition-all duration-200 ${
              todo.completed 
                ? 'line-through text-green-400 font-medium' 
                : 'text-white'
            }`}>
              {todo.text}
            </span>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-700/50"
                disabled={todo.completed}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-700/50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-500 tracking-wide">
        {todo.completed && todo.completedAt
          ? `Concluída em ${new Date(todo.completedAt).toLocaleDateString('pt-BR')}`
          : `Criada em ${new Date(todo.createdAt).toLocaleDateString('pt-BR')}`
        }
      </div>
    </div>
  );
}