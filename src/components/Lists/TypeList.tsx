export interface IRoute {
  date?: string;
  from?: string;
  to?: string;
}

interface IRoutesArray extends Array<IRoute> {}

export type TList = IRoutesArray | undefined;
