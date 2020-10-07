import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { LatLng } from "react-native-maps";
import { IVehicleRecommendation } from "../../gql/Vehicle/queries";

type LoginSignUpFrom = 0 | 1;

// * Screens Props Types
type StackParamsList = {
  "Terms and conditions": Record<string, unknown>;
  LoginSignUp: {
    from: LoginSignUpFrom;
  };
  EmailConfirm: {
    userToken: string;
    userEmail: string;
  };
  Access: Record<string, unknown>;
  Login: Record<string, unknown>;
  MyCars: Record<string, unknown>;
  ProfileScroll: Record<string, unknown>;
  CheckCar: {
    vehicleRecommendation: IVehicleRecommendation;
  };
  MyRoutes: Record<string, unknown>;
  Details: Record<string, unknown>;
  MapSearchDone: {
    location?: LatLng;
    origin: string;
    destination: string;
  };
};

// * Terms and conditions props
export type TTCsNavProps = StackScreenProps<
  StackParamsList,
  "Terms and conditions"
>;

// * Terms and conditions props
export type TAccessNavProps = StackScreenProps<StackParamsList, "Access">;

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

// * Email Confirm screen props
export type TEmailConfirmNavProps = StackScreenProps<
  StackParamsList,
  "EmailConfirm"
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

// * MapSearchDone screen props
export type TMapSearchDoneNavProps = StackScreenProps<
  StackParamsList,
  "MapSearchDone"
>;

// * Export all types as one type
export type TAllNavProps = TTCsNavProps &
  TAccessNavProps &
  TLoginSignUpNavProps &
  TMyCarsNavProps &
  TDetailsNavProps &
  TProfileScrollNavProps &
  TCheckCarNavProps &
  TMyRoutesNavProps &
  TDetailsNavProps &
  TMapSearchDoneNavProps &
  TEmailConfirmNavProps &
  TLoginSignUpScreenProps;
