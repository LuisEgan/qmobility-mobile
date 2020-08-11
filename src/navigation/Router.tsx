import React, { useState } from "react";
import AuthNavigator from "./AuthStack";
import AppNavigator from "./AppStack";
import { TAllNavProps } from "./NavPropsTypes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AUTH_STACK_SCREENS_NAMES } from "./constants";

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen & TAllNavProps>;
  headerShown?: boolean;
}

const { Navigator } = createStackNavigator();

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Navigator initialRouteName={AUTH_STACK_SCREENS_NAMES.EmailConfirm}>
        {isLoggedIn ? AppNavigator() : AuthNavigator()}
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
