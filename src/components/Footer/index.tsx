import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "../../config/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface IFooter {
  title?: string;
  subTitle?: string;
  color?: string;
}

const { width, height } = Dimensions.get("window");

const Footer = (props: IFooter) => {
  const { title, subTitle, color } = props;

  const { canGoBack } = useNavigation();

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
            <Text variant="titleFooter" style={styles.textStyle}>
              {title}
            </Text>
          )}
          {subTitle && (
            <TouchableOpacity onPress={() => canGoBack()}>
              <Text variant="subTitleFooter" style={styles.textStyle}>
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
    backgroundColor: "#f11",
    justifyContent: "center",
    position: "relative",
    bottom: 0,
  },
  contentStyle: {
    width: width,
  },
  viewStyle: {
    justifyContent: "center",
    alignSelf: "center",
  },
  textStyle: {
    textAlign: "center",
  },
});
