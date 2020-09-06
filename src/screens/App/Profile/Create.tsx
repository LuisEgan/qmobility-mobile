import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import {
  Input,
  Button,
  Select,
  ImageProfile,
  Header,
} from "../../../components";
import { ERRORS, APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

import { Text, Theme } from "../../../config/Theme";

const { width } = Dimensions.get("window");

interface IFormValues {
  firstName: string;
  lastName: string;
  dateBirth: string;
  car: string;
  modelCar: string;
}

const SignupSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  dateBirth: yup.string(),
  car: yup.string(),
  modelCar: yup.string(),
});

const CreateProfile = () => {
  const { navigate } = useNavigation();

  const theme = useTheme<Theme>();

  const Form = (params: FormikProps<IFormValues>) => {
    const {
      handleChange,
      handleSubmit,
      handleBlur,
      errors,
      touched,
      values,
    } = params;

    return (
      <View style={styles.container}>
        <ScrollView
          style={[
            styles.scrollStyle,
            { backgroundColor: theme.colors.backgroundLighter },
          ]}
        >
          <ImageProfile label="JD" color={theme.colors.primary} />
          <View style={styles.contentViewIput}>
            <Input
              placeholder="First name"
              onChange={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              error={errors.firstName && ERRORS.REQUIRED}
              touched={touched.firstName}
            />
            <Input
              placeholder="Last name"
              onChange={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              error={errors.lastName && ERRORS.REQUIRED}
              touched={touched.lastName}
            />
            <Input
              placeholder="Date of birth"
              onChange={handleChange("dateBirth")}
              onBlur={handleBlur("dateBirth")}
              error={errors.dateBirth && ERRORS.REQUIRED}
              touched={touched.dateBirth}
            />
            <Text style={styles.textSelectStyle} variant="label">
              Select Your Car
            </Text>
            <Select
              title="Vehicle Make"
              iconTitle="Info"
              list={["Mercedes -Benz"]}
              placeholder="Ex. Renault"
              onPress={handleChange("car")}
              value={values.car}
              error={errors.car && ERRORS.REQUIRED}
              touched={touched.car}
            />

            <Select
              title="Vehicle Model"
              list={["Model S"]}
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
            label="DONE"
            variant="primary"
            onPress={handleSubmit}
            containerStyle={styles.button}
          />
        </View>
      </View>
    );
  };

  // const Create = (values: IFormValues): void => {
  const Create = () => {
    navigate(APP_STACK_SCREENS_NAMES.ProfileScroll);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create my Profile"
        subTitle="To store all your info in one place"
        containerStyle={{
          backgroundColor: theme.colors.grayLighter,
        }}
      />

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dateBirth: "",
          car: "",
          modelCar: "",
        }}
        onSubmit={Create}
        validationSchema={SignupSchema}
      >
        {Form}
      </Formik>
    </View>
  );
};
export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: { marginHorizontal: "10%", width: width * 0.8 },
});
