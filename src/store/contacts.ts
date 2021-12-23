// /* eslint-disable */

import { makeObservable, observable, action } from "mobx";
import { request } from "../api";

export interface IContact {
  id?: number;
  userId?: number;
  name: string;
  tel: string;
}

class Contacts {
  public contacts: IContact[];
  public loading: boolean;

  constructor() {
    makeObservable(this, {
      contacts: observable,
      loading: observable,
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

    this.loading = true;
    try {
      const data = await request(
        `/660/contacts?userId=${this.getUserId()}`,
        "GET",
        { Authorization: `Bearer ${this.getToken()}` }
      );
      this.contacts = data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  };

  public addContact = async (contact: IContact): Promise<void> => {
    this.loading = true;
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
    } finally {
      this.loading = false;
    }
  };

  public deleteContact = async (contactId: number): Promise<void> => {
    this.loading = true;
    try {
      await request(`/660/contacts/${contactId}`, "DELETE", {
        Authorization: `Bearer ${this.getToken()}`,
        "Content-Type": "application/json",
      });

      this.contacts = this.contacts.filter((c) => c.id !== contactId);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  };

  public updateContact = async (contact: IContact): Promise<void> => {
    this.loading = true;
    try {
      const data = await request(
        `/660/contacts/${contact.id}`,
        "PUT",
        {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
        JSON.stringify({ ...contact, userId: this.getUserId() })
      );

      const updatedItemIndex = this.contacts.findIndex(
        (con) => con.id === contact.id
      );
      this.contacts.splice(updatedItemIndex, 1, data);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  };
}

const contacts = new Contacts();

export default contacts;
