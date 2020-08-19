import React, { useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  Input,
  Button,
  Select,
  ImageProfile,
  Header,
} from "../../../components";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { ERRORS } from "../../../lib/constants";
import { TTCsNavProps } from "../../../navigation/Types/NavPropsTypes";

import { Text, Theme } from "../../../config/Theme";
import { useTheme } from "@shopify/restyle";

const { height } = Dimensions.get("window");

interface ICreateProfile extends TTCsNavProps {}

interface IFormValues {
  firstName: string;
  lastName: string;
  dateBirth: string;
  car: string;
  modelCar: string;
}

const SignupSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  dateBirth: yup.string().required("Required"),
  car: yup.string().required("Required"),
  modelCar: yup.string().required("Required"),
});

const CreateProfile = (props: ICreateProfile) => {
  const { navigation } = props;

  const theme = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="Create my Profile"
          subTitle="To store all your info in one place"
          containerStyle={{
            backgroundColor: theme.colors.grayLight,
          }}
        />
      ),
    });
  }, [navigation]);

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
      <View>
        <ScrollView style={styles.scrollStyle}>
          <ImageProfile label="JD" color={theme.colors.primary} />
          <View style={styles.contentEmailStyle}>
            <Text variant="body">jondoe@gmail.com</Text>
          </View>
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
        <Button
          label="DONE"
          variant="primary"
          onPress={handleSubmit}
          containerStyle={{ marginHorizontal: "10%" }}
        />
      </View>
    );
  };

  const Create = (values: IFormValues): void => {
    console.log("CreateProfile -> values", values);
  };

  return (
    <View style={styles.container}>
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
    ...StyleSheet.absoluteFillObject,
  },
  contentViewIput: {
    marginBottom: "10%",
  },
  scrollStyle: {
    height: height * 0.69,
  },
  contentEmailStyle: {
    marginHorizontal: "5%",
  },
  textSelectStyle: {
    marginLeft: "5%",
    marginTop: 30,
    marginBottom: 10,
  },
});