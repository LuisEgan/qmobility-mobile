import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StyleProp,
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
  containerStyle?: StyleProp<View>;
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
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => onPress()}
              style={styles.touchableOpacity}
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
          <View style={styles.icon}>
            {text && (
              <Text variant="body" style={styles.text}>
                {text}
              </Text>
            )}
            {icon && <Icons size={30} icon={icon} />}
          </View>
        ))}
      <View style={styles.content}>
        <View style={styles.view}>
          {title && <Text variant="heading1">{title}</Text>}
          {subTitle && <Text variant="subheadingLight">{subTitle}</Text>}
        </View>
      </View>

      {(iconRight || textRight)
        && (onPressRight ? (
          <View style={styles.iconRight}>
            <TouchableOpacity
              onPress={() => onPressRight()}
              style={styles.touchableOpacity}
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
          <View style={styles.iconRight}>
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
const heightTopIcons = Platform.OS === "ios" ? 0.04 : 0.03;

const styles = StyleSheet.create({
  container: {
    height: height * heightMultiplier,
    borderBottomWidth: 0.5,
  },
  touchableOpacity: {
    width: 70,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderRadius: 30,
  },
  icon: {
    flexDirection: "row",
    position: "absolute",
    elevation: 1,
    zIndex: 1,
    top: height * heightTopIcons,
    left: width * -0.02,
  },
  iconRight: {
    flexDirection: "row",
    position: "absolute",
    elevation: 99,
    zIndex: 99,
    top: height * 0.05,
    right: width * 0.02,
  },
  content: {
    width,
    height: height * 0.21,
    justifyContent: "center",
  },
  view: {
    marginTop: width * 0.1,
    marginHorizontal: width * 0.05,
  },

  text: {
    paddingHorizontal: 5,
    alignSelf: "center",
  },
});
