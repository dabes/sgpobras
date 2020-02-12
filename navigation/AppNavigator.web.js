import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "react-navigation";

import DrawerNavigator from "./DrawerNavigator";

const switchNavigator = createSwitchNavigator({
  Main: DrawerNavigator
});
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
