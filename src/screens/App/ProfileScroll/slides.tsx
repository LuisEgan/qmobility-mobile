import { ISlide } from "../../../components/Slider/Slide";
import theme from "../../../config/Theme";

import favClothingStyle from "../../../assets/png/favClothingStyle.png";
import favHobby from "../../../assets/png/favHobby.png";
import nextRestaurant from "../../../assets/png/nextRestaurant.png";
import perfectWeekend from "../../../assets/png/perfectWeekend.png";

interface ISlides extends Array<ISlide> {}

const slides: ISlides = [
  {
    title: "Favorite clothing style?",
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: favClothingStyle,
    backgroundColor: theme.colors.primaryDark,
    contentStyle: { flex: 1 },
  },
  {
    title: "Perfect weekend?",
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: favHobby,
    backgroundColor: theme.colors.primaryDark,
    contentStyle: { flex: 1 },
  },
  {
    title: "Favourite hobby?",
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: nextRestaurant,
    backgroundColor: theme.colors.redLight,
    contentStyle: { flex: 1 },
  },
  {
    title: "Your next restaurant?",
    titleStyle: { textAlign: "center", marginVertical: 0 },
    imgSource: perfectWeekend,
    backgroundColor: theme.colors.yellow,
    contentStyle: { flex: 1 },
  },
];

export default slides;
