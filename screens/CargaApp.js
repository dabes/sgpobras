import React, { useState } from "react";
import { ScrollView, AsyncStorage } from "react-native";
import styles from "../constants/Styles";
import { Card, CardItem, Icon, Button, Text } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import MenuHeader from "./MenuHeader";
import axios from "axios";

function CargaApp(props) {
  const [onLoad, setonLoad] = useState(false);
  const dispatch = useDispatch();
  const config = useSelector(state => state.configs);
  const ip = config.ip;
  const [texto, settexto] = useState("Importando Itens");
  const [error, setError] = useState(false);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Card>
        <CardItem style={(styles.card, { justifyContent: "center" })}>
          <Button
            onPress={a => {
              setonLoad(true);
              AsyncStorage.clear();
              dispatch({ type: "IP", ip: ip });
              axios
                .get("http://" + ip + "/api/obras")
                .then(res => {
                  const items = res.data;
                  dispatch({ type: "CARGAOBRAS", obras: items });
                  return res;
                })
                .then(res => settexto("Dados carregados com sucesso"))
                .catch(e => {
                  // setonLoad(false);
                  setError(true);
                  settexto("Não foi possível conectar ao servidor");
                });
            }}
            disabled={onLoad}
            activeOpacity={onLoad ? 1 : 0.5}>
            <Text>{onLoad ? "Carregando Dados" : "Download dos Dados"}</Text>
          </Button>
        </CardItem>
      </Card>
      {onLoad ? (
        <Card>
          <CardItem style={styles.card}>
            {!error ? (
              <Icon
                ios="ios-checkmark-circle-outline"
                android="md-checkmark-circle-outline"
                style={{
                  width: "100%",
                  color: "green",
                  fontSize: 100,
                  textAlign: "center"
                }}
              />
            ) : (
              <Icon
                ios="ios-alert"
                android="md-alert"
                style={{
                  width: "100%",
                  color: "red",
                  fontSize: 100,
                  textAlign: "center"
                }}
              />
            )}
          </CardItem>
          <CardItem style={styles.card}>
            <Text style={{ width: "100%", textAlign: "center" }}>{texto}</Text>
          </CardItem>
          <CardItem style={(styles.card, { justifyContent: "center" })}>
            <Button
              style={{ alignSelf: "center" }}
              onPress={a => {
                setonLoad(false);
                setError(false);
              }}>
              <Text>OK</Text>
            </Button>
          </CardItem>
        </Card>
      ) : (
        <Text></Text>
      )}
    </ScrollView>
  );
}

CargaApp.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: <MenuHeader navigation={navigation} />,
    headerStyle: styles.headerBg
  };
};

export default CargaApp;
