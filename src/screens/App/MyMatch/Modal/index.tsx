import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icons, Input } from "../../../../components";
import theme, { Text } from "../../../../config/Theme";
import ButtonModal from "../ButtonModal";
import Recomendation from "../Recomendation";
import Price from "../Price";

import CheckboxesList, {
  TCheckboxesOptions,
} from "../../../../components/Lists/CheckboxesList/indext";

interface IModal {
  onPressModal?: () => void;
}

const bodyTypesOptions = ["Cabriolet", "Hatchback", "SUV", "Other"];
const seatsOptions = [2, 4, 5, 7];

const { height, width } = Dimensions.get("window");

const Modal = (props: IModal) => {
  const { onPressModal } = props;

  const [bodyTypes, setBodyTypes] = useState<TCheckboxesOptions>([]);
  const [seats, setSeats] = useState<TCheckboxesOptions>([]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <ButtonModal onPressCancel={() => onPressModal && onPressModal()} />

        <Recomendation />

        <Price />

        <View>
          <CheckboxesList
            options={bodyTypesOptions}
            onChange={setBodyTypes}
            label="Body Type"
          />
        </View>

        <View>
          <CheckboxesList
            options={seatsOptions}
            onChange={setSeats}
            label="Minimum seats"
          />
        </View>

        <View style={styles.line} />

        <TouchableOpacity style={styles.contentReset}>
          <Icons icon="Cancel" size={20} fill="red" />
          <Text variant="error" style={styles.text}>
            Reset filters
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Modal;

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
