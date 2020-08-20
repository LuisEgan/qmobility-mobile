import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Input } from "../../../components";

import { Text } from "../../../config/Theme";
import { ERRORS } from "../../../lib/constants";
import Auth from "../../../components/Auth";

const { width, height } = Dimensions.get("window");

interface IFormValues {
  emailAddress: string;
  password: string;
}

const SignUpSchema = yup.object().shape({
  emailAddress: yup.string().email(),
  password: yup.string().required("Required"),
});

const SignUp = () => {
  // const login = (values: IFormValues): void => {
  const login = (): null => null;

  const Form = (params: FormikProps<IFormValues>) => {
    const { handleChange, handleSubmit, handleBlur, errors, touched } = params;

    return (
      <View>
        <View style={styles.contentViewIput}>
          <Input
            containerStyle={{ marginHorizontal: 0 }}
            placeholder="Email Address"
            onChange={handleChange("emailAddress")}
            onBlur={handleBlur("emailAddress")}
            error={errors.emailAddress && ERRORS.INVALID_EMAIL}
            touched={touched.emailAddress}
          />
          <Input
            containerStyle={{ marginHorizontal: 0 }}
            placeholder="Password"
            isPassword
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password && ERRORS.WRONG_PASSWORD}
            touched={touched.password}
          />
        </View>
        <Button variant="primary" onPress={handleSubmit} label="SIGN UP" />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="heading1">Welcome Onboard!</Text>
        <Text variant="subheadingLight">Please register to proceed</Text>
      </View>

      <View style={styles.social}>
        <Auth.Google />
        <Auth.Facebook />
        <Auth.LinkedIn />
        <Auth.Apple />
      </View>

      <Text variant="body" style={styles.or}>
        OR
      </Text>

      <Formik
        initialValues={{ emailAddress: "", password: "" }}
        onSubmit={login}
        validationSchema={SignUpSchema}
      >
        {Form}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.1,
  },

  content: {
    marginVertical: height * 0.05,
  },

  or: {
    textAlign: "center",
    marginVertical: height * 0.02,
  },

  social: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
  },

  contentViewIput: {
    marginBottom: "10%",
  },
});
