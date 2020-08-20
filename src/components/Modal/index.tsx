import React, { PropsWithChildren } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal as ModalItem,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../config/Theme";

import { IComponentsDefaults } from "../../lib/Types";

interface IModal extends IComponentsDefaults {
  state: boolean;
  onClosed: () => void;
}

const Modal = (props: PropsWithChildren<IModal>) => {
  const { state, onClosed, children, containerStyle } = props;

  const theme = useTheme<Theme>();

  return (
    <ModalItem
      transparent
      animationType="fade"
      visible={state}
      onRequestClose={onClosed}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.contentStyle,
          {
            backgroundColor: theme.colors.blackTransparent,
          },
          containerStyle,
        ]}
        onPress={onClosed}
      >
        <View style={{ flex: 1 }} />
        <View style={styles.modalContent}>{children}</View>
      </TouchableOpacity>
    </ModalItem>
  );
};

export default Modal;

const styles = StyleSheet.create({
  contentStyle: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    alignItems: "center",
  },
});
