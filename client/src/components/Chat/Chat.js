import React, { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import Infobar from "../Infobar/Infobar";
const Chat = () => {
  const socket = useMemo(() => io("http://localhost:5000/"), []);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    setName(name);
    setRoom(room);

    // console.log(socket);
    socket.emit("join", { name, room }, (error) => {
      console.log(error);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  // function for sending messages

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar  room={room} />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
