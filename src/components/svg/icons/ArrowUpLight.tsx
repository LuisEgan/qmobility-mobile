/** @format */

import React from "react";
import Svg, { Path } from "react-native-svg";

interface IArrowUpLight {
  fill: string | number;
  stroke: string | number;
}

const ArrowUpLight = (props: IArrowUpLight) => {
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
        d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

ArrowUpLight.defaultProps = {
  fill: "white", // contenido
  stroke: "white",
};

export default ArrowUpLight;
