import * as sio from "socket.io-client";

export const socketObj = {};

export const createSocket = (ns) => {
  let socket = getSocket(ns);

  if (socket !== undefined) {
    return socket;
  }

  ns = "/" + ns;
  socketObj[ns] = sio.io(ns, { path: "/websocket" });
  return socketObj[ns];
};

export const deleteSocket = (ns) => {
  ns = "/" + ns;

  if (ns === undefined) {
    return undefined;
  }

  if (socketObj[ns] !== undefined) {
    socketObj[ns].close();
    delete socketObj[ns];
    return true;
  }
  return false;
};

export const addSocketEventListener = (ns, event, func) => {
  ns = "/" + ns;
  socketObj[ns].io(event, func);
};

export const getSocket = (ns) => {
  ns = "/" + ns;
  return socketObj[ns];
};
