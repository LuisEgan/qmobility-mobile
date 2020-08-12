import React, { useEffect } from "react";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import * as FacebookExpo from "expo-facebook";
import Icons from "../svg";
import {
  ILongWithFacebook,
  ILongWithFacebookVars,
} from "../../gql/User/mutations";
import { ERRORS } from "../../lib/constants";
import { User } from "../../gql";

const Facebook = () => {
  const [fbLogin, { data: fbData }] = useMutation<
    { fbLogin: ILongWithFacebook },
    ILongWithFacebookVars
  >(User.mutations.loginWithFacebook);

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
      alert(message);
    }
  };

  return <Icons icon="Facebook" onPress={login} />;
};

export default Facebook;
