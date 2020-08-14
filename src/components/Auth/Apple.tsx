import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import * as AppleAuthentication from "expo-apple-authentication";
import Icons from "../svg";
import {
  ISocialNetworkLogin,
  ISocialNetworkLoginVars,
} from "../../gql/User/mutations";
import { User } from "../../gql";
import { Platform } from "react-native";

const isIOS = Platform.OS === "ios";

const Apple = () => {
  const [appleLogin, { data: appleData }] = useMutation<
    { appleLogin: ISocialNetworkLogin },
    ISocialNetworkLoginVars
  >(User.mutations.loginWithApple);

  useEffect(() => {
    if (appleData) {
      console.log("appleData: ", appleData);
    }
  }, [appleData]);

  const login = async () => {
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (identityToken) {
        appleLogin({
          variables: {
            accessToken: identityToken,
          },
        });
      }
    } catch (error) {
      console.log("TCL: login -> error", error);
    }
  };

  return isIOS ? <Icons icon="Apple" onPress={login} /> : null;
};

export default Apple;
