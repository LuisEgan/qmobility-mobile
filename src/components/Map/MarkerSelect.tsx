import React from "react";
import { StyleSheet, View } from "react-native";
import { Marker, Callout, LatLng } from "react-native-maps";

import { useNavigation } from "@react-navigation/native";
import Icons from "../svg";
import theme, { Text } from "../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../lib/constants";

const API_KEY = "AIzaSyDyz9GjDVV8RA5x5BSsXm_SzVtqc8F1QPU";

interface IMarkerSelect {
  markeeSelect: LatLng;
  locationUser: LatLng;
}

const MarkerSelect = (props: IMarkerSelect) => {
  const { markeeSelect, locationUser } = props;

  const { navigate } = useNavigation();

  const onGoToMap = async () => {
    let location = "";
    let marker = "";

    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locationUser.latitude},${locationUser.longitude}&key=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        location = responseJson.results[0].formatted_address;
      });

    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${markeeSelect.latitude},${markeeSelect.longitude}&key=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        marker = responseJson.results[0].formatted_address;
      });

    navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
      origin: location,
      destination: marker,
    });
  };

  return (
    <Marker coordinate={markeeSelect}>
      <Icons icon="Room" fill={theme.colors.secondaryDark} />
      <Callout
        tooltip
        style={styles.containerCollout}
        onPress={() => onGoToMap()}
      >
        <View
          style={[
            styles.contantTitleCollout,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.titleCollout,
              {
                color: theme.colors.white,
              },
            ]}
          >
            GO TO LOCATION
          </Text>
        </View>

        <View
          style={[
            styles.contentIconCollout,
            {
              backgroundColor: theme.colors.secondaryDark,
            },
          ]}
        >
          <Icons icon="DirectionsCar" fill={theme.colors.white} size={25} />
        </View>
      </Callout>
    </Marker>
  );
};

MarkerSelect.defaultProps = {};

const styles = StyleSheet.create({
  containerCollout: {
    width: 170,
    height: 30,
    flexDirection: "row",
  },
  contantTitleCollout: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  titleCollout: {
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginHorizontal: 10,
  },
  contentIconCollout: {
    flex: 0.7,
    height: "100%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MarkerSelect;
