import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import {
  Card,
  CardItem,
  Button,
  Left,
  Right,
  Text,
  Thumbnail,
  Item,
  Icon,
  Input,
  Label,
  Title
} from "native-base";
import MenuHeader from "./MenuHeader";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../constants/Styles";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";

function login(usuarios, user, senha) {
  for (var cada in usuarios) {
    if (user.toLowerCase() == usuarios[cada].usr_login.toLowerCase()) {
      const encryptedPassword = md5(usuarios[cada].usr_codigo + senha);
      if (encryptedPassword == usuarios[cada].usr_senha) {
        console.log(usuarios[cada].usr_senha, encryptedPassword);
        return true;
      }
    }
  }
  return false;
}

export default function Login(props) {
  const usuarios = useSelector(state => state.usuarios);
  const [inputUser, setInputUser] = useState();
  const [inputPassword, setInputPassword] = useState();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
      }}>
      <Card
        style={{
          marginTop: StatusBar.currentHeight + 10,
          justifyContent: "center",
          paddingBottom: "20%"
        }}>
        <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 20 }}>Sistema de Obras Públicas</Text>
        </CardItem>
        <CardItem>
          <Item>
            <Icon name="ios-person" style={{ color: "green" }} />
            <Input
              placeholder="Usuário"
              value={inputUser}
              onChangeText={val => setInputUser(val)}
            />
          </Item>
        </CardItem>
        <CardItem>
          <Item>
            <Icon name="ios-unlock" style={{ color: "green" }} />
            <Input
              placeholder="Senha"
              secureTextEntry={true}
              value={inputPassword}
              onChangeText={val => setInputPassword(val)}
            />
          </Item>
        </CardItem>
        <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            rounded
            success
            style={{ width: "90%", justifyContent: "center" }}
            onPress={() => {
              if (login(usuarios, inputUser, inputPassword))
                props.navigation.navigate("Obras");
            }}>
            <Text>Entrar</Text>
          </Button>
        </CardItem>
      </Card>
    </View>
  );
}

Login.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: null,
    headerStyle: styles.headerBg
  };
};
