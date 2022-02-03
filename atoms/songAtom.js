import { atom } from "recoil";

export const playState = atom({
  key: "playState",
  default: false,
});

export const playingSongState = atom({
  key: "playingSongState",
  default: null,
});
