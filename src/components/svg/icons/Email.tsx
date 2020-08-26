import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { ISVG } from "./TypeIcons";

const Email = (props: ISVG) => {
  const { fill } = props;

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
      <G transform="translate(-672.864 -718.5)">
        <Path
          d="M707.909,720h3.809l13.569,81.857h.183L771.714,720H775.8l-48.968,85.848h-4.174Z"
          transform="translate(10.626)"
        />
        <Path
          d="M747.266,773.813c-.123.849-.228,1.695-.317,2.541a23.818,23.818,0,0,0-.137,2.54,18.533,18.533,0,0,0,1,6.078,15.488,15.488,0,0,0,2.857,5.081,13.264,13.264,0,0,0,4.627,3.447,14.94,14.94,0,0,0,6.306,1.271,17.149,17.149,0,0,0,6.215-1.135,19.483,19.483,0,0,0,5.262-2.994,18.241,18.241,0,0,0,3.9-4.309,16.288,16.288,0,0,0,2.221-5.171h3.447a24.934,24.934,0,0,1-2.9,6.668,21.437,21.437,0,0,1-4.626,5.262,20.4,20.4,0,0,1-6.215,3.447,23.034,23.034,0,0,1-7.666,1.225,19.537,19.537,0,0,1-7.8-1.451,15.383,15.383,0,0,1-5.581-3.992,17.166,17.166,0,0,1-3.355-5.9,21.893,21.893,0,0,1-1.135-7.076,40.387,40.387,0,0,1,1.724-12.067,30.029,30.029,0,0,1,4.9-9.618,22.518,22.518,0,0,1,7.8-6.4,22.805,22.805,0,0,1,10.343-2.313,18.283,18.283,0,0,1,7.258,1.362,15.191,15.191,0,0,1,5.353,3.765,16.289,16.289,0,0,1,3.312,5.715,21.891,21.891,0,0,1,1.134,7.122,32.772,32.772,0,0,1-.182,3.493q-.184,1.681-.453,3.4Zm34.021-2.993q.182-1.179.317-2.087a12.176,12.176,0,0,0,.137-1.814,18.834,18.834,0,0,0-.862-5.715,13.722,13.722,0,0,0-2.585-4.763,12.323,12.323,0,0,0-4.445-3.267,15.371,15.371,0,0,0-6.352-1.225,17.316,17.316,0,0,0-7.394,1.542,18.432,18.432,0,0,0-5.761,4.173,24.09,24.09,0,0,0-4.082,6.033,32.433,32.433,0,0,0-2.451,7.122Z"
          transform="translate(21.857 9.172)"
        />
        <Path
          d="M678.266,773.813c-.122.849-.228,1.695-.317,2.541a23.818,23.818,0,0,0-.137,2.54,18.533,18.533,0,0,0,1,6.078,15.487,15.487,0,0,0,2.857,5.081,13.265,13.265,0,0,0,4.627,3.447,14.941,14.941,0,0,0,6.306,1.271,17.149,17.149,0,0,0,6.215-1.135,19.482,19.482,0,0,0,5.262-2.994,18.241,18.241,0,0,0,3.9-4.309,16.285,16.285,0,0,0,2.221-5.171h3.447a24.936,24.936,0,0,1-2.9,6.668,21.437,21.437,0,0,1-4.626,5.262,20.4,20.4,0,0,1-6.215,3.447,23.034,23.034,0,0,1-7.666,1.225,19.538,19.538,0,0,1-7.8-1.451,15.383,15.383,0,0,1-5.581-3.992,17.166,17.166,0,0,1-3.355-5.9,21.893,21.893,0,0,1-1.135-7.076,40.387,40.387,0,0,1,1.724-12.067,30.029,30.029,0,0,1,4.9-9.618,22.519,22.519,0,0,1,7.8-6.4,22.8,22.8,0,0,1,10.343-2.313,18.284,18.284,0,0,1,7.258,1.362,15.191,15.191,0,0,1,5.353,3.765,16.289,16.289,0,0,1,3.312,5.715,21.891,21.891,0,0,1,1.134,7.122,32.773,32.773,0,0,1-.182,3.493q-.184,1.681-.453,3.4Zm34.021-2.993q.182-1.179.317-2.087a12.176,12.176,0,0,0,.137-1.814,18.834,18.834,0,0,0-.862-5.715,13.723,13.723,0,0,0-2.585-4.763,12.324,12.324,0,0,0-4.445-3.267,15.371,15.371,0,0,0-6.352-1.225,17.315,17.315,0,0,0-7.394,1.542,18.43,18.43,0,0,0-5.761,4.173,24.087,24.087,0,0,0-4.082,6.033,32.427,32.427,0,0,0-2.451,7.122Z"
          transform="translate(0 9.172)"
        />
      </G>
    </Svg>
  );
};

Email.defaultProps = {
  fill: "white",
  stroke: "white",
};

export default Email;
