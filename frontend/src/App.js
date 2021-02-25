import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./modules/Home/Home";
import Header from "./common/modules/Header/Header";
import MerchantPage from "./modules/MerchantPage/MerchantPage";
import MerchantSignUp from "./modules/MerchantSignUp/MerchantSignUp";
import MerchantDashboard from "./modules/MerchantDashboard/MerchantDashboard";
import BrowsePage from "./modules/BrowsePage/BrowsePage";
import UserSignUp from "./modules/UserSignUp/UserSignUp";
import UserQueueList from "./modules/UserQueueList/UserQueueList";
import PrivateRoute from "./components/PrivateRoute";
import AlertDialog from "./common/modules/AlertDialog/AlertDialog";

import { store, persistor } from "./store";
import { setAuth } from "./common/utils.js";
import { useSelector } from "react-redux";
import { createSocket, addSocketEventListener, getSocket } from "./sockets/sockets";

const Setup = ({ setQueueReached }) => {
  console.log("Setup component");
  const { auth: user, queue } = useSelector((state) => state);
  const { userID: queueUserID } = queue;

  React.useEffect(() => {
    setAuth();

    //Check if user is logged in and in queue
    if (queueUserID === undefined || user.first_name === undefined) {
      setQueueReached(false);
      console.log("User is not logged in or not in queue");
    }

    else {
      if (getSocket(queueUserID) === undefined) {
        console.log("Create socket", queueUserID);
        //Resubscribe to restaurant namespace socket
        createSocket(queueUserID);
      }

      //Attach queue reached callback if none exists yet
      if (getSocket(queueUserID).listeners().length === 0) {
        console.log("Socket event listener attached on ", queueUserID, " event ", queue.restaurantID);
        addSocketEventListener(queueUserID, queue.restaurantID, () => {
          console.log("Socket listener called");
          setQueueReached(true);
        })
      }
    }
  }, [queueUserID, queue.restaurantID, setQueueReached, user.first_name]);

  return <></>;
}

function App() {
  console.log("App render");
  const [queueReached, setQueueReached] = React.useState(false);
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          {queueReached && <AlertDialog />}
          <Setup setQueueReached={setQueueReached} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/merchant/:name" exact component={MerchantPage} />
            <Route path="/merchant-sign-up" component={MerchantSignUp} />
            <Route path="/browse" component={BrowsePage} />
            <Route path="/sign/:user" component={UserSignUp} />
            <PrivateRoute
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
