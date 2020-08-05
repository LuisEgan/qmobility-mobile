import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Slider } from "../../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../../../config/Theme";
import { useNavigation } from "@react-navigation/native";
import { AUTH_STACK_SCREENS_NAME } from "../../../navigation/AuthNavigator";
import slides from "./slides";

const { height, width } = Dimensions.get("window");

interface IOnboarding {}

const Onboarding = (props: IOnboarding) => {
  const {} = props;

  const { navigate } = useNavigation();

  const skip = () => {
    navigate(AUTH_STACK_SCREENS_NAME.TCs);
  };

  return (
    <View style={[styles.container]}>
      <Slider {...{ slides, width: width * 0.9, height: height * 0.85 }} />

      <TouchableOpacity onPress={skip}>
        <Text variant="regular" color="primary" fontWeight="bold">
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
