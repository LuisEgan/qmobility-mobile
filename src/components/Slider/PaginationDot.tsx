import React from "react";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";
import { Theme } from "../../config/Theme";

interface IPaginationDot {
  index: number;
  currentIndex: Animated.Node<number>;
}

const PaginationDot = (props: IPaginationDot) => {
  const { index, currentIndex } = props;
  const theme = useTheme<Theme>();

  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity,
          backgroundColor: theme.colors.primary,
        },
      ]}
    />
  );
};

export default PaginationDot;

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
});
