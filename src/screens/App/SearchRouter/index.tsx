import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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

// const searchFor = (search: string) => ({ title }: IList): boolean =>
//   title.toLowerCase().includes(search.toLowerCase()) || !search;

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
      console.error("TCL: getPermissionAsync -> error", error);
    }
  };

  const listRowPlace = (descriptionPlace: string) => {
    setListDescriptionPlace([]);
    const datatmp = listDescriptionPlace;
    datatmp.push({
      icon: "Info",
      title: descriptionPlace.split(",")[0],
      subTitle: descriptionPlace.split(",")[1],
    });
    setListDescriptionPlace(datatmp);
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
        {listDescriptionPlace
          && listDescriptionPlace.map((place) => (
            <ListItem key={`${place.title}_${Math.random()}`} {...place} />
          ))}
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
