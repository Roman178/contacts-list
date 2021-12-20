/* eslint-disable */
import React, { FC, useEffect } from "react";
import contactsStore from "../store/contacts";
import { observer } from "mobx-react-lite";

const Profile: FC = () => {
  const { getContacts } = contactsStore;

  useEffect(() => {
    getContacts(1);
  }, []);

  return <div>Profile</div>;
};

export default observer(Profile);
