import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ActivityIndicator, StatusBar } from "react-native";

export default function NavigationRouter(props) {
  const configs = useSelector(state => state.configs);
  props.navigation.navigate(configs.ip ? "Obras" : "Configuração");

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
