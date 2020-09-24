import { ISlide } from "../../../components/Slider/Slide";

interface ISlides extends Array<ISlide> {}

const slides = (images: string[]): ISlides => {
  const firstSlides: ISlides = [];

  images.some((imgUri, index) => {
    if (index >= 10) return true;

    const slice: ISlide = { imgUri };
    firstSlides.push(slice);
    return false;
  });

  return firstSlides;
};
export default slides;
