import { gql } from "@apollo/client";

// * Facebook Login
export interface ILongWithFacebook {
  accessToken: string;
}
export interface ILongWithFacebookVars {
  accessToken: string;
}

const loginWithFacebook = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Google Login

const loginWithGoogle = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * LinkedIn Login

const loginWithLinkedIn = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

// * Apple Login

const loginWithApple = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(socialNetworkLogInInput: { accessToken: $accessToken }) {
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
