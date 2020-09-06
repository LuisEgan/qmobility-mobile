import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";

// import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

interface ICoords {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

interface IMap {
  routeCoords?: Array<ICoords>;
  initialMarkerCoords?: ICoords;
}

const Map = (props: IMap) => {
  const { routeCoords } = props;

  useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        // const location = await Location.getCurrentPositionAsync({});
        // const { latitude, longitude } = location.coords;
      }
    };

    getLocationAsync();
  }, []);

  return (
    <>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="standard"
        initialRegion={{
          latitude: 51.50731,
          longitude: -0.12802,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Polyline
          coordinates={routeCoords}
          strokeWidth={10}
          strokeColor="red"
        />

        <Marker coordinate={routeCoords[0]} />
        <Marker coordinate={routeCoords[routeCoords.length - 1]} />

        {/* {coords.map((coord) => (
          <Marker key={coord.latitude} coordinate={coord} />
        ))} */}
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
