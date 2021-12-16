import React, { FC, useEffect, useState } from "react";
import css from "./App.module.scss";
import image from "../assets/images/intel.jpg";

type AppProps = {
  title: string;
};

const App: FC<AppProps> = ({ title }) => {
  const [state, setState] = useState("");

  useEffect(() => {
    if (title) {
      setState("ds");
    }
  }, []);

  return (
    <>
      <h1 className={css.app}>{title}</h1>
      <img src={image} alt="" />
    </>
  );
};

export default App;
