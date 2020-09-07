import { StyleProp, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface IComponentsDefaults {
  containerStyle?:
    | StyleProp<ViewStyle>
    | StyleProp<Animated.AnimateStyle<ViewStyle>>;
}

export default IComponentsDefaults;
