import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding, TCs } from "../screens/Auth";
import { IScreen } from "./Router";

interface IAuthScreens extends Array<IScreen> {}

export const AUTH_STACK_SCREENS: IAuthScreens = [
  {
    name: "Onboarding",
    component: Onboarding,
  },
  {
    name: "Terms and conditions",
    component: TCs,
  },
];

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
  <Navigator headerMode="none">
    {AUTH_STACK_SCREENS.map(({ name, component }) => (
      <Screen key={name} {...{ name, component }}></Screen>
    ))}
  </Navigator>
);

export default AuthNavigator;
