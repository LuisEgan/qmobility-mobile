import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Theme } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";

interface IInput extends IComponentsDefaults {
  onChange: (str: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onForgotPass?: () => void;
  placeholder?: string;
  defaultValue?: string;
  isPassword?: boolean;
  isSignUp?: boolean;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const Input = (props: IInput) => {
  const {
    onChange,
    onBlur,
    onForgotPass,
    placeholder,
    defaultValue,
    isPassword,
    isSignUp,
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

      {isPassword && !isSignUp && (
        <View style={styles.forgotPass}>
          <TouchableOpacity onPress={onForgotPass}>
            <Text variant="bodyHighlight">Forgot?</Text>
          </TouchableOpacity>
        </View>
      )}

      {error && touched && (
        <View
          style={[
            styles.error,
            { bottom: error.length >= 50 ? "-100%" : "-50%" },
          ]}
        >
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
    padding: 10,
  },
  error: {
    position: "absolute",
    left: 0,
  },
  forgotPass: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "white",
    height: "80%",
    paddingHorizontal: 5,
  },
});
