import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import DrawerNavigator from "./DrawerNavigator";
import BarcodeScan from "../screens/BarcodeScan";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: DrawerNavigator,
    BarcodeScan: BarcodeScan
  })
);
