import React from "react";
import { Image, ScrollView, Text, View, Button } from "react-native";
import styles from "../constants/Styles";
import { Card, CardItem } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import MenuHeader from "./MenuHeader";
import axios from "axios";

function HomeScreen(props) {
  const bem = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Card>
        <CardItem style={styles.card}>
          <Button
            onPress={a => {
              axios.get("http://10.0.18.70:3000/api/bens").then(res => {
                const arraybens = res.data;
                dispatch({ type: "B", bens: arraybens });
              });
            }}
            title="Crap"
          ></Button>
        </CardItem>
      </Card>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: <MenuHeader navigation={navigation} />,
    headerStyle: styles.headerBg
  };
};

export default HomeScreen;
