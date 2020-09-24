import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@apollo/client";
import {
  Header,
  ImageProfile,
  Input,
  Icons,
  CardImage,
} from "../../../components";
import { Text, Theme } from "../../../config/Theme";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { FullScreenModal } from "../../Feedback";
import { dateToText } from "../../../lib/dates";

const CreateProfile = () => {
  const { navigate } = useNavigation();

  const { data: userData, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const theme = useTheme<Theme>();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (loading) return <FullScreenModal show />;

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <Header
        title="My Profile"
        subTitle="To store all your info in one place"
        icon="Menu"
        iconRight="Edit"
        textRight="Edit"
        onPressRight={() => navigate(APP_STACK_SCREENS_NAMES.EditProfile)}
        onPress={toggleDrawer}
      />
      <ScrollView
        style={{
          height: "100%",
          backgroundColor: theme.colors.white,
        }}
      >
        <View style={[styles.container]}>
          <ImageProfile
            color={theme.colors.primary}
            avatarUrl={userData?.user.avatarUrl}
          />
          <Text variant="heading1">{userData?.user.name}</Text>
          <Text variant="bodyHighlight">{userData?.user.lastname}</Text>
          <Text variant="subheadingLight">{userData?.user.email}</Text>
          <Input
            disabled
            defaultValue={dateToText(`${userData?.user.dateOfBirth}`)}
          />
          <View style={styles.containerTtitleEdition}>
            <Text variant="label">YOUR VIRTUAL EVE</Text>
            <TouchableOpacity
              onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyCars)}
            >
              <Icons icon="Edit" fill={theme.colors.grayLight} size={15} />
            </TouchableOpacity>
          </View>
          <View>
            <CardImage
              name={userData?.user.selectedVehicle?.Vehicle_Make}
              imgUri={userData?.user.selectedVehicle?.Images[0]}
              title="Defaul eVe"
              subTitle={userData?.user.selectedVehicle?.Vehicle_Model}
              containerStyle={[
                styles.Card,
                {
                  backgroundColor: theme.colors.white,
                  borderColor: theme.colors.grayLight,
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </DrawerLeftMenu>
  );
};
export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    height: "100%",
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  Card: {
    borderWidth: 1,
  },
});
