import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../AuthContext";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { TUserToken } from "../Types/AuthTypes";
import { ASYNC_STORAGE_ITEMS } from "../../lib/constants";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [userToken, setUserToken] = useState<TUserToken>(null);

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
      }
    };

    setInitialUserToken();
  }, []);

  const authContext = React.useMemo(
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

  const NavigatorComponent = () => (
    <AuthContext.Provider value={authContext}>
      {userToken ? <AppNavigator /> : <AuthNavigator />}
    </AuthContext.Provider>
  );

  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
      mode="modal"
    >
      {userToken ? (
        <RootStack.Screen name="AppNavigator" component={NavigatorComponent} />
      ) : (
        <RootStack.Screen name="AuthNavigator" component={NavigatorComponent} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
