import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/client";
import { Header, Slider } from "../../../components";
import slides from "./slides";
import theme, { Text } from "../../../config/Theme";
import { ESlide, ISlide } from "../../../components/Slider/Slide";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import {
  IAnswers,
  ECategory,
  IOptionsSet,
  allCardOptions,
  getRecommendedCategory,
} from "./options";
import Vehicle from "../../../gql/Vehicle";
import { FullScreenModal } from "../../Feedback";
import { IVehicleRecommendation } from "../../../gql/Vehicle/queries";

const { height, width } = Dimensions.get("window");

const ProfileScroll = () => {
  const { navigate } = useNavigation();

  const [
    vehicleRecommendation,
    { data: vehicleRecommendationData, loading: vehicleRecommendationLoading },
  ] = useLazyQuery<
    { vehicleRecommendation: IVehicleRecommendation[] },
    { category: string }
  >(Vehicle.queries.vehicleRecommendation);

  const [answers, setAnswers] = useState<IAnswers>({});

  // * Ask for recommended eVe with recommened categories from answers
  useEffect(() => {
    if (Object.keys(answers).length === slides.length) {
      vehicleRecommendation({
        variables: { category: getRecommendedCategory(answers) },
      });
    }
  }, [answers]);

  // * Get recommened eVe and navigate to CheckCar passing it as route prop
  useEffect(() => {
    if (vehicleRecommendationData) {
      const { vehicleRecommendation: vehicle } = vehicleRecommendationData;

      navigate(APP_STACK_SCREENS_NAMES.CheckCar, {
        vehicleRecommendation: vehicle[0],
      });
    }
  }, [vehicleRecommendationData]);

  const OptionsSet = ({ question, options }: IOptionsSet) => {
    const onOptionPress = (category: ECategory) => {
      setAnswers({
        ...answers,
        [question]: category,
      });
    };

    return (
      <View style={styles.optionsContainer}>
        {options.map(({ answer, category }) => (
          <TouchableOpacity
            key={answer}
            onPress={() => onOptionPress(category)}
            style={[
              styles.option,
              {
                backgroundColor:
                  answers[question] === category
                    ? theme.colors.primary
                    : theme.colors.secondaryDark,
              },
            ]}
          >
            <Text color="white" style={{ textAlign: "center" }}>
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const setSlides = (): ISlide[] =>
    slides.map((slide, index) => ({
      ...slide,
      outerCardComponent: (
        <OptionsSet
          question={slide.title || ""}
          options={allCardOptions[index]}
        />
      ),
    }));

  if (vehicleRecommendationLoading) return <FullScreenModal show />;

  return (
    <View style={styles.container}>
      <Header
        title="Create my Profile"
        subTitle="Add your personal traits"
        containerStyle={{
          backgroundColor: theme.colors.secondaryLighter,
        }}
      />

      <Slider
        type={ESlide.Cards}
        {...{ slides: setSlides(), width, height: height * 0.74 }}
      />
    </View>
  );
};
export default ProfileScroll;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },

  optionsContainer: {
    flex: 0.7,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  option: {
    borderRadius: 10,
    padding: 10,
  },
});
