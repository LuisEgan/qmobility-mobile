interface ISlide {
  title: string;
  text: string;
  icon: any;
}
interface ISlides extends Array<ISlide> {}

const slides: ISlides = [
  {
    title: "Hello, I'm eVe",
    text:
      "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    icon: require("../../assets/png/icon.png"),
  },
];
