import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AUTH_STACK_SCREENS_NAMES } from "../../../navigation/constants";
import { IAuthScreens } from "../../../navigation/AuthNavigator";
import Login from "./Login";
import SignUp from "./SignUp";
import { TLoginSignUpNavProps } from "../../../navigation/NavPropsTypes";
import Header from "../../../components/Header";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../config/Theme";

interface ILoginSignUp extends TLoginSignUpNavProps {}

const Tab = createMaterialTopTabNavigator();

const LOGIN_SIGNUP_STACK_SCREENS: IAuthScreens = [
  {
    name: AUTH_STACK_SCREENS_NAMES.Login,
    component: Login,
  },
  {
    name: AUTH_STACK_SCREENS_NAMES.SignUp,
    component: SignUp,
  },
];

const LoginSignUp = (props: ILoginSignUp) => {
  const { navigation, route } = props;

  // * activeScreen
  // * 0 - Login
  // * 1 - SignUp
  const { from } = route.params;
  const activeScreen = route?.state?.index || from;

  const { colors } = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      lazy={true}
      initialRouteName={AUTH_STACK_SCREENS_NAMES.Login}
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor:
            activeScreen === 0 ? colors.primaryDark : colors.primary,
          height: 7,
        },
        labelStyle: { fontWeight: "bold" },
        tabStyle: {
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
        },
      }}
    >
      {LOGIN_SIGNUP_STACK_SCREENS.map(({ name, component }) => {
        return <Tab.Screen key={name} {...{ name, component }}></Tab.Screen>;
      })}
    </Tab.Navigator>
  );
};

export default LoginSignUp;
