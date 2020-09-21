import React from "react";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import useTheme from "@shopify/restyle/dist/hooks/useTheme";
import { Theme, Text } from "../../../config/Theme";
import Icons from "../../svg";
import { IRoute } from "../TypeList";

const RouteListItem = (props: IRoute) => {
  const { title, details, icon } = props;

  const theme = useTheme<Theme>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.containerButton,
          {
            backgroundColor: theme.colors.grayLighter,
          },
        ]}
      >
        <View style={styles.content}>
          {icon && (
            <View style={styles.detailContent}>
              <Icons icon={icon} fill={theme.colors.primary} size={22} />
            </View>
          )}
          <View style={styles.detailContainer}>
            <View>
              <Text variant="heading2">{title}</Text>
              {details && <Text variant="body">{details}</Text>}
            </View>
          </View>
          <View style={styles.iconRight}>
            <Icons icon="ArrowRightLight" fill={theme.colors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default RouteListItem;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: "2%",
    width,
  },

  containerButton: {
    height: 110,
    marginHorizontal: "5%",
    borderRadius: 10,
  },

  content: {
    flex: 1,
    flexDirection: "row",
  },
  detailContent: {
    flex: 0.1,
    height: "100%",
    paddingTop: 15,
    alignItems: "center",
  },
  detailContainer: {
    height: "100%",
    paddingTop: 10,
    flex: 0.8,
  },
  iconRight: {
    height: "100%",
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
});
