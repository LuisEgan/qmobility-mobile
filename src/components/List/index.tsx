import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { IComponentsDefaults } from "../../lib/Types";
import { TList } from "./TypeList";
import RouteListItem from "./Item/RouteListItem";

type TTypeList = "routerItem" | "iconItem";

interface IList extends IComponentsDefaults {
  ListArray: TList;
  TypeList: TTypeList;
}

const List = (props: IList) => {
  const { ListArray, TypeList } = props;

  const TypeItem = (item: TList) => {
    switch (TypeList) {
      case "routerItem":
        return <RouteListItem {...item} />;
      default:
        return <View />;
    }
  };

  return (
    <FlatList
      data={ListArray}
      renderItem={({ item, index }) => {
        return <TypeItem key={`${item}_${index}`} {...item} />;
      }}
    />
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: "5%",
    marginVertical: 10,

    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
});
