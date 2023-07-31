import { React, useEffect, useRef, useState } from "react";
import Input from "./Input";
import styles from "./styles/Room.module.css";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillGithub } from "react-icons/ai";
import TypedText from './TypedText';

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [botStatus, setBotStatus] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, [messages]);

  return (
    <div>
      <Nav setMessages={setMessages} />
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        theme="dark"
        position="top-center"
      />
      <div className={styles.containerWrap} data-bs-spy="scroll">
        <div
          className={styles.container}
          style={{ height: "75vh", overflow: "auto" }}
        >
          {messages.length === 0 ? (
            <Banner />
          ) : (
            <div>
              {messages.map((m) =>
                m.from === "_user" ? (
                  <User key={m.id} msg={m.msg} />
                ) : m.from === "_bot" && !m.errmsg ? (
                  <Bot key={m.id} msg={m.msg} />
                ) : (
                  <Error key={m.id} err={m.errmsg} />
                )
              )}
              {botStatus ? <Receiving /> : null}
              <div ref={messageEndRef} />
            </div>
          )}
        </div>
      </div>
      <Input
        messages={messages}
        setMessages={setMessages}
        setBotStatus={setBotStatus}
      />
    </div>
  );
};

const Nav = (props) => {
  const clearChat = () => {
    props.setMessages([]);
    toast.success("Chat Cleared");
  };
  return (
    <div className={styles.navContainerWrap}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <img
            className="img-fluid rounded-circle"
            src={require("../assets/bot.PNG")}
            alt="bot"
          />
          <span className={styles.navTitle}>Academic Bot</span>
        </div>
        <div className={styles.navRight}>
          {/* clear all btn */}
          <button type="button" className={styles.clear} onClick={clearChat}>
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

const Bot = ({msg}) => {
  return (
    <div className={styles.msgWrap}>
      <div
        style={{
          width: "50px",
          padding: "2px",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <img
          width="50px"
          height="40px"
          className={styles.img}
          src={require("../assets/bot.PNG")}
          alt="bot"
        />
      </div>
      <div style={{ maxWidth: "100%" }}>
        <div>
          <div className={styles.msg}>{msg}</div>
        </div>
      </div>
    </div>
  );
};

const User = ({msg}) => {
  return (
    <div className={styles.userWrap}>
      <div
        style={{
          width: "50px",
          padding: "2px",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <img
          width="40px"
          height="40px"
          className={styles.img}
          src={require("../assets/user.PNG")}
          alt="bot"
        />
      </div>
      <div style={{ maxWidth: "100%" }}>
        <div>
          <div className={styles.msg}>{msg}</div>
        </div>
      </div>
      
    </div>
  );
};

const Receiving = () => {
  return (
    <div key={999} className={styles.msgWrap}>
      <div
        style={{
          width: "50px",
          padding: "2px",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <img
          className={styles.img}
          src={require("../assets/bot.PNG")}
          alt="bot"
        />
      </div>
      <div className={styles.loaderdiv}>
        <ThreeDots width="30" height="60" />
      </div>
    </div>
  );
};

const Error = ({ err }) => {
  // console.log(err);
  return (
    <div className={styles.msgWrap}>
      <div
        style={{
          width: "50px",
          padding: "2px",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <img
          className={styles.img}
          src={require("../assets/bot.PNG")}
          alt="bot"
        />
      </div>
      <div style={{ maxWidth: "100%" }}>
        <div>
          <div className={styles.errmsg}>
            <span className={styles.err}>{err}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <>
      <div className={styles.bannerContainer}>
        <h2 className={styles.head}>Examples</h2>
        <div className={styles.samplediv}>
          <h5 className={styles.head}>What can you expect from this bot?</h5>
          <div className={styles.qna}>
            <h1>Your can ask about </h1> 
            <TypedText />
          </div>
        </div>
      </div>
      <div className={styles.doneby}>
        <div>
          <p className={styles.note}>
            Note : This Bot will answer according to the 2020 curriculum of
            VIT-AP University.
          </p>
        </div>
        <div>
          Done by &nbsp; <AiFillGithub size={25} />
          <a
            rel="noreferrer"
            href="https://github.com/kamal9494/acadChatbot"
            target="_blank"
          >
            kamal9494
          </a>
        </div>
      </div>
    </>
  );
};

export default Room;
