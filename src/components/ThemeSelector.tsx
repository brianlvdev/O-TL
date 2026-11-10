import React from 'react';
import { Palette } from 'lucide-react';
import { Theme } from '../types/todo';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes: { key: Theme; name: string; colors: string }[] = [
  { key: 'purple', name: 'Roxo', colors: 'from-purple-600 to-pink-600' },
  { key: 'blue', name: 'Azul', colors: 'from-blue-600 to-cyan-600' },
  { key: 'green', name: 'Verde', colors: 'from-green-600 to-emerald-600' },
  { key: 'pink', name: 'Rosa', colors: 'from-pink-600 to-rose-600' }
];

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Palette className="w-4 h-4 text-gray-400" />
      <div className="flex gap-2">
        {themes.map((theme) => (
          <button
            key={theme.key}
            onClick={() => onThemeChange(theme.key)}
            className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.colors} transition-all duration-200 hover:scale-110 ${
              currentTheme === theme.key ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
            }`}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
}