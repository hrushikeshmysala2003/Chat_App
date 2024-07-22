const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// All the socket code will be in this function because we are managing this socket connected
io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("disconnect", () => {
    console.log("User had left");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
