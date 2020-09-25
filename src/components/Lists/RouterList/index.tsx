import React from "react";
import { FlatList } from "react-native";
import { IComponentsDefaults } from "../../../lib/Types";
import RouteListItem from "./RouteListItem";
import { IGetMySaveRoute } from "../../../gql/Route/queries";

interface IList extends IComponentsDefaults {
  ListArray: IGetMySaveRoute[];
}

const RouterList = (props: IList) => {
  const { ListArray = [] } = props;

  return (
    <FlatList
      data={ListArray}
      renderItem={({ item, index }) => (
        <RouteListItem key={`${item}_${index}`} {...item} />
      )}
      keyExtractor={(item, index) => `${item}_${index}`}
    />
  );
};
export default RouterList;
