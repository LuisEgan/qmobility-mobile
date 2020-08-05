import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from "./AuthNavigator";

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen>;
  headerHide?: boolean;
}

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
});

export default createAppContainer(SwitchNavigator);
