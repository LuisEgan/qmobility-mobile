/** @format */

import React from "react";
import { View, TouchableOpacity } from "react-native";

import { ArrowDown, Error } from "./icons";

interface Iicons {
  icon: string;
  size?: number;
  fill?: string;
  stroke?: string;
  pressable?: boolean;
  onPress?: () => void;
}

const icons = {
  ArrowDown: (props: Iicons) => <ArrowDown {...props} />,

  //ICONO POR SI ESCRIBE MAL EL NOMBRE
  Error: (props: Iicons) => <Error {...props} />,
};

const Icons = (props: Iicons) => {
  const { size, icon, fill, pressable, onPress } = props;

  const renderSVG = () => (
    <View
      style={{
        fill: fill,
        width: size,
        height: size,
      }}
    >
      {!icons[icon] ? icons["Error"](props) : icons[icon](props)}
    </View>
  );

  return pressable ? (
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
  pressable: false,
  onPress: () => {},
};

export default Icons;
