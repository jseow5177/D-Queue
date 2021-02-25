import * as sio from "socket.io-client";

const socketsObj = {};

export const createSocket = (ns) => {
    ns = "/" + ns;
    if(ns === undefined || ns.length === 0)
        return undefined;

    socketsObj[ns] = sio.io(ns, {path: "/websocket"});
    return socketsObj[ns];
}

export const deleteSocket = (ns) => {
    ns = "/" + ns;
    if(ns === undefined || ns.length === 0)
        return undefined;

    if(socketsObj[ns] !== undefined)
    {
        socketsObj[ns].close();
        delete socketsObj[ns];
        return true;
    }

    return false
}

export const addSocketEventListener = (ns, event, func) => {
    ns = "/" + ns;
    socketsObj[ns].on(event, func);
}

export const removeSocketEventListener = (ns, event) => {
    ns = "/" + ns;
    socketsObj[ns].off(event);
}

export const getSocket = ns => {
    ns = "/" + ns;
    return socketsObj[ns];
}