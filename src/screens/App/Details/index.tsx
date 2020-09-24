import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import { Header, Icons, Button, Slider } from "../../../components";
import { TDetailsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Theme, Text } from "../../../config/Theme";
import { TIcon } from "../../../components/svg/icons/TypeIcons";
import slides from "./slides";

const { height, width } = Dimensions.get("window");

interface IDetails extends TDetailsNavProps {}

interface IContentView {
  icon?: TIcon;
  subTitle?: string;
  type?: string;
}

interface IIconText {
  icon?: TIcon;
  label?: string;
}

const Details = (props: IDetails) => {
  const { navigation } = props;

  const theme = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, [navigation]);

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

  const ContentView = ({ icon, subTitle, type }: IContentView) => (
    <View style={styles.cardContent}>
      {icon && <Icons icon={icon} fill={theme.colors.primary} size={30} />}
      <View style={styles.cardBody}>
        <View style={styles.cardBodyContent}>
          <Text variant="heading1">0</Text>
          {type && (
            <Text style={styles.cardType} variant="bodyBold">
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
      <Slider slides={slides} {...{ width, height: height * 0.4 }} />

      <ScrollView style={styles.containerScroll}>
        <View style={styles.contentTitle}>
          <Text variant="heading2">Nissan Leaf+</Text>
          <TouchableOpacity>
            <Icons icon="MoreVert" fill={theme.colors.primary} size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Icons icon="BatteryRight" fill={theme.colors.primary} size={28} />
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
            variant="bodyHighlightBold"
            style={{
              marginRight: 10,
            }}
          >
            eV Battery 62 kWh
          </Text>
          <Text variant="bodyBold">Range 280 km</Text>
        </View>

        <View style={[styles.content]}>
          <IconText icon="Bubble" label="5" />
          <IconText icon="Spa" label="0 g/km" />
        </View>

        <View style={[styles.content]}>
          <IconText icon="Polymer" label="Max 220 km" />
          <IconText icon="Nature" label="16.4 kWh/100km" />
        </View>

        <View style={[styles.content]}>
          <IconText icon="Speed" label="Max 144 km/h" />
          <IconText icon="Flash" label="Time 0:40 h" />
        </View>

        <View style={[styles.content, { justifyContent: "space-between" }]}>
          <Text variant="bodyBold">United Kingdom</Text>
          <Text variant="bodyBold">£42,345</Text>
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
          <Text variant="body">In production</Text>
        </View>

        <View style={[styles.card, { borderColor: theme.colors.primary }]}>
          <ContentView icon="Bubble" subTitle="Trips" />
          <View
            style={[styles.line, { borderColor: theme.colors.primaryLighter }]}
          />
          <ContentView icon="Navigation" subTitle="Travelled" type="km" />
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
