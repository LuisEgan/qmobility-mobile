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
  ArrowChange,
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
  Eve,
  Dot,
  FavClothingStyle,
  AssessMent,
  BatteryRight,
  BookMark,
  Cancel,
  DirectionsCar,
  Domain,
  ExitApp,
  Fider,
  Flash,
  Gps,
  History,
  Home,
  Map,
  Nature,
  Navigation,
  Person,
  Plus,
  Polymer,
  Position,
  Room,
  Search,
  Setting,
  Spa,
  Speed,
  Star,
  Timeline,
  Calendar,
  EvStation,
  Filter,
  Clear,
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
  ArrowChange: (props: Iicons) => <ArrowChange {...props} />,
  Info: (props: Iicons) => <Info {...props} />,
  Email: (props: Iicons) => <Email {...props} />,
  Menu: (props: Iicons) => <Menu {...props} />,
  Edit: (props: Iicons) => <Edit {...props} />,
  Error: (props: Iicons) => <Error {...props} />,
  Eve: (props: Iicons) => <Eve {...props} />,
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
  Dot: (props: Iicons) => <Dot {...props} />,
  FavClothingStyle: (props: Iicons) => <FavClothingStyle {...props} />,
  AssessMent: (props: Iicons) => <AssessMent {...props} />,
  BatteryRight: (props: Iicons) => <BatteryRight {...props} />,
  BookMark: (props: Iicons) => <BookMark {...props} />,
  Cancel: (props: Iicons) => <Cancel {...props} />,
  DirectionsCar: (props: Iicons) => <DirectionsCar {...props} />,
  Domain: (props: Iicons) => <Domain {...props} />,
  ExitApp: (props: Iicons) => <ExitApp {...props} />,
  Fider: (props: Iicons) => <Fider {...props} />,
  Flash: (props: Iicons) => <Flash {...props} />,
  Gps: (props: Iicons) => <Gps {...props} />,
  History: (props: Iicons) => <History {...props} />,
  Home: (props: Iicons) => <Home {...props} />,
  Map: (props: Iicons) => <Map {...props} />,
  Nature: (props: Iicons) => <Nature {...props} />,
  Navigation: (props: Iicons) => <Navigation {...props} />,
  Person: (props: Iicons) => <Person {...props} />,
  Plus: (props: Iicons) => <Plus {...props} />,
  Polymer: (props: Iicons) => <Polymer {...props} />,
  Position: (props: Iicons) => <Position {...props} />,
  Room: (props: Iicons) => <Room {...props} />,
  Search: (props: Iicons) => <Search {...props} />,
  Setting: (props: Iicons) => <Setting {...props} />,
  Spa: (props: Iicons) => <Spa {...props} />,
  Speed: (props: Iicons) => <Speed {...props} />,
  Star: (props: Iicons) => <Star {...props} />,
  Timeline: (props: Iicons) => <Timeline {...props} />,
  Calendar: (props: Iicons) => <Calendar {...props} />,
  EvStation: (props: Iicons) => <EvStation {...props} />,
  Filter: (props: Iicons) => <Filter {...props} />,
  Clear: (props: Iicons) => <Clear {...props} />,
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
