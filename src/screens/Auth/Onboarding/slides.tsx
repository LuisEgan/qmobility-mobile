import { ISlide } from "../../../components/Slider/Slide";
import theme from "../../../config/Theme";

interface ISlides extends Array<ISlide> {}

const slides: ISlides = [
  {
    title: "Hello, I'm eVe",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    icon: require("../../../assets/png/icon.png"),
  },
  {
    title: "Who is eVe?",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    icon: require("../../../assets/png/icon.png"),
    backgroundColor: theme.colors.primaryDark,
  },
  {
    title: "Why eVe",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    icon: require("../../../assets/png/icon.png"),
    backgroundColor: theme.colors.primaryLight,
  },
  {
    title: "How to",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    icon: require("../../../assets/png/icon.png"),
    backgroundColor: theme.colors.primaryLighter,
    titleColor: "primary",
    textColor: "primary",
  },
];

export default slides;
