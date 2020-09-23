import { ISlide } from "../../../components/Slider/Slide";
import theme from "../../../config/Theme";

import favClothingStyle from "../../../assets/png/favClothingStyle.png";
import favHobby from "../../../assets/png/favHobby.png";
import nextRestaurant from "../../../assets/png/nextRestaurant.png";
import perfectWeekend from "../../../assets/png/perfectWeekend.png";

interface ISlides extends Array<ISlide> {}

export interface IQuestions {
  // * question: multiplier
  [question: string]: number;
}

export const questionsMultiplliers: IQuestions = {
  "Favorite clothing style?": 5,
  "Perfect weekend?": 4,
  "Favourite hobby?": 1,
  "Your next restaurant?": 3,
};

export const QUESTIONS = Object.keys(questionsMultiplliers);

const slides: ISlides = [
  {
    title: QUESTIONS[0],
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: favClothingStyle,
    backgroundColor: theme.colors.primaryDark,
    contentStyle: { flex: 1 },
  },
  {
    title: QUESTIONS[1],
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: favHobby,
    backgroundColor: theme.colors.primaryDark,
    contentStyle: { flex: 1 },
  },
  {
    title: QUESTIONS[2],
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: nextRestaurant,
    backgroundColor: theme.colors.redLight,
    contentStyle: { flex: 1 },
  },
  {
    title: QUESTIONS[3],
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: perfectWeekend,
    backgroundColor: theme.colors.yellow,
    contentStyle: { flex: 1 },
  },
];

export default slides;
