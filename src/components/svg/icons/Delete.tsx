import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Delete = (props: ISVG) => {
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
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Delete.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Delete;
