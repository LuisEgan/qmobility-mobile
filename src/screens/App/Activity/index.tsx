import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  Button,
  Header,
  Icons,
  TextWithUnit,
  TriCard,
} from "../../../components";
import { DrawerLeftMenu } from "../../../components/HOCs";
import theme, { Text } from "../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const Activty = () => {
  const { navigate } = useNavigation();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const EveRecommendation = () => (
    <View style={styles.recommendation}>
      <Text variant="heading2" color="primary">
        eVe Range Recommendation
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          variant="subheadingLight"
          color="white"
          style={{ marginVertical: 5 }}
        >
          148 - 300 miles
        </Text>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyRoutes)}
        >
          <Text color="white" style={{ marginRight: 5 }}>
            Edit trips
          </Text>
          <Icons icon="Edit" fill={theme.colors.white} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const Stats = () => (
    <ScrollView>
      <TriCard
        col1={{
          icon: "ArrowUpLight",
          subTitle: "Year Total",
          title: (
            <TextWithUnit
              text="11598"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col2={{
          icon: "ArrowUpLight",
          subTitle: "Avg. week",
          title: (
            <TextWithUnit
              text="223"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col3={{
          icon: "Clock",
          subTitle: "Avg. trip",
          title: (
            <TextWithUnit
              text="18"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
      />

      <TriCard
        col1={{
          icon: "ArrowUpLight",
          subTitle: "Max trip",
          title: (
            <TextWithUnit
              text="0"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col2={{
          icon: "ArrowUpLight",
          subTitle: "Min Trip",
          title: (
            <TextWithUnit
              text="0"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
            />
          ),
        }}
        col3={{
          icon: "Clock",
          subTitle: "Driving",
          title: (
            <TextWithUnit
              text="0"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="h"
            />
          ),
        }}
      />

      <TriCard
        col1={{
          icon: "ArrowUpLight",
          subTitle: "Idle Time",
          title: (
            <TextWithUnit
              text="0"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="h"
            />
          ),
        }}
        col2={{
          icon: "ArrowUpLight",
          subTitle: "eFuel used",
          title: (
            <TextWithUnit
              text="0"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="kWh"
            />
          ),
        }}
        col3={{
          icon: "Clock",
          subTitle: "eFuel Cost",
          title: (
            <TextWithUnit
              text="0"
              textColor="secondaryDark"
              unitTextColor="secondaryDark"
              unit="£"
            />
          ),
        }}
      />

      <TriCard
        col1={{
          icon: "ArrowUpLight",
          subTitle: "enRoute Charges",
          title: "0",
        }}
        col2={{
          icon: "ArrowUpLight",
          subTitle: "gCO2/km Saved",
          title: "0",
        }}
        col3={{
          icon: "Clock",
          subTitle: "Trees Saved",
          title: "0",
        }}
      />
    </ScrollView>
  );

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <View style={styles.container}>
        <Header
          title="My Stats"
          subTitle="eActivity"
          icon="Menu"
          onPress={toggleDrawer}
        />

        <View style={styles.content}>
          <EveRecommendation />

          <Stats />

          <View style={{ paddingVertical: 15 }}>
            <Button
              variant="primary"
              label="See matching vehicles"
              onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyMatch)}
            />
          </View>
        </View>
      </View>
    </DrawerLeftMenu>
  );
};

export default Activty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    backgroundColor: theme.colors.white,
    flex: 1,
    padding: 15,
  },

  user: {
    flexDirection: "row",
  },
  userText: {
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },

  recommendation: {
    backgroundColor: theme.colors.secondaryDark,
    borderRadius: 10,
    marginVertical: 15,
    padding: 15,
  },
});
