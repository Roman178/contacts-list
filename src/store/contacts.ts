/* eslint-disable */

import { makeObservable, observable, action } from "mobx";

interface IContact {
  id?: number;
  userId: number;
  name: string;
  tel: string;
}

class Contacts {
  public contacts: IContact[];

  constructor() {
    makeObservable(this, {
      contacts: observable,
      getContacts: action,
      addContact: action,
    });
  }

  private getToken = (): string => {
    return JSON.parse(localStorage.getItem("userData"))?.token;
  };

  public getContacts = (userId: number): Promise<void> => {
    if (!this.getToken()) return;

    return fetch(`http://localhost:5000/660/contacts?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => (this.contacts = data));
  };

  public addContact = (contact: IContact) => {
    return fetch("http://localhost:5000/660/contacts", {
      body: JSON.stringify(contact),
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  };
}

const contacts = new Contacts();

export default contacts;
