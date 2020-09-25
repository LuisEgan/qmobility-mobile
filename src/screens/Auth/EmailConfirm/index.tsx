/* eslint-disable no-nested-ternary */
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, Keyboard } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation } from "@apollo/client";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { Header, Footer, Icons, Button } from "../../../components";
import { TEmailConfirmNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";
import { AuthContext } from "../../../navigation/AuthContext";
import {
  IEmailConfirmation,
  IEmailConfirmationVars,
  IResendEmailVars,
} from "../../../gql/User/mutations";
import { User } from "../../../gql";

const { width } = Dimensions.get("window");

interface IEmailConfirm extends TEmailConfirmNavProps {}

const EmailConfirm = (props: IEmailConfirm) => {
  const { route, navigation } = props;

  const { signIn } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  const [emailConfirmation, { data: emailConfirmationData }] = useMutation<
    { emailConfirmation: IEmailConfirmation },
    IEmailConfirmationVars
  >(User.mutations.emailConfirmation);

  const [
    resendEmailConfirmation,
    { loading: resendLoading, called: resendCalled },
  ] = useMutation<
    { resendEmailConfirmation: IEmailConfirmation },
    IResendEmailVars
  >(User.mutations.resendEmailConfirmation);

  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [goToCreateProfile, setGoToCreateProfile] = useState(false);
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");

  // * Trigger PIN validation
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await emailConfirmation({
          variables: {
            email: route.params.userEmail,
            random4digits: +pin,
          },
        });
      } catch (e) {
        setError(e.message);
      }
    };

    if (pin.length === 4) {
      confirmEmail();
      Keyboard.dismiss();
    } else {
      setError("");
    }
  }, [pin]);

  // * Confirm PIN
  useEffect(() => {
    if (emailConfirmationData) {
      setIsEmailConfirmed(!!emailConfirmationData);
    }
  }, [emailConfirmationData]);

  // * Sign in and refirect to Create Profile
  useEffect(() => {
    const doSignIn = async () => {
      try {
        await signIn(route.params.userToken);
      } catch (e) {
        setError(e.message);
      }
    };

    if (goToCreateProfile) {
      doSignIn();
    }
  }, [goToCreateProfile]);

  // * Resend email
  const resendEmail = async () => {
    try {
      await resendEmailConfirmation({
        variables: {
          email: route.params.userEmail,
        },
      });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Header />

      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <View style={styles.body}>
              <Text variant="heading1">
                {isEmailConfirmed ? "Mail confirmed" : "Check your mailbox"}
              </Text>

              <Text variant="subheadingLight">
                {isEmailConfirmed
                  ? "Congratulations! You're in!"
                  : "Enter the secret PIN code"}
              </Text>

              <View style={styles.viewStyle}>
                {isEmailConfirmed && <Icons icon="Done" fill="#00B0F0" />}
              </View>

              <Text variant="body">{route.params.userEmail}</Text>

              <View style={styles.viewStyle}>
                <SmoothPinCodeInput
                  cellStyle={{
                    borderBottomWidth: 2,
                    borderColor: "gray",
                  }}
                  cellStyleFocused={{
                    borderColor: "black",
                  }}
                  value={pin}
                  onTextChange={setPin}
                />
              </View>

              <Text variant="error">{error}</Text>
            </View>

            {isEmailConfirmed && (
              <Button
                label={`${isEmailConfirmed ? "GO TO PROFILE" : "GO TO INBOX"}`}
                iconRight="ArrowForward"
                variant="primary"
                onPress={() => setGoToCreateProfile(true)}
                containerStyle={{ marginHorizontal: "10%", width: width * 0.8 }}
              />
            )}
          </View>
        </ScrollView>

        {!isEmailConfirmed && (
          <Footer
            title="Something went wrong?"
            subTitle={`${
              resendLoading
                ? "Sending..."
                : resendCalled
                  ? "Sent!"
                  : "Resend email"
            }`}
            onPressSubtitle={resendEmail}
          />
        )}
      </View>
    </>
  );
};

export default EmailConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  body: {
    marginHorizontal: "10%",
    alignItems: "center",
    marginVertical: "10%",
  },
  viewStyle: {
    marginVertical: "5%",
  },
});
