import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header, Slider, Button } from "../../../components";
import slides from "./slides";
import theme, { Text } from "../../../config/Theme";
import { ESlide, ISlide } from "../../../components/Slider/Slide";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { height, width } = Dimensions.get("window");

type TAnswer = string;

interface IAnswers {
  // * question: answer
  [key: string]: TAnswer;
}

interface IOptionsSet {
  question: string;
  options: string[];
}

const allCardOptions = [
  // * clothing
  [
    "Something that doesn’t stain",
    "Designer stuff please",
    "Comfy and sporty",
    "I’m a City Gal/Pal",
  ],

  // * weekend
  [
    "Going to a Gig",
    "Hitting the Hiking Trails",
    "Fancy Spa Weekend Away",
    "Adventures With Kids",
  ],

  // * hobby
  [
    "Sipping Grand Crus",
    "Hitting the gym",
    "Meeting Up with Friends",
    "Always something to do at home",
  ],

  // * restaurant
  [
    "Anywhere with great cocktails",
    "With a Decent Kid Menu",
    "Best ribeye & wine in town with a view",
    "BBQ on a beach",
  ],
];

const ProfileScroll = () => {
  const { navigate } = useNavigation();

  const [answers, setAnswers] = useState<IAnswers>();

  const OptionsSet = ({ question, options }: IOptionsSet) => {
    const onOptionPress = (answer: string) => {
      setAnswers({ ...answers, [question]: answer });
    };

    return (
      <View style={styles.optionsContainer}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => onOptionPress(opt)}
            style={styles.option}
          >
            <Text color="white" style={{ textAlign: "center" }}>
              {opt}
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

      <Button
        label="GO"
        onPress={() => navigate(APP_STACK_SCREENS_NAMES.CheckCar)}
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
    backgroundColor: theme.colors.secondaryDark,
    borderRadius: 10,
    padding: 10,
  },
});
