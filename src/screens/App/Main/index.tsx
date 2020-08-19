import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DrawerMenu from "../../../components/HOCs/DrawerMenu";
import { Map, InputSearch } from "../../../components";

interface IMain {}

const Main = (props: IMain) => {
  const {} = props;

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
            onChange={(e) => console.log(e)}
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
