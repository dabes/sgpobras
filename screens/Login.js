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

export default function Login(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      <Card
        style={{
          marginTop: StatusBar.currentHeight + 10,
          justifyContent: "center",
          paddingBottom: "20%"
        }}
      >
        <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 20 }}>Sistema de Obras Públicas</Text>
        </CardItem>
        <CardItem>
          <Item>
            <Icon name="ios-person" style={{ color: "green" }} />
            <Input placeholder="Usuário" />
          </Item>
        </CardItem>
        <CardItem>
          <Item>
            <Icon name="ios-unlock" style={{ color: "green" }} />
            <Input placeholder="Senha" secureTextEntry={true} />
          </Item>
        </CardItem>
        <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            rounded
            success
            style={{ width: "90%", justifyContent: "center" }}
          >
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
