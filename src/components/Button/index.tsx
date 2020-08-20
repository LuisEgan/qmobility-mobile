import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Text, Theme } from "../../config/Theme";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";

export type TVariant = "default" | "primary" | "secondary";

interface IButton {
  label: string;
  onPress: () => void;
  variant?: TVariant;
  iconRight?: TIcon;
  iconLeft?: TIcon;
  containerStyle?: StyleProp<ViewStyle>;
}

const Button = (props: IButton) => {
  const {
    onPress,
    label,
    variant,
    iconRight,
    iconLeft,
    containerStyle,
  } = props;

  const theme = useTheme<Theme>();

  const setRectButtonStyle = () => {
    switch (variant) {
      case "primary":
        return theme.colors.primaryButton;
      case "secondary":
        return theme.colors.secondaryButton;
      default:
        return theme.colors.defaultButton;
    }
  };

  return (
    <View style={containerStyle}>
      <RectButton
        onPress={() => onPress()}
        style={[
          styles.btnStyle,
          {
            backgroundColor: setRectButtonStyle(),
          },
        ]}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "center" }}
          accessible
        >
          {iconLeft && <Icons size={22} icon={iconLeft} fill="#fff" />}
          <Text variant="button">
            {" "}
            {label}
            {" "}
          </Text>
          {iconRight && <Icons size={22} icon={iconRight} fill="#fff" />}
        </View>
      </RectButton>
    </View>
  );
};

Button.defaultProps = {
  variant: "default",
};

export default Button;

const styles = StyleSheet.create({
  btnStyle: {
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
  },
});
