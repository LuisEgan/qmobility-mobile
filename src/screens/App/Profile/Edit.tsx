import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { Header, Icons, CardImage } from "../../../components";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import theme, { Text } from "../../../config/Theme";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { IUpdateUser } from "../../../gql/User/mutations";
import EditForm, { IEditFormValues } from "./Forms/EditForm";
import { FullScreenModal } from "../../Feedback";

const { height } = Dimensions.get("window");

const editSchema = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  dateOfBirth: yup.string().required(),
});

const Edit = () => {
  const { navigate, goBack } = useNavigation();

  const { data: userData, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.user,
  );

  const [updateUser, { loading: updateUserLoading }] = useMutation<
    { updateUser: IUpdateUser },
    IUpdateUser
  >(User.mutations.updateUser);

  const edit = async (values: IEditFormValues): Promise<void> => {
    try {
      await updateUser({
        variables: { ...values },
        refetchQueries: [
          {
            query: User.queries.user,
          },
        ],
      });
    } catch (e) {
      // TODO e feedback display
      console.warn("e: ", e);
    }
  };

  if (!userData) return <FullScreenModal show />;

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
          name: userData.user?.name,
          lastname: userData.user?.lastname || "",
          dateOfBirth: userData.user?.dateOfBirth || new Date(),
          avatarUrl: userData.user?.avatarUrl || "",
        }}
        onSubmit={edit}
        validationSchema={editSchema}
      >
        {(props) => (
          <>
            <Header
              title="Edit my Profile"
              text="Cancel"
              onPress={goBack}
              textRight="Done"
              onPressRight={props.handleSubmit}
              containerStyle={{
                backgroundColor: theme.colors.secondaryLighter,
              }}
            />
            <ScrollView style={styles.scrollStyle}>
              <EditForm {...props} loading={loading || updateUserLoading} />

              <View style={styles.containerTtitleEdition}>
                <Text variant="label">YOUR VIRTUAL EVE</Text>
                <TouchableOpacity
                  onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyCars)}
                >
                  <Icons icon="Edit" fill={theme.colors.gray} size={15} />
                </TouchableOpacity>
              </View>

              <View>
                <CardImage
                  imgUri={userData.user.selectedVehicle?.Images[0]}
                  name={userData.user.selectedVehicle?.Vehicle_Model}
                  title="Defaul eVe"
                  subTitle="userData"
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
            </ScrollView>
          </>
        )}
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
