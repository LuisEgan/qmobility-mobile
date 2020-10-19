import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icons, Card as CardItem, TextWithUnit } from "../../../../components";
import theme, { Text } from "../../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../../lib/constants";

const { height } = Dimensions.get("window");

const RANGE_MIN = 100;
const RANGE_MAX = 250;

interface ICard {
  rangeMin: number;
  rangeMax: number;
  setShowFilter: (show: boolean) => void;
}

const Card = (props: ICard) => {
  const { rangeMin = RANGE_MIN, rangeMax = RANGE_MAX, setShowFilter } = props;

  const { navigate } = useNavigation();

  const CardTitle = () => (
    <View>
      <View style={styles.cardTitleContent}>
        <Icons icon="Info" size={15} fill={theme.colors.primary} />
      </View>

      <TextWithUnit
        text={`${rangeMin}-${rangeMax}`}
        unitTextVariant="heading1"
        unitTextStyle={{ marginBottom: 0 }}
      />
    </View>
  );

  const CardSubtitle = () => (
    <View style={styles.cardSubContainer}>
      <Text variant="label" color={theme.colors.white}>
        eVe Range
      </Text>

      <View style={styles.cardSubContent}>
        <TouchableOpacity
          style={styles.cardIcons}
          onPress={() => setShowFilter(true)}
        >
          <Icons icon="Filter" size={15} fill={theme.colors.primary} />
          <Text variant="label" color="primary">
            {" "}
            Adjust filter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardIcons}
          onPress={() => navigate(APP_STACK_SCREENS_NAMES.EditProfile)}
        >
          <Icons icon="Edit" size={15} fill={theme.colors.primary} />
          <Text variant="label" color="primary">
            {" "}
            Edit Trips
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <CardItem
        title={<CardTitle />}
        subTitle={<CardSubtitle />}
        containerStyle={styles.cardContainer}
        contentStyle={styles.contentCard}
      />
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {},

  // CARDTITLE
  cardTitleContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardTitleContentText: {
    flexDirection: "row",
  },
  cardTitleText: {
    opacity: 0.5,
  },

  // CARDSUB
  cardSubContainer: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  cardIcons: {
    flexDirection: "row",
  },
  cardSubContent: {},

  // CARD
  cardContainer: {
    width: "100%",
    height: height * 0.17,
    marginBottom: height * 0.02,
  },
  contentCard: {
    paddingHorizontal: 25,
    height: height * 0.17,
  },
});
