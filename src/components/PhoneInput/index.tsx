import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Phone from "react-native-phone-number-input";
import { Text } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";
import { CountryCode } from "./Types";

interface IPhoneInput extends IComponentsDefaults {
  defaultValue?: string;
  label?: string;
  value?: string;
  onChangeText?: (str: string) => void;
  onChangeFormattedText?: (str: string) => void;
  defaultCode?: CountryCode;
  error?: string;
  onIsInvalid?: (phone: string | number) => void;
  disabled?: boolean;
}

const PhoneInput = (props: IPhoneInput) => {
  const {
    containerStyle,
    defaultValue,
    label = "Phone number",
    value,
    onChangeText: onChangeTextProp,
    onChangeFormattedText,
    defaultCode = "GB",
    error,
    onIsInvalid,
    disabled,
  } = props;

  const phoneInput = useRef<Phone>(null);
  const [phone, setPhone] = useState<string>(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setPhone(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (onChangeTextProp) onChangeTextProp(phone);
    if (onChangeFormattedText) {
      onChangeFormattedText(phone);
    }
  }, []);

  const onChangeText = (str: string) => {
    if (onChangeTextProp) {
      onChangeTextProp(str);
    }

    setPhone(str);
  };

  const onChangePhone = (p: string) => {
    if (onChangeFormattedText) onChangeFormattedText(p);

    const isValid = phoneInput.current?.isValidNumber(+p);
    if (!isValid && onIsInvalid) {
      onIsInvalid(p);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {disabled && <View style={styles.disabledContainer} />}
      <Text variant="bodySmall">{label}</Text>
      <Phone
        disableArrowIcon={disabled}
        defaultValue={value || phone}
        ref={phoneInput}
        onChangeText={onChangeText}
        onChangeFormattedText={onChangePhone}
        defaultCode={defaultCode}
      />
      {!!error && <Text variant="error">{error}</Text>}
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: { marginVertical: 10 },

  disabledContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
  },
});
