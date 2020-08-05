import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Theme } from "../../../config/Theme";
import { useTheme } from "@shopify/restyle";

interface IOnboarding {}

const Onboarding = (props: IOnboarding) => {
  const {} = props;

  const theme = useTheme<Theme>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="subtitle">AAAAAAYE</Text>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {},
});
