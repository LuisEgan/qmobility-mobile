import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface IOnboarding {}

const Onboarding = (props: IOnboarding) => {
  const {} = props;

  return (
    <View style={styles.container}>
      <Text>OnBoarding </Text>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {},
});
