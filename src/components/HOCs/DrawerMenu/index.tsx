import React, { FC, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../config/Theme";
import LeftMenu from "./LeftMenu";

const { width, height } = Dimensions.get("window");
const ANIM_DURATION = 300;
const OPEN_THRESHOLD = width * 0.08;

interface IDrawerMenu {
  isDrawerOpen: boolean;
  onDrawerToggle?: (isOpen: boolean) => void;
}

const DrawerMenu: FC<IDrawerMenu> = (props) => {
  const { children, isDrawerOpen: isDrawerOpenProp, onDrawerToggle } = props;
  const theme = useTheme<Theme>();

  const swipeRef = useRef<Swipeable>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isDrawerOpenProp);

  useEffect(() => {
    toggleDrawer(isDrawerOpenProp);

    if (isDrawerOpenProp) {
      swipeRef?.current?.openLeft();
    }
  }, [isDrawerOpenProp]);

  const transition = useTransition(isDrawerOpen, {
    duration: ANIM_DURATION,
  });

  // * Content container animations
  const contentX = mix(transition, 0, width * 0.1);
  const contentY = mix(transition, 0, height * 0.01);
  const contentOpacity = mix(transition, 1, 0.5);
  const contentScale = mix(transition, 1, 0.9);

  // * Menu container animations
  const menuX = mix(transition, width * -0.1, 0);
  const menuOpacity = mix(transition, 0, 1);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
    onDrawerToggle && onDrawerToggle(open);
  };

  return (
    <Swipeable
      ref={swipeRef}
      overshootLeft={false}
      leftThreshold={OPEN_THRESHOLD}
      containerStyle={[
        styles.swipeableContainer,
        { backgroundColor: theme.colors.drawerBackground },
      ]}
      renderLeftActions={() => {
        return (
          <View
            style={[
              styles.menu,
              { backgroundColor: theme.colors.drawerBackground },
            ]}
          >
            <Animated.View
              style={[
                styles.menuContent,
                {
                  opacity: menuOpacity,
                  transform: [
                    {
                      translateX: menuX,
                    },
                  ],
                },
              ]}
            >
              <LeftMenu />
            </Animated.View>
          </View>
        );
      }}
      friction={5}
      onSwipeableLeftWillOpen={() => toggleDrawer(true)}
      onSwipeableWillClose={() => {
        toggleDrawer(false);
      }}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: contentOpacity,
            borderRadius: isDrawerOpen ? 10 : 0,
            transform: [
              {
                translateX: contentX,
              },
              {
                translateY: contentY,
              },
              {
                scale: contentScale,
              },
            ],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Swipeable>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  container: {},

  menu: {
    height,
  },
  menuContent: {
    width: width * 0.5,
    height,
  },

  swipeableContainer: {
    ...StyleSheet.absoluteFillObject,
    height,
  },

  content: {
    height,
    backgroundColor: "white",
    overflow: "hidden",
  },
});
