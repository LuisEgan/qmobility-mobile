import React from "react";
import AuthNavigator from "./AuthNavigator";
import { TAllNavProps } from "./NavPropsTypes";
import { NavigationContainer } from "@react-navigation/native";

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen & TAllNavProps>;
  headerShown?: boolean;
}

const Router = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Router;
