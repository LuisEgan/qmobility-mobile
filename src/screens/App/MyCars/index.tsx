import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Header, Icons, Footer } from "../../../components";
import { Text } from "../../../config/Theme";
import { TMyCarsNavProps } from "../../../navigation/Types/NavPropsTypes";

const { height } = Dimensions.get("window");

interface IMyCars extends TMyCarsNavProps {}

interface IListCar {
  img: string;
  name: string;
  title: string;
  subTitle: string;
}
interface IListCarArray extends Array<IListCar> {}
const listMyCars: IListCarArray = [
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
  },
];

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

  const ListCar = ({ img, name, title, subTitle }: IListCar) => {
    return (
      <View style={styles.cardCar}>
        <View style={styles.costentCar}>
          <View style={styles.contentImage}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: img,
              }}
            />
          </View>
          <View>
            <Text style={styles.textStyleCars} variant="heading2">
              {name}
            </Text>
            <Text style={styles.textStyleCars} variant="body">
              {title}
            </Text>
            <Text variant="bodyHighlight">{subTitle}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
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

        {listMyCars.map((car) => {
          return <ListCar {...car} />;
        })}
      </ScrollView>
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
  cardCar: {
    width: "100%",
    marginVertical: "1%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#002060",
  },
  textStyleCars: {
    color: "#fff",
  },
});
