import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
  DescriptionRow,
} from "react-native-google-places-autocomplete";
import useTheme from "@shopify/restyle/dist/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../ListItem/index";
import Icons from "../svg/index";
import { Theme } from "../../config/Theme";

export type TDetails = GooglePlaceDetail | DescriptionRow;

interface IGoogleSearch {
  placeholder?: string;
  onChange?: (str: string) => void;
  onPress?: (details: TDetails) => void;
  // TODO add proper type definition
  containerStyle?: Object;
}

const GoogleSearch = (props: IGoogleSearch) => {
  const { containerStyle, placeholder, onChange, onPress } = props;

  const { goBack } = useNavigation();

  const theme = useTheme<Theme>();

  return (
    <GooglePlacesAutocomplete
      autoFocus
      renderRow={(details) => (
        <View style={{ height: 80, flex: 1 }}>
          <ListItem
            onPress={() => {
              if (onPress && details) onPress(details);
            }}
            icon="Dot"
            title={details?.structured_formatting?.main_text}
            subTitle={details?.structured_formatting?.secondary_text}
          />
        </View>
      )}
      preProcess={(str) => {
        if (onChange) onChange(str);
        return str;
      }}
      onFail={(error) => console.warn(error)}
      renderLeftButton={() => (
        <TouchableOpacity style={styles.contentIconsLeft} onPress={goBack}>
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
        row: {
          height: 70,
        },
      }}
      placeholder={placeholder}
      fetchDetails
      onPress={(data, details = null) => {
        // console.log("details: ", details);
        if (onPress && details) onPress(details);
      }}
      query={{
        key: "AIzaSyDyz9GjDVV8RA5x5BSsXm_SzVtqc8F1QPU",
        language: "en",
      }}
      filterReverseGeocodingByTypes={["geocode"]}
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
