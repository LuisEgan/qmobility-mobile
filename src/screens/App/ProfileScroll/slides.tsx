import React from "react";
import { ISlide } from "../../../components/Slider/Slide";
import theme from "../../../config/Theme";
import Icons from "../../../components/svg";

interface ISlides extends Array<ISlide> {}

const slides: ISlides = [
  {
    title: "Favorite clothing style?",
    svgIcon: <Icons icon="CompassWithCircles" size={100} />,
    backgroundColor: theme.colors.primaryDark,
    contentStyle: { flex: 1 },
  },
  {
    title: "Why eVe",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryLight,
    contentStyle: { flex: 1 },
  },
  {
    title: "How to",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    svgIcon: <Icons icon="CompassWithCircles" size={250} />,
    backgroundColor: theme.colors.primaryLighter,
    titleColor: "primary",
    textColor: "primary",
    contentStyle: { flex: 1 },
  },
];

export default slides;
