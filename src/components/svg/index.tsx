import React from "react";
import { View, TouchableOpacity } from "react-native";

import { ArrowDown, Error } from "./icons";

type TIcon = "ArrowDown" | "Error";

interface Iicons {
  icon: TIcon;
  size?: number;
  fill?: string;
  stroke?: string;
  onPress?: () => void;
}

const icons = {
  ArrowDown: (props: Iicons) => <ArrowDown {...props} />,
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
