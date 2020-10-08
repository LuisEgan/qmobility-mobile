import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import theme, { Text } from "../../config/Theme";
import { kmToMiles } from "../../lib/numbers";
import { numberWithDots } from "../../lib/strings";
import { IComponentsDefaults } from "../../lib/Types";
import Button from "../Button";
import Icons from "../svg";

const { width } = Dimensions.get("window");

interface ICarCard extends IComponentsDefaults {
  height?: number;
  width?: number;
  imgUri: string;
  contentStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  onPressPrimary: () => void;
  onPressSecondary?: () => void;
}

const CarCard = (props: ICarCard) => {
  const {
    containerStyle,
    height: heightProp,
    width: widthProp,
    imgUri,
    contentStyle,
    imageStyle,
    onPressPrimary,
    onPressSecondary,
  } = props;

  return (
    <View
      style={[
        styles.container,
        { height: heightProp, width: widthProp },
        containerStyle,
      ]}
    >
      <View style={[styles.imageContainer, imageStyle]}>
        <ImageBackground
          style={styles.image}
          source={{
            uri: imgUri,
          }}
        />
      </View>

      <View style={[styles.content, contentStyle]}>
        <Text variant="heading2" color="primaryDark">
          Nissan Leaf
        </Text>

        <Text>Full make information</Text>
        <Text>Full model information</Text>

        <View style={styles.textContainer}>
          <View style={styles.textIcon}>
            <Icons icon="Person" size={15} />
            <Text color="primaryDark" style={styles.iconText}>
              4
            </Text>
          </View>

          <View style={styles.textIcon}>
            <Icons icon="Polymer" size={15} />
            <Text color="primaryDark" style={styles.iconText}>
              {numberWithDots("30000")}
            </Text>
          </View>

          <View style={styles.textIcon}>
            <Icons icon="Market" size={15} />
            <Text color="primaryDark" style={styles.iconText}>
              {kmToMiles(250)}
              {" "}
              Mi
            </Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            containerStyle={styles.button}
            variant="primary"
            label="CHOOSE CAR"
            onPress={onPressPrimary}
          />

          {onPressSecondary && (
            <Button
              inverse
              containerStyle={[styles.button, { marginLeft: 10 }]}
              variant="primary"
              label="CHOOSE CAR"
              onPress={onPressSecondary}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {},

  imageContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },

  content: {
    flex: 0.9,
    backgroundColor: theme.colors.grayLighter,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIcon: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },

  iconText: {
    marginLeft: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  button: { height: 30, width: width * 0.3 },
});
