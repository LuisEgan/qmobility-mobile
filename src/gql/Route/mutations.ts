import { gql } from "@apollo/client";

export interface ISaveMyRoutesVar {
  origin: string;
  destination: string;
  friendlyName: string;
  category: string;
  frequency: string;
  // new
  kwh: number;
  totalDistance: number;
  totalTime: number;
  carId: number;
}

export interface ISaveMyRoutes {
  userId: string;
  createAt: string;
}

// * save routes
const saveMyRoute = gql`
  mutation saveMyRoute(
    $origin: String!
    $destination: String!
    $friendlyName: String!
    $category: String!
    $frequency: String!
    $kwh: Float
    $totalDistance: Float
    $totalTime: Float
    $carId: Float
  ) {
    saveMyRoute(
      saveMyRouteInput: {
        origin: $origin
        destination: $destination
        friendlyName: $friendlyName
        category: $category
        frequency: $frequency
        kwh: $kwh
        totalDistance: $totalDistance
        totalTime: $totalTime
        carId: $carId
      }
    ) {
      userId
      createAt
    }
  }
`;

export interface IDeleteMyRoute {
  scala: string;
}

export interface IDeleteMyRouteVar {
  myRouteId: string;
}

// * delete route
const deleteMyRoute = gql`
  mutation deleteMyRoute($myRouteId: String!) {
    deleteMyRoute(myRouteId: $myRouteId)
  }
`;

export interface IUpdateMyRoutesVar {
  id: string;
  origin: string;
  destination: string;
  userId: string;
  friendlyName: string;
  category: string;
  frequency: string;
}

export interface IUpdataMyRoutes {
  id: string;
}

const updateMyRoute = gql`
  mutation updateMyRoute(
    $id: String!
    $origin: String!
    $destination: String!
    $userId: String!
    $friendlyName: String!
    $category: String!
    $frequency: String!
  ) {
    updateMyRoute(
      UpdateMyRouteInput: {
        id: $id
        origin: $origin
        destination: $destination
        userId: $userId
        friendlyName: $friendlyName
        category: $category
        frequency: $frequency
      }
    ) {
      id
    }
  }
`;

export default {
  saveMyRoute,
  deleteMyRoute,
  updateMyRoute,
};
