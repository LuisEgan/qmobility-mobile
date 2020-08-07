/** @format */

import React from "react";
import Svg, { Path } from "react-native-svg";

interface IInfo {
  fill: string | number;
  stroke: string | number;
}

const Info = (props: IInfo) => {
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
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Info.defaultProps = {
  fill: "white", // contenido
  stroke: "white",
};

export default Info;
