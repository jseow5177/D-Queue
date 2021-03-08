import * as sio from "socket.io";

export let io;

export function initSocket(server) {
  io = new sio.Server(server, { path: "/websocket" });
  io.of(/\/\w+/).on("connection", (socket) => {
    console.log("A socket is connected");
    socket.on("message", (arg) => {
      console.log(arg);
      socket.emit("message", "Hello hello");
    });
  });

  return io;
}
