import React from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import theme, { Text } from "../../config/Theme";

export interface ISlide {
  title: string;
  text: string;
  imgSource?: ImageSourcePropType;
  svgIcon?: JSX.Element;
  width?: number;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
}

interface ISLideProps extends ISlide {
  index: number;
  currentIndex: Animated.Node<number>;
}
const Slide = (props: ISLideProps) => {
  const {
    title,
    text,
    imgSource,
    svgIcon,
    width,
    index,
    currentIndex,
    titleColor,
    textColor,
    backgroundColor,
  } = props;

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.8, 1, 0.8],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateX = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [-95, 0, 95],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View
        style={[
          styles.content,
          {
            backgroundColor,
            transform: [
              {
                scale,
              },
              {
                translateX,
              },
            ],
          },
        ]}
      >
        {imgSource ? <Image source={imgSource} /> : svgIcon}

        <Text variant="heading1" color={titleColor} style={styles.title}>
          {title}
        </Text>
        <Text variant="body" color={textColor} style={styles.text}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
};

Slide.defaultProps = {
  backgroundColor: theme.colors.primary,
  titleColor: "white",
  textColor: "white",
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },

  content: {
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 25,
    marginBottom: 25,
  },

  text: {
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
});
