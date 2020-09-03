import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import Icons from "../svg";
import { Text, Theme } from "../../config/Theme";
import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

interface ICard extends IComponentsDefaults {
  title: string;
  subTitle?: string;
  icon?: TIcon;
  textColor?: string;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  subTitleStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const { width } = Dimensions.get("window");

const Card = (props: ICard) => {
  const {
    title,
    subTitle,
    icon,
    containerStyle,
    contentStyle,
    titleStyle,
    subTitleStyle,
    textColor = "",
    onPress,
  } = props;

  const theme = useTheme<Theme>();

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        disabled={!onPress}
        style={[
          styles.content,
          { backgroundColor: theme.colors.secondaryDark },
          contentStyle,
        ]}
        onPress={onPress}
      >
        <View style={styles.favoriteContainer}>
          {icon && (
            <View style={styles.favoriteContent}>
              <Icons icon={icon} fill={theme.colors.primary} size={25} />
            </View>
          )}
          <Text
            variant="heading2"
            style={[styles.text, titleStyle]}
            color={textColor || theme.colors.white}
          >
            {title}
          </Text>
        </View>
        {subTitle && (
          <Text
            variant="label"
            style={[styles.text, subTitleStyle]}
            color={textColor || theme.colors.white}
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
    width: width * 0.43,
  },
  content: {
    height: 80,
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
