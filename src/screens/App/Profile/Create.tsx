import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { Header } from "../../../components";

import { Theme } from "../../../config/Theme";
import Form, { IFormValues } from "./Form";
import { IUpdateUser } from "../../../gql/User/mutations";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { FullScreenModal } from "../../Feedback";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { IIceVehicle } from "../../../gql/Vehicle/Types";

const SignupSchema = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  dateOfBirth: yup.string().required(),
});

const CreateProfile = () => {
  const { navigate } = useNavigation();

  const { data: userData, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.user,
  );

  const [updateUser, { loading: updateUserLoading }] = useMutation<
    { updateUser: IUpdateUser },
    IUpdateUser
  >(User.mutations.updateUser);

  const [iceVehicle, setIceVehicle] = useState<IIceVehicle>();

  const theme = useTheme<Theme>();

  const Create = async (values: IFormValues): Promise<void> => {
    const { ...newIceVehicle } = iceVehicle;
    delete newIceVehicle.typename;

    const variables = iceVehicle
      ? { ...values, iceVehicle: newIceVehicle }
      : { ...values };

    try {
      await updateUser({
        variables,
        refetchQueries: [
          {
            query: User.queries.user,
          },
        ],
      });
      navigate(APP_STACK_SCREENS_NAMES.ProfileScroll);
    } catch (e) {
      // TODO e feedback display
      console.warn("e: ", e);
    }
  };

  if (!userData) return <FullScreenModal show />;

  return (
    <View style={styles.container}>
      <Header
        title="Create my Profile"
        subTitle="To store all your info in one place"
        containerStyle={{
          backgroundColor: theme.colors.grayLighter,
        }}
      />

      <Formik
        initialValues={{
          name: userData.user?.name,
          lastname: userData.user?.lastname || "",
          dateOfBirth: userData.user?.dateOfBirth || new Date(),
          avatarUrl: userData.user?.avatarUrl || "",
        }}
        onSubmit={Create}
        validationSchema={SignupSchema}
      >
        {(props) => (
          <Form
            {...props}
            loading={loading || updateUserLoading}
            onIceVehicleChange={setIceVehicle}
          />
        )}
      </Formik>
    </View>
  );
};
export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
