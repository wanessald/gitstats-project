import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ThemeToggle = ({ toggleTheme }) => {
  const [theme, setTheme] = useState('light');

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    toggleTheme(); // Chama a função toggleTheme passada como prop para atualizar o tema no componente pai
  };

  const iconSrc = theme === 'light' ? "https://cdn-icons-png.flaticon.com/512/581/581601.png" : "https://cdn-icons-png.flaticon.com/512/3073/3073665.png";
  const buttonStyle = {
    border: 'none',
    outline: 'none',
    padding: 0,
    backgroundColor: 'transparent',
    width: '30px', // Reduzir a largura do botão
    height: '50px', // Reduzir a altura do botão
  };

  return (
    <Button onClick={handleToggle} style={buttonStyle}>
      <img src={iconSrc} alt="Theme Icon" width="30" />
    </Button>
  );
};

export default ThemeToggle;
