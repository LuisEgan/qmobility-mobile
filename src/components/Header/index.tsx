import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Text, Theme } from "../../config/Theme";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";

interface IHeader {
  onPress?: () => void;
  onPressRight?: () => void;
  title?: string;
  subTitle?: string;
  icon?: TIcon;
  iconRight?: TIcon;
  text?: string;
  textRight?: string;
  containerStyle?: StyleProp<ViewStyle>;
  height?: number;
}

const { width, height } = Dimensions.get("window");

const Header = (props: IHeader) => {
  const {
    title,
    subTitle,

    onPress,
    icon,
    text,

    onPressRight,
    iconRight,
    textRight,

    containerStyle,
  } = props;

  const theme = useTheme<Theme>();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
          borderBottomColor: theme.colors.grayLight,
        },
        containerStyle,
      ]}
    >
      {(icon || text)
        && (onPress ? (
          <View style={styles.iconStyle}>
            <TouchableOpacity
              onPress={() => onPress()}
              style={styles.touchableOpacityStyle}
            >
              {icon && <Icons size={30} icon={icon} />}
              {text && (
                <Text variant="body" style={styles.text}>
                  {text}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconStyle}>
            {text && (
              <Text variant="body" style={styles.text}>
                {text}
              </Text>
            )}
            {icon && <Icons size={30} icon={icon} />}
          </View>
        ))}
      <View style={styles.contentStyle}>
        <View style={styles.viewStyle}>
          {title && <Text variant="heading1">{title}</Text>}
          {subTitle && <Text variant="subheadingLight">{subTitle}</Text>}
        </View>
      </View>

      {(iconRight || textRight)
        && (onPressRight ? (
          <View style={styles.iconRightStyle}>
            <TouchableOpacity
              onPress={() => onPressRight()}
              style={styles.touchableOpacityStyle}
            >
              {iconRight && <Icons size={30} icon={iconRight} />}
              {textRight && (
                <Text variant="body" style={styles.text}>
                  {textRight}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconRightStyle}>
            {iconRight && <Icons size={30} icon={iconRight} />}
            {textRight && (
              <Text variant="body" style={styles.text}>
                {textRight}
              </Text>
            )}
          </View>
        ))}
    </View>
  );
};

export default Header;

const heightMultiplier = Platform.OS === "ios" ? 0.21 : 0.23;

const styles = StyleSheet.create({
  container: {
    height: height * heightMultiplier,
    borderBottomWidth: 0.5,
  },
  touchableOpacityStyle: {
    width: 70,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderRadius: 30,
  },
  iconStyle: {
    flexDirection: "row",
    position: "absolute",
    elevation: 1,
    zIndex: 1,
    top: height * 0.05,
    left: width * -0.02,
  },
  iconRightStyle: {
    flexDirection: "row",
    position: "absolute",
    elevation: 99,
    zIndex: 99,
    top: height * 0.05,
    right: width * 0.02,
  },
  contentStyle: {
    width,
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
  text: {
    paddingHorizontal: 5,
    alignSelf: "center",
  },
});
