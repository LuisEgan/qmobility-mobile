import React, { PropsWithChildren } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IComponentsDefaults } from "../../lib/Types";
import Icons from "../svg";
import { TIcon } from "../svg/icons/TypeIcons";
import { APP_STACK_SCREENS_NAMES } from "../../lib/constants";

interface IInputSearch extends IComponentsDefaults {
  onChange?: (str: string) => void;
  onVoiceCommand?: () => void;
  placeholder?: string;
  defaultValue?: string;
  leftIcon?: TIcon;
  onLeftIconPress?: () => void;
}

const InputSearch = (props: PropsWithChildren<IInputSearch>) => {
  const {
    placeholder,
    defaultValue,
    containerStyle,
    leftIcon,
    onLeftIconPress,
    children,
  } = props;

  const { goBack, navigate } = useNavigation();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <TouchableOpacity
          onPress={onLeftIconPress || goBack}
          style={styles.contentIconsLeft}
        >
          <View style={styles.viewLeft}>
            <Icons icon={leftIcon} />
          </View>
        </TouchableOpacity>
        {children || (
          <TouchableOpacity
            // onChangeText={(str: string) => onChange && onChange(str)}
            // placeholderTextColor={theme.colors.defautlInput}
            {...{ defaultValue, placeholder }}
            style={styles.inputStyle}
            onPress={() => navigate(APP_STACK_SCREENS_NAMES.SearchRouter)}
          />
        )}
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    flex: 0.1,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
  },
});
