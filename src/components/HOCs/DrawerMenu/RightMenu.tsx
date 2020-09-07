import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { Text, Theme } from "../../../config/Theme";
import IconsList from "../../Lists/IconsList";
import { IIconsListItem } from "../../Lists/IconsList/IconsListItem";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { IComponentsDefaults } from "../../../lib/Types";
import car from "../../../assets/png/Nissan_Leaf_2018-02.png";
import { Icons } from "../..";

interface ListItems extends Array<IIconsListItem> {}

interface IRightMenu extends IComponentsDefaults {
  onItemPress?: (navigateTo?: string) => void;
}

const RightMenu = (props: IRightMenu) => {
  const { animContainerStyle, onItemPress: onItemPressProp } = props;

  const theme = useTheme<Theme>();

  const { navigate } = useNavigation();

  const onItemPress = (navigateTo: string) => {
    if (onItemPressProp) {
      onItemPressProp(navigateTo);
    }

    navigate(navigateTo);
  };

  const listItems: ListItems = [
    {
      text: "Change Car",
      icon: "Apple",
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.MyCars),
    },
    {
      text: "Book test drive",
      icon: "Apple",
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.Profile),
    },
  ];

  return (
    <Animated.View style={[styles.container, animContainerStyle]}>
      <View
        style={[styles.header, { borderBottomColor: theme.colors.primary }]}
      >
        <ImageBackground source={car} style={styles.bgImg} />
        <View>
          <Text variant="heading1" color="white">
            Nissan Leaf
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icons icon="Apple" fill="white" size={30} />
          <Text variant="subheadingLight" color="white">
            100%
          </Text>
        </View>
      </View>

      <View style={styles.list}>
        <IconsList items={listItems} />
      </View>
    </Animated.View>
  );
};

export default RightMenu;

const styles = StyleSheet.create({
  container: {},

  header: {
    flex: 0.7,
    borderBottomWidth: 8,
    justifyContent: "flex-end",
    padding: 20,
  },
  bgImg: {
    ...StyleSheet.absoluteFillObject,
  },

  list: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
  },
});
