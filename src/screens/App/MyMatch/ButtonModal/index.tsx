import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../../../../config/Theme";

interface IButtonModal {
  onPressCancel?: () => void;
  onPressDone?: () => void;
}

const ButtonModal = (props: IButtonModal) => {
  const { onPressCancel, onPressDone } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressCancel && onPressCancel()}>
        <Text color="primary">Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPressDone && onPressDone()}>
        <Text color="secondaryDark">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
