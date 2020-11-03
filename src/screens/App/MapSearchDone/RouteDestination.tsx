import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Icons, Modal } from "../../../components";
import theme, { Text } from "../../../config/Theme";
import { IComponentsDefaults } from "../../../lib/Types";
import SearchEditRouter, {
  IChangeRoute,
  IEditChangeRoute,
} from "../../../components/SearchEditRouter";

const { width } = Dimensions.get("window");

interface IRouteDestination extends IComponentsDefaults {
  startDireccion: string;
  endDireccion: string;
  onChangeRoute: () => void;
  onEditNewRoute: (value: IEditChangeRoute) => void;
}

const RouteDestination = (props: IRouteDestination) => {
  const {
    startDireccion = "Loading...",
    endDireccion = "Loading...",
    containerStyle,
    onChangeRoute,
    onEditNewRoute,
  } = props;

  const [stateModal, setStateModal] = useState<boolean>(false);
  const [typeEdit, setTypeEdit] = useState<IChangeRoute>("START");

  const onEditRoute = (value: IChangeRoute) => {
    setTypeEdit(value);
    setStateModal(!stateModal);
  };

  const onChangeNewRoute = (value: IEditChangeRoute) => {
    onEditNewRoute(value);
    setStateModal(!stateModal);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Modal state={stateModal} onClosed={() => setStateModal(!stateModal)}>
        <View
          style={{
            backgroundColor: theme.colors.grayLighter,
          }}
        >
          <SearchEditRouter
            onCancel={() => setStateModal(!stateModal)}
            typeEdit={typeEdit}
            onChange={(value) => onChangeNewRoute(value)}
          />
        </View>
      </Modal>
      <Icons
        icon="MoreVert"
        size={20}
        fill={theme.colors.bodySmall}
        containerStyle={styles.edit}
        onPress={() => null}
      />

      <View style={styles.icons}>
        <Icons
          icon="Gps"
          size={20}
          fill={theme.colors.primary}
          containerStyle={{
            marginLeft: 3,
          }}
        />
        {[...Array(3)].map(() => (
          <Icons
            key={Math.random()}
            icon="Dot"
            size={5}
            fill={theme.colors.borderColor}
          />
        ))}
        <Icons
          icon="Market"
          size={20}
          containerStyle={{
            marginLeft: 1,
          }}
        />
      </View>

      <View style={styles.destinations}>
        <View style={styles.from}>
          <TouchableOpacity onPress={() => onEditRoute("START")}>
            <Text variant="label">Start</Text>
            <Text variant="bodyBold" numberOfLines={1}>
              {startDireccion}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.to}>
          <TouchableOpacity onPress={() => onEditRoute("END")}>
            <Text variant="label">End</Text>
            <Text variant="bodyBold" numberOfLines={1}>
              {endDireccion}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onChangeRoute && onChangeRoute()}
        style={styles.reverse}
      >
        <Icons icon="ArrowChange" size={20} fill={theme.colors.bodySmall} />
      </TouchableOpacity>
    </View>
  );
};

export default RouteDestination;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    height: 120,
    width: width * 0.95,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
  },

  edit: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  icons: {
    flex: 0.05,
    paddingLeft: 5,
    paddingRight: 15,
    marginTop: 5,
    paddingBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  destinations: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  from: {
    borderBottomWidth: 1,
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
    paddingVertical: 5,
    borderBottomColor: theme.colors.borderColor,
  },
  to: {
    width: "100%",
    justifyContent: "flex-start",
    flex: 1,
    paddingVertical: 5,
  },

  reverse: {
    flex: 0.05,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
