import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Map, InputSearch } from "../../../components";
import { DrawerMenu } from "../../../components/HOCs";

const { height } = Dimensions.get("window");

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <DrawerMenu isDrawerOpen={isDrawerOpen} onDrawerToggle={setIsDrawerOpen}>
        <View style={styles.container}>
          <InputSearch
            containerStyle={styles.inputSearch}
            onChange={() => null}
            leftIcon="Menu"
            onLeftIconPress={toggleDrawer}
          />

          <Map routeCoords={coords} />
        </View>
      </DrawerMenu>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  inputSearch: {
    marginTop: height * 0.06,
    zIndex: 1,
    elevation: 1,
    margin: 30,
  },
});
