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
          <span className={css.email}>{email}</span>
          <button className={css.signOutBtn} onClick={() => signOut()}>
            Выйти
          </button>
        </>
      )}
    </header>
  );
};

export default observer(Header);
