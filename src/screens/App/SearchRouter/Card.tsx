import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Icons } from "../../../components";
import { Text } from "../../../config/Theme";

interface IListFavorite {
  title: string;
  subTitle: string;
}

interface ICard {
  ArrayList: Array<IListFavorite>;
  containerStyle?: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get("window");

const Card = (props: ICard) => {
  const { ArrayList, containerStyle } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {ArrayList &&
        ArrayList.map(({ title, subTitle }: IListFavorite, i) => {
          return (
            <TouchableOpacity key={`${title}_${i}`} style={styles.content}>
              <View style={styles.favoriteContainer}>
                <View style={styles.favoriteContent}>
                  <Icons icon="Menu" fill="#00B0F0" size={25} />
                </View>
                <Text variant="heading2" style={styles.text}>
                  {title}
                </Text>
              </View>
              <Text variant="label" style={styles.text}>
                {subTitle}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    height: 80,
    width: width * 0.43,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#002060",
  },
  favoriteContainer: {
    flexDirection: "row",
  },
  favoriteContent: {
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});
