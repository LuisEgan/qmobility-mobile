import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Icons } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { Title, textBlack, StepText, textLight } from "./Texts";
import Header from "../../../components/Header";
import { AUTH_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { width } = Dimensions.get("window");

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) =>
  layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

const TCs = () => {
  const { navigate, goBack } = useNavigation();
  const scroll = useRef<ScrollView>(null);

  const [endScroll, setEndScroll] = useState<boolean>(false);

  const confirmTermsConditions = (): void => {
    navigate(AUTH_STACK_SCREENS_NAMES.Access);
  };

  const scrollDown = () => {
    scroll?.current?.scrollToEnd();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Terms & Conditions"
        icon="ArrowBack"
        onPress={() => goBack()}
      />

      <ScrollView
        ref={scroll}
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
          "IMPORTANT: BY USING YOUR iPHONE, iPAD OR iPOD TOUCH (“DEVICE”), YOU ARE AGREEING TO BE BOUND BY THE FOLLOWING TERMS:",
        )}
        {StepText(
          1,
          "You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction.",
        )}

        {StepText(
          2,
          "Our Privacy Policy describes how we handle the information you provide to us when you use our Services.",
        )}

        {textBlack(
          "IMPORTANT: BY USING YOUR iPHONE, iPAD OR iPOD TOUCH (“DEVICE”), YOU ARE AGREEING TO BE BOUND BY THE FOLLOWING TERMS:",
        )}
        {StepText(
          1,
          "You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction.",
        )}

        {StepText(
          2,
          "Our Privacy Policy describes how we handle the information you provide to us when you use our Services.",
        )}

        {textBlack(
          "IMPORTANT: BY USING YOUR iPHONE, iPAD OR iPOD TOUCH (“DEVICE”), YOU ARE AGREEING TO BE BOUND BY THE FOLLOWING TERMS:",
        )}
        {StepText(
          1,
          "You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction.",
        )}

        {StepText(
          2,
          "Our Privacy Policy describes how we handle the information you provide to us when you use our Services.",
        )}

        {textBlack(
          "IMPORTANT: BY USING YOUR iPHONE, iPAD OR iPOD TOUCH (“DEVICE”), YOU ARE AGREEING TO BE BOUND BY THE FOLLOWING TERMS:",
        )}
        {StepText(
          1,
          "You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction.",
        )}

        {StepText(
          2,
          "Our Privacy Policy describes how we handle the information you provide to us when you use our Services.",
        )}

        {Title("Final Rules")}

        {textLight(
          "a) The software (including Boot ROM code, embedded software and third party software), documentation, interfaces, content, fonts and any data that came with your Device (“Original Apple Software”), as may be updated or replaced by feature enhancements, software updates or system restore software provided by Apple",
        )}
      </ScrollView>

      {!endScroll ? (
        <TouchableOpacity style={styles.buttonContainer} onPress={scrollDown}>
          <View>
            <Text style={styles.textStyle}>
              scroll down to agree
              {"   "}
              <Icons icon="ArrowDown" size={13} />
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ marginBottom: 30 }}>
          <Button
            variant="primary"
            onPress={() => confirmTermsConditions()}
            label="AGREE & CONTINUE"
            containerStyle={{ marginHorizontal: "10%", width: width * 0.8 }}
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
    backgroundColor: theme.colors.white,
    justifyContent: "center",
  },
});
