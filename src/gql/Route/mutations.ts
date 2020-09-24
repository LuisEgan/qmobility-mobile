import { gql } from "@apollo/client";

export enum ERouteCategory {
  COMMUTE = "COMMUTE",
  LOCAL_HOUSEHOLD_RUN = "LOCAL_HOUSEHOLD_RUN",
  WEEKEND_AWAY = "WEEKEND_AWAY",
  ANUAL_BREAK = "ANUAL_BREAK",
}

export interface ISaveMyRoutesVar {
  origin: string;
  destination: string;
  friendlyName: string;
  category: ERouteCategory;
}

export interface ISaveMyRoutes {
  userId: string;
  createAt: string;
}

// * save routes
const saveMyRoutes = gql`
  mutation saveMyRoute(
    $origin: String!
    $destination: String!
    $friendlyName: String!
    $category: ERouteCategory!
  ) {
    saveMyRoutes(
      MyRoute: {
        origin: $origin
        destination: $destination
        friendlyName: $friendlyName
        category: $category
      }
    ) {
      userId
      createAt
    }
  }
`;

export default {
  saveMyRoutes,
};
