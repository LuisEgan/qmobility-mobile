import React from "react";
import { StyleSheet } from "react-native";
import * as FacebookExpo from "expo-facebook";
import Icons from "../svg";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import {
  ILongWithFacebook,
  ILongWithFacebookVars,
} from "../../gql/User/mutations";
import { User } from "../../gql";
import { ERRORS } from "../../lib/constants";

const Facebook = () => {
  const [
    fbLogin,
    { data: fbData, loading: fbLoading, error: fbError },
  ] = useMutation<{ fbLogin: ILongWithFacebook }, ILongWithFacebookVars>(
    User.mutations.loginWithFacebook
  );

  console.log("fbError: ", fbError);
  console.log("fbLoading: ", fbLoading);
  console.log("fbData: ", fbData);

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

const styles = StyleSheet.create({
  container: {},
});
