import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Modal, Select, Input, Icons } from "../../../components";
import theme, { Text } from "../../../config/Theme";

import { ERRORS } from "../../../lib/constants";
import { ISaveMyRoutes, ISaveMyRoutesVar } from "../../../gql/Route/mutations";
import { Route } from "../../../gql";

const { height, width } = Dimensions.get("window");

interface IModalSaveRoute {
  stateModal: boolean;
  onClosed: () => void;
  startLocation: string;
  endLocation: string;
}

interface IFormValues {
  name: string;
  category: string;
  frequency: string;
}

const ModalSaveRoute = (props: IModalSaveRoute) => {
  const { stateModal, onClosed, startLocation, endLocation } = props;

  const [
    upSaveMyRoutes,
    { data: upSaveMyRouteData, loading: upSaveMyRoutesLoading },
  ] = useMutation<{ upSaveMyRoutes: ISaveMyRoutes }, ISaveMyRoutesVar>(
    Route.mutations.saveMyRoute,
  );

  const [statePhase, setStatePhase] = useState<boolean>(true);
  const [valueSave, setValueSave] = useState<IFormValues>({
    name: "",
    category: "",
    frequency: "",
  });

  const onSaveRoute = (values: IFormValues): void => {
    setValueSave(values);
    setStatePhase(!statePhase);
  };

  const onSaveMyRouter = async () => {
    const { name, category, frequency } = valueSave;
    try {
      const variables = {
        origin: startLocation,
        destination: endLocation,
        friendlyName: name,
        category,
        frequency,
      };

      await upSaveMyRoutes({
        variables,
        refetchQueries: [
          {
            query: Route.queries.getMySaveRoute,
          },
        ],
      });
    } catch (error) {
      // console.log("onSaveMyRouter -> error", error)
    }

    if (upSaveMyRouteData) {
      onCancel();
    }
  };

  const onCancel = () => {
    setStatePhase(true);
    onClosed();
  };

  const Form = (params: FormikProps<IFormValues>) => {
    const {
      handleChange,
      handleSubmit,
      handleBlur,
      errors,
      touched,
      values,
    } = params;

    return (
      <>
        <View style={styles.bodyModal}>
          {statePhase ? (
            <ScrollView
              contentContainerStyle={{
                flex: 1,
              }}
            >
              <Input
                placeholder="Name"
                onChange={(str) => handleChange("name")(str.toString())}
                onBlur={() => handleBlur("name")}
                error={errors.name && ERRORS.REQUIRED}
                touched={touched.name}
                containerStyle={styles.inputContent}
                inputStyle={styles.input}
              />

              <Select
                placeholder="Category"
                list={[
                  "Commute",
                  "Local household",
                  "Weekend Away",
                  "Annual Break",
                ]}
                value={values.category}
                onPress={(str) => handleChange("category")(str.toString())}
                containerStyle={styles.selectContent}
                error={errors.category && ERRORS.REQUIRED}
                touched={touched.category}
              />

              <Select
                placeholder="Frequency"
                list={[
                  "1 time per week",
                  "2 times per week",
                  "3 times per week",
                  "4 times per week",
                  "5 times per week",
                  "6 times per week",
                  "7 times per week",
                ]}
                value={values.frequency}
                onPress={(str) => handleChange("frequency")(str.toString())}
                containerStyle={styles.selectContent}
                error={errors.frequency && ERRORS.REQUIRED}
                touched={touched.frequency}
              />
            </ScrollView>
          ) : (
            <PhaseTwo />
          )}
        </View>
        <View style={styles.contentButtonModal}>
          <TouchableOpacity
            onPress={() =>
              (statePhase ? onCancel() : setStatePhase(!statePhase))}
          >
            <Text
              style={{
                color: theme.colors.grayLight,
              }}
              variant="bodyBold"
            >
              {statePhase ? "CANCEL" : "BACK"}
            </Text>
          </TouchableOpacity>
          {!upSaveMyRoutesLoading ? (
            <TouchableOpacity
              onPress={statePhase ? handleSubmit : onSaveMyRouter}
            >
              <Text
                variant="bodyBold"
                style={{
                  color: theme.colors.white,
                }}
              >
                {statePhase ? "CONTINUE" : "SAVE ROUTE"}
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </>
    );
  };

  const PhaseTwo = () => {
    const { name, category, frequency } = valueSave;
    return (
      <>
        <View style={styles.containerPhaseTwo}>
          <Icons icon="Domain" fill={theme.colors.primary} />
          <View>
            <View style={styles.contentPheseTwo}>
              <Text
                style={styles.textColor}
                numberOfLines={1}
                variant="heading1"
              >
                {name}
              </Text>

              <Text style={styles.textColor} variant="body" numberOfLines={3}>
                {startLocation}
                ,
                {endLocation}
              </Text>
            </View>

            <View style={styles.contentPheseTwo}>
              <Text
                style={styles.textColor}
                numberOfLines={1}
                variant="heading1"
              >
                {category}
              </Text>
              <View>
                <Text style={styles.textColor} variant="body" numberOfLines={3}>
                  {frequency}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const SignupSchema = yup.object().shape({
    name: yup.string().required("Required"),
    category: yup.string().required("Required"),
    frequency: yup.string().required("Required"),
  });

  const ContentBody = () => (
    <Formik
      initialValues={{
        name: "",
        category: "",
        frequency: "",
      }}
      onSubmit={onSaveRoute}
      validationSchema={SignupSchema}
    >
      {Form}
    </Formik>
  );

  return (
    <Modal state={stateModal} onClosed={() => onCancel()}>
      <View style={styles.containerModal}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.contentModal,
            {
              backgroundColor: theme.colors.secondaryDark,
            },
          ]}
        >
          <View>
            <Text
              variant="heading2"
              style={[
                {
                  color: theme.colors.white,
                },
                styles.titleModal,
              ]}
            >
              Save your route
            </Text>
          </View>
          <ContentBody />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalSaveRoute;

const styles = StyleSheet.create({
  containerModal: {
    marginVertical: height * (Platform.OS === "ios" ? 0.3 : 0.2),
  },
  contentModal: {
    height: 400,
    width: width * 0.9,
    borderRadius: 10,
  },
  titleModal: {
    alignSelf: "center",
    marginVertical: "5%",
  },
  bodyModal: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  contentButtonModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
  },
  inputContent: {
    borderRadius: 10,
    paddingLeft: 5,
    height: 50,
    backgroundColor: theme.colors.white,
  },
  input: {
    borderBottomWidth: 0,
    marginTop: -8,
  },
  selectContent: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
  containerPhaseTwo: {
    flexDirection: "row",
    flex: 1,
    paddingRight: "10%",
  },
  contentPheseTwo: {
    flex: 1,
  },
  textColor: {
    color: theme.colors.white,
  },
});
