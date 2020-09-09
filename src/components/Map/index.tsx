import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
  MapEvent,
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

const Map = (props: IMap) => {
  const { initialMarkerCoords, routeCoords, initialMain } = props;

  const [inicioLat, setInicioLat] = useState<number>(0);
  const [inicioLon, setInicioLon] = useState<number>(0);
  const [markeeSelect, setMarkeeSelect] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

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

  const newMarker = (event: MapEvent<{}>) => {
    let marker;
    if (markeeSelect.latitude === 0) {
      marker = {
        latitude: event?.nativeEvent?.coordinate?.latitude,
        longitude: event?.nativeEvent?.coordinate?.longitude,
      };
    } else {
      marker = {
        latitude: 0,
        longitude: 0,
      };
    }
    setMarkeeSelect(marker);
  };

  return (
    <MapView
      showsUserLocation={initialMain}
      showsMyLocationButton={initialMain}
      followsUserLocation={initialMain}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      mapType="standard"
      onLongPress={(ev) => {
        if (initialMain) newMarker(ev);
      }}
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

      {markeeSelect.latitude !== 0 && initialMain && (
        <Marker coordinate={markeeSelect} />
      )}
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
