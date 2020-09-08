import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import Icons from "../svg";
import { Text, Theme } from "../../config/Theme";
import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

interface IListItem extends IComponentsDefaults {
  icon?: TIcon;
  title: string;
  subTitle?: string;
  detail?: boolean;
}
const { width } = Dimensions.get("window");

const ListItem = (props: IListItem) => {
  const { title, subTitle, icon, detail, containerStyle } = props;
  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        { borderBottomColor: theme.colors.grayLighter },
      ]}
    >
      {icon && (
        <View style={styles.viewLeft}>
          <Icons icon={icon} fill={theme.colors.primary} size={20} />
        </View>
      )}
      <View style={styles.text}>
        <Text variant="body">{title}</Text>
        {subTitle && <Text variant="label">{subTitle}</Text>}
      </View>
      {detail && (
        <TouchableOpacity style={styles.viewRight}>
          <Icons icon="MoreVert" fill={theme.colors.grayLight} size={20} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  viewLeft: {
    justifyContent: "center",

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
