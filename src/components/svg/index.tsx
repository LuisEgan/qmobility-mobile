import React from "react";
import { View, TouchableOpacity } from "react-native";

import {
  ArrowDown,
  Error,
  ArrowBack,
  ArrowForward,
  ArrowUpLight,
  ArrowDownLight,
  ArrowBackLight,
  Info,
  Email,
  Menu,
  Edit,
  Facebook,
  LinkedIn,
  Google,
  Apple,
  Done,
  Mic,
  MoreVert,
  CompassWithCircles,
} from "./icons";

import { TIcon } from "./icons/TypeIcons";

interface Iicons {
  icon: TIcon;
  size?: number;
  fill?: string;
  stroke?: string;
  onPress?: () => void;
}

const icons = {
  ArrowDown: (props: Iicons) => <ArrowDown {...props} />,
  ArrowBack: (props: Iicons) => <ArrowBack {...props} />,
  ArrowForward: (props: Iicons) => <ArrowForward {...props} />,
  ArrowUpLight: (props: Iicons) => <ArrowUpLight {...props} />,
  ArrowDownLight: (props: Iicons) => <ArrowDownLight {...props} />,
  ArrowBackLight: (props: Iicons) => <ArrowBackLight {...props} />,
  Info: (props: Iicons) => <Info {...props} />,
  Email: (props: Iicons) => <Email {...props} />,
  Menu: (props: Iicons) => <Menu {...props} />,
  Edit: (props: Iicons) => <Edit {...props} />,
  Error: (props: Iicons) => <Error {...props} />,
  Facebook: (props: Iicons) => <Facebook {...props} />,
  LinkedIn: (props: Iicons) => <LinkedIn {...props} />,
  Google: (props: Iicons) => <Google {...props} />,
  Apple: (props: Iicons) => <Apple {...props} />,
  Done: (props: Iicons) => <Done {...props} />,
  Mic: (props: Iicons) => <Mic {...props} />,
  MoreVert: (props: Iicons) => <MoreVert {...props} />,
  CompassWithCircles: (props: Iicons) => <CompassWithCircles {...props} />,
};

const Icons = (props: Iicons) => {
  const { size, icon, onPress } = props;

  const renderSVG = () => (
    <View
      style={{
        width: size,
        height: size,
      }}
    >
      {icons[icon](props)}
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderSVG()}</TouchableOpacity>
  ) : (
    renderSVG()
  );
};

Icons.defaultProps = {
  icon: "Error",
  size: 40,
  fill: "#000000",
  stroke: "transparent",
};

export default Icons;
