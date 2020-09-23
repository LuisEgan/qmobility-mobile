import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useQuery } from "@apollo/client";
import { IScreen } from "../Router";
import {
  CreateProfile,
  MyCars,
  ProfileScroll,
  CheckCar,
  SearchRouter,
  Main,
  EditProfile,
  Profile,
  MyRoutes,
  Details,
  MapSearchDone,
} from "../../screens/App";
import { APP_STACK_SCREENS_NAMES } from "../../lib/constants";
import { FullScreenModal } from "../../screens/Feedback";
import { IUser } from "../../gql/User/Types";
import { User } from "../../gql";
import { AuthContext } from "../AuthContext";

interface IScreens extends Array<IScreen> {}
export const APP_STACK_SCREENS: IScreens = [
  {
    name: APP_STACK_SCREENS_NAMES.Main,
    component: Main,
  },
  {
    name: APP_STACK_SCREENS_NAMES.CreateProfile,
    component: CreateProfile,
  },
  {
    name: APP_STACK_SCREENS_NAMES.MyCars,
    component: MyCars,
  },
  {
    name: APP_STACK_SCREENS_NAMES.ProfileScroll,
    component: ProfileScroll,
  },
  {
    name: APP_STACK_SCREENS_NAMES.CheckCar,
    component: CheckCar,
  },
  {
    name: APP_STACK_SCREENS_NAMES.SearchRouter,
    component: SearchRouter,
  },

  {
    name: APP_STACK_SCREENS_NAMES.EditProfile,
    component: EditProfile,
  },
  {
    name: APP_STACK_SCREENS_NAMES.Profile,
    component: Profile,
  },
  {
    name: APP_STACK_SCREENS_NAMES.MyRoutes,
    component: MyRoutes,
  },
  {
    name: APP_STACK_SCREENS_NAMES.Details,
    component: Details,
  },
  {
    name: APP_STACK_SCREENS_NAMES.MapSearchDone,
    component: MapSearchDone,
  },
];

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const [initialRouteName, setInitialRouteName] = useState<string>();

  const { signOut } = useContext(AuthContext);

  const { data, loading, error } = useQuery<{ user: IUser }, IUser>(
    User.queries.user,
  );

  // * Check if the user already created a profile or not
  useEffect(() => {
    if (data || error) {
      if (error) {
        signOut();
        return;
      }

      // ! Change back
      const iRoute = !data?.user.dateOfBirth
        ? APP_STACK_SCREENS_NAMES.Main
        : APP_STACK_SCREENS_NAMES.CreateProfile;

      setInitialRouteName(iRoute);
    }
  }, [data, error]);

  if (!initialRouteName || loading) return <FullScreenModal show />;

  return (
    <Navigator headerMode="none" initialRouteName={initialRouteName}>
      {APP_STACK_SCREENS.map(({ name, component, headerShown }) => {
        const options = { headerShown: headerShown || false };
        return <Screen key={name} {...{ name, component, options }} />;
      })}
    </Navigator>
  );
};

export default AppNavigator;
