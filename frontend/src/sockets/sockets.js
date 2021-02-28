import * as sio from "socket.io-client";

const socketObj = {};

export const createSocket = (ns) => {
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
