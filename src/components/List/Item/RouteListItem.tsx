import React, { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TIcon } from "../../svg/icons/TypeIcons";
import useTheme from "@shopify/restyle/dist/hooks/useTheme";
import { Theme, Text } from "../../../config/Theme";
import Icons from "../../svg";
import { IRoute } from "../TypeList";

const RouteListItem = (props: IRoute) => {
  const { date, from, to } = props;

  const theme = useTheme<Theme>();

  const Detail = ({
    title,
    detail,
    icon,
  }: {
    title: string;
    detail?: string;
    icon?: TIcon;
  }) => {
    return (
      <View style={styles.detailContainer}>
        {icon && (
          <View style={styles.detailContent}>
            <Icons icon={icon} fill={theme.colors.primary} size={18} />
          </View>
        )}
        <View>
          <Text variant="bodyHighlight">{title}</Text>
          {detail && <Text variant="heading2">{detail}</Text>}
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.grayLighter,
        },
      ]}
    >
      <View style={styles.textContent}>
        <Text variant="body">{"Today "}</Text>
        <Text variant="bodyHighlight">{date}</Text>
      </View>
      <View style={styles.content}>
        <View>
          <Detail title="From" detail={from} icon="Circle" />
          <Detail title="To" detail={to} icon="Market" />
        </View>
        <View>
          <Icons icon="ArrowRightLight" fill={theme.colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default RouteListItem;

const styles = StyleSheet.create({
  container: {
    height: 140,
    marginHorizontal: "5%",
    marginVertical: "2%",
    borderRadius: 10,
  },
  textContent: {
    position: "absolute",
    flexDirection: "row",
    right: 15,
    top: 15,
  },
  content: {
    flexDirection: "row",
    marginLeft: "3%",
    height: 140,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailContainer: {
    flexDirection: "row",
  },
  detailContent: {
    marginRight: "3%",
  },
});
