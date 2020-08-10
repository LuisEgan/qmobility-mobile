import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Button, Icons } from "../../../components";
import { Text } from "../../../config/Theme";
import { useNavigation } from "@react-navigation/native";
import { AUTH_STACK_SCREENS_NAMES } from "../../../navigation/constants";
import { TTCsNavProps } from "../../../navigation/NavPropsTypes";
import { Title, textBlack, StepText, textLight } from "./Texts";
import Header from "../../../components/Header";

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
};

interface ITCs extends TTCsNavProps {}

const TCs = (props: ITCs) => {
  const { navigation } = props;
  const { navigate, goBack } = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="Terms & Conditions"
          icon="ArrowBack"
          onPress={() => goBack()}
        />
      ),
    });
  }, [navigation]);

  const [endScroll, setEndScroll] = useState<boolean>(false);

  const confirmTermsConditions = (): void => {
    navigate(AUTH_STACK_SCREENS_NAMES.Access);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({
          nativeEvent,
        }: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isCloseToBottom(nativeEvent)) {
            setEndScroll(true);
          }
        }}
        style={styles.scroll}
      >
        {Title("General Rules")}
        {textBlack(
          "IMPORTANT: BY USING YOUR iPHONE, iPAD OR iPOD TOUCH (“DEVICE”), YOU ARE AGREEING TO BE BOUND BY THE FOLLOWING TERMS:"
        )}
        {StepText(
          1,
          "You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction."
        )}

        {StepText(
          2,
          "Our Privacy Policy describes how we handle the information you provide to us when you use our Services."
        )}

        {Title("Final Rules")}

        {textLight(
          "a) The software (including Boot ROM code, embedded software and third party software), documentation, interfaces, content, fonts and any data that came with your Device (“Original Apple Software”), as may be updated or replaced by feature enhancements, software updates or system restore software provided by Apple"
        )}
      </ScrollView>

      {!endScroll ? (
        <TouchableOpacity style={styles.buttonContainer}>
          <View>
            <Text style={styles.textStyle}>
              scroll down to agree{"   "}
              <Icons icon="ArrowDown" size={13} />
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ marginBottom: 30 }}>
          <Button
            margin={"10%"}
            variant="primary"
            onPress={() => confirmTermsConditions()}
            label="AGREE & CONTINUE"
            containerStyle={{ marginHorizontal: "10%" }}
          />
        </View>
      )}
    </View>
  );
};
export default TCs;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  scroll: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 0.2,
    padding: "1%",
    backgroundColor: "white",
    justifyContent: "center",
  },
});
