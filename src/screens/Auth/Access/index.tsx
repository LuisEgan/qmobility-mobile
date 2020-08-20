import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../../components";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";

const image = { uri: "https://reactjs.org/logo-og.png" };

const Access = () => {
  const { navigate } = useNavigation();

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentButton}>
            <View style={styles.ButtonStyle}>
              <Button
                variant="primary"
                onPress={() =>
                  navigate(AUTH_STACK_SCREENS_NAMES.LoginSignUp, {
                    screen: AUTH_STACK_SCREENS_NAMES.SignUp,
                    from: 1,
                  })}
                label="SIGN UP"
                containerStyle={{ marginHorizontal: "10%" }}
              />
            </View>
            <View style={styles.ButtonStyle}>
              <Button
                variant="secondary"
                onPress={() =>
                  navigate(AUTH_STACK_SCREENS_NAMES.LoginSignUp, {
                    screen: AUTH_STACK_SCREENS_NAMES.Login,
                    from: 0,
                  })}
                label="LOGIN"
                containerStyle={{ marginHorizontal: "10%" }}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Access;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    width: "100%",
    height: "100%",
  },
  contentButton: {
    position: "absolute",
    bottom: "15%",
    left: 0,
    right: 0,
  },
  ButtonStyle: {
    marginVertical: "2%",
  },
});
