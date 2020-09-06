import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { Header, Slider, Button } from "../../../components";
import slides from "./slides";
import { Theme } from "../../../config/Theme";
import { ESlide } from "../../../components/Slider/Slide";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { height, width } = Dimensions.get("window");

const ProfileScroll = () => {
  const { navigate } = useNavigation();

  const theme = useTheme<Theme>();

  return (
    <View style={styles.container}>
      <Header
        title="Create my Profile"
        subTitle="Add your personal traits"
        containerStyle={{
          backgroundColor: theme.colors.secondaryLighter,
        }}
      />

      <Slider
        type={ESlide.Cards}
        {...{ slides, width, height: height * 0.74 }}
      />

      <Button
        label="GO"
        onPress={() => navigate(APP_STACK_SCREENS_NAMES.CheckCar)}
      />
    </View>
  );
};
export default ProfileScroll;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
