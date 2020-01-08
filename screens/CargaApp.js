import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  Button,
  AsyncStorage
} from "react-native";
import styles from "../constants/Styles";
import { Card, CardItem, Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import MenuHeader from "./MenuHeader";
import axios from "axios";

function HomeScreen(props) {
  const [onLoad, setonLoad] = useState(false);
  const dispatch = useDispatch();
  const bem = useSelector(state => state.bem);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Card>
        <CardItem style={styles.card}>
          <Button
            onPress={a => {
              setonLoad(true);
              axios
                .get("http://10.0.18.70:3000/api/bens")
                .then(res => {
                  const arraybens = res.data;
                  dispatch({ type: "B", bens: arraybens });
                  return res;
                })
                .then(res => setonLoad(false))
                .catch(e => console.log(e));
            }}
            disabled={onLoad}
            activeOpacity={onLoad ? 1 : 0.5}
            title={onLoad ? "Carregando Dados" : "Download dos Dados"}
          ></Button>
        </CardItem>
      </Card>
      {onLoad ? (
        <Card>
          <CardItem style={styles.card}>
            <Icon name="home" />
            <Text>Importando Itens</Text>
          </CardItem>
        </Card>
      ) : (
        <Text></Text>
      )}
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
