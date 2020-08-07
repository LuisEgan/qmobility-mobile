/** @format */

import React from "react";
import Svg, { Path } from "react-native-svg";

interface IArrowDawn {
  fill: string | number;
  stroke: string | number;
}

const ArrowDawn = (props: IArrowDawn) => {
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
        d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

ArrowDawn.defaultProps = {
  fill: "white", // contenido
  stroke: "white",
};

export default ArrowDawn;
