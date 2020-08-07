import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "../../config/Theme";
import Icons from "../svg";

import { TIcon } from "../svg/icons/TypeIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IHeader {
  onPress?: () => void;
  title?: string;
  subTitle?: string;
  icon?: TIcon;
  color?: string;
}

const { width, height } = Dimensions.get("window");

const Header = (props: IHeader) => {
  const { onPress, title, subTitle, icon, color } = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
        },
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
          {title && (
            <Text style={styles.titleStyle} variant="titleHeader">
              {title}
            </Text>
          )}
          {subTitle && (
            <Text style={styles.subTitleStyle} variant="subTitleHeader">
              {subTitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

Header.defaultProps = {
  color: "#fff",
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: height * 0.21,
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
    elevation: 99,
    zIndex: 99,
    top: "21%",
    left: "1%",
  },
  contentStyle: {
    width: width,
    height: height * 0.21,
    justifyContent: "center",
  },
  viewStyle: {
    marginTop: width * 0.1,
    marginHorizontal: width * 0.12,
  },
  titleStyle: {
    fontSize: 30,
  },
  subTitleStyle: {
    fontSize: 20,
  },
  btnStyle: {
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
  },
});
