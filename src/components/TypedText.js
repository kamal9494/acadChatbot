import React from "react";
import Typewriter from "typewriter-effect";
import './styles/cursor.css';
const TypedText = () => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter.typeString('You can ask about ')
        .pauseFor(1500)
        typewriter.typeString('Courses details')
        .pauseFor(1500)
        .deleteChars(15)
        typewriter.typeString('Prerequisites of any course')
        .pauseFor(1500)
        .deleteChars(27)
        typewriter.typeString('Total Credits')
        .pauseFor(1500)
        .deleteChars(13)
        .deleteAll()
        .start()
      }}
      loop={true}
    />
  );
};

export default TypedText;
