import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import DrawerBarIcon from "../components/BarIcon";
import Menu from "../constants/Menu";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const MenuCreator = (routename, screen, label, path, ios_icon, other_icon) => {
  const Stack = createStackNavigator({ [routename]: screen }, config);
  Stack.navigationOptions = {
    drawerLabel: label,
    drawerIcon: ({ focused }) => (
      <DrawerBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? ios_icon : other_icon}
      />
    )
  };
  Stack.path = path;
  return Stack;
};

const MenuStack = Menu.map(item => {
  return MenuCreator(
    item.routename,
    item.screen,
    item.label,
    item.path,
    item.ios_icon,
    item.other_icon
  );
});

const DrawerNavigator = createDrawerNavigator(
  {
    ...MenuStack
  },
  { initialRouteName: "3" }
);

DrawerNavigator.path = "";

export default DrawerNavigator;
