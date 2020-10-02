import React from "react";
import { FlatList } from "react-native";
import { IComponentsDefaults } from "../../../lib/Types";
import RouteListItem from "./RouteListItem";
import { IGetMySaveRoute } from "../../../gql/Route/queries";

interface IList extends IComponentsDefaults {
  ListArray: IGetMySaveRoute;
  filter: string;
}

const RouterList = (props: IList) => {
  const { ListArray = [], filter } = props;

  let newListArray = ListArray;

  if (filter !== "All") {
    newListArray = ListArray
      ? ListArray.filter((item) => item.category === filter)
      : [];
  }

  return (
    <FlatList
      data={newListArray}
      renderItem={({ item, index }) => (
        <RouteListItem key={`${item}_${index}`} {...item} />
      )}
      keyExtractor={(item, index) => `${item}_${index}`}
    />
  );
};
export default RouterList;
