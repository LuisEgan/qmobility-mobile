import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const Map = () => {
  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      // const location = await Location.getCurrentPositionAsync({});
      // const { latitude, longitude } = location.coords;
    }
  };

  return (
    <MapView
      showsUserLocation
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      mapType="standard"
      initialRegion={{
        latitude: -33.454993,
        longitude: -70.591961,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
    >
      <Marker
        coordinate={{
          latitude: -33.454993,
          longitude: -70.591961,
        }}
      />
    </MapView>
  );
};

Map.defaultProps = {};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
