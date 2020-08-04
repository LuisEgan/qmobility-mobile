import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface ITCs {}

const TCs = (props: ITCs) => {
  const {} = props;

  return (
    <View style={styles.container}>
      <Text>TCs</Text>
    </View>
  );
};

export default TCs;

const styles = StyleSheet.create({
  container: {},
});
