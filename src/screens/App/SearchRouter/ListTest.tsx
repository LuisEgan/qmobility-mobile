import { TIcon } from "../../../components/svg/icons/TypeIcons";

interface IList {
  icon?: TIcon;
  title: string;
  subTitle?: string;
}

interface IListArray extends Array<IList> {}

const listFavorite: IListArray = [
  {
    icon: "Info",
    title: "Home",
  },
  {
    title: "Work",
    subTitle: "Kennington Oval, London",
  },
];

const listHistory: IListArray = [
  {
    icon: "Info",
    title: "Mother’s House",
    subTitle: "Westminster, London SW1A 1AA, UK",
  },
  {
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 1AA",
    subTitle: "London, United Kingdom",
  },
  {
    icon: "Info",
    title: "Westminster, London SW1A 2A",
    subTitle: "London, United Kingdom",
  },
];

export default {
  listFavorite,
  listHistory,
};
