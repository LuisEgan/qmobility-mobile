import React from "react";
import { View, StyleSheet } from "react-native";

interface IApple {}

const Apple = (props: IApple) => {
  const {} = props;

  return <View style={styles.container}></View>;
};

export default Apple;

const styles = StyleSheet.create({
  container: {},
});
