import React, { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import Infobar from "../Infobar/Infobar";
import TextContainer from "../TextContainer/TextContainer";
import Input from "../Input/Input";
import Message from "../Messages/Message";
const Chat = () => {
  const socket = useMemo(() => io("http://localhost:5000/"), []);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
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
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  // function for sending messages

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={room} />
        <Message messages={messages} name={name} />
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
