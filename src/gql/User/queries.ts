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
        Battery_Capacity_Useable
        Battery_Capacity_Full
        Battery_Capacity_Estimate
        Range_Real
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
