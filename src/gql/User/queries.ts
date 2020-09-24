import { gql } from "@apollo/client";

const user = gql`
  query User {
    user {
      id
      name
      lastname
      dateOfBirth
      avatarUrl
    }
  }
`;

const allUserInfo = gql`
  query AllUserInfo {
    user {
      id
      updatedAt
      createAt
      deletedAt
      name
      lastname
      email
      password
      username
      dateOfBirth
      role
      active
      recoveryPasswordToken
      networkType
      avatarUrl
      vehicles
      selectedVehicle
      random4digits
      iceVehicle
    }
  }
`;

export default {
  user,
  allUserInfo,
};
