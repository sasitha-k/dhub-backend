'use client';
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const systemPrefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDark(shouldUseDark);
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-2 right-4  z-50 bg-primary border-2 border-border rounded-full p-2 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <span aria-hidden className="text-lg">🌙</span>
      ) : (
        <span aria-hidden className="text-lg">☀️</span>
      )}
    </button>
  );
} 