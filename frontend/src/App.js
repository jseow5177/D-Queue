import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";

import AlertDialog from "./common/modules/AlertDialog/AlertDialog";
import Home from "./modules/Home/Home";
import Header from "./common/modules/Header/Header";
import MerchantPage from "./modules/MerchantPage/MerchantPage";
import MerchantSignUp from "./modules/MerchantSignUp/MerchantSignUp";
import MerchantDashboard from "./modules/MerchantDashboard/MerchantDashboard";
import BrowsePage from "./modules/BrowsePage/BrowsePage";
import UserSignUp from "./modules/UserSignUp/UserSignUp";
import UserQueueList from "./modules/UserQueueList/UserQueueList";
import PrivateRoute from "./components/PrivateRoute";

import { store, persistor } from "./store";
import { createSocket, deleteSocket } from "./sockets/sockets";

const Setup = ({ setNotified }) => {
  const user = useSelector((state) => state.auth);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      const socket = createSocket(user._id);
      console.log("Created a socket: " + user._id);

      if (!user.is_admin) {
        socket.on("notify", (arg) => {
          setNotified(true);
        });
      }

      if (user.restaurant !== undefined) {
        const restaurantSocket = createSocket(user.restaurant._id);
        console.log("Created a restaurant socket " + user.restaurant._id);
      }

      setUserID(user._id);
    } else if (Object.keys(user).length <= 0) {
      if (userID !== "") {
        deleteSocket(userID);
        console.log("Deleted socket: " + userID);
      }
    }
  }, [user, setNotified]);

  return <></>;
};

function App() {
  const [notified, setNotified] = useState(false);

  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Setup setNotified={setNotified} />
          {notified && (
            <AlertDialog notified={notified} setNotified={setNotified} />
          )}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/merchant/:name" exact component={MerchantPage} />
            <Route path="/merchant-sign-up" component={MerchantSignUp} />
            <Route path="/browse/:category" component={BrowsePage} />
            // <Route path="/browse/" component={BrowsePage} />
            <Route path="/sign/:user" component={UserSignUp} />
            <Route
              path="/merchant/dashboard/:name"
              component={MerchantDashboard}
              isAdminPage={true}
              redirect="/sign/merchant"
            />
            <PrivateRoute
              path="/user/queueList/:id"
              component={UserQueueList}
              redirect="/sign/user"
            />
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
