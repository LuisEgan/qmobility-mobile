import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Header, Slider } from "../../../components";
import slides from "./slides";
import { TProfileScrollNavProps } from "../../../navigation/Types/NavPropsTypes";

const { height, width } = Dimensions.get("window");

interface IProfileScroll extends TProfileScrollNavProps {}

const ProfileScroll = (props: IProfileScroll) => {
  const { navigation } = props;
  // const { navigate, goBack } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="Create my Profile"
          subTitle="Add your personal traits"
          color="#00000029"
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
