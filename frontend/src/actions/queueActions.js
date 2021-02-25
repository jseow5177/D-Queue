import { store } from "../store.js"
import { ENTER_QUEUE, CANCEL_QUEUE } from "../reduxConst/queueConst"
import { createSocket, removeSocketEventListener } from "../sockets/sockets";
import ApiService from "../common/services/api.service.js";

export const enterQueue = async (payload) => {
    //POST to enter queue
    try {
        const res = await ApiService.post("/user/enterQueue", payload)
        console.log("Res", res);

        //If POST successful, add frontend states and socket
        createSocket(payload.userID);
        store.dispatch({ type: ENTER_QUEUE, payload })
        return true;

    } catch (error) {
        console.log("Error", error.response);
        return false;
    }
}

export const cancelQueue = () => {
    const {queue} = store.getState();
    removeSocketEventListener(queue.userID, queue.restaurantID);
    store.dispatch({ type: CANCEL_QUEUE })
}