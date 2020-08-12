import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Header, Icons, Button } from "../../../components";
import { Text } from "../../../config/Theme";
import { TMyCarsNavProps } from "../../../navigation/Types/NavPropsTypes";

const { height } = Dimensions.get("window");

interface IMyCars extends TMyCarsNavProps {}

interface IListCar {
  img: string;
  name: string;
  title: string;
  subTitle: string;
  type: number;
}
interface IListCarArray extends Array<IListCar> {}
const listMyCars: IListCarArray = [
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 1,
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 1,
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 1,
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 1,
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 1,
  },
];

const ListAlternative: IListCarArray = [
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 0,
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 0,
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 0,
  },
  {
    img: "https://reactnative.dev/img/tiny_logo.png",
    name: "Nissan Leaf Acenta 40",
    title: "Default eve",
    subTitle: "Default eve",
    type: 0,
  },
];

const MyCars = (props: IMyCars) => {
  const { navigation } = props;
  // const { navigate, goBack } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="Profile Created"
          subTitle="Well done"
          color="#00000029"
        />
      ),
    });
  }, [navigation]);

  const ListCar = ({ img, name, title, subTitle, type }: IListCar) => {
    return (
      <View
        style={[
          styles.cardCar,
          {
            backgroundColor: type ? "#002060" : "#00000029",
          },
        ]}
      >
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
            <Text
              style={{
                color: type ? "#fff" : "#000",
              }}
              variant="heading2"
            >
              {name}
            </Text>
            <Text
              style={{
                color: type ? "#fff" : "#000",
              }}
              variant="body"
            >
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
          <Icons icon="Done" fill="#00B0F0" />
          <Text variant="subheadingLight">Congratulations! You’re done!</Text>
          <Text variant="subheadingLight">This is your perfect match:</Text>
        </View>

        {listMyCars &&
          listMyCars.map((car, i) => {
            return <ListCar key={`${car.name}_${i}`} {...car} />;
          })}

        {ListAlternative && (
          <>
            <View style={styles.containerTtitleEdition}>
              <Text variant="subheadingLight">Here’s an alternative:</Text>
            </View>

            {ListAlternative &&
              ListAlternative.map((car, i) => {
                return <ListCar key={`${car.name}_${i}`} {...car} />;
              })}
          </>
        )}
      </ScrollView>
      <Button
        label="Go to map"
        variant="primary"
        onPress={() => {
          console.log("1");
        }}
        containerStyle={styles.buttonStyle}
      />
    </View>
  );
};
export default MyCars;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    marginHorizontal: "5%",
  },
  containerTtitleEdition: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "5%",
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
  },

  buttonStyle: {
    marginHorizontal: "10%",
    marginVertical: "6%",
  },
});
