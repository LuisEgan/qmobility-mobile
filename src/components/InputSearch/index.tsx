import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";
import Icons from "../svg";
import { TIcon } from "../svg/icons/TypeIcons";

interface IInputSearch extends IComponentsDefaults {
  onChange: (str: string) => void;
  onVoiceCommand?: () => void;
  placeholder?: string;
  defaultValue?: string;
  leftIcon?: TIcon;
  onLeftIconPress?: () => void;
}

const InputSearch = (props: IInputSearch) => {
  const {
    onChange,
    placeholder,
    defaultValue,
    containerStyle,
    leftIcon,
    onLeftIconPress,
  } = props;

  const { goBack } = useNavigation();

  const theme = useTheme<Theme>();

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={onLeftIconPress || goBack}
        style={styles.contentIconsLeft}
      >
        <View style={styles.viewLeft}>
          <Icons icon={leftIcon} />
        </View>
      </TouchableOpacity>
      <TextInput
        onChangeText={(str: string) => onChange(str)}
        placeholderTextColor={theme.colors.defautlInput}
        {...{ defaultValue, placeholder }}
      />
      <TouchableOpacity style={styles.contentIconsRight}>
        <Icons icon="Mic" size={30} />
      </TouchableOpacity>
    </View>
  );
};

InputSearch.defaultProps = {
  leftIcon: "ArrowBackLight",
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#fff",
    fontSize: 16,
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  contentIconsLeft: {
    marginVertical: 10,
    justifyContent: "center",
  },
  viewLeft: {
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  contentIconsRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
