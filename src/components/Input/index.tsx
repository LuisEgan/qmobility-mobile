import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

interface IInput {
  placeholder?: string;
  defaultValue?: string;
  isPassword?: boolean;
  onChange: (str: string) => void;
}

const Input = (props: IInput) => {
  const { placeholder, defaultValue, isPassword, onChange } = props;

  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={styles.inputStyle}
        secureTextEntry={isPassword}
        onChangeText={(str: string) => onChange(str)}
        placeholderTextColor={"#d4d4d5"}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
    marginBottom: 10,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#d4d4d5",
    borderWidth: 1,
  },
  viewStyle: {
    width: "85%",
    alignSelf: "center",
    marginVertical: 15,
  },
  inputStyle: {
    width: "90%",
    fontSize: 20,
    height: 30,
  },
});
