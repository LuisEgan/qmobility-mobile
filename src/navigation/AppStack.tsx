import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IScreen } from "./Router";
import {
  CreateProfile,
  MyCars,
  ProfileScroll,
  CheckCar,
  SearchRouter,
  Main,
  EditProfile,
  Profile,
  MyRoutes,
  Details,
  MapSearchDone,
} from "../screens/App";
import { APP_STACK_SCREENS_NAMES } from "../lib/constants";

interface IScreens extends Array<IScreen> {}
export const APP_STACK_SCREENS: IScreens = [
  {
    name: APP_STACK_SCREENS_NAMES.Main,
    component: Main,
  },
  {
    name: APP_STACK_SCREENS_NAMES.CreateProfile,
    component: CreateProfile,
  },
  {
    name: APP_STACK_SCREENS_NAMES.MyCars,
    component: MyCars,
  },
  {
    name: APP_STACK_SCREENS_NAMES.ProfileScroll,
    component: ProfileScroll,
  },
  {
    name: APP_STACK_SCREENS_NAMES.CheckCar,
    component: CheckCar,
  },
  {
    name: APP_STACK_SCREENS_NAMES.SearchRouter,
    component: SearchRouter,
  },

  {
    name: APP_STACK_SCREENS_NAMES.EditProfile,
    component: EditProfile,
  },
  {
    name: APP_STACK_SCREENS_NAMES.Profile,
    component: Profile,
  },
  {
    name: APP_STACK_SCREENS_NAMES.MyRoutes,
    component: MyRoutes,
  },
  {
    name: APP_STACK_SCREENS_NAMES.Details,
    component: Details,
  },
  {
    name: APP_STACK_SCREENS_NAMES.MapSearchDone,
    component: MapSearchDone,
  },
];

const { Screen } = createStackNavigator();

const AppNavigator = () => (
  <>
    {APP_STACK_SCREENS.map(({ name, component, headerShown }) => {
      const options = { headerShown: headerShown || false };

      return <Screen key={name} {...{ name, component, options }} />;
    })}
  </>
);

export default AppNavigator;
