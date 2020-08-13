import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../config/Theme";
import DrawerMenu from "../../../components/HOCs/DrawerMenu";

interface IMain {}

const Main = (props: IMain) => {
  const {} = props;

  return (
    <DrawerMenu>
      <View style={styles.container}>
        <Text variant="heading1">AYYE</Text>
      </View>
    </DrawerMenu>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {},
});
