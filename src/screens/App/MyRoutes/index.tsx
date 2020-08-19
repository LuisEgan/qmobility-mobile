import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Header, Icons } from "../../../components";
import { TMyRoutesNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Text, Theme } from "../../../config/Theme";
import { useTheme } from "@shopify/restyle";
import { FlatList } from "react-native-gesture-handler";

interface IMyRoutes extends TMyRoutesNavProps {}

interface IListRoutes {
  date?: string;
  from?: string;
  to?: string;
}
interface IListRoutesArray extends Array<IListRoutes> {}

const listRoutes: IListRoutesArray = [
  {
    date: "",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "",
    from: "Nissan Leaf Acenta 40",
    to: "Default eve",
  },
  {
    date: "",
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

  const Detail = ({ title, detail }: { title: string; detail?: string }) => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginRight: "3%",
          }}
        >
          <Icons icon="Circle" fill={theme.colors.primary} size={18} />
        </View>
        <View>
          <Text variant="bodyHighlight">{title}</Text>
          {detail && <Text variant="heading2">{detail}</Text>}
        </View>
      </View>
    );
  };

  const RoutesListItem = ({ date, from, to }: IListRoutes) => {
    return (
      <View
        style={{
          height: 140,
          marginHorizontal: "5%",
          marginVertical: "2%",
          backgroundColor: theme.colors.grayLighter,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            position: "absolute",
            right: 15,
            top: 15,
          }}
        >
          {"Today"}
          {date}
        </Text>
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
            <Detail title="From" detail={from} />
            <Detail title="To" detail={to} />
          </View>
          <View>
            <Icons icon="ArrowBackLight" fill={theme.colors.primary} />
          </View>
        </View>
      </View>
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
      <ScrollView style={styles.content}>
        {listRoutes &&
          listRoutes.length &&
          listRoutes.map((route, i) => {
            return <RoutesListItem key={`${route.from}_${i}`} {...route} />;
          })}
      </ScrollView>
    </View>
  );
};
export default MyRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: height * 0.61,
  },
});
