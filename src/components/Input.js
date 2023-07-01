import { React, useState } from "react";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Interactions } from "aws-amplify";
import styles from "./styles/Input.module.css";
import { AiOutlineSend } from "react-icons/ai";

const Input = (props) => {
  const [message, setMessage] = useState({ msg: "" });

  const handleSubmit = () => {
    if (message.msg.length === 0) {
      toast.warning("Enter your Query");
    } else {
      const input = [...props.messages,message];
      props.setMessages(input);
      props.setBStatus(true);
      setMessage({ msg: "" });
      sendToBot(message.msg,input);
    }
  };

  const sendToBot = async (userInput,input) => {
    const botName = process.env.REACT_APP_BOT_NAME;
    Interactions.send(botName, userInput).then(
      (responce) => {
        let res = {
          id: v4(),
          msg: responce.message,
          from: "_bot",
        };
        props.setBStatus(false);
        props.setMessages([...input,res]);
      },
      (err) => {
        props.setBStatus(false);
        toast.error("Error found from bot -> " + err);
        const error = { id: v4(), errmsg: "Error : " + err, from: "_bot" };
        props.setMessages([...input,error]);
      }
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (window.innerWidth > 615) {
        handleSubmit();
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setMessage({ id: v4(), msg: e.target.value, from: "_user" });
    console.log(message.msg);
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
        {message.msg.length > 0 && (
          <button className={styles.send} onClick={handleSubmit}>
            <AiOutlineSend />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
