import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation } from "@apollo/client";
import { Header, Footer, Icons, Button, Input } from "../../../components";
import { TEmailConfirmNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";
import { AuthContext } from "../../../navigation/AuthContext";
import { APP_STACK_SCREENS_NAMES, ERRORS } from "../../../lib/constants";
import {
  IEmailConfirmation,
  IEmailConfirmationVars,
} from "../../../gql/User/mutations";
import { User } from "../../../gql";

const { width } = Dimensions.get("window");

interface IEmailConfirm extends TEmailConfirmNavProps {}

const EmailConfirm = (props: IEmailConfirm) => {
  const { route } = props;

  const [
    emailConfirmation,
    { data: emailConfirmationData, called },
  ] = useMutation<
    { emailConfirmation: IEmailConfirmation },
    IEmailConfirmationVars
  >(User.mutations.emailConfirmation);

  const { navigate } = useNavigation();
  const { signIn } = useContext(AuthContext);

  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [goToCreateProfile, setGoToCreateProfile] = useState(false);
  const [pin, setPin] = useState<string>("");
  const [badPin, setBadPin] = useState<string>("");

  // * Trigger PIN validation
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        emailConfirmation({
          variables: {
            email: route.params.userEmail,
            random4digits: +pin,
          },
        });
      } catch (error) {
        console.error("error: ", error);
      }
    };

    if (pin.length === 4) {
      confirmEmail();
    }
  }, [pin]);

  // * Confirm PIN
  useEffect(() => {
    if (emailConfirmationData) {
      setIsEmailConfirmed(true);
      setBadPin("");
    } else if (called) {
      setBadPin(ERRORS.BAD_PIN);
    }
  }, [emailConfirmationData]);

  // * Sign in and refirect to Create Profile
  useEffect(() => {
    const doSignIn = async () => {
      try {
        await signIn(route.params.userToken);
        navigate(APP_STACK_SCREENS_NAMES.CreateProfile);
      } catch (error) {
        console.error("error: ", error);
      }
    };

    if (goToCreateProfile) {
      doSignIn();
    }
  }, [goToCreateProfile]);

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
                <Input
                  onChange={setPin}
                  containerStyle={{
                    width: width * 0.8,
                    backgroundColor: "white",
                  }}
                />
              </View>

              <Text variant="error">{badPin}</Text>
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
            subTitle="Restart registration"
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
