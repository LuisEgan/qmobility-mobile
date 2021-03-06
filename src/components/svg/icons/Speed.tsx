import React from "react";
import Svg, { Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Speed = (props: ISVG) => {
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
        d="M.82,7.5a12.6336,12.6336,0,0,1,5.332-3.2227,12.9921,12.9921,0,0,1,6.1133-.3711l-.9765,2.2266a10.208,10.208,0,0,0-4.7071.4883A10.5789,10.5789,0,0,0,2.5,9.18ZM4.18,10.82a7.9034,7.9034,0,0,1,6.0937-2.3828L9.18,10.82A5.6176,5.6176,0,0,0,5.82,12.5ZM13.2422,4.18c.2861,0,.43.1308.43.3906L11.6406,15.3125v.0391a1.6468,1.6468,0,0,1-.5859.9375A1.6648,1.6648,0,0,1,8.32,15a1.8053,1.8053,0,0,1,.1953-.82l4.336-9.6875A.4075.4075,0,0,1,13.2422,4.18ZM14.18,12.5a6.7067,6.7067,0,0,0-1.0156-.82l.4687-2.4219A8.3549,8.3549,0,0,1,15.82,10.82ZM17.5,9.18A10.3887,10.3887,0,0,0,14.0625,6.875l.43-2.3438A12.63,12.63,0,0,1,19.18,7.5Z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Speed.defaultProps = {
  fill: "red",
  stroke: "red",
};

export default Speed;
