import { React, useState } from "react";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Interactions } from "aws-amplify";
import styles from "./styles/Input.module.css";
import { AiOutlineSend } from "react-icons/ai";

const Input = (props) => {
  const [message, setMessage] = useState([{ id: null, msg: "" }]);

  const handleSubmit = () => {
    if (message[0].msg === "") {
      toast.warning("Enter your Query");
    } else {
      const inputobj = [...props.messages, ...message];
      props.setMessages(inputobj);
      props.setBStatus(true);
      setMessage([{ id: null, msg: "" }]);
      sendToBot(message[0].msg, inputobj);
    }
  };

  const sendToBot = async (userInput, inputobj) => {
    const botName = process.env.REACT_APP_BOT_NAME;
    Interactions.send(botName,userInput).then((responce) => {
      let res = [
        {
          id: v4(),
          msg: responce.message,
          from: "_bot",
        },
      ];
      props.setBStatus(false);
      props.setMessages([...inputobj, ...res]);
    },
    (err)=>{
      props.setBStatus(false);
      toast.error("Error found from bot -> "+err);
      const error = [{ id: v4(), errmsg: "Error : " + err, from: "_bot" }];
      props.setMessages([...inputobj, ...error]);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage([{ id: v4(), msg: message[0].msg + "\n", from: "_user" }]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.indiv}>
        <textarea
          type="text"
          className={styles.input}
          value={message[0].msg}
          placeholder="Ask your question!"
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            setMessage([{ id: v4(), msg: e.target.value, from: "_user" }])
          }
          autoFocus
        />
        <button className={styles.send} onClick={handleSubmit}>
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default Input;
