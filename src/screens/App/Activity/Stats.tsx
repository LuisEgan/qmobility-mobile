import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { TextWithUnit, TriCard } from "../../../components";
import theme, { Text } from "../../../config/Theme";

const { width } = Dimensions.get("window");

const Stats = () => (
  <ScrollView style={styles.container}>
    <TriCard
      col1={{
        icon: "Bubble",
        title: "0",
        subTitle: "Trips",
      }}
      col2={{
        icon: "ArrowUpLight",
        title: (
          <TextWithUnit
            text="0"
            textColor="secondaryDark"
            unitTextColor="secondaryDark"
          />
        ),
        subTitle: "Travelled",
      }}
      col3={{
        icon: "Clock",
        title: (
          <TextWithUnit
            text="0"
            textColor="secondaryDark"
            unitTextColor="secondaryDark"
            unit="h"
          />
        ),
        subTitle: "Driving",
      }}
    />

    <TriCard
      col1={{
        icon: "Flash",
        title: (
          <TextWithUnit
            text="105"
            textColor="secondaryDark"
            unitTextColor="secondaryDark"
            unit="kWh"
          />
        ),
        subTitle: "Consumed",
      }}
      col2={{
        icon: "Bubble",
        title: (
          <TextWithUnit
            inverse
            text="29.40"
            textColor="secondaryDark"
            unitTextColor="secondaryDark"
            unit="£"
          />
        ),
        subTitle: "eFuel cost",
      }}
      col3={{
        icon: "Speed",
        title: "5.00",
        subTitle: "Efficiency mi/kWh",
      }}
    />

    <TriCard
      col1={{
        icon: <Text variant="bodyHighlight">12</Text>,
        title: <Text variant="bodySmallBold">Total Changes</Text>,
        subTitle: (
          <TextWithUnit
            text="49:00"
            unit="h"
            textVariant="heading1"
            textColor="secondaryDark"
            unitTextColor="secondaryDark"
          />
        ),
      }}
      col2={{
        icon: <Text variant="bodyHighlight">5</Text>,
        title: <Text variant="bodySmallBold">Slow Charges</Text>,
        subTitle: (
          <TextWithUnit
            text="45:00"
            unit="h"
            textVariant="heading1"
            textColor="secondaryDark"
            unitTextColor="secondaryDark"
          />
        ),
      }}
      col3={{
        icon: <Text variant="bodyHighlight">7</Text>,
        title: <Text variant="bodySmallBold">Slow Chargers</Text>,
        subTitle: (
          <TextWithUnit
            text="4:00"
            unit="h"
            textVariant="heading1"
            textColor="secondaryDark"
            unitTextColor="secondaryDark"
          />
        ),
      }}
      onPress={() => console.warn("all")}
    />

    <TriCard
      col1={{
        icon: "Bubble",
        title: "0",
        subTitle: "Trips",
      }}
      col2={{
        icon: "Circle",
        title: "0mi",
        subTitle: "Travelled",
      }}
      col3={{
        icon: "Clock",
        title: "0h",
        subTitle: "Driving",
      }}
    />
  </ScrollView>
);

export default Stats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingHorizontal: width * 0.1,
  },
});
