import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
  MapEvent,
} from "react-native-maps";
import { IChargers } from "../../gql/Route/queries";
import Icons from "../svg";

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
  chargers?: Array<IChargers[] | []>;
  initialMain?: boolean;
  initialLat?: number;
  initialLon?: number;
}

const Map = (props: IMap) => {
  const { routeCoords, chargers, initialMain, initialLat, initialLon } = props;

  const [markeeSelect, setMarkeeSelect] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

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

  let region = {
    latitude: initialLat || 0,
    longitude: initialLon || 0,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  };

  if (
    markeeSelect.latitude
    && markeeSelect.longitude
    && initialLat
    && initialLon
  ) {
    const mediumLat = (markeeSelect.latitude + initialLat) / 2;
    const mediumLng = (initialLon + markeeSelect.longitude) / 2;

    const start = {
      latitude: markeeSelect.latitude,
      longitude: markeeSelect.longitude,
    };
    const end = {
      latitude: initialLat,
      longitude: initialLon,
    };

    const altitude = getAltitude(start, end);

    region = {
      latitude: mediumLat || 0,
      longitude: mediumLng || 0,
      latitudeDelta: altitude,
      longitudeDelta: altitude,
    };
  }

  if (routeCoords) {
    const start = routeCoords[routeCoords.length - 1];
    const end = routeCoords[0];

    const altitude = getAltitude(start, end);

    const mediumLat = (start.latitude + end.latitude) / 2;
    const mediumLng = (end.longitude + start.longitude) / 2;

    region = {
      latitude: mediumLat,
      longitude: mediumLng,
      latitudeDelta: altitude,
      longitudeDelta: altitude,
    };
  }

  const MarkerChanger = () => {
    if (!chargers?.length) return <></>;

    return (
      <>
        {chargers[0].map((charger) => (
          <Marker
            key={Math.random()}
            coordinate={{
              latitude: charger.latitude ? charger.latitude : 0,
              longitude: charger.longitude ? charger.longitude : 0,
            }}
          >
            <Icons icon="Room" fill="#76ff" />
          </Marker>
        ))}
      </>
    );
  };

  return (
    <MapView
      showsUserLocation={initialMain}
      showsMyLocationButton={initialMain}
      provider={PROVIDER_GOOGLE}
      loadingEnabled
      loadingIndicatorColor="#11041A"
      loadingBackgroundColor="#F6F6F5"
      style={styles.map}
      mapType="standard"
      onLongPress={(ev) => {
        if (initialMain) newMarker(ev);
      }}
      region={region}
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

      <MarkerChanger />
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
