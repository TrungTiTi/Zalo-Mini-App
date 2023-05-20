import React from "react";
import { makeAutoObservable, runInAction } from "mobx";

export class UserStore {
  loading = true;
  user: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (value: any) => {
    this.user = value;
  };
}

export const userStore = new UserStore();
export const storeContext = React.createContext(userStore);
export const useUserStore = () => React.useContext(storeContext);
