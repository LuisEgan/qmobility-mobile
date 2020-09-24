import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { Header, Icons, Footer, CardImage } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { DrawerLeftMenu } from "../../../components/HOCs";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { FullScreenModal } from "../../Feedback";

const { height } = Dimensions.get("window");

const MyCars = () => {
  const { data: userData, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.allUserInfo,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (loading) return <FullScreenModal show />;

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <View style={styles.container}>
        <Header
          title="My Vehicles"
          subTitle="These are all you beautiful cars"
          icon="Menu"
          onPress={toggleDrawer}
        />

        <ScrollView
          style={[
            styles.content,
            { backgroundColor: theme.colors.contentBackground },
          ]}
        >
          <View style={styles.containerTtitleEdition}>
            <Text variant="label">Your Comparison vehicles</Text>
            <Icons icon="Edit" fill="#ACACAC" size={15} />
          </View>

          <CardImage
            name={userData?.user.iceVehicle.Make}
            title="Default ICE"
            subTitle={userData?.user.iceVehicle.MakeModel}
            svgIcon={<Icons icon="Apple" />}
          />

          <View style={styles.containerTtitleEdition}>
            <Text variant="label">Virtual vehicle</Text>
          </View>

          <CardImage
            name={userData?.user.selectedVehicle?.Vehicle_Make}
            title="Default eVe"
            subTitle={userData?.user.selectedVehicle?.Vehicle_Model}
            imgUri={userData?.user.selectedVehicle?.Images[0]}
          />
        </ScrollView>
        <Footer
          title="Feeling a bit adventurous today?"
          subTitle="Check our catalogue"
        />
      </View>
    </DrawerLeftMenu>
  );
};
export default MyCars;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  content: {
    paddingHorizontal: "5%",
    height: height * 0.69,
  },
  containerTtitleEdition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  cardMyCar: {
    width: "100%",
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ACACAC",
  },
  costentCar: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  contentImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: "5%",
    backgroundColor: "#00D6FD",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
