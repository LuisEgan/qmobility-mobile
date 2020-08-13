import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icons } from "../../../components";
import { Text } from "../../../config/Theme";

import { TIcon } from "../../../components/svg/icons/TypeIcons";
import { StyleProp, ViewStyle } from "react-native";

interface IListHistory {
  icon: TIcon;
  title: string;
  subTitle: string;
}

interface IList {
  ArrayList: Array<IListHistory>;
  filter: string;
  containerStyle?: StyleProp<ViewStyle>;
}
const { width, height } = Dimensions.get("window");

const searchFor = (search: string) => {
  return ({ title, subTitle }: IListHistory): boolean => {
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      subTitle.toLowerCase().includes(search.toLowerCase()) ||
      !search
    );
  };
};

const List = (props: IList) => {
  const { ArrayList, filter, containerStyle } = props;

  return (
    <ScrollView style={[styles.container, containerStyle]}>
      {ArrayList &&
        ArrayList.filter(searchFor(filter)).map(
          ({ icon, title, subTitle }: IListHistory, i) => {
            return (
              <TouchableOpacity key={`${title}_${i}`} style={styles.content}>
                <View style={styles.viewLeft}>
                  <Icons icon={icon} fill="#00B0F0" size={20} />
                </View>
                <View style={styles.contentText}>
                  <Text variant="body">{title}</Text>
                  <Text variant="label">{subTitle}</Text>
                </View>
                <TouchableOpacity style={styles.viewRight}>
                  <Icons icon="MoreVert" fill="#ACACAC" size={20} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }
        )}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height * 0.7,
  },
  content: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: 10,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  viewLeft: {
    marginRight: "3%",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
    width: width * 0.07,
  },
  contentText: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: width * 0.6,
  },
  viewRight: {
    marginLeft: "3%",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
    width: width * 0.07,
  },
});
