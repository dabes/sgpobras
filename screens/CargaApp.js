import React, { useState } from "react";
import { ScrollView, AsyncStorage } from "react-native";
import styles from "../constants/Styles";
import { Card, CardItem, Icon, Button, Text } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import MenuHeader from "./MenuHeader";
import axios from "axios";

function HomeScreen(props) {
  const [onLoad, setonLoad] = useState(false);
  const dispatch = useDispatch();
  const config = useSelector(state => state.configs);
  const ip = config.ip;

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
              AsyncStorage.clear();
              axios
                .get("http://" + ip + "/api/bens")
                .then(res => {
                  const arraybens = res.data;
                  dispatch({ type: "CARGABEM", bens: arraybens });
                  return res;
                })
                .then(res => setonLoad(false))
                .catch(e => console.log(e));
              axios
                .get("http://" + ip + "/api/mat")
                .then(res => {
                  const arraybens = res.data;
                  dispatch({ type: "CARGACENTROCUSTO", ccusto: arraybens });
                  return res;
                })
                .then(res => setonLoad(false))
                .catch(e => console.log(e));
            }}
            disabled={onLoad}
            activeOpacity={onLoad ? 1 : 0.5}
          >
            <Text>{onLoad ? "Carregando Dados" : "Download dos Dados"}</Text>
          </Button>
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
