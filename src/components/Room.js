import { React, useEffect, useRef, useState } from "react";
import Input from "./Input";
import ChatNav from "./ChatNav";
import styles from "./styles/Room.module.css";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [bStatus, setBStatus] = useState(false);
  const [cMsg, setCMsg] = useState("");
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
      <ChatNav setMessages={setMessages} />
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        theme="dark"
        position="top-center"
      />
      <div className={styles.containerWrap} data-bs-spy="scroll">
        <div
          className={styles.container}
          style={{ height: "74vh", overflow: "auto" }}
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
              {bStatus ? <Receiving /> : null}
              <div ref={messageEndRef} />
            </div>
          )}
        </div>
      </div>
      <Input
        messages={messages}
        setMessages={setMessages}
        setBStatus={setBStatus}
        bStatus={bStatus}
        setCMsg={setCMsg}
        cMsg={cMsg}
      />
    </div>
    // <Banner />
  );
};

const Bot = (msg) => {
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
      <div className="pe-1" style={{ maxWidth: "60%" }}>
        <div>
          <div className={styles.msg}>{msg["msg"]}</div>
        </div>
      </div>
    </div>
  );
};

const User = (msg) => {
  return (
    <div className={styles.userWrap}>
      <div className="pe-1" style={{ maxWidth: "60%" }}>
        <div>
          <div className={styles.msg}>{msg["msg"]}</div>
        </div>
      </div>
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
          src={require("../assets/user.PNG")}
          alt="bot"
        />
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

const Error = (err) => {
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
      <div className="pe-1" style={{ maxWidth: "60%" }}>
        <div>
          <div className={styles.errmsg}>{err["err"]} Try again</div>
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className={styles.bannerContainer} style={{ height: "60vh" }}>
      <h2 className={styles.head}>Examples</h2>
      <div className={styles.samplediv}>
        <h5 className={styles.head}>Ask about prerequisites for courses.</h5>
       <div className={styles.qna}>
          <p>"What are the prerequisites for Computer Graphics"</p>
          <p>"Can I register Cloud Computing"</p>
        </div>
      </div>
    </div>
  );
};

export default Room;