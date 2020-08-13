import { createText, BaseTheme, createBox } from "@shopify/restyle";

const palette = {
  bluePrimary: "#00B0F0",
  bluePrimaryDark: "#0197CE",
  bluePrimaryLight: "#00D6FD",
  bluePrimaryLighter: "#A7F1FF",

  blueSecondary: "#3B64B7",
  blueSecondaryDark: "#002060",
  blueSecondaryLight: "#CAD4E8",
  blueSecondaryLighter: "#E9ECF4",

  gray: "#707070",
  grayDark: "#282F39",
  grayLight: "#ACACAC",
  grayLighter: "#F2F2F2",

  black: "black",
  white: "white",
  red: "red",
};

const theme: BaseTheme = {
  colors: {
    primary: palette.bluePrimary,
    primaryDark: palette.bluePrimaryDark,
    primaryLight: palette.bluePrimaryLight,
    primaryLighter: palette.bluePrimaryLighter,

    secondary: palette.blueSecondary,
    secondaryDark: palette.blueSecondaryDark,
    secondaryLight: palette.blueSecondaryLight,
    secondaryLighter: palette.blueSecondaryLighter,

    title: palette.grayDark,
    subTitle: palette.gray,
    background: palette.grayLight,

    borderColor: palette.grayLighter,

    white: palette.white,
    red: palette.red,
    black: palette.black,
    grayLight: palette.grayLight,
    grayLighter: palette.grayLighter,

    // * Texts
    heading1: palette.grayDark,
    heading2: palette.blueSecondaryDark,
    subheadingLight: palette.gray,
    body: palette.grayDark,
    label: palette.gray,
    bodyHighlight: palette.bluePrimary,
    bodySmall: palette.grayLight,

    // * Input color
    defautlInput: palette.grayLight,

    // * Button color
    defaultButton: palette.grayLight,
    primaryButton: palette.bluePrimary,
    secondaryButton: palette.blueSecondaryDark,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    heading1: {
      fontSize: 30,
      color: "heading1",
      fontWeight: "bold",
    },
    heading2: {
      fontSize: 22,
      color: "heading2",
      fontWeight: "bold",
    },
    subheadingLight: {
      fontSize: 20,
      color: "subheadingLight",
    },
    body: {
      fontSize: 16,
      color: "body",
    },
    label: {
      fontSize: 14,
      color: "label",
    },
    bodyHighlight: {
      fontSize: 16,
      color: "bodyHighlight",
    },
    bodySmall: {
      fontSize: 12,
      color: "bodySmall",
    },

    button: {
      textAlign: "center",
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
    },
    error: {
      fontSize: 14,
      color: "red",
    },
  },

  breakpoints: {},
};

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    background: palette.blueSecondaryDark,
  },
};

export const Text = createText<Theme>();
export const Box = createBox<Theme>();

export default theme;
