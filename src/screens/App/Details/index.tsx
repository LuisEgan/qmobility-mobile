import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useTheme from "@shopify/restyle/dist/hooks/useTheme";
import { Header, Icons } from "../../../components";
import { TDetailsNavProps } from "../../../navigation/Types/NavPropsTypes";
import { Theme, Text } from "../../../config/Theme";

interface IDetails extends TDetailsNavProps {}

const Details = (props: IDetails) => {
  const { navigation } = props;

  const theme = useTheme<Theme>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.white,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: "5%",
        }}
      >
        <Text variant="heading2">Nissan Leaf+</Text>
        <TouchableOpacity>
          <Icons icon="MoreVert" fill={theme.colors.primary} size={27} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Icons icon="MoreVert" fill={theme.colors.primary} size={27} />
        <Text
          variant="heading2"
          style={{
            color: theme.colors.primary,
          }}
        >
          100%
        </Text>
      </View>
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    paddingHorizontal: "5%",
  },
});
