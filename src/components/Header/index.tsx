import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Text } from "../../config/Theme";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IHeader {
  onPress?: () => void;
  onPressRight?: () => void;
  title?: string;
  subTitle?: string;
  icon?: TIcon;
  iconRight?: TIcon;
  color?: string;
  height?: number;
  text?: string;
  textRight?: string;
}

const { width, height } = Dimensions.get("window");

const Header = (props: IHeader) => {
  const {
    height: heightProp,
    title,
    subTitle,

    onPress,
    icon,
    text,

    onPressRight,
    iconRight,
    textRight,

    color,
  } = props;

  const containerHeight = heightProp ? { height: heightProp } : {};

  return (
    <View
      style={[
        styles.container,
        {
          ...containerHeight,
          backgroundColor: color,
        },
      ]}
    >
      {(icon || text) &&
        (onPress ? (
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

      {(iconRight || textRight) &&
        (onPressRight ? (
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

Header.defaultProps = {
  color: "#fff",
};

export default Header;

const heightPor = Platform.OS === "ios" ? 0.21 : 0.23;

const styles = StyleSheet.create({
  container: {
    height: height * heightPor,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ACACAC",
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
    elevation: 99,
    zIndex: 99,
    top: height * 0.05,
    left: width * 0.02,
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
  text: {
    paddingHorizontal: 5,
    alignSelf: "center",
  },
});
