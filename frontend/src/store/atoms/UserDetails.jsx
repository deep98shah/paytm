import { atom, selector } from "recoil";

export const userDetailsAtom = atom({
  key: "userDetails",
  default: {
    username: "",
    firstName: "",
    lastName: "",
    password: ""
  }  
})