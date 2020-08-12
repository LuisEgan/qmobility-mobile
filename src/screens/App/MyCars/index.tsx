import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Header, Icons, Footer } from "../../../components";
import { Text } from "../../../config/Theme";
import { TTCsNavProps } from "../../../navigation/NavPropsTypes";

const { height } = Dimensions.get("window");

interface IMyCars extends TTCsNavProps {}

const MyCars = (props: IMyCars) => {
  const { navigation } = props;
  // const { navigate, goBack } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="My Vehicles"
          subTitle="These are all you beautiful cars"
          icon="Menu"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: "5%",
          }}
        >
          <Text variant="titleProfile">Your Comparison vehicles</Text>
          <Icons icon="Edit" fill="#ACACAC" size={15} />
        </View>
        <View
          style={{
            width: "100%",
            height: 80,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#ACACAC",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "#00D6FD",
              }}
            >
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: "https://reactnative.dev/img/tiny_logo.png",
                }}
              />
            </View>
            <View>
              <Text variant="title">Jon´s Mercedes</Text>
              <Text variant="subTitleFooter">Model s</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: "5%",
          }}
        >
          <Text variant="titleProfile">Virtual vehicles</Text>
        </View>
      </View>
      <Footer
        title="Feeling a bit adventurous today?"
        subTitle="Check our catalogue"
      />
    </View>
  );
};
export default MyCars;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  content: {
    marginHorizontal: "5%",
    height: height * 0.69,
  },

  viewStyle: {
    marginVertical: "5%",
  },
  textSelectStyle: {},
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
