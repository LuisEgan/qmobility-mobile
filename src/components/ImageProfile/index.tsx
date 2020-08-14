import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Theme } from "../../config/Theme";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@shopify/restyle";
import Modal from "../Modal";

interface IImageProfile {
  label: string;
  color: string;
}

const ImageProfile = (props: IImageProfile) => {
  const { label, color } = props;

  const [stateModal, setStateModal] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  useEffect(() => {
    getPermissionAsync();
  });

  const ModalSelect = () => {
    return (
      <Modal
        state={stateModal}
        onClosed={() => {
          setStateModal(!stateModal);
        }}
      >
        <View
          style={[
            styles.modalViewStyle,
            {
              backgroundColor: theme.colors.white,
            },
          ]}
        >
          <TouchableOpacity
            onPress={searchAlbum}
            style={styles.modalTouchStyle}
          >
            <Text variant="body">Select album</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.modalTouchStyle}>
            <Text variant="body">Take a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStateModal(false)}
            style={styles.modalTouchStyle}
          >
            <Text variant="body">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const getPermissionAsync = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    } catch (error) {
      console.error("TCL: getPermissionAsync -> error", error);
    }
  };

  const loadingPhoto = (): void => {
    setStateModal(true);
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.2,
    });
    if (!result.cancelled) {
      setStateModal(false);
      console.log("takePhoto -> result", result);
    }
  };

  const searchAlbum = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setStateModal(false);
      console.log("searchAlbum -> result", result);
    }
  };

  return (
    <>
      <ModalSelect />
      <View style={styles.container}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Text
            style={[
              styles.textStyle,
              {
                color: theme.colors.secondaryLight,
              },
            ]}
          >
            {label}
          </Text>
        </View>
        <View style={styles.viewContentStyle}>
          <TouchableOpacity onPress={loadingPhoto}>
            <Text style={styles.textContentStyle}>Change Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ImageProfile;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
  },
  content: {
    width: 80,
    height: 80,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  viewContentStyle: {
    marginTop: "2%",
  },
  textContentStyle: {
    fontSize: 12,
    color: "#00B0F0",
  },
  contentStyle: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    alignItems: "center",
  },
  modalViewStyle: {
    width: "90%",
    height: 180,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalTouchStyle: {
    height: 50,
    justifyContent: "center",
    marginHorizontal: "5%",
  },
});
