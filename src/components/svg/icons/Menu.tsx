/** @format */

import React from "react";
import Svg, { Path } from "react-native-svg";

interface IMenu {
  fill: string | number;
  stroke: string | number;
}

const Menu = (props: IMenu) => {
  const { fill, stroke } = props;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 24 24"
      fill={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Menu.defaultProps = {
  fill: "white", // contenido
  stroke: "white",
};

export default Menu;
