import { gql } from "@apollo/client";
import { IVehicle } from "./Types";

const vehiclesMakes = gql`
  query VehiclesMakes {
    vehicleMakes
  }
`;

export interface IVehicleMakeModelsVars {
  Vehicle_Make: string;
}

export interface IVehicleMakeModels {
  Vehicle_ID: string;
  Vehicle_Model: string;
}

const vehicleMakeModels = gql`
  query VehicleMakeModels($Vehicle_Make: String) {
    vehicles(vehicleSearchInput: { Vehicle_Make: $Vehicle_Make }) {
      Vehicle_ID
      Vehicle_Model
    }
  }
`;

export interface IIceVehicleVars {
  plate: string;
}

const iceVehicle = gql`
  query SearchIceVehicle($plate: String!) {
    searchIceVehicle(plate: $plate) {
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
    }
  }
`;

export interface IVehicleRecommendation {
  category: string;
  make: string;
  makeModel: string;
  vehicle: IVehicle;
}

const vehicleRecommendation = gql`
  query VehicleRecommendation($category: String!) {
    vehicleRecommendation(category: $category) {
      category
      make
      makeModel
      vehicle {
        Images
        Vehicle_ID
      }
    }
  }
`;

export default {
  vehiclesMakes,
  vehicleMakeModels,
  iceVehicle,
  vehicleRecommendation,
};
