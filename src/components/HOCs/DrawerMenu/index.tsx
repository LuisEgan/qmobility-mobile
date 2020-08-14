import React, { FC, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../config/Theme";

const { width, height } = Dimensions.get("window");
const ANIM_DURATION = 300;
const OPEN_THRESHOLD = width * 0.1;

interface IDrawerMenu {
  isDrawerOpen: boolean;
  onDrawerToggle?: (isOpen: boolean) => void;
}

const DrawerMenu: FC<IDrawerMenu> = (props) => {
  const { children, isDrawerOpen: isDrawerOpenProp, onDrawerToggle } = props;
  const theme = useTheme<Theme>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isDrawerOpenProp);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    toggleDrawer(isDrawerOpenProp);
  }, [isDrawerOpenProp]);

  const transition = useTransition(isDrawerOpen, {
    duration: ANIM_DURATION,
  });
  const translateX = mix(transition, 0, width * 0.55);
  const translateY = mix(transition, 0, height * 0.01);
  const opacity = mix(transition, 1, 0.5);
  const scale = mix(transition, 1, 0.9);

  const toggleDrawer = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setShowMenu(false);
      }, ANIM_DURATION);
    } else {
      setShowMenu(true);
    }
    setIsDrawerOpen(open);

    onDrawerToggle && onDrawerToggle(open);
  };

  return (
    <View style={[styles.container]}>
      {showMenu && (
        <View
          style={[
            styles.menu,
            { backgroundColor: theme.colors.drawerBackground },
          ]}
        >
          <View style={styles.menuContent}></View>
        </View>
      )}

      <Swipeable
        containerStyle={[styles.swipeableContainer]}
        renderLeftActions={() => {
          return (
            <View
              style={{
                width: OPEN_THRESHOLD,
                backgroundColor: theme.colors.drawerBackground,
              }}
            />
          );
        }}
        friction={5}
        onSwipeableLeftWillOpen={() => toggleDrawer(true)}
        onSwipeableWillClose={() => toggleDrawer(false)}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity,
              transform: [
                {
                  translateX,
                },
                {
                  translateY,
                },
                {
                  scale,
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      </Swipeable>
    </View>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  container: {},

  menu: {
    ...StyleSheet.absoluteFillObject,
    height,
  },
  menuContent: {
    height,
    width: width * 0.4,
    opacity: 0.5,
  },

  swipeableContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    height,
  },

  content: {
    height,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
});
