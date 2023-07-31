import React, { useEffect } from 'react';
import Typed from 'typed.js';
import './styles/cursor.css';
const TypedText = () => {
  useEffect(() => {
    const element = document.getElementById('typed-text');
    const options = {
      strings: ['Courses details', 'Prerequisites of any course', 'Total Credits'],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
      cursorSize: 30
    };
    const typed = new Typed(element, options);
    return () => {
      typed.destroy();
    };
  }, []);

  return <span style={{fontSize: '2rem',cursor: 'none',}} id="typed-text" />;
};

export default TypedText;
