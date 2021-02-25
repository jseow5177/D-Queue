import { ENTER_QUEUE, CANCEL_QUEUE } from "../reduxConst/queueConst.js"

const initialState = {}

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case ENTER_QUEUE: {
      return {
        ...action.payload,
      };
    }

    case CANCEL_QUEUE: {
      return {};
    }

    default:
      return state;
  }
}