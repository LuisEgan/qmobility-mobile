import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "../../config/Theme";
import Button from "../Button";
import Modal from "../Modal";

const { height, width } = Dimensions.get("window");

interface IAlert {
  show: boolean;
  onClose: () => void;
  text?: string;
  onOk?: () => void;
  btnText?: string;
}

const Alert = (props: IAlert) => {
  const { show, onClose, text, onOk: onOkProp, btnText = "Ok" } = props;

  const onOk = () => {
    if (onOkProp) {
      onOkProp();
    }
  };

  return (
    <Modal state={show} onClosed={onClose} contentStyle={styles.modalContent}>
      <View style={styles.alert}>
        <Text variant="heading2" style={styles.modalText}>
          {text}
        </Text>

        <View>
          <Button
            variant="primary"
            label={btnText}
            containerStyle={{ width: width * 0.4 }}
            onPress={onOk}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {},

  alert: {
    height: height * 0.4,
    width: width * 0.8,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  modalContent: {
    height,
    width,
    justifyContent: "center",
  },
  modalText: {
    textAlign: "center",
  },
});
