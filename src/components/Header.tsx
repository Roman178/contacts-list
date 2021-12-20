import React, { FC } from "react";
import css from "./Header.module.scss";
import userStore from "../store/user";
import { observer } from "mobx-react-lite";

const Header: FC = () => {
  const { isSignedIn, signOut, email } = userStore;

  console.log(email);

  return (
    <header className={css.root}>
      {isSignedIn && (
        <>
          <span>{email}</span>
          <button onClick={() => signOut()}>Выйти</button>
        </>
      )}
    </header>
  );
};

export default observer(Header);
