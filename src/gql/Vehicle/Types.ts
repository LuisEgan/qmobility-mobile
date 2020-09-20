export interface IVehicle {
  id: string;
  updatedAt: Date;
  createAt: Date;
  deletedAt: Date;
  Vehicle_ID: number;
  Vehicle_Make: string;
  Vehicle_Model: string;
  Vehicle_Model_Version: String;
  Availability_Status: number;
  Availability_Date_From: String;
  Availability_Date_To: String;
  Price_From_DE: number;
  Price_From_DE_Estimate: boolean;
  Price_From_NL: number;
  Price_From_NL_Estimate: boolean;
  Price_From_UK: number;
  Price_From_UK_Estimate: boolean;
  Drivetrain_Type: string;
  Drivetrain_Fuel: string;
  Drivetrain_Propulsion: string;
  Drivetrain_Power: number;
  Drivetrain_Power_HP: number;
  Drivetrain_Torque: number;
  Performance_Acceleration: number;
  Performance_Topspeed: number;
  Range_WLTP: String;
  Range_WLTP_Estimate: boolean;
  Range_NEDC: String;
  Range_NEDC_Estimate: boolean;
  Range_Real: number;
  Range_Real_Mode: string;
  Range_Real_WHwy: number;
  Range_Real_WCmb: number;
  Range_Real_WCty: number;
  Range_Real_BHwy: number;
  Range_Real_BCmb: number;
  Range_Real_BCty: number;
  Efficiency_WLTP: String;
  Efficiency_WLTP_FuelEq: String;
  Efficiency_WLTP_V: String;
  Efficiency_WLTP_FuelEq_V: String;
  Efficiency_WLTP_CO2: String;
  Efficiency_NEDC: String;
  Efficiency_NEDC_FuelEq: String;
  Efficiency_NEDC_V: String;
  Efficiency_NEDC_FuelEq_V: String;
  Efficiency_NEDC_CO2: String;
  Efficiency_Real: number;
  Efficiency_Real_FuelEq_V: number;
  Efficiency_Real_CO2: number;
  Efficiency_Real_WHwy: number;
  Efficiency_Real_WCmb: number;
  Efficiency_Real_WCty: number;
  Efficiency_Real_BHwy: number;
  Efficiency_Real_BCmb: number;
  Efficiency_Real_BCty: number;
  Charge_Plug: string;
  Charge_Plug_Estimate: boolean;
  Charge_Plug_Location: string;
  Charge_Standard_Power: number;
  Charge_Standard_Phase: number;
  Charge_Standard_PhaseAmp: number;
  Charge_Standard_ChargeTime: number;
  Charge_Standard_ChargeSpeed: number;
  Charge_Standard_Estimate: boolean;
  Charge_Alternative_Power: String;
  Charge_Alternative_Phase: String;
  Charge_Alternative_PhaseAmp: String;
  Charge_Alternative_ChargeTime: String;
  Charge_Alternative_ChargeSpeed: String;
  Charge_Alternative_Table: String;
  Charge_Option_Power: String;
  Charge_Option_Phase: String;
  Charge_Option_PhaseAmp: String;
  Charge_Option_ChargeTime: String;
  Charge_Option_ChargeSpeed: String;
  Charge_Option_Table: String;
  Fastcharge_Plug: string;
  Fastcharge_Plug_Estimate: boolean;
  Fastcharge_Plug_Location: string;
  Fastcharge_Power_Max: number;
  Fastcharge_Power_Avg: number;
  Fastcharge_ChargeTime: number;
  Fastcharge_ChargeSpeed: number;
  Fastcharge_Optional: boolean;
  Fastcharge_Estimate: boolean;
  Battery_Capacity_Useable: number;
  Battery_Capacity_Full: number;
  Battery_Capacity_Estimate: string;
  Dims_Length: number;
  Dims_Width: number;
  Dims_Height: number;
  Dims_Wheelbase: number;
  Dims_Weight: number;
  Dims_Bootspace: number;
  Dims_Bootspace_Max: number;
  Dims_TowWeight_Unbraked: String;
  Dims_TowWeight_Braked: String;
  Dims_RoofLoad_Max: String;
  Misc_Body: string;
  Misc_Segment: string;
  Misc_Seats: number;
  Misc_Roofrails: boolean;
  Misc_Isofix: String;
  Misc_Isofix_Seats: String;
  Misc_TurningCircle: String;
  EuroNCAP_Rating: number;
  EuroNCAP_Year: number;
  EuroNCAP_Adult: number;
  EuroNCAP_Child: number;
  EuroNCAP_VRU: number;
  EuroNCAP_SA: number;
  Related_Vehicle_ID_Succesor: String;
  EVDB_Detail_URL: string;
  Images: string[];
  Videos: string[];
}
