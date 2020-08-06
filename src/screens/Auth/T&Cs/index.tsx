import React, { useState } from "react";
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
import { AUTH_STACK_SCREENS_NAME } from "../../../navigation/constants";

interface ITCs {}

const TCs = (props: ITCs) => {
  const {} = props;

  const navigation = useNavigation();

  const [endScroll, setEndScroll] = useState<boolean>(false);

  const Title = (str: string): JSX.Element => {
    return (
      <Text
        variant="title"
        style={[styles.textScrollStyle, { fontSize: 16 }]}
        color="primary"
      >
        {str}
      </Text>
    );
  };

  const textBlack = (str: string): JSX.Element => {
    return (
      <Text variant="title" style={[styles.textScrollStyle, { fontSize: 14 }]}>
        {str}
      </Text>
    );
  };

  const textLight = (str: string): JSX.Element => {
    return (
      <Text
        variant="subtitle"
        style={[styles.textScrollStyle, { fontSize: 14 }]}
      >
        {str}
      </Text>
    );
  };

  const StepText = (num: number, str: string): JSX.Element => {
    return (
      <View style={styles.stepStyle}>
        <Text
          variant="subtitle"
          style={[styles.textScrollStyle, { fontSize: 14 }]}
        >
          <Text variant="title" style={{ fontSize: 14 }}>
            {`· Step ${num}:  `}
          </Text>
          {str}
        </Text>
      </View>
    );
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  const confirmTermsConditions = (): void => {
    navigation.navigate(AUTH_STACK_SCREENS_NAME.Access);
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
  stepStyle: {
    marginLeft: 25,
  },
  textScrollStyle: {
    marginBottom: 20,
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
