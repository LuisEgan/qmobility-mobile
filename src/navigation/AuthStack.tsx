import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Onboarding,
  TCs,
  LoginSignUp,
  Access,
  EmailConfirm,
} from "../screens/Auth";
import { IScreen } from "./Router";
import { AUTH_STACK_SCREENS_NAMES } from "../lib/constants";

interface IScreens extends Array<IScreen> {}
export interface IAuthScreens extends Array<IScreen> {}
export const AUTH_STACK_SCREENS: IScreens = [
  {
    name: AUTH_STACK_SCREENS_NAMES.Onboarding,
    component: Onboarding,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.TCs,
    component: TCs,
    headerShown: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.Access,
    component: Access,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.LoginSignUp,
    component: LoginSignUp,
    headerShown: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.EmailConfirm,
    component: EmailConfirm,
    headerShown: true,
  },
];

const { Screen } = createStackNavigator();

const AuthNavigator = () => (
  <>
    {AUTH_STACK_SCREENS.map(({ name, component, headerShown }) => {
      const options = { headerShown: headerShown || false };
      return <Screen key={name} {...{ name, component, options }}></Screen>;
    })}
  </>
);

export default AuthNavigator;
