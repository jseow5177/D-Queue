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

import { store, persistor } from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
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
