import * as sio from "socket.io";

export function initSocket(server) {
    const io = new sio.Server(server, { path: "/websocket" });
    setSocketRoutes(io);
    return io;
}

function setSocketRoutes(io) {
    io.on('connection', (socket) => {
        console.log("Socket", socket.id, "connected");
    });

    //Match any namespace connections
    io.of(/\/\w+/).on("connection", (socket) => {
        socket.on("notify", (text) => {
            console.log("Restaurant notified", text);
        })
        console.log("Restaurant socket", socket.id, "connected");
    })
}