import React from "react";
import { View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

import {
  ArrowDown,
  Error,
  ArrowBack,
  ArrowForward,
  ArrowUpLight,
  ArrowDownLight,
  ArrowBackLight,
  ArrowRightLight,
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
  Delete,
  Circle,
  Market,
  Clock,
  Bubble,
  CompassWithCircles,
} from "./icons";

import { TIcon } from "./icons/TypeIcons";
import { IComponentsDefaults } from "../../lib/Types";

interface Iicons extends IComponentsDefaults {
  icon: TIcon;
  size?: number;
  width?: number;
  height?: number;
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
  ArrowRightLight: (props: Iicons) => <ArrowRightLight {...props} />,
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
  Delete: (props: Iicons) => <Delete {...props} />,
  Circle: (props: Iicons) => <Circle {...props} />,
  Market: (props: Iicons) => <Market {...props} />,
  Clock: (props: Iicons) => <Clock {...props} />,
  Bubble: (props: Iicons) => <Bubble {...props} />,
};

const Icons = (props: Iicons) => {
  const { size, width, height, icon, onPress, containerStyle } = props;

  const renderSVG = () => {
    const style: StyleProp<ViewStyle> = [
      {
        width: width || size,
        height: height || size,
      },
    ];

    if (!onPress) {
      style.push(containerStyle);
    }

    return <View {...{ style }}>{icons[icon](props)}</View>;
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      {renderSVG()}
    </TouchableOpacity>
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
