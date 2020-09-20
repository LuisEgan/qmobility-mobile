import { gql } from "@apollo/client";

export interface IGetRouter {
  SearchPoints: Object;
  Route: Object;
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
    $carid: String!
    $carcharge: Float!
    $chargerlimit: Float!
    $chargerdistance: Float!
  ) {
    getRoutes(
      getRouteInput: {
        origin: $origin
        destination: $destination
        carid: $carid
        carcharge: $carcharge
        chargerlimit: $chargerlimit
        chargerdistance: $chargerdistance
      }
    ) {
      SearchPoints {
        lat
        lng
      }
      Route {
        Route_Coords {
          lat
          lng
        }
      }
    }
  }
`;

export default {
  getRoutes,
};
