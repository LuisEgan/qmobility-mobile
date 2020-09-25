import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { useQuery } from "@apollo/client";
import theme, { Text } from "../../../config/Theme";
import IconsList from "../../Lists/IconsList";
import { IIconsListItem } from "../../Lists/IconsList/IconsListItem";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { IComponentsDefaults } from "../../../lib/Types";
import car from "../../../assets/png/Nissan_Leaf_2018-02.png";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import Alert from "../../Alert";

interface ListItems extends Array<IIconsListItem> {}

interface IRightMenu extends IComponentsDefaults {
  onItemPress?: (navigateTo?: string) => void;
}

const RightMenu = (props: IRightMenu) => {
  const { animContainerStyle, onItemPress: onItemPressProp } = props;

  const { data: userData } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const { navigate } = useNavigation();

  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const onItemPress = (navigateTo: string) => {
    if (onItemPressProp) {
      onItemPressProp(navigateTo);
    }

    navigate(navigateTo);
  };

  const onBookTestDrive = async () => {
    setShowFeedback(true);
  };

  const listItems: ListItems = [
    {
      text: "Change Car",
      icon: "DirectionsCar",
      onPress: () => onItemPress(APP_STACK_SCREENS_NAMES.MyCars),
    },
    {
      text: "Book test drive",
      icon: "History",
      onPress: onBookTestDrive,
    },
  ];

  return (
    <Animated.View style={[styles.container, animContainerStyle]}>
      <Alert
        show={showFeedback}
        onClose={() => setShowFeedback(false)}
        text="Thanks! We'll contact you shortly."
      />

      <View
        style={[styles.header, { borderBottomColor: theme.colors.primary }]}
      >
        <ImageBackground
          source={
            userData ? { uri: userData.user.selectedVehicle?.Images[0] } : car
          }
          style={styles.bgImg}
        />
        <View>
          <Text variant="heading1" color="white">
            {userData?.user.selectedVehicle?.Vehicle_Model}
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
