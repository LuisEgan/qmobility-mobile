import React from "react";
import { View, StyleSheet, StyleProp, TextStyle } from "react-native";
import theme, { Text } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";

type TUnits = "mi" | "km" | "kWh" | "h" | "mph" | "£";

interface ITextWithUnit extends IComponentsDefaults {
  text: string;
  textColor?: string;
  unit?: TUnits;
  textVariant?: string;
  unitTextVariant?: string;
  unitTextColor?: string;
  inverse?: boolean;
  unitTextStyle?: StyleProp<TextStyle>;
}

const TextWithUnit = (props: ITextWithUnit) => {
  const {
    containerStyle,
    unitTextStyle,
    text,
    inverse,
    unit = "mi",
    textColor = theme.colors.white,
    textVariant = "heading1",
    unitTextVariant = "body",
    unitTextColor = theme.colors.white,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {inverse ? (
        <>
          <Text
            variant={unitTextVariant}
            color={unitTextColor}
            style={[styles.unitText, unitTextStyle]}
          >
            {unit}
            {" "}
          </Text>

          <Text variant={textVariant} color={textColor}>
            {text}
          </Text>
        </>
      ) : (
        <>
          <Text variant={textVariant} color={textColor}>
            {text}
          </Text>
          <Text
            variant={unitTextVariant}
            color={unitTextColor}
            style={[styles.unitText, unitTextStyle]}
          >
            {" "}
            {unit}
          </Text>
        </>
      )}
    </View>
  );
};

export default TextWithUnit;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  unitText: {
    opacity: 0.5,
    marginBottom: 3,
  },
});
