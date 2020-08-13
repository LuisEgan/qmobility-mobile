import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import Icons from "../svg";
import { Text, Theme } from "../../config/Theme";
import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";
import { useTheme } from "@shopify/restyle";

interface ICard extends IComponentsDefaults {
  title: string;
  subTitle?: string;
  icon?: TIcon;
  containerStyle: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get("window");

const Card = (props: ICard) => {
  const { title, subTitle, icon, containerStyle } = props;
  const theme = useTheme<Theme>();

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.content,
          { backgroundColor: theme.colors.secondaryDark },
        ]}
      >
        <View style={styles.favoriteContainer}>
          {icon && (
            <View style={styles.favoriteContent}>
              <Icons icon={icon} fill={theme.colors.primary} size={25} />
            </View>
          )}
          <Text
            variant="heading2"
            style={[styles.text, { color: theme.colors.white }]}
          >
            {title}
          </Text>
        </View>
        {subTitle && (
          <Text
            variant="label"
            style={[styles.text, { color: theme.colors.white }]}
          >
            {subTitle}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    height: 80,
  },
  content: {
    height: 80,
    width: width * 0.43,
    borderRadius: 10,
    padding: 10,
  },
  favoriteContainer: {
    flexDirection: "row",
  },
  favoriteContent: {
    marginHorizontal: 5,
  },
  text: {},
});
