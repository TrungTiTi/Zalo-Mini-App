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

export class ListCateStore {
  loading = true;
  listCateData: any[] = [];
  prevCate: any = {};
  afterCate: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  getListCates = async () => {
    try {
      this.loading = true;
      const data = await getDocs(collection(db, "listCate"));
      const cateList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      this.listCateData = cateList;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  };

  setPreCateAndAfterCate = (preValue, afterValue) => {
    this.prevCate = preValue;
    this.afterCate = afterValue;
  };
}

export const listCateStore = new ListCateStore();
export const storeContext = React.createContext(listCateStore);
export const useListCateStore = () => React.useContext(storeContext);
