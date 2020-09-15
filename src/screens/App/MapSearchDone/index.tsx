import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTransition, mix } from "react-native-redash";
import Animated from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@apollo/client";
import RouteDestination from "./RouteDestination";
import { BottomDrawer, Icons, Button, Card, Map } from "../../../components";
import { Text, Theme } from "../../../config/Theme";
import { RoutePointsList } from "../../../components/Lists";
import { IRouterPointsListItem } from "../../../components/Lists/RoutePointsList/RouterPointsListItem";
import { TMapSearchDoneNavProps } from "../../../navigation/Types/NavPropsTypes";

import { Route } from "../../../gql";
import { IGetRouter, IGetRouterVar } from "../../../gql/Route/queries";

const { height, width } = Dimensions.get("window");

const routerPointsListItems: Array<IRouterPointsListItem> = [
  {
    label: "O2 Academy",
    description: "211 Stockwell Rd, Ferndale, London SW9 9SL, United Kingdom",
  },
  {
    label: "Kid’s School",
    description: "40 Stansfield Rd, London SW9 9RY, UK",
  },
  {
    label: "Charging Point 1",
    description: "2 Stansfield Rd, London SW9 9RY, UK",
    isChargingPoint: true,
  },
  {
    label: "Charging Point 2",
    isChargingPoint: true,
  },
  {
    label: "Charging Point 3",
    isChargingPoint: true,
  },
  {
    label: "Westminster, London",
    description: "Westminster, London SW1A 1AA, UK",
  },
];

interface IMapSearchDone extends TMapSearchDoneNavProps {}

const MapSearchDone = (props: IMapSearchDone) => {
  const { route } = props;

  const { data } = useQuery<IGetRouter, IGetRouterVar>(
    Route.queries.getRoutes,
    {
      variables: {
        origin: "London, Regno Unito",
        destination: route?.params?.formatted_address,
        car_id: "1107",
        car_charge: 50,
        chargers_limit: 10,
        charger_distance: 10,
        car_tolerance: 10,
      },
    },
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const transition = useTransition(isDrawerOpen, { duration: 100 });
  const translateY = mix(transition, 0, -200);

  const RouteActions = () => (
    <>
      <Text variant="heading2">
        {data?.getRoutes?.Route?.Origin}
        ,
        {data?.getRoutes?.Route?.Destination}
      </Text>

      <View style={styles.row}>
        <Icons icon="Done" size={20} containerStyle={styles.icon} />
        <Text variant="bodySmall">
          30 John Islip St, Westminster, London SW1P 4DD, United Kingdom
        </Text>
      </View>
      <View style={styles.row}>
        <Icons icon="Done" size={20} containerStyle={styles.icon} />
        <Text variant="bodySmall">1 hr 29 min (200 km)</Text>
        <Icons
          icon="Done"
          size={20}
          containerStyle={[styles.icon, { marginLeft: 10 }]}
        />
        <Text variant="bodySmall">100%</Text>
      </View>

      <View style={styles.row}>
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
          onPress={() => null}
        />
      </View>
    </>
  );

  return (
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
          endDireccion={route?.params?.formatted_address}
          containerStyle={styles.routeDestination}
        />
      </Animated.View>

      <View style={styles.mapContainer}>
        <Map
          routeCoords={data?.getRoutes?.Route?.Route_Coords}
          chargers={data?.getRoutes?.Chargers}
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

        {showContent ? (
          <>
            <RoutePointsList points={routerPointsListItems} />

            <View style={styles.cardsContainer}>
              <Card
                title={`${data?.getRoutes?.Route?.Total_kWh_Difference}`}
                subTitle="Total distance"
                containerStyle={styles.card}
              />
              <Card
                title={`${data?.getRoutes?.Route?.Time}`}
                subTitle="Time"
                containerStyle={[styles.card]}
                contentStyle={{ backgroundColor: theme.colors.primary }}
              />
              <Card
                title={`${data?.getRoutes?.Route?.Distance}`}
                subTitle="Distance"
                containerStyle={[styles.card, styles.lastCard]}
                contentStyle={{
                  backgroundColor: theme.colors.cardsBackground,
                }}
                textColor="heading2"
              />
            </View>
          </>
        ) : (
          <View
            style={[
              styles.contentLoading,
              { borderColor: theme.colors.borderColor },
            ]}
          >
            <Text variant="bodyHighlight">Loading...</Text>
          </View>
        )}
      </BottomDrawer>
    </View>
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
    marginVertical: 10,
  },

  icon: { marginRight: 10 },

  button: { width: width * 0.3 },

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
    flex: 1,
  },

  cardsContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  card: {
    flex: 1,
    paddingRight: 5,
  },
  lastCard: {
    paddingRight: 0,
  },
});
