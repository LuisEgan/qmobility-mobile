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
import { IComponentsDefaults } from "../../lib/Types";

interface IInput extends IComponentsDefaults {
  onChange: (str: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  defaultValue?: string;
  isPassword?: boolean;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
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
    containerStyle,
    disabled,
  } = props;

  const theme = useTheme<Theme>();

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.inputStyle,
          {
            borderBottomColor: theme.colors.defautlInput,
          },
        ]}
        editable={!disabled}
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

Input.defaultProps = {
  disabled: false,
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
    marginBottom: 10,
  },
  viewStyle: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 15,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 40,
  },
  error: {
    position: "absolute",
    left: 0,
    bottom: -20,
  },
});
