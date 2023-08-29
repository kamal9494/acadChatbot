import { React, useState } from "react";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Interactions } from "aws-amplify";
import styles from "./styles/Input.module.css";
import { AiOutlineSend } from "react-icons/ai";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const Input = (props) => {
  const [message, setMessage] = useState({ id: v4(), msg: "", from: "_user" });

  const sendToBot = async (userInput, allMessages) => {
    const botName = process.env.REACT_APP_BOT_NAME;
    try {
      const responce = await Interactions.send(botName, userInput);
      const botMsg = {
        id: v4(),
        msg: responce.message,
        from: "_bot",
      };
      props.setBotStatus(false);
      props.setMessages([...allMessages, botMsg]);
    } catch (err) {
      console.log(err);
      const error = {
        id: v4(),
        errmsg: "Opps! Error Occurred",
        from: "_bot",
      };
      const errorMsg = [...allMessages, error];
      props.setMessages(errorMsg);
      noteDown(userInput, err, errorMsg);
    }
  };

  // saving the question in firebase
  const noteDown = async (question, err, errorMsg) => {
    try {
      const docRef = await addDoc(collection(db, "ques"), {
        question: question,
      });
      props.setBotStatus(false);
      toast.error("Error Noted");
      const error = {
        id: v4(),
        msg: "Error noted with ID : " + docRef.id,
        from: "_bot",
      };
      props.setMessages([...errorMsg, error]);
    } catch (e) {
      props.setBotStatus(false);
    }
  };

  const handleSubmit = () => {
    console.log(message);
    if (message.msg.trim() === "") {
      toast.warning("Enter your Query");
      setMessage({ id: v4(), msg: "", from: "_user" });
    } else {
      const allMessages = [...props.messages, message];
      props.setMessages(allMessages);
      props.setBotStatus(true);
      sendToBot(message.msg, allMessages);
      setMessage({ id: v4(), msg: "", from: "_user" });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (window.innerWidth > 615) {
        event.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleChange = (e) => {
    setMessage({ ...message, msg: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.indiv}>
        <textarea
          type="text"
          className={styles.input}
          value={message.msg}
          placeholder="Ask your question!"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          autoFocus
        />
        {
          message.msg.trim().length > 0 ?(
            <div>
              <button className={styles.send} onClick={handleSubmit}>
              <AiOutlineSend />
              </button>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};

export default Input;
