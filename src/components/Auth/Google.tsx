import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import * as GoogleExpo from "expo-google-app-auth";
import Icons from "../svg";
import {
  ISocialNetworkLogin,
  ISocialNetworkLoginVars,
} from "../../gql/User/mutations";
import { User } from "../../gql";
import { ERRORS } from "../../lib/constants";

const Google = () => {
  const [googleLogin, { data: googleData }] = useMutation<
    { googleLogin: ISocialNetworkLogin },
    ISocialNetworkLoginVars
  >(User.mutations.loginWithGoogle);

  useEffect(() => {
    if (googleData) {
      console.log("googleData: ", googleData);
    }
  }, [googleData]);

  const login = async () => {
    try {
      const loginResult = await GoogleExpo.logInAsync({
        iosStandaloneAppClientId:
          "441334312883-1bcm6hgch36j0k75radv8m7pkk8ml9sj.apps.googleusercontent.com",
        androidStandaloneAppClientId:
          "441334312883-o079065rju6mejq52fgpir6vrt58phmq.apps.googleusercontent.com",
        scopes: [],
      });

      if (loginResult.type === "success") {
        googleLogin({
          variables: {
            accessToken: loginResult.accessToken as string,
          },
        });
      } else {
        throw new Error(ERRORS.LOGIN_FAILED);
      }
    } catch (error) {
      alert(error);
    }
  };

  return <Icons icon="Google" onPress={login} />;
};

export default Google;
