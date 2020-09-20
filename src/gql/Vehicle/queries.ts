import { gql } from "@apollo/client";

const vehiclesMakes = gql`
  query VehiclesMakes {
    vehiclesMakes
  }
`;

export interface IVehicleMakeModels {
  Vehicle_Model: string[];
}
export interface IVehicleMakeModelsVars {
  Vehicle_Make: string;
}

const vehicleMakeModels = gql`
  query VehicleMakeModels($Vehicle_Make: String) {
    vehicles(
      vehicleSearchInput: {
        Vehicle_Make: $Vehicle_Make
        Vehicle_Model: $Vehicle_Model
      }
    ) {
      Vehicle_Model
    }
  }
`;

export default {
  vehiclesMakes,
  vehicleMakeModels,
};
