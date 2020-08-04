import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from "./AuthNavigator";

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen>;
}

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
});

export default createAppContainer(SwitchNavigator);
