import { FormikProps } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ImageProfile, Input, PhoneInput } from "../../../../components";
import DatePicker from "../../../../components/DatePicker";
import theme from "../../../../config/Theme";
import { ERRORS } from "../../../../lib/constants";

export interface IEditFormValues {
  name: string;
  lastname: string;
  dateOfBirth: Date;
  avatarUrl: string;
  phone: string;
}

interface IForm extends FormikProps<IEditFormValues> {
  loading?: boolean;
}

const EditForm = (props: IForm) => {
  const {
    handleChange,
    handleBlur,
    setErrors,
    errors,
    touched,
    values,
    initialValues,
  } = props;

  const onLoadPhoto = async (photoB64: string) => {
    handleChange("avatarUrl")(photoB64);
  };

  return (
    <View style={styles.container}>
      <ImageProfile
        color={theme.colors.primary}
        onLoadPhoto={onLoadPhoto}
        avatarUrl={values.avatarUrl}
      />

      <View style={styles.contentViewIput}>
        <Input
          label="First name"
          placeholder="First name"
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          error={errors.name && ERRORS.REQUIRED}
          touched={touched.name}
          defaultValue={initialValues.name}
        />

        <Input
          label="Last name"
          placeholder="Last name"
          onChange={handleChange("lastname")}
          onBlur={handleBlur("lastname")}
          error={errors.lastname && ERRORS.REQUIRED}
          touched={touched.lastname}
          defaultValue={initialValues.lastname}
        />

        <DatePicker
          label="Date of birth"
          onChange={(e) => handleChange("dateOfBirth")(e.toString())}
          value={values.dateOfBirth || initialValues.dateOfBirth}
        />

        <PhoneInput
          defaultValue={initialValues.phone}
          onChangeFormattedText={handleChange("phone")}
          error={errors.phone}
          onIsInvalid={() => setErrors({ ...errors, phone: "Invalid Phone" })}
        />
      </View>
    </View>
  );
};

export default EditForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 40,
    padding: 10,
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
});
