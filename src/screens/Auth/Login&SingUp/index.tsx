import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from "../../../components/";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../config/Theme";

interface IloginSingUp {}

const LoginSingUp = (props: IloginSingUp) => {
  const {} = props;

  const theme = useTheme<Theme>();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Login = (): void => {
    console.log("LoginSingUp -> emailAddress", emailAddress);
    console.log("LoginSingUp -> password", password);
    console.log("aquio");
  };

  return (
    <View style={styles.container}>
      <Text>LoginSingUp </Text>
      <View
        style={{
          marginTop: "50%",
        }}
      >
        <Input
          placeholder="Email Address"
          onChange={(str) => setEmailAddress(str)}
        />

        <Input
          placeholder="Password"
          isPassword={true}
          onChange={(str) => setPassword(str)}
        />

        <Button variant="secondary" onPress={() => Login()} label="LOG IN" />
      </View>
    </View>
  );
};

export default LoginSingUp;

const styles = StyleSheet.create({
  container: {},
});
