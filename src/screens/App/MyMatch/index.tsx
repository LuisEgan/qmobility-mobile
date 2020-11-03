import { useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withTimingTransition } from "react-native-redash";
import { CarCard, Header } from "../../../components";
import { DrawerLeftMenu } from "../../../components/HOCs";
import theme from "../../../config/Theme";
import Vehicle from "../../../gql/Vehicle";
import { IGetVehiclesVars } from "../../../gql/Vehicle/queries";
import { IVehicle } from "../../../gql/Vehicle/Types";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import ModalChangeLoading from "../MapSearchDone/ModalChangeLoading";

import Card from "./Card";
import Filter from "./Filter";

const { height, width } = Dimensions.get("window");

const RANGE_MIN = 100;
const RANGE_MAX = 250;

const MyMatch = () => {
  const { navigate } = useNavigation();

  const [getVehicles, { data: eVes, loading }] = useLazyQuery<
    { vehicles: IVehicle[] },
    IGetVehiclesVars
  >(Vehicle.queries.getVehicles);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [rangeMin, setRangeMin] = useState<number>(RANGE_MIN);
  const [rangeMax, setRangeMax] = useState<number>(RANGE_MAX);

  useEffect(() => {
    getVehicles({
      variables: {
        rangeMin: RANGE_MIN,
        rangeMax: RANGE_MAX,
        limit: 5,
      },
    });
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <ModalChangeLoading stateModal={loading} />

      <Filter
        show={showFilter}
        setShowFilter={(show) => setShowFilter(show)}
        getVehicles={getVehicles}
        onCancel={() => setShowFilter(false)}
        onRangeMinChange={setRangeMin}
        onRangeMaxChange={setRangeMax}
        initMin={RANGE_MIN}
        initMax={RANGE_MAX}
      />

      <View style={styles.container}>
        <Header
          title="My Match"
          containerStyle={styles.header}
          icon="Menu"
          onPress={toggleDrawer}
        />

        <View style={styles.content}>
          <View
            style={{
              paddingHorizontal: "3%",
            }}
          >
            <Card {...{ rangeMin, rangeMax, setShowFilter }} />
          </View>

          <ScrollView
            horizontal
            style={[styles.scrollViewContainer, styles.scrollView]}
            snapToAlignment="center"
            snapToInterval={width}
            decelerationRate={0}
            showsHorizontalScrollIndicator={false}
          >
            {eVes?.vehicles.map((e, index, array) => (
              <CarCard
                key={e.Vehicle_ID}
                eVe={e}
                onPressPrimary={() =>
                  navigate(APP_STACK_SCREENS_NAMES.Details, {
                    vehicleID: e.Vehicle_ID,
                  })}
                containerStyle={[
                  styles.scrollView,
                  styles.card,
                  {
                    width,
                    paddingHorizontal: width * 0.03,
                  },
                ]}
                contentStyle={styles.cardContent}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </DrawerLeftMenu>
  );
};

export default MyMatch;

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.white,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    // paddingHorizontal: width * 0.05,
    paddingVertical: "2.5%",
  },
  scrollViewContainer: {},
  scrollView: {
    // width: width * 0.9,
    height: height * 0.55,
  },
  card: {
    // padding: 10,
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
