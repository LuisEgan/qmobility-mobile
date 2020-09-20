import { useLazyQuery, useQuery } from "@apollo/client";
import { FormikProps } from "formik";
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button, ImageProfile, Input, Select } from "../../../components";
import DatePicker from "../../../components/DatePicker";
import theme, { Text } from "../../../config/Theme";
import Vehicle from "../../../gql/Vehicle";
import {
  IVehicleMakeModels,
  IVehicleMakeModelsVars,
} from "../../../gql/Vehicle/queries";
import { ERRORS } from "../../../lib/constants";

const { width, height } = Dimensions.get("window");

export interface IFormValues {
  name: string;
  lastname: string;
  dateOfBirth: Date;
  avatarUrl: string;
}

interface IForm extends FormikProps<IFormValues> {
  loading?: boolean;
}

const Form = (props: IForm) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values,
    initialValues,
    loading,
  } = props;

  const { data: vehiclesMakesData } = useQuery<{
    vehiclesMakes: string[];
  }>(Vehicle.queries.vehiclesMakes);

  const [vehicleMakeModels, { data: vehicleMakeModelsData }] = useLazyQuery<
    { vehicleMakeModels: IVehicleMakeModels },
    IVehicleMakeModelsVars
  >(Vehicle.queries.vehicleMakeModels);

  useEffect(() => {
    const getModels = async () => {
      try {
        await vehicleMakeModels();
      } catch (error) {
        console.warn("error: ", error);
      }
    };

    if (vehiclesMakesData) {
      getModels();
    }
  }, [vehiclesMakesData]);

  const onLoadPhoto = async (photoB64: string) => {
    handleChange("avatarUrl")(photoB64);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.scrollStyle,
          { backgroundColor: theme.colors.backgroundLighter },
        ]}
      >
        <ImageProfile
          label="JD"
          color={theme.colors.primary}
          onLoadPhoto={onLoadPhoto}
          avatarUrl={values.avatarUrl}
        />

        <View style={styles.contentViewIput}>
          <Input
            placeholder="First name"
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name && ERRORS.REQUIRED}
            touched={touched.name}
            defaultValue={initialValues.name}
          />

          <Input
            placeholder="Last name"
            onChange={handleChange("lastname")}
            onBlur={handleBlur("lastname")}
            error={errors.lastname && ERRORS.REQUIRED}
            touched={touched.lastname}
            defaultValue={initialValues.lastname}
          />

          <DatePicker
            onChange={(e) => handleChange("dateOfBirth")(e.toString())}
            value={values.dateOfBirth || initialValues.dateOfBirth}
          />

          <Text style={styles.textSelectStyle} variant="label">
            Select Your Car
          </Text>

          <Select
            title="Vehicle Make"
            iconTitle="Info"
            list={vehiclesMakesData?.vehiclesMakes || []}
            placeholder="Ex. Renault"
            onPress={handleChange("car")}
            value={values.car}
            error={errors.car && ERRORS.REQUIRED}
            touched={touched.car}
          />

          <Select
            title="Vehicle Model"
            list={vehicleMakeModelsData?.vehicleMakeModels.Vehicle_Model || []}
            placeholder="Model"
            onPress={handleChange("modelCar")}
            value={values.modelCar}
            error={errors.modelCar && ERRORS.REQUIRED}
            touched={touched.modelCar}
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: theme.colors.backgroundLighter },
        ]}
      >
        <Button
          label={`${loading ? "LOADING..." : "DONE"}`}
          variant="primary"
          onPress={handleSubmit}
          containerStyle={styles.button}
          enabled={!loading}
        />
      </View>
    </View>
  );
};

export default Form;

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

  buttonContainer: {
    height: height * 0.12,
    justifyContent: "center",
    alignItems: "center",
  },
  button: { marginHorizontal: "10%", width: width * 0.8 },
});
