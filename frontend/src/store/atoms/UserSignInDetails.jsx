import { atom, selector } from "recoil";

export const userSignInDetailsAtom = atom({
  key: "userDetails",
  default: {
    username: "",
    password: ""
  }  
})