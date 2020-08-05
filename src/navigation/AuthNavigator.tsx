import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding, TCs } from "../screens/Auth";
import { IScreen } from "./Router";

export const AUTH_STACK_SCREENS_NAME = {
  Onboarding: "Onboarding",
  TCs: "Terms and conditions",
};

interface IAuthScreens extends Array<IScreen> {}
export const AUTH_STACK_SCREENS: IAuthScreens = [
  {
    name: AUTH_STACK_SCREENS_NAME.Onboarding,
    component: Onboarding,
    headerHide: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAME.TCs,
    component: TCs,
  },
];

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
  <Navigator>
    {AUTH_STACK_SCREENS.map(({ name, component, headerHide }) => (
      <Screen
        key={name}
        {...{ name, component }}
        options={{
          headerShown: !headerHide,
        }}
      ></Screen>
    ))}
  </Navigator>
);

export default AuthNavigator;
