import { atom } from "recoil";

const theme = atom({
  key: 'select-theme',
  default: 'dark',
});
export { theme };