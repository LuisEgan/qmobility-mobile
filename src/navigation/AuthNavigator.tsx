import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IScreen } from "./Router";
import { AUTH_STACK_SCREENS_NAME } from "./constants";
import { Onboarding, TCs, Access, LoginSignUp } from "../screens/Auth";

export interface IAuthScreens extends Array<IScreen> {}

const ONBOARDING_STACK_SCREENS: IAuthScreens = [
  {
    name: AUTH_STACK_SCREENS_NAME.Onboarding,
    component: Onboarding,
  },
  {
    name: AUTH_STACK_SCREENS_NAME.TCs,
    component: TCs,
    headerShown: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAME.Access,
    component: Access,
  },
  {
    name: AUTH_STACK_SCREENS_NAME.LoginSignUp,
    component: LoginSignUp,
    headerShown: true,
  },
];

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
  <Navigator initialRouteName={AUTH_STACK_SCREENS_NAME.Onboarding}>
    {ONBOARDING_STACK_SCREENS.map(({ name, component, headerShown }) => {
      const options = { headerShown: headerShown || false };
      return <Screen key={name} {...{ name, component, options }}></Screen>;
    })}
  </Navigator>
);

export default AuthNavigator;
