import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DrawerMenu from "../../../components/HOCs/DrawerMenu";
import { Map, InputSearch } from "../../../components";

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

          <Map />
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
    marginTop: 30,
    zIndex: 1,
    elevation: 1,
  },
});
