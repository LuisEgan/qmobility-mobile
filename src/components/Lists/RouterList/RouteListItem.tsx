import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import theme, { Text } from "../../../config/Theme";
import Icons from "../../svg";
import { ISavedRoute } from "../../../gql/Route/queries";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

import { Route } from "../../../gql";
import {
  IDeleteMyRoute,
  IDeleteMyRouteVar,
} from "../../../gql/Route/mutations";

const RouteListItem = (props: ISavedRoute) => {
  const { friendlyName, destination, origin, frequency, category, id } = props;

  const [state, setState] = useState<boolean>(false);

  const { navigate } = useNavigation();

  const onNavigarionRoute = () => {
    navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
      origin,
      destination,
    });
  };

  const [deleteMyRoutes] = useMutation<
    { deleteMyRoutes: IDeleteMyRoute },
    IDeleteMyRouteVar
  >(Route.mutations.deleteMyRoute);

  const onDelete = async () => {
    try {
      const variables = {
        myRouteId: id,
      };

      const { data, errors } = await deleteMyRoutes({
        variables,
        refetchQueries: [
          {
            query: Route.queries.getMySaveRoute,
          },
        ],
      });
      if (errors) {
        Alert.alert(`${errors}`, "", [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      }
      if (data?.deleteMyRoutes) {
        setState(false);
      }
    } catch (error) {
      // console.log("onSaveMyRouter -> error", error)
    }
  };

  const onAlert = () => {
    setState(true);
    Alert.alert(`${friendlyName}`, `${category}`, [
      {
        text: "Delete",
        onPress: () => onDelete(),
        style: "destructive",
      },
      {
        text: "Edit",
        onPress: () => {
          setState(false);
          console.warn("Edit");
        },
      },
      {
        text: "Cancel",
        onPress: () => setState(false),
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => !state && onNavigarionRoute()}
      >
        <View style={styles.content}>
          <View style={styles.detailContent}>
            <Icons icon="Home" fill={theme.colors.primary} size={22} />
          </View>
          <View style={styles.detailContainer}>
            <View>
              <Text variant="heading2">{friendlyName}</Text>
              <Text numberOfLines={1} variant="body">
                {origin}
              </Text>
              <Text numberOfLines={1} variant="body">
                {destination}
              </Text>

              <Text numberOfLines={1} variant="body">
                {`Frequency: ${frequency}`}
              </Text>
            </View>
          </View>
          {state ? (
            <View style={styles.iconRight}>
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.iconRight}
              onPress={() => onAlert()}
            >
              <Icons icon="MoreVert" fill={theme.colors.primary} size={25} />
            </TouchableOpacity>
          )}
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
    backgroundColor: theme.colors.grayLighter,
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
    marginTop: 20,
    justifyContent: "flex-start",
  },
});
