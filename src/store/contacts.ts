/* eslint-disable */

import { makeObservable, observable, action } from "mobx";
import { BASE_URL } from "../constants";
import { request } from "../api";

interface IContact {
  id?: number;
  userId?: number;
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

  private getUserId = (): number => {
    return JSON.parse(localStorage.getItem("userData"))?.userId;
  };

  public getContacts = async (): Promise<void> => {
    if (!this.getToken()) return;

    try {
      const data = await request(
        `/660/contacts?userId=${this.getUserId()}`,
        "GET",
        { Authorization: `Bearer ${this.getToken()}` }
      );
      this.contacts = data;
    } catch (error) {
      console.error(error);
    }
  };

  public addContact = async (contact: IContact) => {
    try {
      const data = await request(
        `/660/contacts`,
        "POST",
        {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        JSON.stringify({ ...contact, userId: this.getUserId() })
      );

      this.contacts.push(data);
    } catch (error) {
      console.error(error);
    }
  };

  public deleteContact = (contactId: number) => {};

  public updateContact = (contact: IContact) => {};
}

const contacts = new Contacts();

export default contacts;
