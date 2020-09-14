import { gql } from "@apollo/client";

export interface IGetRouter {
  SearchPoints: Object;
  Route: Object;
  Chargers: Array<Array<Object>>;
}

export interface IGetRouterVar {
  origin?: string;
  destination?: string;
  carid?: string;
  carcharge?: number;
  chargerlimit?: number;
  chargerdistance?: number;
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
