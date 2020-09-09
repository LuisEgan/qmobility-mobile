import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Map, InputSearch } from "../../../components";
import { DrawerMenu } from "../../../components/HOCs";

const { height } = Dimensions.get("window");

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

          <Map initialMain />
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
