import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Header } from "../../../components";
import { TMyRoutesNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Theme } from "../../../config/Theme";
import { RouterList } from "../../../components/Lists";

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
      <RouterList ListArray={listRoutes} />
    </View>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
