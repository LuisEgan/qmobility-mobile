import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Header } from "../../../components";
import { Theme } from "../../../config/Theme";
import { RouterList } from "../../../components/Lists";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { TIcon } from "../../../components/svg/icons/TypeIcons";

interface IListRoutes {
  icon?: TIcon;
  title?: string;
  details?: string;
}
interface IListRoutesArray extends Array<IListRoutes> {}

const listRoutes: IListRoutesArray = [
  {
    icon: "Domain",
    title: "My Cool Office",
    details: "30 John Islip St, Westminster, London SW1P 4DD, United Kingdom",
  },
  {
    icon: "Home",
    title: "My Lovely Home",
    details: "30 John Islip St, Westminster, London SW1P 4DD, United Kingdom",
  },
  {
    icon: "Domain",
    title: "Gym Time",
  },
  {
    icon: "Home",
    title: "Romantic Hideaway",
    details: "30 John Islip St, Westminster, London SW1P 4DD, United Kingdom",
  },
];

const MyRoutes = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <Header
        title="My Routes"
        subTitle="Here we store all your everyday routes"
        icon="Menu"
        onPress={toggleDrawer}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.white,
          },
        ]}
      >
        <RouterList ListArray={listRoutes} />
      </View>
    </DrawerLeftMenu>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
