import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { InputSearch, Card, ListItem } from "../../../components";
import { Text, Theme } from "../../../config/Theme";

import { TIcon } from "../../../components/svg/icons/TypeIcons";

import ListTest from "./ListTest";
import { useTheme } from "@shopify/restyle";

const { height } = Dimensions.get("window");

interface IList {
  icon?: TIcon;
  title: string;
  subTitle?: string;
}

const searchFor = (search: string) => {
  return ({ title }: IList): boolean => {
    return title.toLowerCase().includes(search.toLowerCase()) || !search;
  };
};

const SearchRouter = () => {
  const [search, setSearch] = useState<string>("");

  const theme = useTheme<Theme>();

  return (
    <View style={styles.container}>
      <InputSearch
        placeholder="Where are you going?"
        onChange={(str) => {
          setSearch(str);
        }}
      />
      <View style={styles.contentCard}>
        {ListTest.listFavorite &&
          ListTest.listFavorite.map((place, i) => {
            return <Card key={`${place.title}_${i}`} {...place} />;
          })}
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
        {ListTest.listHistory &&
          ListTest.listHistory.filter(searchFor(search)).map((place, i) => {
            return <ListItem key={`${place.title}_${i}`} {...place} />;
          })}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};
export default SearchRouter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
  containerScroll: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height * 0.7,
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