import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal as ModalItem,
} from "react-native";
import { Theme } from "../../config/Theme";

import { useTheme } from "@shopify/restyle";

interface IModal {
  state: boolean;
  onClosed: () => void;
  children: ReactNode;
}

const Modal = (props: IModal) => {
  const { state, onClosed, children } = props;

  const theme = useTheme<Theme>();

  return (
    <ModalItem
      transparent
      animationType={"fade"}
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
