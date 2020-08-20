import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@shopify/restyle";
import { Dimensions } from "react-native";
import { IAuthScreens } from "../../../navigation/AuthStack";
import Login from "./Login";
import SignUp from "./SignUp";
import { TLoginSignUpNavProps } from "../../../navigation/Types/NavPropsTypes";
import Header from "../../../components/Header";
import { Theme } from "../../../config/Theme";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { height } = Dimensions.get("window");

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
  const activeScreen = route.state ? route.state.index : from;

  const { colors } = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header height={height * 0.17} />,
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      lazy
      initialRouteName={AUTH_STACK_SCREENS_NAMES.Login}
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor:
            activeScreen === 0 ? colors.secondaryDark : colors.primary,
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
      {LOGIN_SIGNUP_STACK_SCREENS.map(({ name, component }) => (
        <Tab.Screen key={name} {...{ name, component }} />
      ))}
    </Tab.Navigator>
  );
};

export default LoginSignUp;
