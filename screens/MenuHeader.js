import React from "react";
import styles from "../constants/Styles";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { HeaderBarIcon } from "../components/BarIcon";
import { Icon } from "native-base";
import { useDispatch } from "react-redux";

function SearchIcon(props) {
  const dispatch = useDispatch();
  if (props.navigation.state.routeName == "Obras") {
    return (
      <TouchableOpacity onPress={() => dispatch({ type: "TOOGLESEARCH" })}>
        <HeaderBarIcon
          name={Platform.name === "ios" ? "ios-search" : "md-search"}
          color="#fff"
        />
      </TouchableOpacity>
    );
  } else {
    return <View></View>;
  }
}

export default function MenuHeader(props) {
  navigation = props.navigation;

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.headerIconTouchable}
      >
        <HeaderBarIcon
          name={Platform.name === "ios" ? "ios-menu" : "md-menu"}
          color="#fff"
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{navigation.state.routeName}</Text>
      <SearchIcon navigation={navigation} />
    </View>
  );
}
