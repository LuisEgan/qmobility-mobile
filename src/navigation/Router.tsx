import React, { useState, useEffect } from "react";
import AuthNavigator from "./AuthStack";
import AppNavigator from "./AppStack";
import { TAllNavProps } from "./Types/NavPropsTypes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ASYNC_STORAGE_ITEMS,
  AUTH_STACK_SCREENS_NAMES,
} from "../lib/constants";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { TUserToken } from "./Types/AuthTypes";

const { Navigator } = createStackNavigator();

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen & TAllNavProps>;
  headerShown?: boolean;
}

const Router = () => {
  const [userToken, setUserToken] = useState<TUserToken>(null);
  const [isLoading, setIsLoading] = useState(true);

  // * Set user token from cached data
  useEffect(() => {
    const setInitialUserToken = async () => {
      let userToken: TUserToken = null;
      try {
        userToken = await AsyncStorage.getItem(ASYNC_STORAGE_ITEMS.USER_TOKEN);
      } catch (error) {
        console.error("error: ", error);
      } finally {
        setUserToken(userToken);
        setIsLoading(false);
      }
    };

    setInitialUserToken();
  }, []);

  return isLoading ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      <Navigator initialRouteName={AUTH_STACK_SCREENS_NAMES.Access}>
        {userToken ? AppNavigator() : AuthNavigator()}
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
