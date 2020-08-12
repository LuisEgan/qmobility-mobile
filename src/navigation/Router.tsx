import React, { useState } from "react";
import AuthNavigator from "./AuthStack";
import AppNavigator from "./AppStack";
import { TAllNavProps } from "./NavPropsTypes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AUTH_STACK_SCREENS_NAMES, APP_STACK_SCREENS_NAMES } from "./constants";

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen & TAllNavProps>;
  headerShown?: boolean;
}

const { Navigator } = createStackNavigator();

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <Navigator initialRouteName={APP_STACK_SCREENS_NAMES.MyCars}>
        {isLoggedIn ? AppNavigator() : AuthNavigator()}
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
