import { rgbaArray } from "react-native-svg";

export type TIcon =
  | "ArrowDown"
  | "ArrowBack"
  | "ArrowForward"
  | "ArrowUpLight"
  | "ArrowDownLight"
  | "Info"
  | "Email"
  | "Menu"
  | "Edit"
  | "Google"
  | "Facebook"
  | "LinkedIn"
  | "Apple"
  | "Error";

export interface ISVG {
  fill: string | number | rgbaArray;
  stroke: string | number | rgbaArray;
}
