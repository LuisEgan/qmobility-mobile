import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RangeSlider from "react-native-range-slider-expo";
import theme, { Text } from "../../../../config/Theme";

const Recomendation = () => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text color={theme.colors.white}>eVe Recommendation</Text>
        <Text color={theme.colors.white}>100 - 250 km</Text>
      </View>

      <Text style={{ padding: 10 }}>User Range Filter</Text>

      <View style={styles.slider}>
        <RangeSlider
          min={5}
          max={25}
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          initialFromValue={7}
          styleSize="small"
        />
      </View>
    </View>
  );
};

export default Recomendation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.secondaryDark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
  },
  slider: {
    width: "100%",
    borderColor: theme.colors.grayLighter,
    borderWidth: 1,
    borderRadius: 10,
  },
});
