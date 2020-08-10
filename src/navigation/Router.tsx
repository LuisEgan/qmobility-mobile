import React, { useState } from "react";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { TAllNavProps } from "./NavPropsTypes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
      <Navigator>{isLoggedIn ? AppNavigator() : AuthNavigator()}</Navigator>
    </NavigationContainer>
  );
};

export default Router;
