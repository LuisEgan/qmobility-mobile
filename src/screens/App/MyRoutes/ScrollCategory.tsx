import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import theme, { Text } from "../../../config/Theme";
import { ISavedRoute } from "../../../gql/Route/queries";

interface IScrollCategory {
  filter: string;
  data: ISavedRoute[] | [];
  onPress: (str: string) => void;
}

const { width } = Dimensions.get("window");

const ScrollCategory = (props: IScrollCategory) => {
  const { filter, data, onPress } = props;

  return (
    <View>
      <ScrollView
        horizontal
        style={styles.contentScroll}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.contentText,
            {
              marginLeft: width * 0.05,
              backgroundColor:
                filter === "All" ? theme.colors.primary : theme.colors.white,
              borderColor:
                filter === "All" ? theme.colors.primary : theme.colors.gray,
            },
          ]}
          onPress={() => onPress("All")}
        >
          <Text
            style={[
              styles.text,
              {
                color:
                  filter === "All" ? theme.colors.white : theme.colors.gray,
              },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {data && (
          <>
            {data.map(
              (
                { category }: ISavedRoute,
                index: number,
                array: ISavedRoute[],
              ) => (
                <TouchableOpacity
                  key={Math.random()}
                  style={[
                    styles.contentText,
                    {
                      marginRight:
                        array.length - 1 === index ? width * 0.05 : 0,
                      backgroundColor:
                        filter === category
                          ? theme.colors.primary
                          : theme.colors.white,
                      borderColor:
                        filter === category
                          ? theme.colors.primary
                          : theme.colors.gray,
                    },
                  ]}
                  onPress={() => onPress(category)}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color:
                          filter === category
                            ? theme.colors.white
                            : theme.colors.gray,
                      },
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default ScrollCategory;

const styles = StyleSheet.create({
  contentScroll: {
    backgroundColor: theme.colors.white,
    paddingVertical: 10,
  },
  contentText: {
    height: 30,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  text: {
    marginHorizontal: 5,
  },
});
