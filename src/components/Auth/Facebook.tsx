import React, { useEffect } from "react";
import * as FacebookExpo from "expo-facebook";
import Icons from "../svg";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import {
  ILongWithFacebook,
  ILongWithFacebookVars,
} from "../../gql/User/mutations";
import { ERRORS } from "../../lib/constants";
import { gql } from "@apollo/client";

const loginWithFacebook = gql`
  mutation LoginWithFacebook($accessToken: String!) {
    loginWithFacebook(socialNetworkLogInInput: { accessToken: $accessToken }) {
      accessToken
    }
  }
`;

const Facebook = () => {
  const [fbLogin, { data: fbData }] = useMutation<
    { fbLogin: ILongWithFacebook },
    ILongWithFacebookVars
  >(loginWithFacebook);

  useEffect(() => {
    if (fbData) {
      console.log("fbData: ", fbData);
    }
  }, [fbData]);

  const login = async () => {
    try {
      // TODO facebook appId on .env
      await FacebookExpo.initializeAsync("493225574911530", "mixo");
      const loginResult = await FacebookExpo.logInWithReadPermissionsAsync({
        permissions: [],
      });

      if (loginResult.type === "success") {
        fbLogin({
          variables: {
            accessToken: loginResult.token,
          },
        });
      } else {
        throw new Error(ERRORS.LOGIN_FAILED);
      }
    } catch ({ message }) {
      console.error("message: ", message);
    }
  };

  return <Icons icon="Facebook" onPress={login} />;
};

export default Facebook;
