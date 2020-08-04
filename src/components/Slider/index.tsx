import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");

const { ScrollView } = Animated;

interface ISlider {}

const Slider = (props: ISlider) => {
  const {} = props;

  return (
    <View style={styles.container}>
      <ScrollView horizontal></ScrollView>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {},
});
