import React, { useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {darkMode ? <BsSun /> : <BsMoon />}
    </button>
  );
};

export default ThemeToggle;
