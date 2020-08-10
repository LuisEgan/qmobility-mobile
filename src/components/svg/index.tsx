import React from "react";
import { View, TouchableOpacity } from "react-native";

import {
  ArrowDown,
  Error,
  ArrowBack,
  ArrowUpLight,
  ArrowDownLight,
  Info,
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
  ArrowUpLight: (props: Iicons) => <ArrowUpLight {...props} />,
  ArrowDownLight: (props: Iicons) => <ArrowDownLight {...props} />,
  Info: (props: Iicons) => <Info {...props} />,
  Error: (props: Iicons) => <Error {...props} />,
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
