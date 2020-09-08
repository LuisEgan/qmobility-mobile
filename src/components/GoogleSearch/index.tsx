import React, { useState } from "react";

import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
} from "react-native-google-places-autocomplete";
import { TIcon } from "../svg/icons/TypeIcons";

const GOOGLE_PLACES_API_KEY = "";

interface IList {
  icon?: TIcon;
  title: string;
  subTitle?: string;
}

interface TGoogleSearch extends GooglePlacesAutocompleteProps {
  placeholder?: string;
  onPlaces?: (obj: Array<IList>) => void;
}

const GoogleSearch = (props: TGoogleSearch) => {
  const { placeholder, onPlaces } = props;
  // GooglePlacesAutocompleteProps
  const [listDescriptionPlace, setListDescriptionPlace] = useState<
    Array<IList>
  >([]);

  const onGroup = (descriptionPlace: string) => {
    setListDescriptionPlace([]);
    const datatmp = listDescriptionPlace;

    const datos = descriptionPlace.replace(",", "/").split("/");

    datatmp.push({
      icon: "Info",
      title: datos[0],
      subTitle: datos[1],
    });

    if (datatmp) {
      onPlaces(datatmp);
    }
  };

  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      minLength={2}
      renderDescription={(row) => {
        if (row.description) {
          onGroup(row.description);
        }
        return row.description;
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "en",
        types: "address",
      }}
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
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch"
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3",
      ]}
      debounce={200}
    />
  );
};

GoogleSearch.defaultProps = {
  placeholder: "Search",
};

export default GoogleSearch;
