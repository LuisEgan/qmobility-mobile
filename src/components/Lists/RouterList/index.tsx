import React from "react";
import { FlatList } from "react-native";
import { IComponentsDefaults } from "../../../lib/Types";
import { TList } from "../TypeList";
import RouteListItem from "./RouteListItem";

interface IList extends IComponentsDefaults {
  ListArray: TList;
}

const List = (props: IList) => {
  const { ListArray } = props;

  return (
    <FlatList
      data={ListArray}
      renderItem={({ item, index }) => (
        <RouteListItem key={`${item}_${index}`} {...item} />
      )}
      keyExtractor={(item, index) => `${item.date}_${index}`}
    />
  );
};
export default List;
