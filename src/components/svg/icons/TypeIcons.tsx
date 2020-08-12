import { rgbaArray } from "react-native-svg";

export type TIcon =
  | "ArrowDown"
  | "ArrowBack"
  | "ArrowForward"
  | "ArrowUpLight"
  | "ArrowDownLight"
  | "Info"
  | "Email"
  | "Error";

export interface ISVG {
  fill: string | number | rgbaArray;
  stroke: string | number | rgbaArray;
}
