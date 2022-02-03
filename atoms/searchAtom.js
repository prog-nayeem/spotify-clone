import { atom } from "recoil";

export const showSearchInput = atom({
  key: "showSearchInput",
  default: false,
});

export const searchInputValue = atom({
  key: "searchInputValue",
  default: "",
});
