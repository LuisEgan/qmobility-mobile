import React from "react";
import { View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Text, Theme } from "../../config/Theme";
import { useTheme } from "@shopify/restyle";

export type TVariant = "default" | "primary" | "secondary";

interface IButton {
  label: string;
  onPress: () => void;
  variant?: TVariant;
}

const Button = (props: IButton) => {
  const { label, onPress, variant } = props;

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
    <View style={styles.container}>
      <RectButton
        onPress={() => onPress()}
        style={[styles.btnStyle, { backgroundColor: setRectButtonStyle() }]}
      >
        <View accessible>
          <Text variant="button">{label}</Text>
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
