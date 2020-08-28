import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import Button from "../Button";
import Icons from "../svg";
import { Text, Theme } from "../../config/Theme";
import Modal from "../Modal";
import { TIcon } from "../svg/icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

interface ISelect extends IComponentsDefaults {
  onPress: (str: string | number) => void;
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

  const theme = useTheme<Theme>();

  const [stateModal, setStateModal] = useState<boolean>(false);

  const text = value === "" ? placeholder : value;
  const color = value === "" ? theme.colors.grayLight : theme.colors.black;

  const ModalSelect = () => (
    <Modal state={stateModal} onClosed={() => setStateModal(!stateModal)}>
      <View
        style={[
          styles.veiwStyleConten,
          {
            backgroundColor: theme.colors.grayLighter,
          },
        ]}
      >
        <ScrollView style={styles.ScrollViewStyle}>
          {list.map((x) => (
            <TouchableOpacity
              style={[
                styles.touchSelectStyle,
                {
                  borderColor: theme.colors.grayLight,
                },
              ]}
              key={x}
              onPress={() => {
                onPress(x);
                setStateModal(false);
              }}
            >
              <View>
                <Text
                  style={[
                    styles.textScrollViewStyle,
                    {
                      color: theme.colors.black,
                    },
                  ]}
                >
                  {x}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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

            {iconTitle && (
              <Icons icon={iconTitle} fill={theme.colors.gray} size={17} />
            )}
          </View>
        )}
        <View
          style={[
            styles.viewSelectStyle,
            {
              borderColor: theme.colors.grayLighter,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.itemSelectStyle}
            onPress={() => setStateModal(true)}
          >
            <View style={styles.rowStyle}>
              <Text
                style={[
                  {
                    color,
                  },
                  styles.textSelectStyle,
                ]}
              >
                {text}
              </Text>

              <Icons
                icon={stateModal ? "ArrowDownLight" : "ArrowUpLight"}
                fill={theme.colors.primary}
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
  content: {
    marginVertical: "3%",
  },
  veiwStyleConten: {
    maxHeight: 370,
    width: "100%",
    maxWidth: 370,
    borderRadius: 15,
    alignSelf: "center",
  },
  touchSelectStyle: {
    height: 50,
    justifyContent: "center",

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
