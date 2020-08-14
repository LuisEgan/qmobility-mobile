import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Button from "../Button";
import Icons from "../svg";
import { Text } from "../../config/Theme";
import Modal from "../Modal";
import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

interface ISelect extends IComponentsDefaults {
  onPress: (str: string) => void;
  title?: string;
  iconTitle?: TIcon;
  list: Array<string | number>;
  value: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
}

const Select = (props: ISelect) => {
  const {
    onPress,
    title,
    iconTitle,
    list,
    value,
    placeholder,
    error,
    touched,
    containerStyle,
  } = props;

  const [stateModal, setStateModal] = useState<boolean>(false);

  const text = value === "" ? placeholder : value;
  const color = value === "" ? "#ACACAC" : "#1D2226";

  const ModalSelect = () => {
    return (
      <Modal state={stateModal} onClosed={() => setStateModal(!stateModal)}>
        <View style={styles.veiwStyleConten}>
          <ScrollView style={styles.ScrollViewStyle}>
            {list.map((x: string | number, i: number) => {
              return (
                <TouchableOpacity
                  style={styles.touchSelectStyle}
                  key={i}
                  onPress={() => {
                    onPress(x);
                    setStateModal(false);
                  }}
                >
                  <View>
                    <Text style={styles.textScrollViewStyle}>{x}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.contentButton}>
          <View style={styles.veiwStyleContenButton}>
            <Button
              variant="primary"
              onPress={() => setStateModal(false)}
              label="CANCEL"
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <ModalSelect />
      <View style={[styles.content, containerStyle]}>
        {title && (
          <View style={styles.titleViewStyle}>
            <Text style={styles.titleStyle}>
              {title}
              {"  "}
            </Text>

            {iconTitle && <Icons icon={iconTitle} fill="#707070" size={17} />}
          </View>
        )}
        <View style={styles.viewSelectStyle}>
          <TouchableOpacity
            style={styles.itemSelectStyle}
            onPress={() => setStateModal(true)}
          >
            <View style={styles.rowStyle}>
              <Text
                style={[
                  {
                    color: color,
                  },
                  styles.textSelectStyle,
                ]}
              >
                {text}
              </Text>

              <Icons
                icon={stateModal ? "ArrowDownLight" : "ArrowUpLight"}
                fill="#00B0F0"
                size={30}
              />
            </View>
          </TouchableOpacity>
          {error && touched && (
            <View style={styles.error}>
              <Text variant="error">{error}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Select;

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
  },
  content: {
    marginHorizontal: "5%",
    marginVertical: "3%",
  },
  veiwStyleConten: {
    maxHeight: 370,
    width: "100%",
    maxWidth: 370,
    backgroundColor: "#f1f1f1",
    borderRadius: 15,
    alignSelf: "center",
  },
  touchSelectStyle: {
    height: 50,
    justifyContent: "center",
    borderColor: "#ACACAC",
    borderBottomWidth: 1,
  },
  titleViewStyle: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
  },
  titleStyle: {
    fontSize: 14,
  },
  rowStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  ScrollViewStyle: {
    width: "100%",
    maxWidth: 370,
    paddingHorizontal: 10,
  },
  textScrollViewStyle: {
    width: "100%",
    paddingLeft: 10,
    color: "#11041A",
    fontSize: 18,
  },
  contentButton: {
    alignItems: "center",
    paddingBottom: 25,
    width: "100%",
  },
  veiwStyleContenButton: {
    margin: 10,
    height: 55,
    width: "93%",
    maxWidth: 370,
    borderRadius: 30,
    justifyContent: "center",
    alignContent: "center",
  },

  viewSelectStyle: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
  },
  itemSelectStyle: {
    paddingLeft: 5,
    marginVertical: 10,
  },
  textSelectStyle: {
    marginTop: 5,
    fontSize: 14,
    height: 20,
  },
  error: {
    position: "absolute",
    left: 0,
    bottom: -20,
  },
});
