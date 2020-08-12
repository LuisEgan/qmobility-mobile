import { gql } from "@apollo/client";
import { LinkedInToken } from "react-native-linkedin";

export interface ISocialNetworkLogin {
  accessToken: string;
}
export interface ISocialNetworkLoginVars {
  accessToken: string | LinkedInToken;
}

// * Facebook Login
const loginWithFacebook = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Google Login
const loginWithGoogle = gql`
  mutation LoginWithGoogle($accessToken: String!) {
    loginWithGoogle(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * LinkedIn Login
const loginWithLinkedIn = gql`
  mutation LoginWithLinkedIn($accessToken: String!) {
    loginWithLinkedIn(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Apple Login
const loginWithApple = gql`
  mutation LoginWithApple($accessToken: String!) {
    loginWithApple(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

export default {
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  loginWithApple,
};
