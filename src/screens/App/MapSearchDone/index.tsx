import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTransition, mix } from "react-native-redash";
import Animated from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import RouteDestination from "./RouteDestination";
import { Map, BottomDrawer, Icons, Button } from "../../../components";
import { Text, Theme } from "../../../config/Theme";

const { height, width } = Dimensions.get("window");

const MapSearchDone = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
          onPress={() => null}
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

      <View style={styles.mapContainer}>
        <Map />
      </View>

      <BottomDrawer
        maxHeight={height * 0.9}
        closeOffset={height * 0.35}
        onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <RouteActions />
      </BottomDrawer>
    </View>
  );
};

export default MapSearchDone;

const styles = StyleSheet.create({
  container: {
    height,
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
});
