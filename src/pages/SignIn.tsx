import React, { SyntheticEvent } from "react";

const SignIn = () => {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@test.com",
        password: "testPassword",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
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
  );
};

export default SignIn;
