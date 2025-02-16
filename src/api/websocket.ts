import { io } from "socket.io-client";

export const WEBSOCKET = io("http://localhost:8080/");
