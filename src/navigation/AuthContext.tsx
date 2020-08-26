/* eslint import/prefer-default-export: "off" */
import { createContext } from "react";

interface IAuthMethods {
  signIn: (token?: string) => void;
  signOut: () => void;
}
const authMethods = {
  signIn: () => null,
  signOut: () => null,
};
export const AuthContext = createContext<IAuthMethods>(authMethods);
