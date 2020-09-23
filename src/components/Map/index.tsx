import React, { useState, useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
  MapEvent,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { IChargers } from "../../gql/Route/queries";
import Icons from "../svg";
import MarkerChanger from "./MarkerChanger";

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

  const [region] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 70,
    longitudeDelta: 70,
  });

  const mapAnimation = useRef(null);

  useEffect(() => {
    if (initialMain) {
      LocationAnimation();
    }
    if (routeCoords) {
      routeAnimation();
    }
  }, []);

  const LocationAnimation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      // animateToCamera
      // {center: temp_cordinate,pitch: 2, heading: 20,altitude: 200, zoom: 40},duration
      mapAnimation.current?.animateToCoordinate({
        latitude,
        longitude,
      });

      mapAnimation.current?.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        },
        1000,
      );
    }
  };

  const routeAnimation = (): void => {
    if (routeCoords) {
      const start = routeCoords[routeCoords.length - 1];
      const end = routeCoords[0];

      const altitude = getAltitude(start, end);

      const mediumLat = (start.latitude + end.latitude) / 2;
      const mediumLng = (end.longitude + start.longitude) / 2;

      mapAnimation.current.animateToRegion(
        {
          latitude: mediumLat,
          longitude: mediumLng,
          latitudeDelta: altitude,
          longitudeDelta: altitude,
        },
        350,
      );
    }
  };

  const newMarker = (event: MapEvent<{}>) => {
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
      loadingIndicatorColor="#11041A"
      loadingBackgroundColor="#F6F6F5"
      style={styles.map}
      mapType="standard"
      onLongPress={(ev) => {
        if (initialMain) newMarker(ev);
      }}
      initialRegion={region}
    >
      {routeCoords && (
        <>
          <Polyline
            coordinates={routeCoords}
            strokeWidth={10}
            strokeColor="#00D6FD"
          />
          <Marker coordinate={routeCoords[0]}>
            <Icons icon="Room" fill="#002060" />
          </Marker>
          <Marker coordinate={routeCoords[routeCoords.length - 1]}>
            <Icons icon="Room" fill="#002060" />
          </Marker>
        </>
      )}

      {markeeSelect.latitude !== 0 && initialMain && (
        <Marker coordinate={markeeSelect}>
          <Icons icon="Room" fill="#002060" />
        </Marker>
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
