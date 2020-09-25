import { useLazyQuery } from "@apollo/client";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  ImageProfile,
  Input,
  PhoneInput,
  Select,
} from "../../../../components";
import DatePicker from "../../../../components/DatePicker";
import ICEVehicle from "../../../../components/ICEVehicle";
import theme, { Text } from "../../../../config/Theme";
import Vehicle from "../../../../gql/Vehicle";
import { IIceVehicle } from "../../../../gql/Vehicle/Types";
import { ERRORS } from "../../../../lib/constants";
import { upperCaseFormatter } from "../../../../lib/strings";

export interface IEditFormValues {
  name: string;
  lastname: string;
  dateOfBirth: Date;
  avatarUrl: string;
  phone: string;
  carPlate: string;
}

interface IForm extends FormikProps<IEditFormValues> {
  loading?: boolean;
  onIceVehicleChange: (vehicle: IIceVehicle) => void;
}

const EditForm = (props: IForm) => {
  const {
    handleChange,
    handleBlur,
    setErrors,
    onIceVehicleChange,
    errors,
    touched,
    values,
    initialValues,
  } = props;

  const [
    searchIceVehicle,
    {
      data: searchIceVehicleData,
      loading: searchIceVehicleLoading,
      called: searchIceVehicleCalled,
      error: searchIceVehicleError,
    },
  ] = useLazyQuery<{ searchIceVehicle: IIceVehicle }>(
    Vehicle.queries.iceVehicle,
  );

  // * Update ICE Vehicle for parent
  useEffect(() => {
    if (searchIceVehicleData) {
      onIceVehicleChange(searchIceVehicleData.searchIceVehicle);
    }
  }, [searchIceVehicleData]);

  const onLoadPhoto = async (photoB64: string) => {
    handleChange("avatarUrl")(photoB64);
  };

  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [vehicleModel, setVehicleModel] = useState<string>("");

  const onCarPlateChange = async (plate: string) => {
    if (plate.length >= 5) {
      searchIceVehicle({
        variables: {
          plate,
        },
      });
      handleChange("carPlate")(plate);
    }
  };

  return (
    <View style={styles.container}>
      <ImageProfile
        color={theme.colors.primary}
        onLoadPhoto={onLoadPhoto}
        avatarUrl={values.avatarUrl}
      />

      <View style={styles.contentViewIput}>
        <Input
          label="First name"
          placeholder="First name"
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          error={errors.name && ERRORS.REQUIRED}
          touched={touched.name}
          defaultValue={initialValues.name}
        />

        <Input
          label="Last name"
          placeholder="Last name"
          onChange={handleChange("lastname")}
          onBlur={handleBlur("lastname")}
          error={errors.lastname && ERRORS.REQUIRED}
          touched={touched.lastname}
          defaultValue={initialValues.lastname}
        />

        <DatePicker
          label="Date of birth"
          onChange={(e) => handleChange("dateOfBirth")(e.toString())}
          value={values.dateOfBirth || initialValues.dateOfBirth}
        />

        <PhoneInput
          defaultValue={initialValues.phone}
          onChangeFormattedText={handleChange("phone")}
          error={errors.phone}
          onIsInvalid={() => setErrors({ ...errors, phone: "Invalid Phone" })}
        />

        <View style={styles.containerTtitleEdition}>
          <Text variant="label">YOUR VIRTUAL EVE</Text>
        </View>

        <Select
          placeholder="Select vehicle make"
          onPress={(e) => setVehicleMake(`${e}`)}
          list={["Tesla", "BMW", "Audi", "Volswagen"]}
          value={vehicleMake}
        />

        <Select
          placeholder="Select vehicle model"
          onPress={(e) => setVehicleModel(`${e}`)}
          list={[
            "Tesla Model 3",
            "Tesla Model S",
            "Tesla Model E",
            "Tesla Model X",
          ]}
          value={vehicleModel}
        />

        <View style={styles.containerTtitleEdition}>
          <Text variant="label">YOUR ICE EVE</Text>
        </View>

        {searchIceVehicleCalled && (
          <ICEVehicle
            loading={searchIceVehicleLoading}
            error={searchIceVehicleError}
            data={searchIceVehicleData?.searchIceVehicle}
          />
        )}

        <Input
          label="Car plate"
          placeholder="Y0UR PL4T3"
          onChange={onCarPlateChange}
          onBlur={handleBlur("carPlate")}
          formatter={upperCaseFormatter}
          defaultValue={initialValues.carPlate}
        />
      </View>
    </View>
  );
};

export default EditForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 40,
    padding: 10,
  },
  contentViewIput: {
    marginBottom: "10%",
  },
  scrollStyle: {
    flex: 1,
    padding: "5%",
  },
  contentEmailStyle: {
    marginHorizontal: "5%",
  },
  textSelectStyle: {
    marginTop: 30,
    marginBottom: 10,
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
});
