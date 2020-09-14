import { gql } from "@apollo/client";
import { LinkedInToken } from "react-native-linkedin";

export interface IAuthResponse {
  accessToken: string;
}
export interface ISocialNetworkVars {
  accessToken: string | LinkedInToken;
}

export interface IEmailSignUpVars {
  email: string;
  password: string;
}

// * Facebook Login
const loginWithFacebook = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(facebookLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Google Login
const loginWithGoogle = gql`
  mutation LoginWithGoogle($accessToken: String!) {
    loginWithGoogle(googleLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * LinkedIn Login
const loginWithLinkedIn = gql`
  mutation LoginWithLinkedIn($accessToken: String!) {
    loginWithLinkedIn(linkedinLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Apple Login
const loginWithApple = gql`
  mutation LoginWithApple($accessToken: String!) {
    loginWithApple(appleLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

export interface IEmailConfirmation {}
export interface IEmailConfirmationVars {
  email: string;
  random4digits: number;
}

// * Email sign up
const signUp = gql`
  mutation EmailSignUp($email: String!, $password: String!) {
    signup(signUpInput: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

const emailConfirmation = gql`
  mutation EmailConfirmation($email: String!, $random4digits: Float!) {
    emailConfirmation(
      emailConfirmationInput: { email: $email, random4digits: $random4digits }
    )
  }
`;

export default {
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  loginWithApple,
  signUp,
  emailConfirmation,
};
