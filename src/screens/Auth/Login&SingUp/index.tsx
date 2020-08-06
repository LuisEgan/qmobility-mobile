import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "../../../components/";

import { Formik } from "formik";
import * as yup from "yup";
import { Text } from "../../../config/Theme";
import { TLoginSignUpNavProps } from "../../../navigation/NavPropsTypes";

interface ILoginSignUp extends TLoginSignUpNavProps {}

interface FormValues {
  emailAddess: string;
  password: string;
}

const LoginSignUp = (props: ILoginSignUp) => {
  const { route } = props;

  const [state, setState] = useState<number>(route.params.state || 1);

  //const theme = useTheme<Theme>();

  const login = (values: FormValues): void => {
    console.log("LoginSignUp -> values", values);
  };

  const SignupSchema = yup.object().shape({
    emailAddess: yup.string().email(),
    password: yup.string().required("Required"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <Text variant="title">{`Welcome ${state ? "Back" : "onboard"}!`}</Text>
        <Text variant="subtitle">{`Please ${
          state ? "login to your account" : "register to procced"
        }.`}</Text>
      </View>
      <View style={styles.viewOrStyle}>
        <Text variant="title">OR</Text>
      </View>
      <Formik
        initialValues={{ emailAddess: "", password: "" }}
        onSubmit={login}
        validationSchema={SignupSchema}
      >
        {({ handleChange, handleSubmit }) => (
          <View>
            <View style={styles.contentViewIput}>
              <Input
                placeholder="Email Address"
                onChange={handleChange("emailAddess")}
              />
              <Input
                placeholder="Password"
                isPassword={true}
                onChange={handleChange("password")}
              />
            </View>
            <Button
              variant={state ? "secondary" : "primary"}
              onPress={handleSubmit}
              label={state ? "LOG IN" : "SING UP"}
            />
          </View>
        )}
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
  contentViewIput: {
    marginBottom: "10%",
  },
  viewOrStyle: {
    justifyContent: "center",
    alignSelf: "center",
  },
  viewContent: {
    marginHorizontal: "10%",
    marginVertical: "5%",
  },
});
