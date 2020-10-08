import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, CarCard, Header } from "../../../components";
import { DrawerLeftMenu } from "../../../components/HOCs";
import theme from "../../../config/Theme";

import Card from "./Card";
import Filter from "./Filter";

const { height, width } = Dimensions.get("window");

const MyMatch = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      {showFilter && <Filter onCancel={() => setShowFilter(false)} />}

      <View style={styles.container}>
        <Header
          title="My Match"
          containerStyle={styles.header}
          icon="Menu"
          onPress={toggleDrawer}
        />

        <View style={styles.content}>
          <Card />

          <Button label="filter" onPress={() => setShowFilter(true)} />

          <ScrollView
            horizontal
            style={[styles.scrollViewContainer, styles.scrollView]}
            snapToAlignment="center"
            snapToInterval={width * 0.9}
            decelerationRate={0}
            showsHorizontalScrollIndicator={false}
          >
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
            <CarCard
              containerStyle={[styles.scrollView, styles.card]}
              imgUri="https://i.ytimg.com/vi/YUs7CabKBkg/hqdefault.jpg"
              contentStyle={styles.cardContent}
            />
          </ScrollView>
        </View>
      </View>
    </DrawerLeftMenu>
  );
};

export default MyMatch;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    paddingHorizontal: width * 0.05,
    paddingVertical: "2.5%",
  },
  scrollViewContainer: {},
  scrollView: {
    width: width * 0.9,
    height: height * 0.55,
  },
  card: {
    padding: 10,
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: theme.colors.white,
  },
});
