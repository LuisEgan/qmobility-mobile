import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
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
import Modal from "../Modal";
import Button from "../Button";

const { height, width } = Dimensions.get("window");

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
  state?: boolean;
}

const Map = (props: IMap) => {
  const { routeCoords, chargers, initialMain, state } = props;

  const [stateModal, setStateModal] = useState<boolean>(false);

  const [locationState, setLocationState] = useState<boolean>(false);

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
    if (!initialMain) getPermissions();
  }, []);

  useEffect(() => {
    if (initialMain && state) LocationAnimation();
  }, [state]);

  useEffect(() => {
    if (routeCoords && state) routeAnimation(routeCoords);
  }, [routeCoords, state]);

  const getPermissions = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        setLocationState(true);
        LocationAnimation();
      }
    } catch (error) {
      // console.log("Map -> error getPermissions : ", error);
    }
  };

  const LocationAnimation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: false,
      });

      const { latitude, longitude } = location.coords;
      setUserLocation(location.coords);
      setTimeout(() => {
        locationNow(latitude, longitude);
      }, 500);
    } catch (error) {
      // console.log("Map -> error LocationAnimation : ", error);
    }
  };

  const locationNow = (latitude: number, longitude: number) => {
    mapAnimation.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      },
      200,
    );
  };

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
      {stateModal && locationState && (
        <Modal state={stateModal} onClosed={() => setStateModal(false)}>
          <View style={styles.containerModal}>
            <TouchableOpacity activeOpacity={1} style={styles.contentModal}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {locationState || state ? (
        <MapView
          ref={mapAnimation}
          showsUserLocation={locationState || state}
          showsMyLocationButton={locationState || (state && initialMain)}
          provider={PROVIDER_GOOGLE}
          loadingEnabled={locationState || state}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          showsIndoorLevelPicker={locationState || state}
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
            <MarkerSelect
              markeeSelect={markeeSelect}
              locationUser={userLocation}
              onModal={(value) => setStateModal(value)}
            />
          )}

          <MarkerChanger chargers={chargers} />
        </MapView>
      ) : (
        <View
          style={{
            width: width * 0.7,
            marginTop: height * 0.25,
          }}
        >
          <Button
            label="Permissions Location"
            onPress={() => getPermissions()}
            containerStyle={{
              backgroundColor: theme.colors.primary,
              marginHorizontal: width * 0.15,
              alignContent: "center",
            }}
          />
        </View>
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
