import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Header, Icons, Footer, CardImage } from "../../../components";
import { Text, Theme } from "../../../config/Theme";
import { DrawerMenu } from "../../../components/HOCs";

const { height } = Dimensions.get("window");

interface IListCar {
  imgUri: string;
  name: string;
  title: string;
  subTitle: string;
}
interface IListCarArray extends Array<IListCar> {}
const listMyCars: IListCarArray = [
  {
    imgUri: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
  },
  {
    imgUri: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
  },
];

const MyCars = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DrawerMenu isDrawerOpen={isDrawerOpen} onDrawerToggle={setIsDrawerOpen}>
      <View style={styles.container}>
        <Header
          title="My Vehicles"
          subTitle="These are all you beautiful cars"
          icon="Menu"
          onPress={toggleDrawer}
        />

        <ScrollView
          style={[
            styles.content,
            { backgroundColor: theme.colors.contentBackground },
          ]}
        >
          <View style={styles.containerTtitleEdition}>
            <Text variant="label">Your Comparison vehicles</Text>
            <Icons icon="Edit" fill="#ACACAC" size={15} />
          </View>
          <View style={styles.cardMyCar}>
            <View style={styles.costentCar}>
              <View style={styles.contentImage}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: "https://reactnative.dev/img/tiny_logo.png",
                  }}
                />
              </View>
              <View>
                <Text variant="heading2">Jon´s Mercedes</Text>
                <Text variant="bodyHighlight">Model s</Text>
              </View>
            </View>
          </View>
          <View style={styles.containerTtitleEdition}>
            <Text variant="label">Virtual vehicles</Text>
          </View>

          {listMyCars.map((car) => (
            <CardImage key={`${car.title}_${Math.random()}`} {...car} />
          ))}
        </ScrollView>
        <Footer
          title="Feeling a bit adventurous today?"
          subTitle="Check our catalogue"
        />
      </View>
    </DrawerMenu>
  );
};
export default MyCars;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  content: {
    paddingHorizontal: "5%",
    height: height * 0.69,
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  cardMyCar: {
    width: "100%",
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ACACAC",
  },
  costentCar: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  contentImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: "5%",
    backgroundColor: "#00D6FD",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
