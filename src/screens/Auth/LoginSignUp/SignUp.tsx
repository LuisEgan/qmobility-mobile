import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "../../../components";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { Text } from "../../../config/Theme";
import { ERRORS } from "../../../lib/constants";

interface IFormValues {
  emailAddress: string;
  password: string;
}

const SignupSchema = yup.object().shape({
  emailAddress: yup.string().email(),
  password: yup.string().required("Required"),
});

const SignUp = () => {
  const signUp = (values: IFormValues): void => {
    console.log("SignUp -> values", values);
  };

  const Form = (params: FormikProps<IFormValues>) => {
    const { handleChange, handleSubmit, handleBlur, errors, touched } = params;

    return (
      <View>
        <View style={styles.contentViewIput}>
          <Input
            placeholder="Email Address"
            onChange={handleChange("emailAddress")}
            onBlur={handleBlur("emailAddress")}
            error={errors.emailAddress && ERRORS.INVALID_EMAIL}
            touched={touched.emailAddress}
          />
          <Input
            placeholder="Password"
            isPassword={true}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password && ERRORS.WRONG_PASSWORD}
            touched={touched.password}
          />
        </View>
        <Button
          margin={"10%"}
          variant="primary"
          onPress={handleSubmit}
          label="SIGN UP"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="title">Welcome onboard!</Text>
        <Text variant="subtitle">Please register to procced</Text>
      </View>

      <Text variant="title" style={styles.or}>
        OR
      </Text>

      <Formik
        initialValues={{ emailAddress: "", password: "" }}
        onSubmit={signUp}
        validationSchema={SignupSchema}
      >
        {Form}
      </Formik>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    marginHorizontal: "10%",
    marginVertical: "5%",
  },
  or: { textAlign: "center" },

  contentViewIput: {
    marginBottom: "10%",
  },
});
