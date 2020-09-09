import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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
      <View style={styles.textContent}>
        <Text style={styles.text} variant="body">
          {title}
        </Text>
        {subTitle && (
          <Text style={styles.text} variant="label">
            {subTitle}
          </Text>
        )}
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
    paddingHorizontal: 10,
  },
  textContent: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    width: "100%",
    textAlignVertical: "center",
  },
  viewRight: {
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
  },
});
