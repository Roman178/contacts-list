import { makeObservable, observable, action } from "mobx";
// import { BASE_URL } from "../constants";
import { request } from "../api";

interface IAuthResult {
  email: string;
  id: number;
  password: string;
}

interface ISignInResult {
  accessToken: string;
  user: { email: string; id: number };
}

class Store {
  public isSignedIn: boolean;
  public loadingUser: boolean;
  public email: string;

  constructor() {
    makeObservable(this, {
      isSignedIn: observable,
      loadingUser: observable,
      email: observable,
      authenticate: action,
      signIn: action,
      signOut: action,
    });
  }

  public authenticate = (): Promise<void> | void => {
    console.log("auth");

    this.loadingUser = true;

    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const userId = JSON.parse(localStorage.getItem("userData"))?.userId;

    if (!token) {
      this.isSignedIn = false;
      this.email = "";
      this.loadingUser = false;
      return;
    }

    return request(`/600/users/${userId}`, "GET", {
      Authorization: `Bearer ${token}`,
    })
      .then((data: IAuthResult) => {
        this.isSignedIn = true;
        this.email = data.email;
      })
      .catch((err: string) => {
        console.error(err);
        this.isSignedIn = false;
        this.email = "";
      })
      .finally(() => {
        this.loadingUser = false;
      });
  };

  public signIn = (email: string, password: string): Promise<void> => {
    this.loadingUser = true;

    return request(
      `/signin`,
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify({
        email,
        password,
      })
    )
      .then((data: ISignInResult) => {
        localStorage.setItem(
          "userData",
          JSON.stringify({ token: data.accessToken, userId: data.user.id })
        );
        this.isSignedIn = true;
        this.email = data.user.email;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.loadingUser = false;
      });
  };

  public signOut = (): void => {
    localStorage.removeItem("userData");
    this.isSignedIn = false;
    this.email = "";
  };
}

const store = new Store();

export default store;
