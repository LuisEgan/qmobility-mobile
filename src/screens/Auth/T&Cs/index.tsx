import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

interface ITCs {}

const TCs = (props: ITCs) => {
  const {} = props;

  const text = () => {
    let t = "";

    for (let i = 0; i < 500; i++) {
      t += "aaaaaaaaa";
    }

    return t;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text>{text()}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}></View>
    </View>
  );
};

export default TCs;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  scroll: {
    flex: 1,
    padding: 20,
  },

  buttonContainer: {
    flex: 0.2,
    padding: 20,
    backgroundColor: "red",
  },
});
