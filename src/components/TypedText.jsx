import React from "react";
import Typewriter from "typewriter-effect";
import './styles/cursor.css';
const TypedText = () => {
  const textsToType = [
    "You can ask about Courses details.",
    "Prerequisites of any course!",
    "Total Credits!"
  ];
  return (
    <Typewriter
      options={{
        strings: textsToType,
        autoStart: true,
        loop: true,
        pauseFor: 1500,
        deleteSpeed: 30,
      }}
    />
  );
};

export default TypedText;
