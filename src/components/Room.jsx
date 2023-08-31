import { React, useEffect, useRef, useState } from "react";
import Input from "./Input";
import styles from "./styles/Room.module.css";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillGithub } from "react-icons/ai";
import TypedText from "./TypedText";
import Sample from "./Sample";

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
      <Nav messages={messages} setMessages={setMessages} />
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
              {messages.map((msg) => (
                <Message key={msg.id} msg={msg.msg} errmsg={msg.errmsg} from={msg.from}/>
              ))}
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

// Navbar
const Nav = ({messages,setMessages}) => {
  const clearChat = () => {
    if (messages.length > 0) {
      setMessages([]);
      toast.success("Chat Cleared");
    }else toast.error("No messages");
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

// Messages // user || bot
const Message = ({ msg, from, errmsg }) => {
  return (
    <div className={from ==="_user" ? styles.userWrap : styles.botWrap}>
      <div
        style={{
          width: "50px",
          padding: "2px",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        {from === "_user" ? (
          <img
            width="40px"
            height="40px"
            className={styles.img}
            src={require("../assets/user.PNG")}
            alt="bot"
          />
        ) : (
          <img
            width="40px"
            height="40px"
            className={styles.img}
            src={require("../assets/bot.PNG")}
            alt="bot"
          />
        )}
      </div>
      <div style={{ maxWidth: "100%" }}>
        <div>
          <div className={errmsg ? styles.errmsg : styles.msg}>{errmsg ? errmsg : msg}</div>
        </div>
      </div>
    </div>
  );
};

// Receiving
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


// Banner page
const Banner = () => {
  const questions = [
    {
      title: "Prerequisites",
      sample: "What are the prerequisites for Cloud Computing?",
    },
    {
      title: "Course Details",
      sample: "What is CSE4001?",
    },
    {
      title: "Credits",
      sample: "Total credits for 2020 batch?",
    },
  ];
  return (
    <>
      <div className={styles.bannerContainer}>
        <div className={styles.fixtype}>
          <div className={styles.qna}>
            {<TypedText />}
          </div>
        </div>
      </div>
      <h2 className={styles.head}>Examples</h2>
      <div className={styles.samples}>
        {questions.map((q) => {
          return <Sample key={q.title} title={q.title} sample={q.sample} />;
        })}
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