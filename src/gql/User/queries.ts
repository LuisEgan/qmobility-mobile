import { gql } from "@apollo/client";

const user = gql`
  query User {
    user {
      id
      name
      lastname
      dateOfBirth
      avatarUrl
      email
    }
  }
`;

const allUserInfo = gql`
  query AllUserInfo {
    user {
      id
      name
      lastname
      dateOfBirth
      avatarUrl
      email
      selectedVehicle {
        Images
        Vehicle_Make
        Vehicle_Model
        Vehicle_Model_Version
      }
      iceVehicle {
        Make
        MakeModel
        Co2Emissions
        YearMonthFirstRegistered
        FuelType
        SeatingCapacity
        Colour
        VehicleClass
        VehiclePlate
      }
    }
  }
`;

export default {
  user,
  allUserInfo,
};
