import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
} from "react-native-maps";

import * as Location from "expo-location";
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
  routeCoords?: LatLng[];
  initialMarkerCoords?: IInitialCoords;
  initialMain?: boolean;
}
// MapPolylineProps
const Map = (props: IMap) => {
  const { initialMarkerCoords, routeCoords, initialMain } = props;

  const [inicioLat, setInicioLat] = useState(0);
  const [inicioLon, setInicioLon] = useState(0);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setInicioLat(latitude);
      setInicioLon(longitude);
    }
  };

  return (
    <>
      <MapView
        showsUserLocation={initialMain}
        showsMyLocationButton={initialMain}
        followsUserLocation={initialMain}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="standard"
        region={
          initialMarkerCoords || {
            latitude: inicioLat,
            longitude: inicioLon,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }
        }
      >
        {routeCoords && (
          <>
            <Polyline
              coordinates={routeCoords}
              strokeWidth={10}
              strokeColor="red"
            />
            <Marker coordinate={routeCoords[0]} />
            <Marker coordinate={routeCoords[routeCoords.length - 1]} />
          </>
        )}
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
