import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Icons } from "../../../components";
import { Text, Theme } from "../../../config/Theme";
import { IComponentsDefaults } from "../../../lib/Types";

const { width } = Dimensions.get("window");

interface IRouteDestination extends IComponentsDefaults {
  startDireccion?: string;
  endDireccion?: string;
}

const RouteDestination = (props: IRouteDestination) => {
  const { startDireccion, endDireccion, containerStyle } = props;

  const theme = useTheme<Theme>();

  return (
    <View style={[styles.container, containerStyle]}>
      <Icons
        icon="MoreVert"
        size={20}
        containerStyle={styles.edit}
        onPress={() => null}
      />

      <View style={styles.icons}>
        <Icons icon="ArrowDown" size={20} />
      </View>
      <View style={[styles.destinations]}>
        <View
          style={[styles.from, { borderBottomColor: theme.colors.borderColor }]}
        >
          <Text variant="label">Start</Text>
          <Text variant="bodyBold" numberOfLines={1}>
            {startDireccion}
          </Text>
        </View>

        <View style={styles.to}>
          <Text variant="label">End</Text>
          <Text variant="bodyBold" numberOfLines={1}>
            {endDireccion}
          </Text>
        </View>
      </View>
      <View style={styles.reverse}>
        <Icons icon="ArrowDown" size={20} />
      </View>
    </View>
  );
};

RouteDestination.defaultProps = {
  startDireccion: "startDireccion",
  endDireccion: "endDireccion",
};

export default RouteDestination;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 120,
    width: width * 0.8,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
  },

  edit: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  icons: {
    flex: 0.05,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  destinations: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  from: {
    borderBottomWidth: 1,
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
    paddingVertical: 5,
  },
  to: {
    width: "100%",
    justifyContent: "flex-start",
    flex: 1,
    paddingVertical: 5,
  },

  reverse: {
    flex: 0.05,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
