import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ViewStyle,
  StyleProp,
} from "react-native";
import Icons from "../../svg";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../config/Theme";
import Animated, { Easing } from "react-native-reanimated";
import { useTransition, mix } from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const ANIM_DURATION = 300;

interface IDrawerMenu {
  hamburgerStyle?: StyleProp<ViewStyle>;
}

const DrawerMenu: FC<IDrawerMenu> = (props) => {
  const { children, hamburgerStyle } = props;
  const theme = useTheme<Theme>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const transition = useTransition(isDrawerOpen, {
    duration: ANIM_DURATION,
  });
  const translateX = mix(transition, 0, width * 0.55);
  const translateY = mix(transition, 0, height * 0.01);
  const scale = mix(transition, 1, 0.9);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      setTimeout(() => {
        setShowMenu(false);
      }, ANIM_DURATION);
    } else {
      setShowMenu(true);
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <PanGestureHandler onGestureEvent={(e) => console.log(e)}>
      <View style={styles.container}>
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

        <Animated.View
          style={[
            styles.content,
            {
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
          <Icons
            icon="Menu"
            containerStyle={[styles.menuHamburger, hamburgerStyle]}
            onPress={toggleDrawer}
          />
          {children}
        </Animated.View>
      </View>
    </PanGestureHandler>
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
  menuHamburger: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 1,
  },

  content: {
    ...StyleSheet.absoluteFillObject,
    height,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
