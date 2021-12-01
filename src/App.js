import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import React from "react";
import QRcodePage from "./pages/QRCodePage";
import MyCardsPage from "./pages/MyCardsPage";
import CardDetailsPage from "./pages/CardDetailsPage";
import ScanPage from "./pages/ScanPage";
import { useEffect } from "react";
import { getUserWithStoredToken } from "./store/user/actions";
import BeanDetails from "./pages/BeanDetails";

import { useDispatch } from "react-redux";
import MyVouchers from "./pages/MyVouchers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/qr" component={QRcodePage} />
        <Route path="/mycards" component={MyCardsPage} />
        <Route path="/carddetails/:storeId" component={CardDetailsPage} />
        <Route path="/scan" component={ScanPage} />
        <Route path="/myvouchers" component={MyVouchers} />
        <Route path="/beans/:beanId" component={BeanDetails} />
      </Switch>
    </div>
  );
}

export default App;
