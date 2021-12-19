import { makeObservable, observable, action } from "mobx";

interface IAuthResult {
  accessToken: string;
  user: { email: string; id: number };
}

// interface ISignInResult {
//   email: string;
//   id: number;
//   password: string;
// }

class Store {
  public isSignedIn: boolean;
  public loadingUser: boolean;

  constructor() {
    makeObservable(this, {
      isSignedIn: observable,
      loadingUser: observable,
      authenticate: action,
      signIn: action,
      signOut: action,
    });
  }

  public authenticate = (email: string, password: string): Promise<void> => {
    this.loadingUser = true;
    return fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => Promise.reject(err));
        return res.json();
      })
      .then((data: IAuthResult) => {
        localStorage.setItem(
          "userData",
          JSON.stringify({ token: data.accessToken, userId: data.user.id })
        );
        this.isSignedIn = true;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.loadingUser = false;
      });
  };

  public signIn = (): Promise<void> | void => {
    this.loadingUser = true;

    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    const userId = JSON.parse(localStorage.getItem("userData"))?.userId;

    if (!token) {
      this.isSignedIn = false;
      this.loadingUser = false;
      return;
    }

    return fetch(`http://localhost:5000/600/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => Promise.reject(err));
        return res.json();
      })
      .then(() => {
        this.isSignedIn = true;
      })
      .catch((err) => {
        console.error(err);
        this.isSignedIn = false;
      })
      .finally(() => {
        this.loadingUser = false;
      });
  };

  public signOut = (): void => {
    localStorage.removeItem("userData");
    this.isSignedIn = false;
  };
}

const store = new Store();

export default store;
