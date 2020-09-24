import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "@shopify/restyle";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import {
  GooglePlaceDetail,
  DescriptionRow,
} from "react-native-google-places-autocomplete";
import { Card, ListItem, GoogleSearch } from "../../../components";
import { Text, Theme } from "../../../config/Theme";

import ListTest from "./ListTest";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import {
  IGetRouterRecent,
  IGetRouterRecentVar,
} from "../../../gql/RecentRoute/queries";
import { RecentRoute } from "../../../gql";

interface IDetails extends GooglePlaceDetail, DescriptionRow {}

const SearchRouter = () => {
  const [search, setSearch] = useState<string>("");

  const theme = useTheme<Theme>();
  const { navigate } = useNavigation();

  useEffect(() => {
    getPermissionAsync();
  });

  const { loading, data: dataRecent, error: errorLoading } = useQuery<
    IGetRouterRecent,
    IGetRouterRecentVar
  >(RecentRoute.queries.getMyRecentRoutes, {
    variables: {
      limit: 20,
    },
  });

  const getPermissionAsync = async () => {
    try {
      await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    } catch (error) {
      console.warn("TCL: getPermissionAsync -> error", error);
    }
  };

  const onRoute = (details: { origin?: string; destination?: string }) => {
    navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
      origin: details?.origin || "",
      destination: details?.destination || "",
    });
  };

  const History = () => (
    <>
      <View style={styles.contentCard}>
        {ListTest.listFavorite
          && ListTest.listFavorite.map((place) => (
            <Card key={`${place.title}_${Math.random()}`} {...place} />
          ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.text} variant="label">
          RECENT
        </Text>
      </View>

      <View
        style={[
          styles.containerScroll,
          { backgroundColor: theme.colors.white },
        ]}
      >
        {loading ? (
          <View
            style={{
              marginVertical: 50,
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
            {errorLoading ? (
              <View>
                <Text variant="body" style={styles.textLoading}>
                  {errorLoading.message}
                </Text>
              </View>
            ) : (
              <FlatList
                style={{
                  flex: 1,
                  paddingHorizontal: "5%",
                }}
                data={dataRecent?.getMyRecentRoutes}
                renderItem={({ item, index }) => (
                  <ListItem
                    detail
                    key={`${item}_${index}`}
                    icon="Search"
                    title={item.origin || ""}
                    subTitle={item.destination}
                    onPress={onRoute}
                  />
                )}
                keyExtractor={(item, index) => `${item}_${index}`}
              />
            )}
          </>
        )}
      </View>
    </>
  );

  const onGoogleReute = async (details: IDetails) => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
        origin: `${latitude},${longitude}`,
        destination: details?.formatted_address || details?.description,
      });
    }
  };

  const altitude = search.length <= 2 ? 0.2 : 1;
  // const altitude = search.length <= 2 ? (Platform.OS === "ios" ? 0.1 : 0.2) : 1;

  return (
    <View style={styles.container}>
      <GoogleSearch
        placeholder="Where are you going?"
        onChange={(str) => setSearch(str)}
        onPress={(details) => onGoogleReute(details)}
        containerStyle={{
          ...styles.googleSearch,
          flex: altitude,
        }}
      />

      {search.length <= 2 && <History />}
    </View>
  );
};

export default SearchRouter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  googleSearch: {
    marginTop: 60,
    // flex: .1
  },
  containerScroll: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    backgroundColor: "red",
  },
  contentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    height: 50,
    justifyContent: "center",
  },
  text: {
    marginVertical: "1%",
  },
  textLoading: {
    textAlign: "center",
    marginVertical: "5%",
  },
});
