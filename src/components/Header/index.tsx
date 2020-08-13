import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text, Theme } from "../../config/Theme";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";

interface IHeader {
  onPress?: () => void;
  title?: string;
  subTitle?: string;
  icon?: TIcon;
  height?: number;
  containerStyle: StyleProp<ViewStyle>;
}

const { width, height } = Dimensions.get("window");

const Header = (props: IHeader) => {
  const {
    height: heightProp,
    onPress,
    title,
    subTitle,
    icon,
    containerStyle,
  } = props;

  const theme = useTheme<Theme>();
  const containerHeight = heightProp ? { height: heightProp } : {};

  return (
    <View
      style={[
        styles.container,
        {
          ...containerHeight,
          backgroundColor: theme.colors.white,
        },
        containerStyle,
      ]}
    >
      {icon &&
        (onPress ? (
          <View style={styles.iconStyle}>
            <TouchableOpacity
              onPress={() => onPress()}
              style={styles.touchableOpacityStyle}
            >
              <Icons size={30} icon={icon} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconStyle}>
            <Icons size={30} icon={icon} />
          </View>
        ))}
      <View style={styles.contentStyle}>
        <View style={styles.viewStyle}>
          {title && <Text variant="heading1">{title}</Text>}
          {subTitle && <Text variant="subheadingLight">{subTitle}</Text>}
        </View>
      </View>
    </View>
  );
};

export default Header;

const heightPor = Platform.OS === "ios" ? 0.21 : 0.23;

const styles = StyleSheet.create({
  container: {
    height: height * heightPor,
  },
  touchableOpacityStyle: {
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 30,
  },
  iconStyle: {
    position: "absolute",
    elevation: 1,
    zIndex: 1,
    top: height * 0.05,
    left: width * 0.05,
  },
  contentStyle: {
    width: width,
    height: height * 0.21,
    justifyContent: "center",
  },
  viewStyle: {
    marginTop: width * 0.1,
    marginHorizontal: width * 0.05,
  },
  btnStyle: {
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
  },
});
