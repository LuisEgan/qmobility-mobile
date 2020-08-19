import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Header, Icons } from "../../../components";
import { TMyRoutesNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text, Theme } from "../../../config/Theme";
import { useTheme } from "@shopify/restyle";
import { TIcon } from "../../../components/svg/icons/TypeIcons";

interface IMyRoutes extends TMyRoutesNavProps {}

interface IListRoutes {
  date?: string;
  from?: string;
  to?: string;
}
interface IListRoutesArray extends Array<IListRoutes> {}

const listRoutes: IListRoutesArray = [
  {
    date: "20:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "21:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "22:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "23:00",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
];

const { height } = Dimensions.get("window");

const MyRoutes = (props: IMyRoutes) => {
  const { navigation } = props;

  const theme = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title="My Routes"
          subTitle="Here we store all your everyday routes"
          icon="Menu"
        />
      ),
    });
  }, [navigation]);

  const Detail = ({
    title,
    detail,
    icon,
  }: {
    title: string;
    detail?: string;
    icon?: TIcon;
  }) => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {icon && (
          <View
            style={{
              marginRight: "3%",
            }}
          >
            <Icons icon={icon} fill={theme.colors.primary} size={18} />
          </View>
        )}
        <View>
          <Text variant="bodyHighlight">{title}</Text>
          {detail && <Text variant="heading2">{detail}</Text>}
        </View>
      </View>
    );
  };

  const RoutesListItem = ({ date, from, to }: IListRoutes) => {
    return (
      <TouchableOpacity
        style={{
          height: 140,
          marginHorizontal: "5%",
          marginVertical: "2%",
          backgroundColor: theme.colors.grayLighter,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            right: 15,
            top: 15,
          }}
        >
          <Text variant="body">{"Today "}</Text>
          <Text variant="bodyHighlight">{date}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: "3%",
            height: 140,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Detail title="From" detail={from} icon="Circle" />
            <Detail title="To" detail={to} icon="Market" />
          </View>
          <View>
            <Icons icon="ArrowRightLight" fill={theme.colors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
        },
      ]}
    >
      <FlatList
        data={listRoutes}
        renderItem={({ item, index }) => {
          return <RoutesListItem key={`${item.from}_${index}`} {...item} />;
        }}
      />
    </View>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
