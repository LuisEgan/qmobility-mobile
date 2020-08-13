import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Header, Slider } from "../../../components";
import slides from "./slides";
import { TProfileScrollNavProps } from "../../../navigation/Types/NavPropsTypes";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../config/Theme";

const { height, width } = Dimensions.get("window");

interface IProfileScroll extends TProfileScrollNavProps {}

const ProfileScroll = (props: IProfileScroll) => {
  const { navigation } = props;

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
      <Slider {...{ slides, width, height: height * 0.74 }} />
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
