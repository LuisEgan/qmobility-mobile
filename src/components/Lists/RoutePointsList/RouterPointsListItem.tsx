import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@shopify/restyle";
import { TIcon } from "../../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../../lib/Types";
import { Icons } from "../..";
import { Theme, Text } from "../../../config/Theme";

export const ROUTER_POINTS_LIST_ITEM_ICONS_COL_WIDTH = 25;

export interface IRouterPointsListItem extends IComponentsDefaults {
  label: string;
  description?: string;
  icon?: TIcon | JSX.Element;
  svgFill?: string;
  isExtreme?: boolean;
  isChargingPoint?: boolean;
  isStartPoint?: boolean;
  isEndPoint?: boolean;
  latitude?: number;
  longitude?: number;
  Id?: number;
}

const RouterPointListItem = (props: IRouterPointsListItem) => {
  const {
    containerStyle,
    label,
    description,
    svgFill,
    icon,
    isExtreme = false,
    isChargingPoint = false,
    isEndPoint = false,
    isStartPoint = false,
  } = props;
  const theme = useTheme<Theme>();

  const endPointStyle = isEndPoint ? { marginBottom: 0 } : {};

  const setLabelVariant = () => {
    if (isExtreme) return "heading2";

    if (isChargingPoint) return "bodyHighlight";

    return "body";
  };

  const BulletIcon = (): JSX.Element => {
    if (typeof icon === "string") {
      return (
        <Icons icon={icon} size={25} fill={svgFill || theme.colors.primary} />
      );
    }

    if (isChargingPoint) return <Icons size={25} icon="Market" />;

    if (isEndPoint) return <Icons size={25} icon="ArrowDown" />;

    if (isStartPoint) return <Icons size={25} icon="Clock" />;

    return icon || <Icons size={25} icon="Market" />;
  };

  return (
    <View style={[styles.container, endPointStyle, containerStyle]}>
      {!isEndPoint && (
        <View style={[styles.dottedLine]}>
          {[...Array(10)].map(() => (
            <Icons
              key={Math.random()}
              icon="Market"
              size={8}
              fill={theme.colors.borderColor}
              containerStyle={styles.dot}
            />
          ))}
        </View>
      )}

      <View style={styles.iconContainer}>
        <BulletIcon />
      </View>

      <View style={styles.textContainer}>
        <Text variant={setLabelVariant()} style={{}}>
          {label}
        </Text>
        {description && <Text variant="bodySmall">{description}</Text>}
      </View>
    </View>
  );
};

export default RouterPointListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 45,
  },

  dottedLine: {
    position: "absolute",
    left: 0,
    top: 5,
    width: ROUTER_POINTS_LIST_ITEM_ICONS_COL_WIDTH,
    alignItems: "center",
    height: "220%",
    overflow: "hidden",
    // backgroundColor: "gold",
  },
  dot: {
    marginBottom: 7,
  },

  iconContainer: {
    marginRight: 10,
    width: ROUTER_POINTS_LIST_ITEM_ICONS_COL_WIDTH,
    alignItems: "center",
  },

  textContainer: {},
});
