import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "@shopify/restyle";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import { Card, ListItem, GoogleSearch } from "../../../components";
import { Text, Theme } from "../../../config/Theme";

import ListTest from "./ListTest";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const SearchRouter = () => {
  const [search, setSearch] = useState<string>("");

  const theme = useTheme<Theme>();
  const { navigate } = useNavigation();

  useEffect(() => {
    getPermissionAsync();
  });

  const getPermissionAsync = async () => {
    try {
      await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    } catch (error) {
      console.warn("TCL: getPermissionAsync -> error", error);
    }
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
        <FlatList
          style={{
            flex: 1,
            paddingHorizontal: "5%",
          }}
          data={ListTest.listHistory}
          renderItem={({ item, index }) => (
            <ListItem detail key={`${item}_${index}`} {...item} />
          )}
          keyExtractor={(item, index) => `${item}_${index}`}
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <GoogleSearch
        placeholder="Where are you going?"
        onChange={setSearch}
        onPress={(details) => {
          navigate(APP_STACK_SCREENS_NAMES.MapSearchDone, {
            location: {
              latitude: details?.geometry.location.lat || 0,
              longitude: details?.geometry.location.lng || 0,
            },
            formatted_address: details?.formatted_address || "",
          });
        }}
        containerStyle={styles.googleSearch}
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
    marginTop: 45,
    flex: 1,
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
});
