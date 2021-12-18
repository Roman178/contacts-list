/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
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

// type AppProps = {
//   title: string;
// };

const App: FC = () => {
  const [state, setState] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // fetch("/api/600/users/1", {
    fetch("http://localhost:5000/600/users/1", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2Mzk4NjUyNzUsImV4cCI6MTYzOTg2ODg3NSwic3ViIjoiMSJ9.hC0s5DTPSP3XG_6b5Jnb39TGfQtYr9LcllZwO8si9H8",
      },
    })
      .then((res) => res.json())
      .then((data) => setState(data));
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
      <button onClick={() => setIsSignedIn((prev) => !prev)}>
        {isSignedIn ? "SignOut" : "SignIn"}
      </button>
      <Link to="/profile">Profile</Link>
      <Link to="/">Home</Link>
    </Router>
  );
};

export default App;
