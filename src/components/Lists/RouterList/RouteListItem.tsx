import React from "react";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme, { Text } from "../../../config/Theme";
import Icons from "../../svg";
import { ISavedRoute } from "../../../gql/Route/queries";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const RouteListItem = (props: ISavedRoute) => {
  const { friendlyName, destination, origin } = props;

  const { navigate } = useNavigation();

  const onNavigarionRoute = () => {
    navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
      origin,
      destination,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.containerButton,
          {
            backgroundColor: theme.colors.grayLighter,
          },
        ]}
        onPress={() => onNavigarionRoute()}
      >
        <View style={styles.content}>
          <View style={styles.detailContent}>
            <Icons icon="Done" fill={theme.colors.primary} size={22} />
          </View>
          <View style={styles.detailContainer}>
            <View>
              <Text variant="heading2">{friendlyName}</Text>
              {origin && destination && (
                <>
                  <Text numberOfLines={1} variant="body">
                    {origin}
                  </Text>
                  <Text numberOfLines={1} variant="body">
                    {destination}
                  </Text>
                </>
              )}
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
