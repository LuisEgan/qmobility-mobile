import React from "react";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_PLACES_API_KEY = "";

interface TGoogleSearch {
  placeholder?: string;
  onPlaces?: (str: string) => void;
}

const GoogleSearch = (props: TGoogleSearch) => {
  const { placeholder, onPlaces } = props;
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "en",
      }}
      onFail={(error) => console.error("ERROR API GOOGLE ----->", error)}
      minLength={2} // minimum length of text to search
      returnKeyType="search"
      fetchDetails
      renderDescription={(row) => {
        onPlaces(row.description);
        return row.description;
      }} // custom description render
      debounce={200}
      styles={{
        textInputContainer: {
          backgroundColor: "rgba(0,0,0,0)",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
    />
  );
};

GoogleSearch.defaultProps = {
  placeholder: "Search",
};

export default GoogleSearch;
