import { rgbaArray } from "react-native-svg";

export type TIcon =
  | "ArrowDown"
  | "ArrowBack"
  | "ArrowForward"
  | "ArrowUpLight"
  | "ArrowDownLight"
  | "ArrowBackLight"
  | "ArrowRightLight"
  | "ArrowChange"
  | "Info"
  | "Email"
  | "Menu"
  | "Edit"
  | "Google"
  | "Facebook"
  | "LinkedIn"
  | "Apple"
  | "Done"
  | "Mic"
  | "MoreVert"
  | "CompassWithCircles"
  | "Delete"
  | "Circle"
  | "Market"
  | "Clock"
  | "Bubble"
  | "Eve"
  | "Dot"
  | "FavClothingStyle"
  | "Error";

export interface ISVG {
  fill: string | number | rgbaArray;
  stroke: string | number | rgbaArray;
}
