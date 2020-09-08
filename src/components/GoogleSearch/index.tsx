import React from "react";

import {
  GooglePlacesAutocomplete,
  // GooglePlacesAutocompleteProps,
} from "react-native-google-places-autocomplete";
// import { TIcon } from "../svg/icons/TypeIcons";

// interface IList {
//   icon?: TIcon;
//   title: string;
//   subTitle?: string;
// }

// interface IGoogleSearch extends GooglePlacesAutocompleteProps {
//   placeholder?: string;
//   onPlaces?: (obj: Array<IList>) => void;
// }

const GoogleSearch = () => (
  <GooglePlacesAutocomplete
    textInputProps={{}}
    placeholder="Search"
    // onPress={(data, details = null) => {
    //   console.log(data, details);
    // }}
    query={{ key: "AIzaSyDyz9GjDVV8RA5x5BSsXm_SzVtqc8F1QPU", language: "en" }}
  />
);

GoogleSearch.defaultProps = {
  placeholder: "Search",
};

export default GoogleSearch;
