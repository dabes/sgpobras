import React from "react";
import { ScrollView } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import styles from "../constants/Styles";
import MenuHeader from "./MenuHeader";

export default function LinksScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <ExpoLinksView />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: <MenuHeader navigation={navigation} />,
    headerStyle: styles.headerBg
  };
};
