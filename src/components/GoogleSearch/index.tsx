import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useTheme from "@shopify/restyle/dist/hooks/useTheme";
import ListItem from "../ListItem/index";
import Icons from "../svg/index";
import { Theme } from "../../config/Theme";

interface IGoogleSearch {
  placeholder?: string;
  onChange?: (str: string) => void;

  // TODO add proper type definition
  containerStyle?: Object;
}

const GoogleSearch = (props: IGoogleSearch) => {
  const { containerStyle, placeholder, onChange } = props;

  const theme = useTheme<Theme>();

  return (
    <GooglePlacesAutocomplete
      renderRow={(e) => <ListItem icon="Dot" title={e.description} />}
      preProcess={(str) => {
        if (onChange) onChange(str);
        return str;
      }}
      onFail={(error) => console.warn(error)}
      renderLeftButton={() => (
        <TouchableOpacity style={styles.contentIconsLeft}>
          <Icons icon="ArrowBackLight" />
        </TouchableOpacity>
      )}
      renderRightButton={() => (
        <TouchableOpacity style={styles.contentIconsRight}>
          <Icons icon="Mic" size={30} />
        </TouchableOpacity>
      )}
      textInputProps={{}}
      styles={{
        container: {
          borderColor: theme.colors.white,
          zIndex: 10,
          ...containerStyle,
        },

        textInputContainer: {
          backgroundColor: theme.colors.white,
          borderRadius: 10,
          height: 45,
        },
        textInput: {
          fontSize: 16,
        },
      }}
      placeholder={placeholder}
      // onPress={(data, details = null) => {
      //   console.log(data, details);
      // }}
      query={{
        key: "AIzaSyDyz9GjDVV8RA5x5BSsXm_SzVtqc8F1QPU",
        language: "en",
      }}
      enablePoweredByContainer={false}
    />
  );
};

GoogleSearch.defaultProps = {
  placeholder: "Search",
};

export default GoogleSearch;

const styles = StyleSheet.create({
  contentIconsLeft: {
    marginVertical: 10,
    justifyContent: "center",
  },
  contentIconsRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 10,
  },
});
