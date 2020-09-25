import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import {
  GooglePlaceDetail,
  DescriptionRow,
} from "react-native-google-places-autocomplete";
import GoogleSearch from "../GoogleSearch/index";

interface IDetails extends GooglePlaceDetail, DescriptionRow {}

export type IChangeRoute = "START" | "END";

export interface IEditChangeRoute {
  str: string;
  type: IChangeRoute;
}

interface ISearchEditRouter {
  typeEdit: IChangeRoute;
  onChange: (value: IEditChangeRoute) => void;
  onCancel: () => void;
}

const { width } = Dimensions.get("window");

const SearchEditRouter = (props: ISearchEditRouter) => {
  const { typeEdit, onChange, onCancel } = props;

  const onGoogleReute = async (details: IDetails) => {
    onChange({
      str: details.description,
      type: typeEdit,
    });
  };

  return (
    <View style={styles.container}>
      <GoogleSearch
        onTypeCancel={() => onCancel()}
        placeholder="Where are you going?"
        onPress={(details) => onGoogleReute(details)}
        containerStyle={{
          ...styles.googleSearch,
          flex: 1,
        }}
      />
    </View>
  );
};

export default SearchEditRouter;

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    paddingHorizontal: "5%",
  },
  googleSearch: {
    marginTop: Platform.OS === "ios" ? 60 : 20,
  },
});
