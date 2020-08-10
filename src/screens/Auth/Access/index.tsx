import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "../../../components/";
import { useNavigation } from "@react-navigation/native";
import { AUTH_STACK_SCREENS_NAME } from "../../../navigation/constants";

interface IAccess {}

const image = { uri: "https://reactjs.org/logo-og.png" };

const Access = (props: IAccess) => {
  const {} = props;

  const { navigate } = useNavigation();

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentButton}>
            <View style={styles.ButtonStyle}>
              <Button
                margin={"20%"}
                variant="primary"
                onPress={() =>
                  navigate(AUTH_STACK_SCREENS_NAME.LoginSignUp, {
                    screen: AUTH_STACK_SCREENS_NAME.SignUp,
                    from: 1,
                  })
                }
                label="SIGN UP"
                containerStyle={{ marginHorizontal: "10%" }}
              />
            </View>
            <View style={styles.ButtonStyle}>
              <Button
                margin={"20%"}
                variant="secondary"
                onPress={() =>
                  navigate(AUTH_STACK_SCREENS_NAME.LoginSignUp, {
                    screen: AUTH_STACK_SCREENS_NAME.Login,
                    from: 0,
                  })
                }
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
