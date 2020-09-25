/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, useMemo } from "react";
import { AsyncStorage, Keyboard } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../AuthContext";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { TUserToken } from "../Types/AuthTypes";
import { ASYNC_STORAGE_ITEMS } from "../../lib/constants";
import { KeyboardContext } from "../../lib/Contexts/KeyboardContext";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [userToken, setUserToken] = useState<TUserToken>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isKeyboardHidden, setIsKeyboardHidden] = useState<boolean>(true);

  // * Set user token from cached data
  useEffect(() => {
    const setInitialUserToken = async () => {
      let newUserToken: TUserToken = null;
      try {
        newUserToken = await AsyncStorage.getItem(
          ASYNC_STORAGE_ITEMS.USER_TOKEN,
        );
      } catch (error) {
        console.error("error: ", error);
      } finally {
        setUserToken(newUserToken);
        setLoading(false);
      }
    };

    setInitialUserToken();
  }, []);

  // * Set keyboard listeners
  useEffect(() => {
    const keyboardShow = () => setIsKeyboardHidden(false);
    const keyboardHide = () => setIsKeyboardHidden(true);

    Keyboard.addListener("keyboardDidShow", keyboardShow);
    Keyboard.addListener("keyboardDidHide", keyboardHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardShow);
      Keyboard.removeListener("keyboardDidHide", keyboardHide);
    };
  }, []);

  // * Set contexts values
  const authContext = useMemo(
    () => ({
      signIn: async (token?: string) =>
        new Promise<void>((resolve, reject) => {
          const doSignIn = async () => {
            try {
              await AsyncStorage.setItem(
                ASYNC_STORAGE_ITEMS.USER_TOKEN,
                token || "",
              );
              setUserToken(token || "");
              resolve();
            } catch (error) {
              console.error("error: ", error);
              reject();
            }
          };

          doSignIn();
        }),
      signOut: () => {
        const doSignOut = async () => {
          await AsyncStorage.removeItem(ASYNC_STORAGE_ITEMS.USER_TOKEN);
          setUserToken(null);
        };

        doSignOut();
      },
    }),
    [],
  );

  const keyboardContext = useMemo(
    () => ({
      isHidden: () => isKeyboardHidden,
    }),
    [],
  );

  // * Loading screen
  const LoadingScreen = () => null;

  return (
    <AuthContext.Provider value={authContext}>
      <KeyboardContext.Provider value={keyboardContext}>
        <RootStack.Navigator
          headerMode="none"
          screenOptions={{ animationEnabled: false }}
          mode="modal"
        >
          {loading ? (
            <RootStack.Screen name="Loading" component={LoadingScreen} />
          ) : userToken ? (
            <RootStack.Screen name="AppNavigator" component={AppNavigator} />
          ) : (
            <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </KeyboardContext.Provider>
    </AuthContext.Provider>
  );
};

export default RootNavigator;
