import React from "react";
import { toast } from "react-toastify";
import styles from "./styles/ChatNav.module.css";


const ChatNav = (props) => {
  const clearChat = () => {
    props.setMessages([]);
    toast.success("Chat Cleared");
  };
  return (
    <>
      <div className={styles.containerWrap}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            className="img-fluid rounded-circle"
            src={require("../assets/bot.PNG")}
            alt="bot"
          />
        <span className={styles.title}>
          Academic Bot
        </span>
        </div>
        <div className={styles.right}>
          {/* clear all btn */}
          <button
            type="button"
            className={styles.clear}
            onClick={clearChat}
          >
            Clear Chat
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default ChatNav;
