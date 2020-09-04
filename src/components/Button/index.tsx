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
  inverse?: boolean;
  enabled?: boolean;
}

const Button = (props: IButton) => {
  const {
    onPress,
    label,
    variant,
    iconRight,
    iconLeft,
    containerStyle,
    inverse,
    enabled = true,
  } = props;

  const theme = useTheme<Theme>();

  const setRectButtonStyle = (): ViewStyle => {
    let backgroundColor = "";
    switch (variant) {
      case "primary":
        backgroundColor = theme.colors.primaryButton;
        break;
      case "secondary":
        backgroundColor = theme.colors.secondaryButton;
        break;
      default:
        backgroundColor = theme.colors.defaultButton;
    }

    return inverse
      ? {
        borderWidth: 1,
        borderColor: backgroundColor,
        backgroundColor: theme.colors.inverseButtonBackground,
      }
      : { backgroundColor };
  };

  return (
    <View
      style={[
        setRectButtonStyle(),
        styles.button,
        styles.buttonContainer,
        containerStyle,
      ]}
    >
      <RectButton
        style={[setRectButtonStyle(), styles.button]}
        onPress={onPress}
        enabled={enabled}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "center" }}
          accessible
        >
          {iconLeft && <Icons size={22} icon={iconLeft} fill="#fff" />}
          <Text variant="button" color={inverse ? `${variant}Button` : "white"}>
            {label}
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
  buttonContainer: { height: 50 },

  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 25,
  },
});
