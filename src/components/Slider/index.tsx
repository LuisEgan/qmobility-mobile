import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import slides from "./slides";
import Slide from "./Slide";

const { width } = Dimensions.get("window");

const { ScrollView } = Animated;

interface ISlider {}

const Slider = (props: ISlider) => {
  const {} = props;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {slides.map((props) => (
          <Slide {...props} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "blue",
    padding: 30,
  },
});
