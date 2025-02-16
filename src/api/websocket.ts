import { io } from "socket.io-client";

export const WEBSOCKET = io("http://localhost:8081/", {
  transports: ["websocket"],
  path: "/socket.io/",
});
