import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "../../../components/";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { Text } from "../../../config/Theme";
import { TLoginSignUpNavProps } from "../../../navigation/NavPropsTypes";
import { ERRORS } from "../../../lib/constants";

interface ILoginSignUp extends TLoginSignUpNavProps {}

interface IFormValues {
  emailAddress: string;
  password: string;
}

const SignupSchema = yup.object().shape({
  emailAddress: yup.string().email(),
  password: yup.string().required("Required"),
});

const LoginSignUp = (props: ILoginSignUp) => {
  const { route } = props;

  const [state, setState] = useState<number>(route.params.state);

  //const theme = useTheme<Theme>();

  const login = (values: IFormValues): void => {
    console.log("LoginSignUp -> values", values);
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
          variant={state ? "secondary" : "primary"}
          onPress={handleSubmit}
          label={state ? "LOG IN" : "SIGN UP"}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="title">{`Welcome ${state ? "Back" : "onboard"}!`}</Text>
        <Text variant="subtitle">{`Please ${
          state ? "login to your account" : "register to procced"
        }.`}</Text>
      </View>

      <Text variant="title" style={styles.or}>
        OR
      </Text>

      <Formik
        initialValues={{ emailAddress: "", password: "" }}
        onSubmit={login}
        validationSchema={SignupSchema}
      >
        {Form}
      </Formik>
    </View>
  );
};

export default LoginSignUp;

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
