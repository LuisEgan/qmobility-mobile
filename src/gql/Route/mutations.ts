import { gql } from "@apollo/client";

export interface ISaveMyRoutesVar {
  origin: string;
  destination: string;
  friendlyName: string;
  category: string;
  frequency: string;
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
  ) {
    saveMyRoute(
      saveMyRouteInput: {
        origin: $origin
        destination: $destination
        friendlyName: $friendlyName
        category: $category
        frequency: $frequency
      }
    ) {
      userId
      createAt
    }
  }
`;

export default {
  saveMyRoute,
};
