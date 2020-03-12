import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import DrawerNavigator from "./DrawerNavigator";
import NavigationRouter from "./NavigationRouter";
import Galeria from "../screens/Galeria";
import ShowPhoto from "../screens/ShowPhoto";
import Login from "../screens/Login";

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: DrawerNavigator,
      NavigationRouter: NavigationRouter,
      Galeria: Galeria,
      ShowPhoto: ShowPhoto,
      Login: Login
    },
    { initialRouteName: "NavigationRouter" }
  )
);
