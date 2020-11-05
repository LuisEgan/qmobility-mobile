import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { Text } from "../../config/Theme";

interface IFooter {
  title?: string;
  subTitle?: string;
  color?: string;
  onPressSubtitle?: () => void;
}

const { width, height } = Dimensions.get("window");

const Footer = (props: IFooter) => {
  const { title, subTitle, color, onPressSubtitle } = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
        },
      ]}
    >
      <View style={styles.contentStyle}>
        <View style={styles.viewStyle}>
          {title && (
            <Text variant="label" style={styles.textStyle}>
              {title}
            </Text>
          )}
          {subTitle && (
            <TouchableOpacity onPress={onPressSubtitle}>
              <Text variant="bodyHighlight" style={styles.textStyle}>
                {subTitle}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

Footer.defaultProps = {
  color: "#fff",
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    height: height * 0.09,
    backgroundColor: theme.colors.red,
    justifyContent: "center",
    position: "relative",
    bottom: 0,
    paddingBottom: 35,
  },
  contentStyle: {
    width,
  },
  viewStyle: {
    justifyContent: "center",
    alignSelf: "center",
  },
  textStyle: {
    textAlign: "center",
  },
});
