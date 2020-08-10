import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IScreen } from "./Router";
import { APP_STACK_SCREENS_NAMES } from "./constants";
import { CreateProfile } from "../screens/App";

interface IScreens extends Array<IScreen> {}
export const APP_STACK_SCREENS: IScreens = [
  {
    name: APP_STACK_SCREENS_NAMES.CreateProfile,
    component: CreateProfile,
    headerShown: true,
  },
];

const { Screen } = createStackNavigator();

const AppNavigator = () => (
  <>
    {APP_STACK_SCREENS.map(({ name, component, headerShown }) => {
      const options = { headerShown: headerShown || false };

      return <Screen key={name} {...{ name, component, options }}></Screen>;
    })}
  </>
);

export default AppNavigator;
