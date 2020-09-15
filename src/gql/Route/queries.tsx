import { gql } from "@apollo/client";
import { LatLng } from "react-native-maps";

export interface IRoute {
  Destination: string;
  Distance: number;
  Origin: string;
  Route_Coords: LatLng[];
  Time: number;
  Total_kWh_Difference: number;
}

export interface IChargers {
  Id?: string;
  Name?: string;
  latitude?: number;
  longitude?: number;
}

export interface IGetRouter {
  getRoutes: {
    Chargers?: Array<IChargers>;
    SearchPoints?: Array<LatLng[]>;
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
        latitude
        longitude
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
        Id
        label: Name
        latitude
        longitude
      }
    }
  }
`;

export default {
  getRoutes,
};
