import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Theme } from "../../config/Theme";
import { useTheme } from "@shopify/restyle";
import { IComponentsDefaults } from "../../lib/Types";
import { Icons } from "..";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
interface IInputSearch extends IComponentsDefaults {
  onChange: (str: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

const InputSearch = (props: IInputSearch) => {
  const { onChange, placeholder, defaultValue, containerStyle } = props;

  const { goBack } = useNavigation();

  const theme = useTheme<Theme>();

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={styles.contentIconsLeft}
      >
        <View style={styles.viewLeft}>
          <Icons icon="ArrowBackLight" />
        </View>
      </TouchableOpacity>
      <TextInput
        onChangeText={(str: string) => onChange(str)}
        placeholderTextColor={theme.colors.defautlInput}
        {...{ defaultValue, placeholder }}
        style={styles.inputStyle}
      />
      <TouchableOpacity style={styles.contentIconsRight}>
        <Icons icon="Mic" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    marginTop: "10%",
    marginBottom: "5%",
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
  inputStyle: {
    width: width * 0.6,
  },
  contentIconsRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
