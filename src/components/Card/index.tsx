import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Icons from "../svg";
import { Text } from "../../config/Theme";
import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

interface ICard extends IComponentsDefaults {
  title: string;
  subTitle?: string;
  icon?: TIcon;
}

const { width } = Dimensions.get("window");

const Card = (props: ICard) => {
  const { title, subTitle, icon, containerStyle } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.content}>
        <View style={styles.favoriteContainer}>
          {icon && (
            <View style={styles.favoriteContent}>
              <Icons icon={icon} fill="#00B0F0" size={25} />
            </View>
          )}
          <Text variant="heading2" style={styles.text}>
            {title}
          </Text>
        </View>
        {subTitle && (
          <Text variant="label" style={styles.text}>
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
    // ! Fix - colors should only come from Theme
    backgroundColor: "#002060",
  },
  favoriteContainer: {
    flexDirection: "row",
  },
  favoriteContent: {
    marginHorizontal: 5,
  },
  text: {
    // ! Fix - colors should only come from Theme
    color: "#fff",
  },
});
