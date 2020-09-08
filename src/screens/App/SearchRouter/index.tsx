import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { useTheme } from "@shopify/restyle";
import * as Permissions from "expo-permissions";
import { InputSearch, Card, ListItem, GoogleSearch } from "../../../components";
import { Text, Theme } from "../../../config/Theme";

import { TIcon } from "../../../components/svg/icons/TypeIcons";

import ListTest from "./ListTest";

interface IList {
  icon?: TIcon;
  title: string;
  subTitle?: string;
}

const SearchRouter = () => {
  // const [search, setSearch] = useState<string>("");
  const [listDescriptionPlace, setListDescriptionPlace] = useState<
    Array<IList>
  >([]);

  const theme = useTheme<Theme>();

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

  const listRowPlace = (descriptionPlace: Array<IList>) => {
    setListDescriptionPlace(descriptionPlace);
  };

  return (
    <View style={styles.container}>
      <InputSearch>
        <GoogleSearch
          placeholder="Where are you going?"
          onPlaces={listRowPlace}
        />
      </InputSearch>

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
      <ScrollView
        style={[
          styles.containerScroll,
          { backgroundColor: theme.colors.white },
        ]}
      >
        <FlatList
          data={listDescriptionPlace}
          renderItem={({ item, index }) => (
            <ListItem key={`${item}_${index}`} {...item} />
          )}
          keyExtractor={(item, index) => `${item}_${index}`}
        />

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default SearchRouter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  containerScroll: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
