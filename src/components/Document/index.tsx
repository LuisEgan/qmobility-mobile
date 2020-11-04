import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import Modal from "../Modal";
import Icons from "../svg";

interface IDocument {
  state: boolean;
  onClosed: () => void;
  url?: string;
}

const { width, height } = Dimensions.get("window");

const Document = ({ state, onClosed, url }: IDocument) => {
  const Close = () => (
    <View style={styles.contentIcon}>
      <Icons
        icon="Cancel"
        onPress={() => onClosed()}
        size={30}
        stroke="black"
      />
    </View>
  );

  const ModalCocument = () => (
    <Modal state={state} onClosed={() => onClosed()}>
      <TouchableOpacity activeOpacity={1}>
        <Close />
        {url && <WebView source={{ uri: url }} style={styles.pdf} />}
      </TouchableOpacity>
    </Modal>
  );

  return <View style={styles.container}>{state && <ModalCocument />}</View>;
};

export default Document;

const styles = StyleSheet.create({
  container: {},
  contentIcon: {
    paddingLeft: 13,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  pdf: {
    width,
    height: height * 0.97,
  },
});
