import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "@shopify/restyle";
import * as Permissions from "expo-permissions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Card, ListItem, Icons } from "../../../components";
import { Text, Theme } from "../../../config/Theme";

// import { TIcon } from "../../../components/svg/icons/TypeIcons";

import ListTest from "./ListTest";

// interface IList {
//   icon?: TIcon;
//   title: string;
//   subTitle?: string;
// }

const SearchRouter = () => {
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

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        renderRow={(e) => <ListItem icon="ArrowBack" title={e.description} />}
        renderLeftButton={() => <Icons icon="Apple" />}
        textInputProps={{
          style: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
        }}
        styles={{
          container: { marginTop: 100, zIndex: 1, backgroundColor: "red" },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: { color: "#1faadb" },
        }}
        placeholder="Search"
        // onPress={(data, details = null) => {
        //   console.log(data, details);
        // }}
        query={{
          key: "AIzaSyDyz9GjDVV8RA5x5BSsXm_SzVtqc8F1QPU",
          language: "en",
        }}
        enablePoweredByContainer={false}
      />
      {/* <GoogleSearch
          placeholder="Where are you going?"
          onPlaces={listRowPlace}
        /> */}

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
          style={{ flex: 1 }}
          data={ListTest.listHistory}
          renderItem={({ item, index }) => (
            <ListItem key={`${item}_${index}`} {...item} />
          )}
          keyExtractor={(item, index) => `${item}_${index}`}
        />
      </View>
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
