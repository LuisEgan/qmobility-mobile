import React, { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import * as FacebookExpo from "expo-facebook";
import Icons from "../svg";
import { ERRORS } from "../../lib/constants";
import { User } from "../../gql";
import {
  ISocialNetworkLogin,
  ISocialNetworkLoginVars,
} from "../../gql/User/mutations";
import { AuthContext } from "../../navigation/AuthContext";

const Facebook = () => {
  const { signIn } = useContext(AuthContext);

  const [fbLogin, { data: fbData }] = useMutation<
    { loginWithFacebook: ISocialNetworkLogin },
    ISocialNetworkLoginVars
  >(User.mutations.loginWithFacebook);

  useEffect(() => {
    if (fbData) {
      const doSignIn = async () => {
        try {
          signIn(fbData.loginWithFacebook.accessToken);
        } catch (error) {
          console.error("error: ", error);
        }
      };

      doSignIn();
    }
  }, [fbData]);

  const login = async () => {
    try {
      // TODO facebook appId on .env
      await FacebookExpo.initializeAsync("764850257614217", "cleverit");
      const loginResult = await FacebookExpo.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
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
