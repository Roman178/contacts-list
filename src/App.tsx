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

// type AppProps = {
//   title: string;
// };

const App: FC = () => {
  const [state, setState] = useState([]);
  // const [isSignedIn, setIsSignedIn] = useState(false);

  const { isSignedIn, signIn, signOut } = userStore;

  console.log(isSignedIn);

  useEffect(() => {
    // fetch("/api/600/users/1", {
    signIn();
  }, []);

  console.log(state);

  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={SignIn} />
        <Route path="/profile" component={Profile} /> */}
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
      <button onClick={() => signOut()}>SignOut</button>
      <Link to="/profile">Profile</Link>
      <Link to="/">Home</Link>
    </Router>
  );
};

export default observer(App);
