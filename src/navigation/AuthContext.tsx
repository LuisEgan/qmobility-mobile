// ! Deprecated
import { createContext } from "react";

interface IAuthMethods {
  emailSignIn: (data: string) => void;
  googleSignIn: () => void;
  linkedInSignIn: () => void;
  fbSignIn: () => void;
  signOut: () => void;
  signUp: () => void;
}
interface IAuthMethodsParams {
  setUserToken: (token: string) => void;
}

export const authMethods = ({ setUserToken }: IAuthMethodsParams) => () => ({
  emailSignIn: (data: string) => {
    setUserToken(data);
  },
  googleSignIn: () => {},
  linkedInSignIn: () => {},
  fbSignIn: () => {},
  signOut: () => {},
  signUp: () => {},
});

const setUserToken = (token = "") => token;
export default createContext<IAuthMethods>(authMethods({ setUserToken })());
