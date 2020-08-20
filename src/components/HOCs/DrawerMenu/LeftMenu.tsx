import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import useTheme from "@shopify/restyle/dist/hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { Text, Theme } from "../../../config/Theme";
import { ImageProfile } from "../..";
import IconsList from "../../Lists/IconsList";
import { IIconsListItem } from "../../Lists/IconsList/IconsListItem";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { width, height } = Dimensions.get("window");

interface ListItems extends Array<IIconsListItem> {}

const LeftMenu = () => {
  const { navigate } = useNavigation();

  const theme = useTheme<Theme>();

  const listItems: ListItems = [
    {
      text: "Create Route",
      icon: "Apple",
      textColor: "white",
      onPress: () => navigate(APP_STACK_SCREENS_NAMES.CreateProfile),
    },
    {
      text: "My Vehicles",
      icon: "Apple",
      textColor: "white",
      onPress: () => navigate(APP_STACK_SCREENS_NAMES.CreateProfile),
    },
    {
      text: "My Stats",
      icon: "Apple",
      textColor: "white",
      onPress: () => navigate(APP_STACK_SCREENS_NAMES.CreateProfile),
    },
    {
      text: "My Match",
      icon: "Apple",
      textColor: "white",
      onPress: () => navigate(APP_STACK_SCREENS_NAMES.CreateProfile),
    },
  ];

  const optionsListItems: ListItems = [
    {
      text: "Account Settings",
      icon: "Apple",
      textColor: "white",
      onPress: () => navigate(APP_STACK_SCREENS_NAMES.CreateProfile),
    },
    {
      text: "Logout",
      icon: "Apple",
      textColor: "white",
      onPress: () => navigate(APP_STACK_SCREENS_NAMES.CreateProfile),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <ImageProfile
          label="JD"
          color={theme.colors.primary}
          changePhotoOption={false}
        />
        <Text variant="heading1" color="white">
          Jon Doe
        </Text>
        <Text variant="bodyHighlight">JoDo</Text>
        <Text variant="body" color="bodySmall">
          jondoe@gmail.com
        </Text>
      </View>

      <View style={styles.list}>
        <IconsList items={listItems} />
      </View>

      <View style={styles.options}>
        <IconsList items={optionsListItems} />
      </View>
    </View>
  );
};

export default LeftMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.05,
    paddingLeft: width * 0.05,
  },

  info: {
    flex: 1,
  },

  list: {
    flex: 2,
    marginTop: 60,
  },

  options: {
    flex: 0.6,
    marginBottom: 20,
  },
});
