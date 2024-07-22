import React, { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

const Chat = () => {
  const socket = useMemo(() => io("http://localhost:5000/"), []);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    setName(name);
    setRoom(room);

    // console.log(socket);
    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  return <div>Chat</div>;
};

export default Chat;
