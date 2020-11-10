import React, { useState, useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  LatLng,
  MapEvent,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { IChargers } from "../../gql/Route/queries";
import theme from "../../config/Theme";

import MarkerChanger from "./MarkerChanger";
import MarkerSelect from "./MarkerSelect";
import Route from "./Route";

const getAltitude = (origin: LatLng, destination: LatLng) => {
  const k = Math.PI / 180;
  const difLatitud = k * (origin.latitude - destination.latitude);
  const difLongitud = k * (origin.longitude - destination.longitude);

  const a = Math.sin(difLatitud / 2) ** 2
    + Math.cos(k * destination.latitude)
      * Math.cos(k * origin.latitude)
      * Math.sin(difLongitud / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const altitud = 6378 * (k * c);
  return altitud;
};

interface IMap {
  routeCoords?: LatLng[];
  chargers?: IChargers[] | [];
  initialMain?: boolean;
}

const Map = (props: IMap) => {
  const { routeCoords, chargers, initialMain } = props;

  const [markeeSelect, setMarkeeSelect] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const [region] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 70,
    longitudeDelta: 70,
  });

  const mapAnimation = useRef(null);

  useEffect(() => {
    if (initialMain) LocationAnimation();
  }, []);

  useEffect(() => {
    if (routeCoords) routeAnimation(routeCoords);
  }, [routeCoords]);

  const LocationAnimation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation(location.coords);

      setTimeout(() => {
        mapAnimation.current?.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          },
          100,
        );
      }, 100);
    }
  };

  const routeAnimation = (coords: LatLng[]): void => {
    const start = coords[coords.length - 1];
    const end = coords[0];

    const altitude = getAltitude(start, end);

    const mediumLat = (start.latitude + end.latitude) / 2;
    const mediumLng = (end.longitude + start.longitude) / 2;

    setTimeout(() => {
      mapAnimation.current?.animateToRegion(
        {
          latitude: mediumLat,
          longitude: mediumLng,
          latitudeDelta: altitude,
          longitudeDelta: altitude,
        },
        500,
      );
    }, 100);
  };

  const newMarker = (event: MapEvent<Record<string, unknown>>) => {
    let marker;

    if (markeeSelect.latitude === 0) {
      const end = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      };

      marker = {
        latitude: end.latitude,
        longitude: end.longitude,
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
      ref={mapAnimation}
      showsUserLocation
      showsMyLocationButton={initialMain}
      provider={PROVIDER_GOOGLE}
      loadingEnabled
      showsBuildings={false}
      showsTraffic={false}
      showsIndoors={false}
      showsIndoorLevelPicker
      loadingIndicatorColor={theme.colors.primary}
      loadingBackgroundColor={theme.colors.white}
      style={styles.map}
      mapType="standard"
      onLongPress={(ev) => {
        if (initialMain) newMarker(ev);
      }}
      initialRegion={region}
    >
      {routeCoords && <Route routeCoords={routeCoords} />}

      {markeeSelect.latitude !== 0 && (
        <MarkerSelect markeeSelect={markeeSelect} locationUser={userLocation} />
      )}

      <MarkerChanger chargers={chargers} />
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
