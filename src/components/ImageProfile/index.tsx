import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import { Text } from "../../config/Theme";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

interface IImageProfile {
  label: string;
  color: string;
}

const ImageProfile = (props: IImageProfile) => {
  const { label, color } = props;

  const [stateModal, setStateModal] = useState<boolean>(false);

  useEffect(() => {
    getPermissionAsync();
  });

  const modalSelect = () => {
    return (
      <Modal
        transparent
        animationType={"fade"}
        visible={stateModal}
        onRequestClose={() => setStateModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.contentStyle}
          onPress={() => setStateModal(false)}
        >
          <View style={{ flex: 1 }} />
          <View style={styles.modalContent}>
            <View style={styles.modalViewStyle}>
              <TouchableOpacity
                onPress={() => searchAlbum()}
                style={styles.modalTouchStyle}
              >
                <Text style={styles.modalText}>Select album</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => tokePhoto()}
                style={styles.modalTouchStyle}
              >
                <Text style={styles.modalText}>Take a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setStateModal(false)}
                style={styles.modalTouchStyle}
              >
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
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

  const tokePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      //base64: true,
      quality: 0.2,
    });
    if (!result.cancelled) {
      setStateModal(false);
      console.log("tokePhoto -> result", result);
    }
  };

  const searchAlbum = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      //base64: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setStateModal(false);
      console.log("searchAlbum -> result", result);
    }
  };

  return (
    <>
      {modalSelect()}
      <View style={styles.container}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Text style={styles.textStyle}>{label}</Text>
        </View>
        <View style={styles.viewContentStyle}>
          <TouchableOpacity
            onPress={() => {
              loadingPhoto();
            }}
          >
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
    color: "#788BB2",
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
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    alignItems: "center",
  },
  modalViewStyle: {
    backgroundColor: "#fff",
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
  modalText: {
    fontSize: 16,
    color: "#1D2226",
    fontWeight: "bold",
  },
});
