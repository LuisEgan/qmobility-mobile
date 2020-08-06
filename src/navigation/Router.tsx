import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from "./AuthNavigator";
import { TAllNavProps } from "./NavPropsTypes";

export interface IScreen {
  name: string;
  component: React.FunctionComponent<Screen & TAllNavProps>;
  headerShown?: boolean;
}

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
});

export default createAppContainer(SwitchNavigator);
