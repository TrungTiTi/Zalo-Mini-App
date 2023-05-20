import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export class OrderStore {
  loading = true;
  orderData: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  setOrderData = (value: any) => {
    this.orderData = value;
  };
}

export const orderStore = new OrderStore();
export const storeContext = React.createContext(orderStore);
export const useOrderStore = () => React.useContext(storeContext);
