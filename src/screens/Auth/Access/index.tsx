import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../../../components/";
import { useNavigation } from "@react-navigation/native";

interface IAccess {}

const Access = (props: IAccess) => {
  const {} = props;

  const navigation = useNavigation();

  const goView = (type: number): void => {
    navigation.navigate("LoginSingUp", {
      state: type,
    });
  };

  return (
    <View style={styles.container}>
      <Button variant="primary" onPress={() => goView(0)} label="SING UP" />
      <Button variant="secondary" onPress={() => goView(1)} label="LOGIN" />
    </View>
  );
};

export default Access;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
