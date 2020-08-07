import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { Text, Theme } from "../../config/Theme";
import { useTheme } from "@shopify/restyle";

interface IInput {
  onChange: (str: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  defaultValue?: string;
  isPassword?: boolean;
  error?: string;
  touched?: boolean;
}

const Input = (props: IInput) => {
  const {
    onChange,
    onBlur,
    placeholder,
    defaultValue,
    isPassword,
    error,
    touched,
  } = props;

  const theme = useTheme<Theme>();

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.inputStyle,
          {
            borderBottomColor: theme.colors.defautlInput,
          },
        ]}
        onChangeText={(str: string) => onChange(str)}
        placeholderTextColor={theme.colors.defautlInput}
        secureTextEntry={isPassword}
        {...{ defaultValue, placeholder, onBlur }}
      />

      {error && touched && (
        <View style={styles.error}>
          <Text variant="error">{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    marginBottom: 10,
  },
  viewStyle: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 15,
  },
  inputStyle: {
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",

    borderWidth: 1,
    width: "100%",
    fontSize: 20,
    height: 50,
  },
  error: {
    position: "absolute",
    left: 0,
    bottom: -20,
  },
});
