import React, { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";
import Icons from "../svg";
import {
  ISocialNetworkLogin,
  ISocialNetworkLoginVars,
} from "../../gql/User/mutations";
import { User } from "../../gql";
import { AuthContext } from "../../navigation/AuthContext";

const isIOS = Platform.OS === "ios";

const Apple = () => {
  const { signIn } = useContext(AuthContext);

  const [appleLogin, { data: appleData }] = useMutation<
    { loginWithApple: ISocialNetworkLogin },
    ISocialNetworkLoginVars
  >(User.mutations.loginWithApple);

  useEffect(() => {
    if (appleData) {
      const doSignIn = async () => {
        try {
          signIn(appleData.loginWithApple.accessToken);
        } catch (error) {
          console.error("error: ", error);
        }
      };

      doSignIn();
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
      console.warn("TCL: login -> error", error);
    }
  };

  return isIOS ? <Icons icon="Apple" onPress={login} /> : null;
};

export default Apple;
