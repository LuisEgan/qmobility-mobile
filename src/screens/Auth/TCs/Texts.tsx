import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../config/Theme";

export const Title = (str: string): JSX.Element => {
  return (
    <Text
      variant="title"
      style={[styles.textScrollStyle, { fontSize: 16 }]}
      color="primary"
    >
      {str}
    </Text>
  );
};

export const textBlack = (str: string): JSX.Element => {
  return (
    <Text variant="title" style={[styles.textScrollStyle, { fontSize: 14 }]}>
      {str}
    </Text>
  );
};

export const textLight = (str: string): JSX.Element => {
  return (
    <Text variant="subtitle" style={[styles.textScrollStyle, { fontSize: 14 }]}>
      {str}
    </Text>
  );
};

export const StepText = (num: number, str: string): JSX.Element => {
  return (
    <View style={styles.stepStyle}>
      <Text
        variant="subtitle"
        style={[styles.textScrollStyle, { fontSize: 14 }]}
      >
        <Text variant="title" style={{ fontSize: 14 }}>
          {`· Step ${num}:  `}
        </Text>
        {str}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stepStyle: {
    marginLeft: 25,
  },
  textScrollStyle: {
    marginBottom: 20,
  },
});
