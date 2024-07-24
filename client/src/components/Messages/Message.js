import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SingleMessage from "../Message/Message";
import "./Message.css";
const Message = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          {" "}
          <SingleMessage message={message} name={name} />{" "}
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Message;
