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

const { height, width } = Dimensions.get("window");

interface IIconText {
  icon?: TIcon;
  label?: string;
  stroke?: string;
  fill?: string;
}

const DetailsICE = () => {
  const { goBack } = useNavigation();

  const { data, loading } = useQuery<{ user: IUser }, IUser>(
    User.queries.getICEVehicle,
  );

  const IconText = ({ icon, label, stroke, fill }: IIconText) => (
    <View style={styles.iconTextContent}>
      {icon && (
        <View
          style={{
            marginRight: 5,
          }}
        >
          <Icons
            icon={icon}
            fill={fill || theme.colors.grayLight}
            stroke={stroke}
            size={17}
          />
        </View>
      )}
      {label && <Text variant="label">{label}</Text>}
    </View>
  );

  if (loading) return <FullScreenModal show />;

  const vehicle = data?.user.iceVehicle;

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <Icons icon="ArrowBack" onPress={goBack} />
      </View>

      <ScrollView style={styles.containerScroll}>
        <View style={styles.contentTitle}>
          <Text variant="heading2">
            {vehicle?.Make}
            {" "}
            {vehicle?.MakeModel}
          </Text>
          <TouchableOpacity>
            <Icons icon="MoreVert" fill={theme.colors.primary} size={28} />
          </TouchableOpacity>
        </View>

        <View style={[styles.content]}>
          <IconText icon="Bubble" label={`${vehicle?.SeatingCapacity}`} />
          <IconText icon="Spa" label={`${vehicle?.Co2Emissions} C02g/km`} />
          <IconText
            icon="Calendar"
            label={`${vehicle?.YearMonthFirstRegistered}`}
            stroke="white"
          />
        </View>

        <View style={[styles.content]}>
          <IconText icon="Bubble" label={`${vehicle?.FuelType}`} />
          <IconText icon="Spa" label={`${vehicle?.Colour}`} />
          <IconText
            icon="Calendar"
            label={`${vehicle?.VehicleClass}`}
            stroke="white"
          />
        </View>

        <View style={[styles.content]}>
          <IconText icon="Bubble" label={`${vehicle?.VehiclePlate}`} />
          <IconText icon="Spa" label={`${vehicle?.DoorPlanLiteral}`} />
          <IconText icon="Speed" label={`${vehicle?.MaxSpeedMph} mph`} />
        </View>

        <View style={[styles.content]}>
          <IconText icon="Bubble" label={`${vehicle?.EngineCapacity}`} />
          <IconText icon="Spa" label={`${vehicle?.ModelVariant}`} />
        </View>
      </ScrollView>
    </View>
  );
};
export default DetailsICE;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.white,
  },
  containerScroll: {
    paddingHorizontal: "5%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: theme.colors.white,
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
    zIndex: 1,
    marginTop: height * 0.05,
    marginLeft: width * 0.03,
  },
  iconTextContent: {
    flexDirection: "row",
    marginVertical: "1%",
    marginRight: 15,
  },
});
