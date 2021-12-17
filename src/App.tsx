/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import css from "./App.module.scss";
import image from "./assets/images/intel.jpg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

type AppProps = {
  title: string;
};

const App: FC<AppProps> = ({ title }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
