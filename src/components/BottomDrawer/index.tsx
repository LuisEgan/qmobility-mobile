import React, { FC, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import { IComponentsDefaults } from "../../lib/Types";
import { Theme } from "../../config/Theme";

const { width, height } = Dimensions.get("window");

interface IBottomDrawer extends IComponentsDefaults {
  maxHeight?: number;
  closeOffset?: number;
  isDrawerOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: () => void;
}

const BottomDrawer: FC<IBottomDrawer> = (props) => {
  const {
    children,
    maxHeight = height * 0.6,
    closeOffset = height * 0.05,
    isDrawerOpen: isDrawerOpenProp = false,
    containerStyle,
    onOpen,
    onClose,
    onToggle,
  } = props;

  const theme = useTheme<Theme>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isDrawerOpenProp);

  const transition = useTransition(isDrawerOpen, { duration: 100 });
  const translateY = mix(transition, maxHeight - closeOffset, 0);

  const toggleDrawer = () => {
    // * Open drawer
    if (!isDrawerOpen && onOpen) {
      onOpen();
    }

    // * Close drawer
    if (isDrawerOpen && onClose) {
      onClose();
    }

    // * Toggle cb
    if (onToggle) {
      onToggle();
    }

    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { height: maxHeight, transform: [{ translateY }] },
        containerStyle,
      ]}
    >
      <TouchableOpacity onPress={toggleDrawer} style={styles.handle}>
        <View
          style={[
            styles.handleIcon,
            { borderColor: theme.colors.drawerHandle },
          ]}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <ScrollView>{children}</ScrollView>
      </View>
    </Animated.View>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    elevation: 1,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    bottom: 0,
  },

  handle: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  handleIcon: {
    width: width * 0.1,
    height: 0,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 15,
  },

  content: {
    flex: 1,
    paddingHorizontal: width * 0.1,
    paddingVertical: "5%",
  },
});
