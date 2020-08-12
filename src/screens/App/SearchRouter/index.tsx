import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { InputSearch, Icons } from "../../../components";
import { Text } from "../../../config/Theme";

import { TIcon } from "../../../components/svg/icons/TypeIcons";

interface IListFavorite {
  title: string;
  subTitle: string;
}

interface IListHistory {
  icon: TIcon;
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

const { width, height } = Dimensions.get("window");

const SearchRouter = () => {
  const [search, setSearch] = useState<string>("");

  const Favorite = ({ title, subTitle }: IListFavorite) => {
    return (
      <TouchableOpacity style={styles.contentFavorite}>
        <View style={styles.favoriteContainer}>
          <View style={styles.favoriteContent}>
            <Icons icon="Menu" fill="#00B0F0" size={25} />
          </View>
          <Text variant="heading2" style={styles.favoriteTextStyle}>
            {title}
          </Text>
        </View>
        <Text variant="label" style={styles.favoriteTextStyle}>
          {subTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const History = ({ icon, title, subTitle }: IListHistory) => {
    return (
      <TouchableOpacity style={styles.scrollContent}>
        <View style={styles.scrollViewLeft}>
          <Icons icon={icon} fill="#00B0F0" size={20} />
        </View>
        <View style={styles.scrollContentText}>
          <Text variant="body">{title}</Text>
          <Text variant="label">{subTitle}</Text>
        </View>
        <TouchableOpacity style={styles.scrollViewRight}>
          <Icons icon="MoreVert" fill="#ACACAC" size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <InputSearch
        placeholder="Where are you going?"
        onChange={() => {
          console.log("a");
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{ height: 80 }}
      >
        {listFavorite &&
          listFavorite.map((place) => {
            return <Favorite {...place} />;
          })}
      </ScrollView>
      <View style={styles.contentTextStyle}>
        <Text style={styles.textStyle} variant="label">
          recent
        </Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {listHistory &&
          listHistory.map((place) => {
            return <History {...place} />;
          })}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};
export default SearchRouter;

const styles = StyleSheet.create({
  container: {},
  contentFavorite: {
    height: 80,
    width: width * 0.5,
    marginHorizontal: width * 0.03,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#002060",
  },
  favoriteContainer: {
    flexDirection: "row",
  },
  favoriteContent: {
    marginHorizontal: 5,
  },
  favoriteTextStyle: {
    color: "#fff",
  },
  textStyle: {
    marginLeft: "5%",
    marginVertical: "1%",
  },
  contentTextStyle: {
    height: 50,
    justifyContent: "center",
  },
  scrollContainer: {
    backgroundColor: "#fff",
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height * 0.7,
  },
  scrollContent: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  scrollViewLeft: {
    marginRight: "3%",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
    width: width * 0.07,
  },
  scrollContentText: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: width * 0.6,
  },
  scrollViewRight: {
    marginLeft: "3%",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
    width: width * 0.07,
  },
});
