/** @format */

import React from "react";
import Svg, { Path } from "react-native-svg";

interface IEmail {
  fill: string | number;
  stroke: string | number;
}

const Email = (props: IEmail) => {
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
        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  );
};

Email.defaultProps = {
  fill: "white", // contenido
  stroke: "white",
};

export default Email;
