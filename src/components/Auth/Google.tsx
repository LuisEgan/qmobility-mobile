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
          "69703201369-6lqjlkadpv8hh2ji4rg53g8mnd4kk7df.apps.googleusercontent.com",
        androidStandaloneAppClientId:
          "69703201369-872et3pp11lgsomheffnskvmp2u8o24e.apps.googleusercontent.com",
        scopes: ["profile", "email"],
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
