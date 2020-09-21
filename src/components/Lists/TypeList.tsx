import { TIcon } from "../svg/icons/TypeIcons";

export interface IRoute {
  icon?: TIcon;
  title?: string;
  details?: string;
}

interface IRoutesArray extends Array<IRoute> {}

export type TList = IRoutesArray | undefined;
