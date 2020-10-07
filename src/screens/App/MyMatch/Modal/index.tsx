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
    <View style={styles.containerModal}>
      <ScrollView style={styles.scroll}>
        <ButtonModal onPressCancel={() => onPressModal && onPressModal()} />

        <Recomendation />

        <View>
          <Text>Price</Text>
          <View style={styles.modalContentInput}>
            <Input placeholder="Min" containerStyle={styles.modalInputMin} />
            <Input placeholder="Max" containerStyle={styles.modalInputMax} />
          </View>
        </View>

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

        <TouchableOpacity style={styles.modalResetContent}>
          <Icons icon="Cancel" size={20} fill="red" />
          <Text variant="error">Reset filters</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {},
  // MODAL
  containerModal: {
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
    width: width * 0.8,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  modalContentInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalInputMax: {
    flex: 1,
    marginVertical: 0,
  },
  modalInputMin: {
    flex: 1,
    marginRight: 15,
    marginVertical: 0,
  },

  modalResetContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height * 0.1,
  },
});
