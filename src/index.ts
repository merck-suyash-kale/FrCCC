import http from "http";
import express from "express";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;
const app = express();
const server = new http.Server(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static("client/build"));

io.on("connection", (socket) => {
  socket.on("submit", ({ username, url }) => {
    io.emit(`NODE-${username.toUpperCase()}`, { url });
  });
});

server.listen(PORT, () => {
  console.log(`server is up & running on port ${PORT}.`);
});
