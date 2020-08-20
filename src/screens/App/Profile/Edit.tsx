import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import {
  ImageProfile,
  Header,
  Input,
  Icons,
  CardImage,
} from "../../../components";
import { ERRORS, APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { TTCsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text, Theme } from "../../../config/Theme";

const { height } = Dimensions.get("window");

interface IEdit extends TTCsNavProps {}

interface IFormValues {
  firstName: string;
  lastName: string;
  dateBirth: string;
  number: string;
}

const SignupSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  dateBirth: yup.string().required("Required"),
  number: yup.string().required("Required"),
});

const Edit = (props: IEdit) => {
  const { navigation } = props;
  const theme = useTheme<Theme>();

  const { navigate, goBack } = useNavigation();

  const Form = (params: FormikProps<IFormValues>) => {
    const { handleChange, handleSubmit, handleBlur, errors, touched } = params;

    useLayoutEffect(() => {
      navigation.setOptions({
        header: () => (
          <Header
            title="Edit my Profile"
            text="Cancel"
            onPress={goBack}
            textRight="Done"
            onPressRight={handleSubmit}
            containerStyle={{
              backgroundColor: theme.colors.secondaryLighter,
            }}
          />
        ),
      });
    }, [navigation]);

    return (
      <>
        <ScrollView style={styles.scrollStyle}>
          <View style={{}}>
            <ImageProfile label="JD" color={theme.colors.primary} />
            <View style={styles.contentViewIput}>
              <Input
                placeholder="First name"
                onChange={() => handleChange("firstName")}
                onBlur={() => handleBlur("firstName")}
                error={errors.firstName && ERRORS.REQUIRED}
                touched={touched.firstName}
              />
              <Input
                placeholder="Last name"
                onChange={() => handleChange("lastName")}
                onBlur={() => handleBlur("lastName")}
                error={errors.lastName && ERRORS.REQUIRED}
                touched={touched.lastName}
              />
              <Input
                placeholder="Date of birth"
                onChange={() => handleChange("dateBirth")}
                onBlur={() => handleBlur("dateBirth")}
                error={errors.dateBirth && ERRORS.REQUIRED}
                touched={touched.dateBirth}
              />

              <Input
                placeholder="Mobile Number"
                onChange={() => handleChange("number")}
                onBlur={() => handleBlur("number")}
                error={errors.number && ERRORS.REQUIRED}
                touched={touched.number}
              />
            </View>
            <View style={styles.containerTtitleEdition}>
              <Text variant="label">YOUR VIRTUAL EVE</Text>
              <TouchableOpacity
                onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyCars)}
              >
                <Icons icon="Edit" fill={theme.colors.grayLighter} size={15} />
              </TouchableOpacity>
            </View>
            <View>
              <CardImage
                imgUri="https://reactnative.dev/img/tiny_logo.png"
                name="Nissan Leaf Acenta 40"
                title="Defaul eVe"
                subTitle="Defaul eVe"
                containerStyle={[
                  styles.Card,
                  {
                    backgroundColor: theme.colors.white,
                    borderColor: theme.colors.grayLight,
                  },
                ]}
              />
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.deleteContainer,
                  {
                    borderTopColor: theme.colors.grayLighter,
                  },
                ]}
              >
                <View style={styles.deleteContent}>
                  <Icons icon="Delete" fill={theme.colors.red} size={20} />
                </View>
                <Text variant="label" color={theme.colors.red}>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  // const edit = (values: IFormValues): void => {
  const edit = (): null => null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
        },
      ]}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dateBirth: "",
          number: "",
        }}
        onSubmit={edit}
        validationSchema={SignupSchema}
      >
        {Form}
      </Formik>
    </View>
  );
};
export default Edit;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  contentViewIput: {
    marginBottom: "10%",
  },
  scrollStyle: {
    height: height * 0.69,
    paddingHorizontal: "5%",
  },
  contentEmailStyle: {
    marginHorizontal: "5%",
  },
  textSelectStyle: {
    marginLeft: "5%",
    marginTop: 30,
    marginBottom: 10,
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  Card: {
    borderWidth: 1,
  },
  deleteContainer: {
    borderTopWidth: 1,

    flexDirection: "row",
    paddingVertical: 20,
    marginVertical: "5%",
  },
  deleteContent: {
    marginRight: 10,
  },
});
