import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useTransition, mix } from "react-native-redash";
import Animated from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@apollo/client";
import RouteDestination from "./RouteDestination";
import { BottomDrawer, Icons, Button, Card, Map } from "../../../components";
import { Text, Theme } from "../../../config/Theme";
import { RoutePointsList } from "../../../components/Lists";
import { TMapSearchDoneNavProps } from "../../../navigation/Types/NavPropsTypes";

import { Route } from "../../../gql";
import { IGetRouter, IGetRouterVar } from "../../../gql/Route/queries";
import ModalSaveRoute from "./ModalSaveRoute";
import { IEditChangeRoute } from "../../../components/SearchEditRouter/index";

const { height, width } = Dimensions.get("window");

interface IMapSearchDone extends TMapSearchDoneNavProps {}

const editNameCity = (nameCity: string): string => {
  if (nameCity.includes(".")) {
    return "Current location";
  }
  return nameCity;
};

const MapSearchDone = (props: IMapSearchDone) => {
  const { route } = props;

  const [startDirection, setStartDirection] = useState<string>("");
  const [endDirection, setEndDirection] = useState<string>("");
  const [stateChange, setStateChange] = useState<boolean>(false);

  const { loading: loadingRoute, data: dataRoute, refetch } = useQuery<
    IGetRouter,
    IGetRouterVar
  >(Route.queries.getRoutes, {
    variables: {
      origin: route.params.origin,
      destination: route.params.destination,
      car_id: "1107",
      car_charge: 50,
      chargers_limit: 10,
      car_tolerance: 10,
      charger_distance: 10,
    },
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const [stateModal, setStateModal] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const transition = useTransition(isDrawerOpen, { duration: 100 });
  const translateY = mix(transition, 0, -200);

  const onChangeRoute = () => {
    const start = !stateChange ? route.params.origin : route.params.destination;
    const end = !stateChange ? route.params.destination : route.params.origin;

    setEndDirection(start || "");
    setStartDirection(end || "");
    setStateChange(!stateChange);

    // TODO : FIX
    refetch({
      origin: start,
      destination: end,
      car_id: "1107",
      car_charge: 50,
      chargers_limit: 10,
      car_tolerance: 10,
      charger_distance: 10,
    });
  };

  const onEditRoute = ({ str, type }: IEditChangeRoute) => {
    const startTmp = startDirection || route.params.origin;
    const endTmp = endDirection || route.params.destination;

    if (type === "START") setStartDirection(str);
    if (type === "END") setEndDirection(str);

    const start = type === "START" ? str : startTmp;
    const end = type === "END" ? str : endTmp;

    refetch({
      origin: start,
      destination: end,
      car_id: "1107",
      car_charge: 50,
      chargers_limit: 10,
      car_tolerance: 10,
      charger_distance: 10,
    });
  };

  const locationStart = startDirection || route.params.origin;
  const locationEnd = endDirection || route.params.destination;

  const RouteActions = () => (
    <>
      {loadingRoute ? (
        <View
          style={{
            marginVertical: 50,
          }}
        >
          <ActivityIndicator color={theme.colors.primary} />
          <Text variant="bodyHighlight" style={styles.textLoading}>
            Loading...
          </Text>
        </View>
      ) : (
        <View
          style={{
            height: height * 0.3,
          }}
        >
          <View
            style={{
              flex: Platform.OS === "ios" ? 0.3 : 0.5,

              justifyContent: "center",
            }}
          >
            <Text variant="heading2" numberOfLines={1}>
              {`${locationStart && editNameCity(locationStart)}, ${
                locationEnd && editNameCity(locationEnd)
              }`}
            </Text>
          </View>

          <View
            style={[
              styles.row,
              {
                flex: Platform.OS === "ios" ? 0.2 : 0.4,
                width: "100%",
                alignItems: "center",
              },
            ]}
          >
            <Icons
              icon="Market"
              size={20}
              fill={theme.colors.grayLight}
              containerStyle={styles.icon}
            />
            <Text variant="bodySmall" numberOfLines={1}>
              {`${locationStart && editNameCity(locationStart)}, ${
                locationEnd && editNameCity(locationEnd)
              }`}
            </Text>
          </View>

          <View
            style={[
              styles.row,
              {
                flex: Platform.OS === "ios" ? 0.2 : 0.4,

                width: "100%",
                alignItems: "center",
              },
            ]}
          >
            <Icons
              icon="DirectionsCar"
              size={20}
              fill={theme.colors.grayLight}
              containerStyle={styles.icon}
            />
            <Text variant="bodySmall">
              {`${new Date((dataRoute?.getRoutes?.Route?.Time || 0) * 1000)
                .toISOString()
                .substr(11, 5)} (${`${Math.ceil(
                (dataRoute?.getRoutes?.Route?.Distance || 0) / 1000,
              )}km`})`}
            </Text>
            <Icons
              icon="BatteryRight"
              size={20}
              fill={theme.colors.grayLight}
              containerStyle={[styles.icon, { marginLeft: 10 }]}
            />
            <Text variant="bodySmall">
              {`${Math.ceil(dataRoute?.getRoutes?.Route?.Total_kWh || 0)}%`}
            </Text>
          </View>

          <View
            style={[
              styles.row,
              {
                flex: 1,

                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Button
              containerStyle={styles.button}
              variant="primary"
              inverse
              label="STEPS"
              onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            />
            <Button
              containerStyle={[styles.button, { marginLeft: 25 }]}
              variant="primary"
              label="SAVE ROUTE"
              onPress={() => setStateModal(!stateModal)}
            />
          </View>
        </View>
      )}
    </>
  );

  return (
    <>
      <ModalSaveRoute
        stateModal={stateModal}
        startLocation={locationStart}
        endLocation={locationEnd}
        onClosed={() => setStateModal(!stateModal)}
      />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.headerContainer,
            {
              backgroundColor: theme.colors.headerBackground,
              transform: [{ translateY }],
            },
          ]}
        >
          <RouteDestination
            startDireccion={
              (locationStart && editNameCity(locationStart)) || ""
            }
            endDireccion={(locationEnd && editNameCity(locationEnd)) || ""}
            containerStyle={styles.routeDestination}
            onChangeRoute={onChangeRoute}
            onEditNewRoute={onEditRoute}
          />
        </Animated.View>
        <View style={styles.mapContainer}>
          <Map
            routeCoords={dataRoute?.getRoutes?.Route?.Route_Coords}
            chargers={dataRoute?.getRoutes?.Chargers}
          />
        </View>

        <BottomDrawer
          maxHeight={height * 0.9}
          closeOffset={height * 0.35}
          isOpen={isDrawerOpen}
          scrollable={false}
          disableToggler
          onOpen={() => {
            setTimeout(() => {
              setShowContent(true);
            }, 0);
          }}
          onClose={() => setShowContent(false)}
        >
          <RouteActions />
          {showContent && (
            <View
              style={{
                height: height * (Platform.OS === "ios" ? 0.55 : 0.54),
              }}
            >
              <RoutePointsList
                startLocation={locationStart}
                endLocation={locationEnd}
                points={dataRoute?.getRoutes?.Chargers[0]}
              />

              <View style={styles.cardsContainer}>
                <Card
                  title={`${Math.ceil(
                    dataRoute?.getRoutes?.Route?.Total_kWh || 0,
                  )}%`}
                  subTitle="Energy"
                  containerStyle={styles.card}
                />
                <Card
                  title={`${new Date(
                    (dataRoute?.getRoutes?.Route?.Time || 0) * 1000,
                  )
                    .toISOString()
                    .substr(11, 5)}`}
                  subTitle="Time"
                  containerStyle={[styles.card]}
                  contentStyle={{ backgroundColor: theme.colors.primary }}
                />
                <Card
                  title={`${Math.ceil(
                    (dataRoute?.getRoutes?.Route?.Distance || 0) / 1000,
                  )}km`}
                  subTitle="Distance"
                  containerStyle={[styles.card, styles.lastCard]}
                  contentStyle={{
                    backgroundColor: theme.colors.cardsBackground,
                  }}
                  textColor="heading2"
                />
              </View>
            </View>
          )}
        </BottomDrawer>
      </View>
    </>
  );
};

export default MapSearchDone;

const styles = StyleSheet.create({
  container: {
    height,
  },
  contentLoading: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    width: "70%",
    marginVertical: 2,
  },
  icon: { marginRight: 10 },
  button: { width: width * 0.35, height: 34 },
  headerContainer: {
    position: "relative",
    top: 0,
    width,
    height: height * 0.25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  routeDestination: {
    marginTop: 20,
    elevation: 1,
  },
  mapContainer: {
    flex: 0.54,
  },
  cardsContainer: {
    flex: Platform.OS === "ios" ? 0.2 : 0.4,
    flexDirection: "row",
    marginVertical: "5%",
  },
  card: {
    flex: 1,
    paddingRight: 5,
  },
  lastCard: {
    paddingRight: 0,
  },
  textLoading: {
    textAlign: "center",
    marginVertical: "5%",
  },
});
