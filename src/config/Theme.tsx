import { createText, BaseTheme, createBox } from "@shopify/restyle";

const palette = {
  blue: "#00B0F0",
  blueDark: "#002060",
  blueLight: "#00D6FD",
  blueLighter: "#C5EAF1",

  gray: "#cfcfcf",
  grayLight: "#E9ECF4",
  grayDark: "#282F39",

  white: "white",
};

const theme: BaseTheme = {
  colors: {
    primary: palette.blue,
    primaryDark: palette.blueDark,
    primaryLight: palette.blueLight,

    title: palette.grayDark,
    subTitle: palette.gray,
    background: palette.grayLight,

    white: palette.white,

    // * Button color
    defaultButton: palette.grayLight,
    primaryButton: palette.blue,
    secondaryButton: palette.blueDark,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    title: {
      fontSize: 28,
      color: "title",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 24,
      lineHeight: 30,
      color: "subTitle",
    },
    regular: {
      fontSize: 16,
      lineHeight: 24,
      color: "title",
    },

    button: {
      textAlign: "center",
      fontSize: 17,
      color: "white",
      fontWeight: "bold",
    },
  },

  breakpoints: {},
};

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    background: palette.blueDark,
  },
};

export const Text = createText<Theme>();
export const Box = createBox<Theme>();

export default theme;
