import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { QueryLazyOptions } from "@apollo/client";
import { Icons } from "../../../../components";
import theme, { Text } from "../../../../config/Theme";

import CheckboxesList, {
  TCheckboxesOptions,
} from "../../../../components/Lists/CheckboxesList/indext";
import Price from "./Price";
import Recomendation from "./Recommendation";
import ButtonsFilter from "./ButtonsFilter";
import { IGetVehiclesVars } from "../../../../gql/Vehicle/queries";

interface IFilter {
  show: boolean;
  getVehicles: (
    options?: QueryLazyOptions<IGetVehiclesVars> | undefined,
  ) => void;
  onCancel?: () => void;
  onDone?: () => void;
  onRangeMinChange: (min: number) => void;
  onRangeMaxChange: (min: number) => void;
  setShowFilter: (show: boolean) => void;
  initMin: number;
  initMax: number;
}

const bodyTypeOptions = ["Cabriolet", "Hatchback", "SUV", "Other"];
const seatsOptions = [2, 4, 5, 7];

const { height, width } = Dimensions.get("window");

const Filter = (props: IFilter) => {
  const {
    show,
    setShowFilter,
    onDone,
    onCancel,
    onRangeMinChange: onRangeMinChangeProp,
    onRangeMaxChange: onRangeMaxChangeProp,
    getVehicles,
    initMin,
    initMax,
  } = props;

  const [rangeMin, setRangeMin] = useState<number>(initMin);
  const [rangeMax, setRangeMax] = useState<number>(initMax);
  const [bodyType, setBodyType] = useState<TCheckboxesOptions>([]);
  const [seats, setSeats] = useState<TCheckboxesOptions>([]);

  const getNewVehicles = () => {
    const variables: IGetVehiclesVars = {
      rangeMin,
      rangeMax,
      limit: 5,
    };

    if (bodyType.length) {
      variables.bodyType = bodyType as string[];
    }
    if (seats.length) {
      variables.seats = seats as number[];
    }

    getVehicles({
      variables,
    });

    setShowFilter(false);
  };

  const onPressDone = () => {
    if (onDone) onDone();
    getNewVehicles();
  };

  const onRangeMinChange = (value: number) => {
    onRangeMinChangeProp(value);
    setRangeMin(value);
  };

  const onRangeMaxChange = (value: number) => {
    onRangeMaxChangeProp(value);
    setRangeMax(value);
  };

  const resetFilter = () => {
    setBodyType([]);
    setSeats([]);
  };

  return (
    <View style={[styles.container, { zIndex: show ? 1 : -1 }]}>
      <ScrollView style={styles.scroll}>
        <ButtonsFilter
          onPressCancel={() => onCancel && onCancel()}
          onPressDone={onPressDone}
        />

        <Recomendation
          {...{ onRangeMinChange, onRangeMaxChange, initMin, initMax }}
        />

        <Price />

        <View>
          <CheckboxesList
            options={bodyTypeOptions}
            onChange={setBodyType}
            label="Body Type"
            values={bodyType}
          />
        </View>

        <View>
          <CheckboxesList
            options={seatsOptions}
            onChange={setSeats}
            label="Minimum seats"
            values={seats}
          />
        </View>

        <View style={styles.line} />

        <TouchableOpacity style={styles.contentReset} onPress={resetFilter}>
          <Icons icon="Cancel" size={20} fill="red" />
          <Text variant="error" style={styles.text}>
            Reset filters
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height,
    width,
    backgroundColor: theme.colors.blackTransparent,
    zIndex: 1,
  },
  scroll: {
    marginTop: height * 0.05,
    height: height * 0.95,
    width: width * 0.92,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  line: {
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.grayLight,
  },
  contentReset: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.04,
    paddingBottom: height * 0.06,
  },
  text: {
    fontSize: 16,
  },
});
