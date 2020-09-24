import { gql } from "@apollo/client";
import { LinkedInToken } from "react-native-linkedin";
import { IIceVehicle } from "../Vehicle/Types";

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

export interface IResendEmailVars {
  email: string;
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

const resendEmailConfirmation = gql`
  mutation ResendEmailConfirmation($email: String!) {
    reSendEmailConfirmation(email: $email)
  }
`;

export interface IUpdateUser {
  name?: string;
  lastname?: string;
  dateOfBirth?: Date;
  email?: string;
  selectedVehicle?: number;
  avatarUrl?: string;
  iceVehicle?: IIceVehicle;
}

const updateUser = gql`
  mutation UpdateUser(
    $name: String
    $lastname: String
    $email: String
    $username: String
    $avatarUrl: String
    $dateOfBirth: DateTime
    $selectedVehicle: Float
    $iceVehicle: IceVehicle
  ) {
    updateUser(
      updateProfileInput: {
        name: $name
        lastname: $lastname
        email: $email
        username: $username
        avatarUrl: $avatarUrl
        dateOfBirth: $dateOfBirth
        selectedVehicle: $selectedVehicle
        iceVehicle: $iceVehicle
      }
    ) {
      id
      name
      avatarUrl
      dateOfBirth
      lastname
    }
  }
`;

export default {
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  loginWithApple,
  signUp,
  emailConfirmation,
  resendEmailConfirmation,
  updateUser,
};
