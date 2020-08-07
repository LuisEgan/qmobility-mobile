import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "../../../components";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { Text } from "../../../config/Theme";
import { ERRORS } from "../../../lib/constants";
// import { useNavigation } from "@react-navigation/native";
import { TLoginNavProps } from "../../../navigation/NavPropsTypes";

interface IFormValues {
  emailAddress: string;
  password: string;
}

interface ILogin extends TLoginNavProps {}

const SignupSchema = yup.object().shape({
  emailAddress: yup.string().email(),
  password: yup.string().required("Required"),
});

const Login = (props: ILogin) => {
  const { navigation } = props;
  //   const { navigate } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  const login = (values: IFormValues): void => {
    console.log("Login -> values", values);
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
          containerStyle={{ marginHorizontal: "10%" }}
          variant={"secondary"}
          onPress={handleSubmit}
          label={"LOG IN"}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="title">Welcome Back!</Text>
        <Text variant="subtitle">Please login to your account</Text>
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
