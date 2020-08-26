import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";

type LoginSignUpFrom = 0 | 1;

// * Screens Props Types
type StackParamsList = {
  "Terms and conditions": {};
  LoginSignUp: {
    from: LoginSignUpFrom;
  };
  Login: {};
  MyCars: {};
  ProfileScroll: {};
  CheckCar: {};
  MyRoutes: {};
  Details: {};
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
type TLoginSignUpRoute = RouteProp<StackParamsList, "LoginSignUp"> &
  MaterialTopTabScreenProps<StackParamsList, "LoginSignUp"> & {
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

// * My Cars screen props
export type TMyCarsNavProps = StackScreenProps<StackParamsList, "MyCars">;

// * Prodile Scroll sreen props
export type TProfileScrollNavProps = StackScreenProps<
  StackParamsList,
  "ProfileScroll"
>;

// * Check Car sreen props
export type TCheckCarNavProps = StackScreenProps<StackParamsList, "CheckCar">;

// * My Routes sreen props
export type TMyRoutesNavProps = StackScreenProps<StackParamsList, "MyRoutes">;

// * Details screen props
export type TDetailsNavProps = StackScreenProps<StackParamsList, "Details">;

// * Export all types as one type
export type TAllNavProps = TTCsNavProps &
  TLoginSignUpNavProps &
  TMyCarsNavProps &
  TDetailsNavProps &
  TProfileScrollNavProps &
  TCheckCarNavProps &
  TMyRoutesNavProps &
  TDetailsNavProps &
  TLoginSignUpScreenProps;
