import { useState, useEffect } from 'react';
import { Theme } from '../types/todo';

const THEME_STORAGE_KEY = 'modern-todo-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('purple');

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (stored && ['purple', 'blue', 'green', 'pink'].includes(stored)) {
      setTheme(stored);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return { theme, changeTheme };
}