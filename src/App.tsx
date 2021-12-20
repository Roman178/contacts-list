/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import css from "./App.module.scss";
import image from "./assets/images/intel.jpg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import userStore from "./store/user";
import Header from "./components/Header";

// type AppProps = {
//   title: string;
// };

const App: FC = () => {
  const { isSignedIn, signIn, signOut } = userStore;

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className={css.app}>
      <Header />
      <main className={css.content}>
        <Router>
          <Switch>
            <PrivateRoute
              path="/"
              exact
              isConditionTrue={!isSignedIn}
              redirectPath="/profile"
            >
              <SignIn />
            </PrivateRoute>
            <PrivateRoute
              path="/profile"
              exact
              isConditionTrue={isSignedIn}
              redirectPath="/"
            >
              <Profile />
            </PrivateRoute>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default observer(App);
