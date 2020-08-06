import { StackScreenProps } from "@react-navigation/stack";

// * Screens Props Types
type StackParamsList = {
  "Terms and conditions": {};
  LoginSignUp: {
    state: number;
  };
};

// * LoginSignUp props
export type TLoginSignUpNavProps = StackScreenProps<
  StackParamsList,
  "LoginSignUp"
>;

// * Terms and conditions props
export type TTCsNavProps = StackScreenProps<
  StackParamsList,
  "Terms and conditions"
>;

// * Export all types as one type
export type TAllNavProps = TLoginSignUpNavProps & TTCsNavProps;
