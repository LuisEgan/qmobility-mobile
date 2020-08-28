import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { Header, Slider, Button } from "../../../components";
import slides from "./slides";
import { TProfileScrollNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Theme } from "../../../config/Theme";
import { ESlide } from "../../../components/Slider/Slide";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { height, width } = Dimensions.get("window");

interface IProfileScroll extends TProfileScrollNavProps {}

const ProfileScroll = (props: IProfileScroll) => {
  const { navigation } = props;

  const { navigate } = useNavigation();

  const theme = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="Create my Profile"
          subTitle="Add your personal traits"
          containerStyle={{
            backgroundColor: theme.colors.secondaryLighter,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Slider
        type={ESlide.Cards}
        {...{ slides, width, height: height * 0.74 }}
      />

      <Button
        label="GO"
        onPress={() => navigate(APP_STACK_SCREENS_NAMES.CheckCar)}
      />
    </View>
  );
};
export default ProfileScroll;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
