import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@apollo/client";
import { Header } from "../../../components";
import { Theme, Text } from "../../../config/Theme";
import { RouterList } from "../../../components/Lists";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { Route } from "../../../gql";
import { IGetMySaveRoute } from "../../../gql/Route/queries";

const MyRoutes = () => {
  const {
    loading: getMySaveRouteLoading,
    data: getMySaveRouteData,
    error: getMySaveRouteError,
  } = useQuery<IGetMySaveRoute>(Route.queries.getMySaveRoute);

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
        {getMySaveRouteLoading ? (
          <View
            style={{
              marginTop: "50%",
            }}
          >
            <ActivityIndicator color={theme.colors.primary} />
            <Text
              variant="bodyHighlight"
              style={{
                textAlign: "center",
                marginVertical: "5%",
              }}
            >
              Loading...
            </Text>
          </View>
        ) : (
          <>
            {!getMySaveRouteError ? (
              <RouterList ListArray={getMySaveRouteData?.getMyRoutes} />
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
  },
});
