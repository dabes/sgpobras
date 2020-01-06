import React from "react";
import styles from "../constants/Styles";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { HeaderBarIcon } from "../components/BarIcon";

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
    </View>
  );
}
