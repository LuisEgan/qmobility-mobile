import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Header, Icons, List, RouteListItem } from "../../../components";
import { TMyRoutesNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text, Theme } from "../../../config/Theme";
import { useTheme } from "@shopify/restyle";
import { TIcon } from "../../../components/svg/icons/TypeIcons";

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

interface IMyRoutes extends TMyRoutesNavProps {}

const MyRoutes = (props: IMyRoutes) => {
  const { navigation } = props;

  const theme = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="My Routes"
          subTitle="Here we store all your everyday routes"
          icon="Menu"
        />
      ),
    });
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
        },
      ]}
    >
      <List ListArray={listRoutes} TypeList="routerItem" />
    </View>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
