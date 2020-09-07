import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTransition, mix } from "react-native-redash";
import Animated from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import RouteDestination from "./RouteDestination";
import { BottomDrawer, Icons, Button, Card } from "../../../components";
import { Text, Theme } from "../../../config/Theme";
import { RoutePointsList } from "../../../components/Lists";
import { IRouterPointsListItem } from "../../../components/Lists/RoutePointsList/RouterPointsListItem";

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

const MapSearchDone = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const transition = useTransition(isDrawerOpen, { duration: 100 });
  const translateY = mix(transition, 0, -200);

  const RouteActions = () => (
    <>
      <Text variant="heading2">Westminster, London</Text>

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
          label="START"
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
        <RouteDestination containerStyle={styles.routeDestination} />
      </Animated.View>

      <View style={styles.mapContainer}>{/* <Map /> */}</View>

      <BottomDrawer
        maxHeight={height * 0.9}
        closeOffset={height * 0.35}
        // onToggle={setIsDrawerOpen}
        isOpen={isDrawerOpen}
        scrollable={false}
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
                title="200Km"
                subTitle="Total distance"
                containerStyle={styles.card}
              />
              <Card
                title="400Km"
                subTitle="Total distance"
                containerStyle={[styles.card]}
                contentStyle={{ backgroundColor: theme.colors.primary }}
              />
              <Card
                title="200Km"
                subTitle="Total distance"
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
    position: "absolute",
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
