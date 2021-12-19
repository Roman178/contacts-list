import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import userStore from "../store/user";

const SignIn = () => {
  const { authenticate, loadingUser } = userStore;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    authenticate("test@test.com", "testPassword");

    // fetch("http://localhost:5000/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: "test@test.com",
    //     password: "testPassword",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };

  return (
    <>
      {loadingUser ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Ваш email
            <input id="email" type="email" />
          </label>
          <label htmlFor="password">
            Пароль
            <input id="password" type="password" />
          </label>
          <button type="submit">Отправить</button>
        </form>
      )}
    </>
  );
};

export default observer(SignIn);
