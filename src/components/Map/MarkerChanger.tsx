import React from "react";
import { Marker } from "react-native-maps";
import { IChargers } from "../../gql/Route/queries";
import Icons from "../svg";

interface IMarkerChanger {
  chargers?: IChargers[] | [];
}

const MarkerChanger = (props: IMarkerChanger) => {
  const { chargers } = props;

  if (!chargers?.length) return <></>;

  return (
    <>
      {chargers[0].map((charger: IChargers) => (
        <Marker
          key={Math.random()}
          coordinate={{
            latitude: charger.latitude ? charger.latitude : 0,
            longitude: charger.longitude ? charger.longitude : 0,
          }}
        >
          <Icons icon="Room" fill="#76ff" />
        </Marker>
      ))}
    </>
  );
};

MarkerChanger.defaultProps = {};

export default MarkerChanger;
