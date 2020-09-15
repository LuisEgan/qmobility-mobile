import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
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

const { height, width } = Dimensions.get("window");

interface IMapSearchDone extends TMapSearchDoneNavProps {}

const MapSearchDone = (props: IMapSearchDone) => {
  const { route } = props;

  const { loading: loadingRoute, data: dataRoute } = useQuery<
    IGetRouter,
    IGetRouterVar
  >(Route.queries.getRoutes, {
    variables: {
      origin: route?.params?.origin,
      destination: route?.params?.destination,
      car_id: "1107",
      car_charge: 50,
      chargers_limit: 10,
      charger_distance: 10,
      car_tolerance: 10,
    },
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const transition = useTransition(isDrawerOpen, { duration: 100 });
  const translateY = mix(transition, 0, -200);

  const RouteActions = () => (
    <>
      {loadingRoute ? (
        <View
          style={{
            marginVertical: 50,
          }}
        >
          <ActivityIndicator color={theme.colors.primary} />
          <Text
            variant="bodyHighlight"
            style={{
              textAlign: "center",
              marginVertical: "5%",
            }}
          >
            Loading...
          </Text>
        </View>
      ) : (
        <>
          <Text variant="heading2">
            {dataRoute?.getRoutes?.Route?.Origin}
            ,
            {dataRoute?.getRoutes?.Route?.Destination}
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
      )}
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
          startDireccion={route?.params?.origin}
          endDireccion={route?.params?.destination}
          containerStyle={styles.routeDestination}
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

        {showContent ? (
          <>
            <RoutePointsList points={dataRoute?.getRoutes?.Chargers[0]} />

            <View style={styles.cardsContainer}>
              <Card
                title={`${dataRoute?.getRoutes?.Route?.Total_kWh_Difference}`}
                subTitle="Total distance"
                containerStyle={styles.card}
              />
              <Card
                title={`${dataRoute?.getRoutes?.Route?.Time}`}
                subTitle="Time"
                containerStyle={[styles.card]}
                contentStyle={{ backgroundColor: theme.colors.primary }}
              />
              <Card
                title={`${dataRoute?.getRoutes?.Route?.Distance}`}
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
    flex: 0.54,
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