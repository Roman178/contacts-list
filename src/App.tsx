// /* eslint-disable */
import React, { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import css from "./App.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import userStore from "./store/user";
import Header from "./components/Header";

const App: FC = () => {
  const { isSignedIn, authenticate, loadingUser } = userStore;

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <div className={css.app}>
      <Header />
      <main className={css.content}>
        {loadingUser ? (
          <p>Loading...</p>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default observer(App);
