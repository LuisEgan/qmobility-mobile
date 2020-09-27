import React, { FC } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import theme, { Text } from "../../../config/Theme";
import { IComponentsDefaults } from "../../../lib/Types";

const { height } = Dimensions.get("window");

export interface IDisplayFeedbackScreen {
  setDisplayFeedbackScreen: (display: boolean) => void;
  setFeedbackMessage?: (mssg: string) => void;
}

interface IFullScreenModal extends IComponentsDefaults {
  show: boolean;
  message?: string;
}

const FullScreenModal: FC<IFullScreenModal> = (props) => {
  const { children, containerStyle, show, message = "Loading..." } = props;

  const transition = useTransition(show, { duration: 100 });
  const translateY = mix(transition, height, 0);

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        styles.staticContainerStyles,
        { transform: [{ translateY }] },
      ]}
    >
      {children || (
        <Text color="primary" variant="heading1">
          {message}
        </Text>
      )}
    </Animated.View>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({
  staticContainerStyles: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },

  container: {
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
