import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header, Footer, Icons, Button } from "../../../components";
import { TEmailConfirmNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";
import { AuthContext } from "../../../navigation/AuthContext";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";

const { height, width } = Dimensions.get("window");

interface IEmailConfirm extends TEmailConfirmNavProps {}

const EmailConfirm = (props: IEmailConfirm) => {
  const { navigation, route } = props;

  const { navigate } = useNavigation();
  const { signIn } = useContext(AuthContext);

  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [goToCreateProfile, setGoToCreateProfile] = useState(false);

  useEffect(() => {
    const doSignIn = async () => {
      try {
        await signIn(route.params.userToken);
        navigate(APP_STACK_SCREENS_NAMES.CreateProfile);
      } catch (error) {
        console.error("error: ", error);
      }
    };

    if (isEmailConfirmed) {
      doSignIn();
    }
  }, [goToCreateProfile]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.body}>
          <Text variant="heading1">
            {isEmailConfirmed ? "Mail confirmed" : "Check your mailbox"}
          </Text>
          <Text variant="subheadingLight">
            {isEmailConfirmed
              ? "Congratulations! You're in!"
              : "We’ve sent you a message."}
          </Text>
          <View style={styles.viewStyle}>
            {isEmailConfirmed ? (
              <Icons icon="Done" fill="#00B0F0" />
            ) : (
              <Icons icon="Email" fill="#00B0F0" />
            )}
          </View>
          <View style={styles.viewStyle}>
            <Text variant="body">jondoe@gmail.com</Text>
          </View>
        </View>
        <Button
          label={`${isEmailConfirmed ? "GO TO PROFILE" : "GO TO INBOX"}`}
          iconRight="ArrowForward"
          variant="primary"
          onPress={() => {
            if (isEmailConfirmed) {
              setGoToCreateProfile(true);
            } else {
              setIsEmailConfirmed(true);
            }
          }}
          containerStyle={{ marginHorizontal: "10%", width: width * 0.8 }}
        />
      </View>

      {!isEmailConfirmed && (
        <Footer title="Something went wrong?" subTitle="Restart registration" />
      )}
    </View>
  );
};

export default EmailConfirm;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
  },
  content: {
    height: height * 0.69,
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
