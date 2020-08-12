import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Slider } from "../../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../../../config/Theme";
import { useNavigation } from "@react-navigation/native";
import slides from "./slides";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { height, width } = Dimensions.get("window");

interface IOnboarding {}

const Onboarding = (props: IOnboarding) => {
  const {} = props;

  const { navigate } = useNavigation();

  const skip = () => {
    navigate(AUTH_STACK_SCREENS_NAMES.TCs);
  };

  return (
    <View style={[styles.container]}>
      <Slider {...{ slides, width, height: height * 0.85 }} />

      <TouchableOpacity onPress={skip}>
        <Text variant="bodyHighlight" color="primary" fontWeight="bold">
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
