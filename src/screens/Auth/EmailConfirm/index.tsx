import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Header, Footer, Icons, Button } from "../../../components";
import { TTCsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text } from "../../../config/Theme";

const { height } = Dimensions.get("window");

interface IEmailConfirm extends TTCsNavProps {}

const EmailConfirm = (props: IEmailConfirm) => {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.body}>
          <Text variant="heading1">Check your mailbox</Text>
          <Text variant="subheadingLight">We’ve sent you a message.</Text>
          <View style={styles.viewStyle}>
            <Icons icon="Email" fill="#00B0F0" />
          </View>
          <View style={styles.viewStyle}>
            <Text variant="body">jondoe@gmail.com</Text>
          </View>
        </View>
        <Button
          label="Go to inbox"
          iconRight="ArrowForward"
          variant="primary"
          onPress={() => null}
          containerStyle={{ marginHorizontal: "10%" }}
        />
      </View>
      <Footer title="Something went wrong?" subTitle="Restart registration" />
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
