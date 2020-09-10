import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "../../../components";

import { Text } from "../../../config/Theme";
import { ERRORS, AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";
import Auth from "../../../components/Auth";
import { User } from "../../../gql";
import { IAuthResponse, IEmailSignUpVars } from "../../../gql/User/mutations";

const { width, height } = Dimensions.get("window");

interface IFormValues {
  email: string;
  password: string;
}

const SignUpSchema = yup.object().shape({
  email: yup.string().email(ERRORS.EMPTY_EMAIL),
  password: yup
    .string()
    .required(ERRORS.EMPTY_PASSWORD)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      ERRORS.INVALID_PASSWORD,
    ),
});

const SignUp = () => {
  const { navigate } = useNavigation();

  const [signUp, { data: signUpData, loading }] = useMutation<
    { signup: IAuthResponse },
    IEmailSignUpVars
  >(User.mutations.signUp);

  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (signUpData) {
      const redirect = async () => {
        try {
          navigate(AUTH_STACK_SCREENS_NAMES.EmailConfirm, {
            userToken: signUpData.signup.accessToken,
            userEmail,
          });
        } catch (error) {
          console.error("error: ", error);
        }
      };

      redirect();
    }
  }, [signUpData]);

  const submitSignUp = (values: IFormValues): void => {
    setUserEmail(values.email);
    signUp({ variables: { ...values } });
  };

  const Form = (params: FormikProps<IFormValues>) => {
    const { handleChange, handleSubmit, handleBlur, errors, touched } = params;

    return (
      <View>
        <View style={styles.contentViewIput}>
          <Input
            containerStyle={{ marginHorizontal: 0 }}
            placeholder="Email Address"
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
          />
          <Input
            containerStyle={{ marginHorizontal: 0 }}
            placeholder="Password"
            isPassword
            isSignUp
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
          />
        </View>
        <Button
          variant="primary"
          onPress={handleSubmit}
          label={`${loading ? "Loading..." : "SIGN UP"}`}
          enabled={!loading || !!signUpData}
        />
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
        initialValues={{ email: "", password: "" }}
        onSubmit={submitSignUp}
        validationSchema={SignUpSchema}
      >
        {Form}
      </Formik>

      <View style={{ height: 70 }} />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: width * 0.1,
  },

  content: {
    backgroundColor: "white",
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
