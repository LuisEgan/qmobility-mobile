import React from "react";
import { View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Text, Theme } from "../../config/Theme";
import { useTheme } from "@shopify/restyle";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";
export type TVariant = "default" | "primary" | "secondary";

interface IButton {
  label: string;
  onPress: () => void;
  variant?: TVariant;
  margin?: number | string;
  iconRight?: TIcon;
  iconLeft?: TIcon;
}

const Button = (props: IButton) => {
  const { onPress, label, variant, margin, iconRight, iconLeft } = props;

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
    <View
      style={{
        marginHorizontal: margin,
      }}
    >
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
          <Text variant="button"> {label} </Text>
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
  container: {
    marginHorizontal: "10%",
  },
  btnStyle: {
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
  },
});
