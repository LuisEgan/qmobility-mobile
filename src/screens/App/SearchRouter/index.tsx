import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { InputSearch } from "../../../components";
import { Text } from "../../../config/Theme";

import { TIcon } from "../../../components/svg/icons/TypeIcons";
import Card from "./Card";
import List from "./List";

interface IListFavorite {
  title: string;
  subTitle: string;
}

interface IListFavoriteArray extends Array<IListFavorite> {}

const listFavorite: IListFavoriteArray = [
  {
    title: "Home",
    subTitle: "211 Stockwell Rd, Brixton, London",
  },
  {
    title: "Work",
    subTitle: "Kennington Oval, London",
  },
];

interface IListHistory {
  icon: TIcon;
  title: string;
  subTitle: string;
}

interface IHistoryArray extends Array<IListHistory> {}

const listHistory: IHistoryArray = [
  {
    icon: "Info",
    title: "Mother’s House",
    subTitle: "Westminster, London SW1A 1AA, UK",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 2A",
    subTitle: "London, United Kingdom",
  },
];

const SearchRouter = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <View style={styles.container}>
      <InputSearch
        placeholder="Where are you going?"
        onChange={(str) => {
          setSearch(str);
        }}
      />
      <Card ArrayList={listFavorite} />
      <View style={styles.content}>
        <Text style={styles.text} variant="label">
          RECENT
        </Text>
      </View>
      <List ArrayList={listHistory} filter={search} />
    </View>
  );
};
export default SearchRouter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
  content: {
    height: 50,
    justifyContent: "center",
  },
  text: {
    marginVertical: "1%",
  },
});
