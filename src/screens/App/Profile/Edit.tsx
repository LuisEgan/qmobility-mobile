import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ImageProfile,
  Header,
  Input,
  Icons,
  CardImage,
} from "../../../components";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { ERRORS, APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { TTCsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

interface IEdit extends TTCsNavProps {}

const Edit = (props: IEdit) => {
  const { navigation } = props;

  const { navigate, goBack } = useNavigation();

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

  const Form = (params: FormikProps<IFormValues>) => {
    const { handleChange, handleSubmit, handleBlur, errors, touched } = params;

    // ! Fix - This should be part of the Edit component, not the Form component
    useLayoutEffect(() => {
      navigation.setOptions({
        header: () => (
          <Header
            title="Edit my Profile"
            // ! Fix - Colors should only come from Theme
            color="#E9ECF4"
            text="Cancel"
            onPress={goBack}
            textRight="Done"
            onPressRight={handleSubmit}
          />
        ),
      });
    }, [navigation]);

    return (
      <>
        <ScrollView style={styles.scrollStyle}>
          <View style={{}}>
            // ! Fix - Colors should only come from Theme
            <ImageProfile label="JD" color="#002060" />
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
                // ! Fix - Colors should only come from Theme
                <Icons icon="Edit" fill="#ACACAC" size={15} />
              </TouchableOpacity>
            </View>
            <View>
              <CardImage
                imgUri="https://reactnative.dev/img/tiny_logo.png"
                name="Nissan Leaf Acenta 40"
                title="Defaul eVe"
                subTitle="Defaul eVe"
                containerStyle={styles.Card}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.deleteContainer}>
                <View style={styles.deleteContent}>
                  // ! Fix - Colors should only come from Theme
                  <Icons icon="Delete" fill="#f11" size={20} />
                </View>
                // ! Fix - Colors should only come from Theme
                <Text variant="label" style={{ color: "red" }}>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  const edit = (values: IFormValues): void => {
    console.log("edit -> values", values);
  };

  return (
    <View style={styles.container}>
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
    // ! Fix - Colors should only come from Theme
    backgroundColor: "#fff",
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
    // ! Fix - Colors should only come from Theme
    backgroundColor: "#fff",
    borderColor: "#ACACAC",
    borderWidth: 1,
  },
  deleteContainer: {
    borderTopWidth: 1,
    // ! Fix - Colors should only come from Theme
    borderTopColor: "#f2f2f2",
    flexDirection: "row",
    paddingVertical: 20,
    marginVertical: "5%",
  },
  deleteContent: {
    marginRight: 10,
  },
});
