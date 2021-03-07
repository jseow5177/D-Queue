import { store } from "../store";
import { ADD_RESTAURANT, LOGIN, LOGOUT } from "../reduxConst/authConst";

export const setLogIn = (payload) => {
  store.dispatch({ type: LOGIN, payload: payload });
};

export const setLogOut = () => {
  store.dispatch({ type: LOGOUT });
};

export const setRestaurant = (payload) => {
  store.dispatch({ type: ADD_RESTAURANT, payload: payload });
};
