import "react-native-google-places-autocomplete";

/* eslint no-empty: "off" */
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";

declare module "react-native-google-places-autocomplete" {
  interface GooglePlacesAutocompleteProps {
    renderRow?: (description: DescriptionRow) => JSX.Element;
    preProcess?: (str: string) => string;
  }
}

declare module "react-native-smooth-pincode-input";
