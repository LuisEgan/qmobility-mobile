import { StackScreenProps } from "@react-navigation/stack";

// * Screens Props Types
type StackParamsList = {
  "Terms and conditions": {};
  LoginSignUp: {};
};

// * Terms and conditions props
export type TTCsNavProps = StackScreenProps<
  StackParamsList,
  "Terms and conditions"
>;

// * Login and SignUp props
export type TLoginSignUpNavProps = StackScreenProps<
  StackParamsList,
  "LoginSignUp"
>;

// * Export all types as one type
export type TAllNavProps = TTCsNavProps & TLoginSignUpNavProps;
