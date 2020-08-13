import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Icons from "../svg";
import { Text } from "../../config/Theme";
import { StyleProp, ViewStyle } from "react-native";
import { TIcon } from "../svg/icons/TypeIcons";

interface IListItem {
  icon?: TIcon;
  title: string;
  subTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
const { width } = Dimensions.get("window");

const ListItem = (props: IListItem) => {
  const { title, subTitle, icon, containerStyle } = props;

  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      {icon && (
        <View style={styles.viewLeft}>
          <Icons icon={icon} fill="#00B0F0" size={20} />
        </View>
      )}
      <View style={styles.text}>
        <Text variant="body">{title}</Text>
        {subTitle && <Text variant="label">{subTitle}</Text>}
      </View>
      <TouchableOpacity style={styles.viewRight}>
        <Icons icon="MoreVert" fill="#ACACAC" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: 10,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  viewLeft: {
    marginRight: "3%",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
    width: width * 0.07,
  },
  text: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: width * 0.6,
  },
  viewRight: {
    marginLeft: "3%",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
    width: width * 0.07,
  },
});
