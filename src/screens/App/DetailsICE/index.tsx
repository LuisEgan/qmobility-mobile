import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Icons } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { TIcon } from "../../../components/svg/icons/TypeIcons";
import { User } from "../../../gql";
import { IUser } from "../../../gql/User/Types";
import { FullScreenModal } from "../../Feedback";
import { numberWithDots } from "../../../lib/strings";

const { height, width } = Dimensions.get("window");

interface IIconText {
  icon?: TIcon;
  label?: string;
}

const DetailsICE = () => {
  const { goBack } = useNavigation();

  const { data: eVe, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.getEve,
  );

  const IconText = ({ icon, label }: IIconText) => (
    <View style={styles.iconTextContent}>
      {icon && (
        <View
          style={{
            marginRight: 5,
          }}
        >
          <Icons icon={icon} fill={theme.colors.grayLight} size={17} />
        </View>
      )}
      {label && <Text variant="label">{label}</Text>}
    </View>
  );

  if (loading) return <FullScreenModal show />;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
        },
      ]}
    >
      <View style={styles.goBack}>
        <Icons icon="ArrowBack" fill="white" onPress={goBack} />
      </View>

      <ScrollView style={styles.containerScroll}>
        <View style={styles.contentTitle}>
          <Text variant="heading2">
            {eVe?.user.selectedVehicle?.Vehicle_Make}
            {" "}
            {eVe?.user.selectedVehicle?.Vehicle_Model}
          </Text>
          <TouchableOpacity>
            <Icons icon="MoreVert" fill={theme.colors.primary} size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text
            variant="bodyHighlightBold"
            style={{
              marginRight: 10,
            }}
          >
            eVe Battery
            {" "}
            {eVe?.user.selectedVehicle?.Battery_Capacity_Full}
            {" "}
            kWh
          </Text>
          <Text variant="bodyBold">
            Range
            {" "}
            {eVe?.user.selectedVehicle?.Range_Real}
            {" "}
            km
          </Text>
        </View>

        <View style={[styles.content]}>
          <IconText
            icon="Bubble"
            label={`${eVe?.user.selectedVehicle?.Misc_Seats}`}
          />
          <IconText icon="Spa" label="0 C02g/km" />
        </View>

        <View style={[styles.content]}>
          <IconText
            icon="Polymer"
            label={`Max ${eVe?.user.selectedVehicle?.Range_Real} km`}
          />
          <IconText
            icon="Nature"
            label={`${eVe?.user.selectedVehicle?.Efficiency_Real} kWh/100km`}
          />
        </View>

        <View style={[styles.content]}>
          <IconText
            icon="Speed"
            label={`Max ${eVe?.user.selectedVehicle?.Performance_Topspeed}  km/h`}
          />
          <IconText
            icon="Flash"
            label={`Time ${eVe?.user.selectedVehicle?.Fastcharge_ChargeTime} mins`}
          />
        </View>

        <View style={[styles.content, { justifyContent: "space-between" }]}>
          <Text variant="bodyBold">United Kingdom</Text>
          <Text variant="bodyBold">
            £
            {" "}
            {numberWithDots(`${eVe?.user.selectedVehicle?.Price_From_UK}`)}
          </Text>
        </View>

        <View style={[styles.content, { justifyContent: "space-between" }]}>
          <Text
            variant="body"
            style={{
              color: theme.colors.gray,
            }}
          >
            Availability
          </Text>
          <Text variant="body">
            {eVe?.user.selectedVehicle?.Availability_Status}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default DetailsICE;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  containerScroll: {
    paddingHorizontal: "5%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
    marginTop: -height * 0.01,
  },
  contentTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10%",
    marginBottom: "3%",
  },
  content: {
    flexDirection: "row",
    marginVertical: "3%",
  },
  goBack: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.03,
    zIndex: 1,
  },
  iconTextContent: {
    flexDirection: "row",
    marginVertical: "1%",
    marginRight: 15,
  },
  line: {
    borderLeftWidth: 1,
    height: 60,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  card: {
    marginVertical: "5%",
    borderRadius: 10,
    borderWidth: 1,
    height: 122,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardContent: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  cardBody: {
    width: "100%",
    alignItems: "center",
  },
  cardBodyContent: {
    flexDirection: "row",
    marginTop: "10%",
    justifyContent: "center",
  },
  cardType: {
    alignSelf: "flex-end",
    opacity: 0.25,
  },
  button: {
    marginHorizontal: "5%",
    marginBottom: "6%",
    marginTop: "3%",
    justifyContent: "center",
  },
});
