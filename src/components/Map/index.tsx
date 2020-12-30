import React, { useState, useRef, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, LatLng, MapEvent } from "react-native-maps";

import { IChargers } from "../../gql/Route/queries";
import theme from "../../config/Theme";

import MarkerChanger from "./MarkerChanger";
import MarkerSelect from "./MarkerSelect";
import Route from "./Route";
import Modal from "../Modal";
import { UserLocationContext } from "../../navigation/Navigators/UserLocationProvider";

const { height } = Dimensions.get("window");

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
  chargers?: IChargers[];
  initialMain?: boolean;
  state?: boolean;
}

const Map = (props: IMap) => {
  const { routeCoords, chargers, initialMain, state } = props;

  const { userLocation, storeUserLocation } = useContext(UserLocationContext);

  const mapAnimation = useRef<MapView>(null);

  const [stateModal, setStateModal] = useState<boolean>(false);
  const [markeeSelect, setMarkeeSelect] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  // * Set userLocation if not set yet
  useEffect(() => {
    const setInitialLocation = async () => {
      try {
        setStateModal(true);
        await storeUserLocation();
      } catch (error) {
        console.error("error: ", error);
      } finally {
        setStateModal(false);
      }
    };

    if (!userLocation) {
      setInitialLocation();
    }
  }, []);

  // * Animate map when route changes
  useEffect(() => {
    if (routeCoords) routeAnimation(routeCoords);
  }, [routeCoords, state]);

  const routeAnimation = (coords: LatLng[] | undefined): void => {
    if (coords) {
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
      }, 1000);
    }
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
    <>
      {stateModal && (
        <Modal state={stateModal} onClosed={() => setStateModal(false)}>
          <View style={styles.containerModal}>
            <TouchableOpacity activeOpacity={1} style={styles.contentModal}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {userLocation && (
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
          initialRegion={userLocation}
        >
          {routeCoords && <Route routeCoords={routeCoords} />}

          {markeeSelect.latitude !== 0 && (
            <MarkerSelect
              markeeSelect={markeeSelect}
              locationUser={userLocation}
              onModal={(value) => setStateModal(value)}
            />
          )}

          <MarkerChanger chargers={chargers} />
        </MapView>
      )}
    </>
  );
};

Map.defaultProps = {};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  containerModal: {
    marginVertical: height * (Platform.OS === "ios" ? 0.5 : 0.4),
  },
  contentModal: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Map;
