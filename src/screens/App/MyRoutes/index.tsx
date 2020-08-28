import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Header } from "../../../components";
import { TMyRoutesNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Theme } from "../../../config/Theme";
import { RouterList } from "../../../components/Lists";
import { DrawerMenu } from "../../../components/HOCs";

interface IMyRoutes extends TMyRoutesNavProps {}

interface IListRoutes {
  date?: string;
  from?: string;
  to?: string;
}
interface IListRoutesArray extends Array<IListRoutes> {}

const listRoutes: IListRoutesArray = [
  {
    date: "20:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "21:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "22:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "23:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
];

const MyRoutes = (props: IMyRoutes) => {
  const { navigation } = props;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="My Routes"
          subTitle="Here we store all your everyday routes"
          icon="Menu"
          onPress={toggleDrawer}
        />
      ),
    });
  }, [navigation]);

  return (
    <DrawerMenu isDrawerOpen={isDrawerOpen} onDrawerToggle={setIsDrawerOpen}>
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
    </DrawerMenu>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
