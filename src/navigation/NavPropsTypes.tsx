import { StackScreenProps } from "@react-navigation/stack";

// * Screens Props Types
type StackParamsList = {
  LoginSignUp: {
    state: number;
  };
};

// * LoginSignUpProp
export type TLoginSignUpNavProps = StackScreenProps<
  StackParamsList,
  "LoginSignUp"
>;

// * Export all types as one type
export type TAllNavProps = TLoginSignUpNavProps;
