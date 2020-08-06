import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding, TCs, LoginSignUp, Access } from "../screens/Auth";
import { IScreen } from "./Router";
import { AUTH_STACK_SCREENS_NAME } from "./constants";

interface IAuthScreens extends Array<IScreen> {}
export const AUTH_STACK_SCREENS: IAuthScreens = [
  {
    name: AUTH_STACK_SCREENS_NAME.Access,
    component: Access,
    headerHide: true,
  },
  {
    name: AUTH_STACK_SCREENS_NAME.LoginSignUp,
    component: LoginSignUp,
  },
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
  <Navigator initialRouteName={AUTH_STACK_SCREENS_NAME.Access}>
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
