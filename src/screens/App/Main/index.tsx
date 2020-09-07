import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Map, InputSearch } from "../../../components";
import { DrawerLeftMenu, DrawerRightMenu } from "../../../components/HOCs";

import car from "../../../assets/png/Nissan_Leaf_2018-02.png";

const { height } = Dimensions.get("window");

enum EDrawer {
  RIGHT,
  LEFT,
}

const coords = [
  { latitude: 51.50731, longitude: -0.12802 },
  { latitude: 51.50736, longitude: -0.12813 },
  { latitude: 51.50738, longitude: -0.12818 },
  { latitude: 51.50741, longitude: -0.12827 },
  { latitude: 51.50744, longitude: -0.12846 },
  { latitude: 51.50747, longitude: -0.12871 },
  { latitude: 51.50748, longitude: -0.12886 },
  { latitude: 51.5075, longitude: -0.12898 },
  { latitude: 51.50761, longitude: -0.12998 },
  { latitude: 51.50764, longitude: -0.13032 },
  { latitude: 51.50765, longitude: -0.13049 },
];

const Main = () => {
  const [isDrawerLeftOpen, setIsDrawerLeftOpen] = useState<boolean>(false);
  const [isDrawerRightOpen, setIsDrawerRightOpen] = useState<boolean>(false);

  const toggleDrawer = (drawer: EDrawer) => {
    if (drawer === EDrawer.LEFT) {
      setIsDrawerLeftOpen(!isDrawerLeftOpen);
      return;
    }

    setIsDrawerRightOpen(!isDrawerRightOpen);
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

          <Map routeCoords={coords} />
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
