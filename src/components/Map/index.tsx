import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
} from "react-native-maps";

import * as Permissions from "expo-permissions";

interface ICoords {
  latitude: number;
  longitude: number;
}

interface IInitialCoords extends ICoords {
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IMap {
  routeCoords: Array<LatLng>;
  initialMarkerCoords?: IInitialCoords;
}

const Map = (props: IMap) => {
  const { initialMarkerCoords, routeCoords } = props;

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
    <>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="standard"
        initialRegion={initialMarkerCoords}
      >
        <Polyline
          coordinates={routeCoords}
          strokeWidth={10}
          strokeColor="red"
        />

        <Marker coordinate={routeCoords[0]} />
        <Marker coordinate={routeCoords[routeCoords.length - 1]} />
      </MapView>
    </>
  );
};

Map.defaultProps = {};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
