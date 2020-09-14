import { gql } from "@apollo/client";
import { LatLng } from "react-native-maps";

export interface ICoord {
  Lat: number;
  Lng: number;
}

export interface IRoute {
  Destination: string;
  Distance: number;
  Origin: string;
  Route_Coords: LatLng[];
  Time: number;
  Total_kWh_Difference: number;
}

export interface IGetRouter {
  getRoutes: {
    Chargers?: Array<Array<ICoord>>;
    SearchPoints?: Array<Array<ICoord>>;
    Route?: IRoute;
  };
}

export interface IGetRouterVar {
  origin?: string;
  destination?: string;
  car_id?: string;
  car_charge?: number;
  chargers_limit?: number;
  charger_distance?: number;
  car_tolerance?: number;
}

// * Search Router
const getRoutes = gql`
  query GetRoutes(
    $origin: String!
    $destination: String!
    $car_id: String!
    $car_charge: Float!
    $chargers_limit: Float!
    $charger_distance: Float!
    $car_tolerance: Float!
  ) {
    getRoutes(
      getRouteInput: {
        origin: $origin
        destination: $destination
        car_id: $car_id
        car_charge: $car_charge
        chargers_limit: $chargers_limit
        car_tolerance: $car_tolerance
        charger_distance: $charger_distance
      }
    ) {
      SearchPoints {
        lat
        lng
      }
      Route {
        Total_kWh_Difference
        Time
        Origin
        Distance
        Destination
        Route_Coords {
          latitude
          longitude
        }
      }
      Chargers {
        Lat
        Lng
      }
    }
  }
`;

export default {
  getRoutes,
};
