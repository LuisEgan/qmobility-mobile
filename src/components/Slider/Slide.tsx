import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export interface ISlide {
  title: string;
  text: string;
  icon: any;
}

const Slide = (props: ISlide) => {
  const { title, text, icon } = props;

  return (
    <View style={styles.container}>
      <Image source={icon}></Image>
      <Text>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "red",
  },
});
