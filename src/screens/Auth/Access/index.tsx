import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "../../../components/";
import { useNavigation } from "@react-navigation/native";

interface IAccess {}

const image = { uri: "https://reactjs.org/logo-og.png" };

const Access = (props: IAccess) => {
  const {} = props;

  const navigation = useNavigation();

  const goView = (type: number): void => {
    navigation.navigate("LoginSignUp", {
      state: type,
    });
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentButton}>
            <View style={styles.ButtonStyle}>
              <Button
                margin={"20%"}
                variant="primary"
                onPress={() => goView(0)}
                label="SIGN UP"
              />
            </View>
            <View style={styles.ButtonStyle}>
              <Button
                margin={"20%"}
                variant="secondary"
                onPress={() => goView(1)}
                label="LOGIN"
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
