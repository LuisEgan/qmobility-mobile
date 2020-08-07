import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AUTH_STACK_SCREENS_NAME } from "../../../navigation/constants";
import { IAuthScreens } from "../../../navigation/AuthNavigator";
import Login from "./Login";
import SignUp from "./SignUp";
import { TLoginSignUpNavProps } from "../../../navigation/NavPropsTypes";

interface ILoginSignUp extends TLoginSignUpNavProps {}

const Tab = createMaterialTopTabNavigator();

const LOGIN_SIGNUP_STACK_SCREENS: IAuthScreens = [
  {
    name: AUTH_STACK_SCREENS_NAME.Login,
    component: Login,
  },
  {
    name: AUTH_STACK_SCREENS_NAME.SignUp,
    component: SignUp,
  },
];

const LoginSignUp = (props: ILoginSignUp) => {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "asds",
    });
  }, [navigation]);

  return (
    <Tab.Navigator lazy={true} initialRouteName={AUTH_STACK_SCREENS_NAME.Login}>
      {LOGIN_SIGNUP_STACK_SCREENS.map(({ name, component }) => {
        return <Tab.Screen key={name} {...{ name, component }}></Tab.Screen>;
      })}
    </Tab.Navigator>
  );
};

export default LoginSignUp;
