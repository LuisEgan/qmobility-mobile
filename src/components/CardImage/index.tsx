import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { Text } from "../../config/Theme";
import { IComponentsDefaults } from "../../lib/Types";

interface ICardImage extends IComponentsDefaults {
  imgUri?: string;
  imgSource?: ImageSourcePropType;
  svgIcon?: JSX.Element;
  name: string;
  title: string;
  subTitle: string;
  textStyle?: StyleProp<ViewStyle>;
}

const CardImage = (props: ICardImage) => {
  const {
    imgUri,
    imgSource,
    svgIcon,
    name,
    title,
    subTitle,
    containerStyle,
    textStyle,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.costent}>
        <View style={styles.contentImage}>
          {imgUri || imgSource ? (
            <Image
              style={styles.logo}
              source={
                imgSource || {
                  uri: imgUri,
                }
              }
            />
          ) : (
            svgIcon
          )}
        </View>
        <View>
          <Text style={textStyle} variant="heading2">
            {name}
          </Text>
          <Text style={textStyle} variant="body">
            {title}
          </Text>
          <Text variant="bodyHighlight">{subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardImage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "1%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#ACACAC",
  },
  costent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  contentImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
