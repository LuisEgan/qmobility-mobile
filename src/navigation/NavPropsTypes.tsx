import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";

// * Screens Props Types
type StackParamsList = {
  "Terms and conditions": {};
  LoginSignUp: {};
  Login: {};
};

// * Terms and conditions props
export type TTCsNavProps = StackScreenProps<
  StackParamsList,
  "Terms and conditions"
>;

// * LoginSignUp Navigator props
type MaterialTopTabScreenState = {
  index: number;
  key: string;
};
type TLoginSignUpNavigation = StackNavigationProp<
  StackParamsList,
  "LoginSignUp"
>;
type TLoginSignUpRoute = MaterialTopTabScreenProps<
  StackParamsList,
  "LoginSignUp"
> & {
  state: MaterialTopTabScreenState;
};
export type TLoginSignUpNavProps = {
  navigation: TLoginSignUpNavigation;
  route: TLoginSignUpRoute;
};

// * Login and Sign up screens props
export type TLoginSignUpScreenProps = MaterialTopTabScreenProps<
  StackParamsList,
  "Login"
>;

// * Export all types as one type
export type TAllNavProps = TTCsNavProps &
  TLoginSignUpNavProps &
  TLoginSignUpScreenProps;
