import React from "react";
import Typewriter from "typewriter-effect";
import './styles/cursor.css';
const TypedText = () => {
  return (
    <Typewriter
      options={{
        strings: ['Courses details', 'Prerequisites of any course', 'Total Credits'],
        autoStart: true,
        loop: true,
        wrapperClassName: 'ele',
        cursorClassName: 'cur'
      }}
    />
  );
};

export default TypedText;
