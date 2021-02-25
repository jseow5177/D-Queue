import * as sio from "socket.io";

export function initSocket(server) {
    const io = new sio.Server(server, { path: "/websocket" });
    setSocketRoutes(io);
    return io;
}

function setSocketRoutes(io) {
    //Match any namespace connections
    io.of(/\/\w+/).on("connection", (socket) => {
        socket.on("notify", (text) => {
            console.log("Restaurant notified", text);
        })
        console.log(socket.nsp.name ,"socket", socket.id, "connected");

        setTimeout(() => {
            console.log("Emit to restaurant");
            io.of("/6020ae43d6e7fc228c730c89").emit("60211093ba2006279074b3c3", "Your turn");
        }, 10000);
    })
}