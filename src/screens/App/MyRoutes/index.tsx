import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { Header } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { RouterList } from "../../../components/Lists";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { Route } from "../../../gql";
import { IGetMySaveRoute } from "../../../gql/Route/queries";
import ScrollCategory from "./ScrollCategory";

const MyRoutes = () => {
  const {
    loading: getMySaveRouteLoading,
    data: getMySaveRouteData,
    error: getMySaveRouteError,
  } = useQuery<{ getMyRoutes: IGetMySaveRoute }>(Route.queries.getMySaveRoute);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("All");

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

      <ScrollCategory
        data={getMySaveRouteData?.getMyRoutes || []}
        filter={filter}
        onPress={(str) => setFilter(str)}
      />
      <View style={styles.container}>
        {getMySaveRouteLoading ? (
          <View style={styles.contentLoading}>
            <ActivityIndicator color={theme.colors.primary} />
            <Text variant="bodyHighlight" style={styles.textLoading}>
              Loading...
            </Text>
          </View>
        ) : (
          <>
            {!getMySaveRouteError ? (
              <RouterList
                filter={filter}
                ListArray={getMySaveRouteData?.getMyRoutes || []}
              />
            ) : (
              <View>
                <Text>{getMySaveRouteError.message}</Text>
              </View>
            )}
          </>
        )}
      </View>
    </DrawerLeftMenu>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentLoading: {
    marginTop: "50%",
  },
  textLoading: {
    textAlign: "center",
    marginVertical: "5%",
  },
});
