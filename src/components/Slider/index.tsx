import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, { divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash";
import Slide, { ISlide } from "./Slide";
import PaginationDot from "./PaginationDot";

interface ISlider {
  slides: ISlide[];
  styles?: ViewStyle;
  width: number;
  height: number;
}

const Slider = (props: ISlider) => {
  const { styles: stylesProp, slides, width, height } = props;

  const { scrollHandler, x } = useScrollHandler();

  return (
    <View style={[styles.container, stylesProp, { width, height }]}>
      <Animated.ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        {...scrollHandler}
      >
        {slides.map(
          (
            { title, text, icon, backgroundColor, titleColor, textColor },
            index
          ) => (
            <Slide
              key={title}
              {...{
                title,
                text,
                icon,
                index,
                backgroundColor,
                titleColor,
                textColor,
                currentIndex: divide(x, width),
              }}
            />
          )
        )}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <PaginationDot
            key={index}
            currentIndex={divide(x, width)}
            {...{ index }}
          />
        ))}
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {},

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
