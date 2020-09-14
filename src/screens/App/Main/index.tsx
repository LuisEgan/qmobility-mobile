import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Map, InputSearch } from "../../../components";
import { DrawerLeftMenu, DrawerRightMenu } from "../../../components/HOCs";

import car from "../../../assets/png/Nissan_Leaf_2018-02.png";

const { height } = Dimensions.get("window");

enum EDrawer {
  RIGHT,
  LEFT,
}

const Main = () => {
  const [isDrawerLeftOpen, setIsDrawerLeftOpen] = useState<boolean>(false);
  const [isDrawerRightOpen, setIsDrawerRightOpen] = useState<boolean>(false);

  const [initialLat, setInitialLat] = useState<number>(0);
  const [initialLon, setInitialLon] = useState<number>(0);

  useEffect(() => {
    getLocationAsync();
  });

  const toggleDrawer = (drawer: EDrawer) => {
    if (drawer === EDrawer.LEFT) {
      setIsDrawerLeftOpen(!isDrawerLeftOpen);
      return;
    }
    setIsDrawerRightOpen(!isDrawerRightOpen);
  };

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setInitialLat(latitude);
      setInitialLon(longitude);
    }
  };

  return (
    <>
      <DrawerLeftMenu
        isDrawerOpen={isDrawerLeftOpen}
        onDrawerToggle={setIsDrawerLeftOpen}
        swippable={false}
      >
        <DrawerRightMenu
          isDrawerOpen={isDrawerRightOpen}
          onDrawerToggle={setIsDrawerRightOpen}
        />
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <InputSearch
              containerStyle={styles.inputSearch}
              placeholder="Where are you going?"
              onChange={() => null}
              leftIcon="Menu"
              onLeftIconPress={() => toggleDrawer(EDrawer.LEFT)}
            />

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.carImgContainer}
              onPress={() => toggleDrawer(EDrawer.RIGHT)}
            >
              <ImageBackground source={car} style={styles.imgBg} />
            </TouchableOpacity>
          </View>

          {initialLat !== 0 && initialLon !== 0 ? (
            <Map initialMain initialLat={initialLat} initialLon={initialLon} />
          ) : (
            <Map initialMain />
          )}
        </View>
      </DrawerLeftMenu>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.1,
    margin: 35,
    zIndex: 1,
  },

  inputSearch: {
    elevation: 1,
    flex: 1,
  },

  separator: {
    flex: 0.05,
  },

  carImgContainer: {
    height: height * 0.08,
    width: height * 0.08,
    overflow: "hidden",
    borderRadius: 100,
  },

  imgBg: {
    flex: 1,
  },
});
