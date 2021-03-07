import { LOGIN, LOGOUT, ADD_RESTAURANT } from "../reduxConst/authConst";

const initialState = {};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...action.payload,
      };
    }

    case LOGOUT: {
      return {};
    }

    case ADD_RESTAURANT: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
