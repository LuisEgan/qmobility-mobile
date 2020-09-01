import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "@shopify/restyle";
import { IComponentsDefaults } from "../../../lib/Types";
import RouterPointListItem, {
  IRouterPointsListItem,
} from "./RouterPointsListItem";
import { Theme } from "../../../config/Theme";

interface IRoutePointsList extends IComponentsDefaults {
  points: Array<IRouterPointsListItem>;
  height?: number;
}

const RoutePointsList = (props: IRoutePointsList) => {
  const { containerStyle, points, height = 250 } = props;

  const theme = useTheme<Theme>();

  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.borderColor, height },
        containerStyle,
      ]}
    >
      <FlatList
        style={styles.list}
        data={points}
        renderItem={({ item, index }) => (
          <RouterPointListItem
            key={`${item}_${index}`}
            {...item}
            isStartPoint={index === 0}
            isEndPoint={index === points.length - 1}
            isExtreme={index === 0 || index === points.length - 1}
          />
        )}
        keyExtractor={(item, index) => `${item}_${index}`}
      />
    </View>
  );
};

export default RoutePointsList;

const LIST_PADDING = 10;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    padding: LIST_PADDING,
    flexDirection: "row",
  },

  list: { zIndex: 1 },
});
