import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Connected to Backend:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from Backend");
});

export default socket;