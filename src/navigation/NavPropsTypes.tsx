import { StackScreenProps } from "@react-navigation/stack";

// * Screens Props Types
type StackParamsList = {
  "Terms and conditions": {};
  LoginSignUp: {
    state: number;
  };
};

// * LoginSignUpProp
export type TLoginSignUpNavProps = StackScreenProps<
  StackParamsList,
  "LoginSignUp"
>;

// * LoginSignUpProp
export type TTCsNavProps = StackScreenProps<
  StackParamsList,
  "Terms and conditions"
>;

// * Export all types as one type
export type TAllNavProps = TLoginSignUpNavProps & TTCsNavProps;
