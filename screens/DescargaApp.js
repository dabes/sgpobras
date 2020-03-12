import React, { useState } from "react";
import { ScrollView, AsyncStorage, Platform } from "react-native";
import styles from "../constants/Styles";
import { Card, CardItem, Icon, Button, Text } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import MenuHeader from "./MenuHeader";
import axios from "axios";

function DescargaApp(props) {
  const [onLoad, setonLoad] = useState(false);
  const dispatch = useDispatch();
  const config = useSelector(state => state.configs);
  const obras = useSelector(state => state.obras);
  const ip = config.ip;
  const [texto, setTexto] = useState("Exportando Itens");
  const [error, setError] = useState(false);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Card>
        <CardItem style={(styles.card, { justifyContent: "center" })}>
          <Button
            onPress={a => {
              setonLoad(true);
              setTexto("Enviando Obras!");
              axios
                .post(
                  "http://" + ip + "/api/obras",
                  {
                    data: JSON.stringify(obras)
                  },
                  {
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }
                )
                .then(ret => {
                  setTexto("Enviando Fotos das Obras");
                  var total = 0;
                  for (var cada in obras) {
                    let count = 0;
                    obras[cada].photos.forEach((item, indice) => {
                      const nome =
                        obras[cada].id +
                        "_" +
                        obras[cada].id_bem_publico +
                        "_" +
                        count;
                      let extension = item.split(".");
                      extension = extension[extension.length - 1];
                      var formData = new FormData();
                      formData.append("photo", {
                        uri: item,
                        name: nome + "." + extension,
                        filename: nome + "." + extension,
                        type: "image/" + extension
                      });
                      axios
                        .post("http://" + ip + "/api/obras_fotos", formData, {
                          headers: {
                            "Content-Type": "multipart/form-data"
                          }
                        })
                        .then(a => {
                          setTexto("Enviando Foto " + total);
                        })
                        .catch(e => {
                          setError(true);
                          setTexto("Sem contato com o servidor!");
                          console.log(e);
                        });
                      count += 1;
                      total += 1;
                    });
                  }
                })
                .catch(e => {
                  setError(true);
                  setTexto("Sem contato com o servidor!");
                  console.log(e);
                });
              setTexto("Dados enviados");
            }}
            disabled={onLoad}
            activeOpacity={onLoad ? 1 : 0.5}
          >
            <Text>{onLoad ? "Descarregando Dados" : "Descarregar Dados"}</Text>
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
              }}
            >
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

DescargaApp.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: <MenuHeader navigation={navigation} />,
    headerStyle: styles.headerBg
  };
};

export default DescargaApp;
