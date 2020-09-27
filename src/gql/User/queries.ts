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
      createAt
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
      phone
      selectedVehicle {
        Vehicle_ID
        Images
        Vehicle_Make
        Vehicle_Model
        Vehicle_Model_Version
        Battery_Capacity_Useable
        Battery_Capacity_Full
        Battery_Capacity_Estimate
        Range_Real
        Availability_Status
        Performance_Topspeed
        Fastcharge_ChargeTime
        Efficiency_Real
        Price_From_UK
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

const getEve = gql`
  query GetEve {
    user {
      selectedVehicle {
        Vehicle_ID
        Images
        Vehicle_Make
        Vehicle_Model
        Vehicle_Model_Version
        Battery_Capacity_Useable
        Battery_Capacity_Full
        Battery_Capacity_Estimate
        Range_Real
        Availability_Status
        Performance_Topspeed
        Fastcharge_ChargeTime
        Efficiency_Real
        Price_From_UK
        Misc_Seats
      }
    }
  }
`;

const getICEVehicle = gql`
  query GetICEVehicle {
    user {
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
        DoorPlanLiteral
        MaxSpeedKph
        MaxSpeedMph
        ModelVariant
        EngineCapacity
      }
    }
  }
`;

const bookTestDrive = gql`
  query BookTestDrive {
    bookTestDrive
  }
`;

export default {
  user,
  allUserInfo,
  getEve,
  bookTestDrive,
  getICEVehicle,
};
