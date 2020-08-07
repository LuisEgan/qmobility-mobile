import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding, TCs, LoginSignUp, Access } from "../screens/Auth";
import { IScreen } from "./Router";
import { AUTH_STACK_SCREENS_NAME } from "./constants";

interface IAuthScreens extends Array<IScreen> {}
export const AUTH_STACK_SCREENS: IAuthScreens = [
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
  },
];

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
  <Navigator initialRouteName={AUTH_STACK_SCREENS_NAME.Onboarding}>
    {AUTH_STACK_SCREENS.map(({ name, component, headerShown }) => {
      const options = { headerShown: headerShown || false };

      return <Screen key={name} {...{ name, component, options }}></Screen>;
    })}
  </Navigator>
);

export default AuthNavigator;
