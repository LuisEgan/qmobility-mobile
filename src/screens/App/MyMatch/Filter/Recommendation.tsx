import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import RangeSlider from "react-native-range-slider-expo";
import theme, { Text } from "../../../../config/Theme";

const { width } = Dimensions.get("window");

const Recomendation = () => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(500);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text color={theme.colors.white}>eVe Recommendation</Text>
        <Text color={theme.colors.white}>100 - 250 km</Text>
      </View>

      <Text style={{ padding: 10, color: "#707070", fontSize: 14 }}>
        User Range Filter
      </Text>

      <View style={styles.slider}>
        <Text style={styles.text}>0 km</Text>

        <RangeSlider
          min={0}
          max={500}
          inRangeBarColor={theme.colors.primary}
          rangeLabelsTextColor={theme.colors.primary}
          outOfRangeBarColor="#D2F6FD"
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          initialFromValue={7}
          styleSize="small"
          showRangeLabels={false}
        />

        <Text style={styles.text}>500 km</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.primary,
          }}
        >
          {`${fromValue} - ${toValue} km`}
        </Text>
      </View>
    </View>
  );
};

export default Recomendation;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#00000026",
    marginTop: 20,
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
    width: width * 0.6,
    flexDirection: "row",
    height: 40,
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    marginBottom: 25,
    fontSize: 12,
    color: theme.colors.gray,
  },
});
