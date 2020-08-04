import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from "./AuthNavigator";

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
});

export default createAppContainer(SwitchNavigator);
