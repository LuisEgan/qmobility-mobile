import { gql } from "@apollo/client";

export interface ILongWithFacebook {
  accessToken: string;
}
export interface ILongWithFacebookVars {
  accessToken: string;
}
const loginWithFacebook = gql`
    mutation LoginWithFacebook($accessToken: String!) {
        loginWithFacebook(
            socialNetworkLogInInput: {
                accessToken: $accessToken:
            }
        ) {
            accessToken
        }
    }
`;

const loginWithGoogle = gql``;

export default {
  loginWithFacebook,
  loginWithGoogle,
};
