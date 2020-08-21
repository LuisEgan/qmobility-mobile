import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Header, Icons, Button } from "../../../components";
import { TDetailsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Theme, Text } from "../../../config/Theme";
import { TIcon } from "../../../components/svg/icons/TypeIcons";

interface IDetails extends TDetailsNavProps {}

interface IContentView {
  icon?: TIcon;
  subTitle?: string;
  type?: string;
}

const Details = (props: IDetails) => {
  const { navigation } = props;

  const theme = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, [navigation]);

  const IconText = () => (
    <View
      style={[
        styles.content,
        {
          marginRight: 10,
        },
      ]}
    >
      <Icons icon="Circle" fill={theme.colors.grayLight} size={17} />
      <Text variant="label">Range 280 km</Text>
    </View>
  );

  const ContentView = ({ icon, subTitle, type }: IContentView) => (
    <View style={styles.cardContent}>
      {icon && <Icons icon={icon} fill={theme.colors.primary} size={30} />}
      <View style={styles.cardBody}>
        <View style={styles.cardBodyContent}>
          <Text variant="heading1">0</Text>
          {type && (
            <Text
              style={[styles.cardType, { color: theme.colors.gray }]}
              variant="body"
            >
              {type}
            </Text>
          )}
        </View>
        {subTitle && <Text variant="body">{subTitle}</Text>}
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
        },
      ]}
    >
      <ScrollView style={styles.containerScroll}>
        <View style={styles.contentTitle}>
          <Text variant="heading2">Nissan Leaf+</Text>
          <TouchableOpacity>
            <Icons icon="MoreVert" fill={theme.colors.primary} size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Icons icon="Circle" fill={theme.colors.primary} size={28} />
          <Text
            variant="heading2"
            style={{
              color: theme.colors.primary,
            }}
          >
            100%
          </Text>
        </View>

        <View style={styles.content}>
          <Text
            variant="bodyHighlight"
            style={{
              marginRight: 10,
            }}
          >
            eV Battery 62 kWh
          </Text>
          <Text variant="body">Range 280 km</Text>
        </View>

        <View style={styles.content}>
          <IconText />
          <IconText />
        </View>

        <View
          style={[
            styles.content,
            {
              justifyContent: "space-between",
            },
          ]}
        >
          <Text variant="body">United Kingdom</Text>
          <Text variant="body">£42,345</Text>
        </View>

        <View
          style={[
            styles.content,
            {
              justifyContent: "space-between",
            },
          ]}
        >
          <Text
            variant="body"
            style={{
              color: theme.colors.gray,
            }}
          >
            Availability
          </Text>
          <Text variant="body">In production</Text>
        </View>

        <View style={[styles.card, { borderColor: theme.colors.primary }]}>
          <ContentView icon="Bubble" subTitle="Trips" />
          <View
            style={[styles.line, { borderColor: theme.colors.primaryLighter }]}
          />
          <ContentView icon="Circle" subTitle="Travelled" type="km" />
          <View
            style={[styles.line, { borderColor: theme.colors.primaryLighter }]}
          />
          <ContentView icon="Clock" subTitle="Driving" type="h" />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button
          label="SET AS DEFAULT"
          variant="primary"
          onPress={() => console.warn("here")}
        />
      </View>
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  containerScroll: {
    paddingHorizontal: "5%",
  },
  contentTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "6%",
    marginBottom: "3%",
  },
  content: {
    flexDirection: "row",
    marginVertical: "3%",
  },
  line: {
    borderWidth: 1,
    height: 60,
    alignSelf: "flex-end",
  },
  card: {
    marginVertical: "5%",
    borderRadius: 20,
    borderWidth: 1,
    height: 122,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
  },
  button: {
    marginHorizontal: "5%",
    marginBottom: "6%",
    marginTop: "3%",
    justifyContent: "center",
  },
});
