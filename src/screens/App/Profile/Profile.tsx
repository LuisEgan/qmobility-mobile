import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Header,
  ImageProfile,
  Input,
  Icons,
  CardImage,
} from "../../../components";
import { TTCsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { useNavigation } from "@react-navigation/native";

interface ICreateProfile extends TTCsNavProps {}

const CreateProfile = (props: ICreateProfile) => {
  const { navigation } = props;
  const { navigate } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="My Profile"
          subTitle="To store all your info in one place"
          icon="Menu"
          iconRight="Edit"
          textRight="Edit"
          onPressRight={() => navigate(APP_STACK_SCREENS_NAMES.EditProfile)}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      // ! Fix - Colors should only come from Theme
      <ImageProfile label="JD" color="#002060" />
      <Text variant="heading1">Jon Doe</Text>
      <Text variant="bodyHighlight">JoDo</Text>
      <Text variant="subheadingLight">jondoe@gmail.com</Text>
      <Input
        disabled
        defaultValue="18/08/1984"
        onChange={() => console.log()}
      />
      <Input
        disabled
        defaultValue="+44 123 456 789"
        onChange={() => console.log()}
      />
      <View style={styles.containerTtitleEdition}>
        <Text variant="label">YOUR VIRTUAL EVE</Text>
        <TouchableOpacity
          onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyCars)}
        >
          // ! Fix - Colors should only come from Theme
          <Icons icon="Edit" fill="#ACACAC" size={15} />
        </TouchableOpacity>
      </View>
      <View>
        <CardImage
          imgUri="https://reactnative.dev/img/tiny_logo.png"
          name="Nissan Leaf Acenta 40"
          title="Defaul eVe"
          subTitle="View Profile"
          containerStyle={styles.Card}
        />
      </View>
    </View>
  );
};
export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // ! Fix - Colors should only come from Theme
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  Card: {
    // ! Fix - Colors should only come from Theme
    backgroundColor: "#fff",
    borderColor: "#ACACAC",
    borderWidth: 1,
  },
});
